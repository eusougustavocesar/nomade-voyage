"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateLeadStage(leadId: string, stage: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update({ stage: stage as any })
    .eq("id", leadId);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/pipeline");
}

export async function updateLeadToLost(leadId: string, reason: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update({ stage: "perdido" as any, lost_reason: reason, lost_at: new Date().toISOString() })
    .eq("id", leadId);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/pipeline");
}

async function nextBookingReference(supabase: Awaited<ReturnType<typeof createClient>>) {
  const year = new Date().getFullYear();
  const { count } = await supabase
    .from("bookings")
    .select("id", { count: "exact", head: true })
    .gte("created_at", `${year}-01-01`);

  return `NV-${year}-${String((count ?? 0) + 1).padStart(4, "0")}`;
}

export async function convertLeadToBooking(leadId: string, fd: FormData) {
  const supabase = await createClient();

  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .select("contact_id")
    .eq("id", leadId)
    .single();

  if (leadError) throw new Error(leadError.message);

  const reference = await nextBookingReference(supabase);

  const { error: bookingError } = await supabase.from("bookings").insert({
    lead_id:           leadId,
    contact_id:        lead.contact_id,
    reference,
    status:            "confirmado",
    travel_date_from:  (fd.get("travel_date_from") as string) || null,
    travel_date_to:    (fd.get("travel_date_to") as string) || null,
    group_size:        Number(fd.get("group_size")) || 1,
    total_price:       Number(fd.get("total_price")) || 0,
  });

  if (bookingError) throw new Error(bookingError.message);

  const { error: stageError } = await supabase
    .from("leads")
    .update({ stage: "reservado" as any })
    .eq("id", leadId);

  if (stageError) throw new Error(stageError.message);

  revalidatePath("/admin/pipeline");
  revalidatePath("/admin/reservas");
  revalidatePath("/admin/financeiro");
}

export async function updateLead(leadId: string, fd: FormData) {
  const supabase = await createClient();
  const num = (key: string) => {
    const v = fd.get(key);
    if (v == null || v === "") return null;
    const n = Number(v);
    return Number.isNaN(n) ? null : n;
  };

  const { error } = await supabase
    .from("leads")
    .update({
      destination:       (fd.get("destination") as string) || null,
      travel_date_from:  (fd.get("travel_date_from") as string) || null,
      travel_date_to:    (fd.get("travel_date_to") as string) || null,
      duration_days:     num("duration_days"),
      adults:            num("adults") ?? 1,
      children:          num("children") ?? 0,
      flexible_dates:    fd.get("flexible_dates") === "on",
      budget_min:        num("budget_min"),
      budget_max:        num("budget_max"),
      estimated_value:   num("estimated_value"),
      observations:      (fd.get("observations") as string) || null,
    })
    .eq("id", leadId);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/pipeline");
}

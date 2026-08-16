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

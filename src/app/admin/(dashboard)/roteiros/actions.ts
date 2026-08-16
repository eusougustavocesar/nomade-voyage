"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createItinerary(fd: FormData) {
  const supabase = await createClient();

  const leadId        = fd.get("lead_id") as string;
  const destination    = fd.get("destination") as string;
  const durationDays   = Number(fd.get("duration_days")) || 1;
  const travelStyle    = (fd.get("travel_style") as string) || null;

  const { data: quote, error: quoteError } = await supabase
    .from("quotes")
    .insert({ lead_id: leadId, status: "rascunho", total: 0 })
    .select("id")
    .single();

  if (quoteError) throw new Error(quoteError.message);

  const { data: itinerary, error: itineraryError } = await supabase
    .from("quote_itineraries")
    .insert({
      quote_id: quote.id,
      destination,
      duration_days: durationDays,
      travel_style: travelStyle,
      days: [],
    })
    .select("id")
    .single();

  if (itineraryError) throw new Error(itineraryError.message);

  revalidatePath("/admin/roteiros");
  redirect(`/admin/roteiros/${itinerary.id}`);
}

export async function updateItineraryDays(itineraryId: string, days: unknown) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("quote_itineraries")
    .update({ days: days as never })
    .eq("id", itineraryId);

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/roteiros/${itineraryId}`);
}

"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function markCommissionReceived(bookingItemId: string, bookingId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("booking_items")
    .update({ commission_status: "recebido", commission_received_at: new Date().toISOString() })
    .eq("id", bookingItemId);

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/reservas/${bookingId}`);
  revalidatePath("/admin/financeiro");
}

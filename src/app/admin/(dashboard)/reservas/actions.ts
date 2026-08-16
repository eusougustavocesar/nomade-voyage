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

export async function updateBookingStatus(bookingId: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("bookings")
    .update({ status: status as any, updated_at: new Date().toISOString() })
    .eq("id", bookingId);

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/reservas/${bookingId}`);
  revalidatePath("/admin/reservas");
}

export async function addTraveler(bookingId: string, fd: FormData) {
  const supabase = await createClient();

  const full_name = String(fd.get("full_name") ?? "").trim();
  if (!full_name) throw new Error("Nome é obrigatório");

  const { error } = await supabase.from("travelers").insert({
    booking_id:       bookingId,
    full_name,
    email:            (fd.get("email") as string) || null,
    phone:            (fd.get("phone") as string) || null,
    document_type:    (fd.get("document_type") as string) || "passaporte",
    document_number:  (fd.get("document_number") as string) || null,
    date_of_birth:    (fd.get("date_of_birth") as string) || null,
    nationality:      (fd.get("nationality") as string) || "Brasileira",
    is_lead_traveler: fd.get("is_lead_traveler") === "on",
  });

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/reservas/${bookingId}`);
}

export async function addPayment(bookingId: string, fd: FormData) {
  const supabase = await createClient();

  const amount = Number(fd.get("amount"));
  if (!amount || amount <= 0) throw new Error("Valor inválido");

  const { error } = await supabase.from("payments").insert({
    booking_id:   bookingId,
    amount,
    method:       (fd.get("method") as string) || null,
    installments: Number(fd.get("installments")) || 1,
    status:       (fd.get("status") as any) || "pendente",
    due_date:     (fd.get("due_date") as string) || null,
  });

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/reservas/${bookingId}`);
}

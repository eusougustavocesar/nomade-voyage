"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createContact(fd: FormData) {
  const supabase = await createClient();

  const full_name = String(fd.get("full_name") ?? "").trim();
  if (!full_name) throw new Error("Nome é obrigatório");

  const { data: contact, error } = await supabase
    .from("contacts")
    .insert({
      full_name,
      phone:  String(fd.get("phone") ?? "").trim() || null,
      email:  String(fd.get("email") ?? "").trim() || null,
      source: (fd.get("source") as any) ?? "outro",
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  const { error: leadError } = await supabase.from("leads").insert({
    contact_id: contact.id,
    stage: "novo",
  });

  if (leadError) throw new Error(leadError.message);

  revalidatePath("/admin/contatos");
  revalidatePath("/admin/pipeline");
}

export async function updateContact(id: string, fd: FormData) {
  const supabase = await createClient();

  const full_name = String(fd.get("full_name") ?? "").trim();
  if (!full_name) throw new Error("Nome é obrigatório");

  const { error } = await supabase
    .from("contacts")
    .update({
      full_name,
      phone:  String(fd.get("phone") ?? "").trim() || null,
      email:  String(fd.get("email") ?? "").trim() || null,
      source: (fd.get("source") as any) ?? "outro",
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/contatos");
  revalidatePath(`/admin/contatos/${id}`);
}

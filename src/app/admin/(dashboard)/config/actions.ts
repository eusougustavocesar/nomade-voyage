"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(fd: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado");

  const full_name = String(fd.get("full_name") ?? "").trim();
  if (!full_name) throw new Error("Nome é obrigatório");

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name,
      phone: (fd.get("phone") as string) || null,
    })
    .eq("id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/config");
}

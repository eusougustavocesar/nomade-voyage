"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/slugify";

function toArray(fd: FormData, key: string): string[] {
  return String(fd.get(key) ?? "")
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function packageFields(fd: FormData) {
  const name = String(fd.get("name") ?? "").trim();
  if (!name) throw new Error("Nome é obrigatório");

  const destination = String(fd.get("destination") ?? "").trim();
  if (!destination) throw new Error("Destino é obrigatório");

  return {
    name,
    slug:          String(fd.get("slug") ?? "").trim() || slugify(name),
    destination,
    tagline:       (fd.get("tagline") as string) || null,
    countries:     toArray(fd, "countries"),
    cities:        toArray(fd, "cities"),
    duration_days: Number(fd.get("duration_days")) || 1,
    price_from:    fd.get("price_from") ? Number(fd.get("price_from")) : null,
    photo_url:     (fd.get("photo_url") as string) || null,
    badge:         (fd.get("badge") as string) || null,
    profile_text:  (fd.get("profile_text") as string) || null,
    highlights:    toArray(fd, "highlights"),
    includes:      toArray(fd, "includes"),
    not_includes:  toArray(fd, "not_includes"),
    is_active:     fd.get("is_active") === "on",
    is_popular:    fd.get("is_popular") === "on",
  };
}

export async function createPackage(fd: FormData) {
  const supabase = await createClient();

  const { data: pkg, error } = await supabase
    .from("packages")
    .insert(packageFields(fd))
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/pacotes");
  redirect(`/admin/pacotes/${pkg.id}`);
}

export async function updatePackage(id: string, fd: FormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("packages")
    .update({ ...packageFields(fd), updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/pacotes");
  revalidatePath(`/admin/pacotes/${id}`);
}

export async function togglePackageActive(id: string, current: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("packages")
    .update({ is_active: !current })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/pacotes");
}

"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/slugify";

export async function createPost(fd: FormData) {
  const supabase = await createClient();

  const title = String(fd.get("title") ?? "").trim();
  if (!title) throw new Error("Título é obrigatório");

  const slug = String(fd.get("slug") ?? "").trim() || slugify(title);

  const { data: post, error } = await supabase
    .from("blog_posts")
    .insert({
      title,
      slug,
      excerpt:         (fd.get("excerpt") as string) || null,
      content:         (fd.get("content") as string) || null,
      cover_image_url: (fd.get("cover_image_url") as string) || null,
      status:          (fd.get("status") as any) || "rascunho",
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/blog");
  redirect(`/admin/blog/${post.id}`);
}

export async function updatePost(id: string, fd: FormData) {
  const supabase = await createClient();

  const title = String(fd.get("title") ?? "").trim();
  if (!title) throw new Error("Título é obrigatório");

  const slug   = String(fd.get("slug") ?? "").trim() || slugify(title);
  const status = (fd.get("status") as string) || "rascunho";

  const { data: current } = await supabase
    .from("blog_posts")
    .select("published_at")
    .eq("id", id)
    .single();

  const { error } = await supabase
    .from("blog_posts")
    .update({
      title,
      slug,
      excerpt:         (fd.get("excerpt") as string) || null,
      content:         (fd.get("content") as string) || null,
      cover_image_url: (fd.get("cover_image_url") as string) || null,
      status:          status as any,
      published_at:    status === "publicado" ? current?.published_at ?? new Date().toISOString() : current?.published_at ?? null,
      updated_at:      new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/blog");
  revalidatePath(`/admin/blog/${id}`);
}

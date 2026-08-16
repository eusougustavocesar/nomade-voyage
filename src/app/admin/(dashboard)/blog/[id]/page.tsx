import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import PageHeader from "../../_components/PageHeader";
import PostForm from "../PostForm";
import { updatePost } from "../actions";

export const metadata = { title: "Editar post — Admin" };

export default async function EditarPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, content, cover_image_url, status")
    .eq("id", id)
    .single();

  if (!post) notFound();

  return (
    <div>
      <Link
        href="/admin/blog"
        style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-1)", fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)", textDecoration: "none", marginBottom: "var(--space-4)" }}
      >
        <ArrowLeft size={12} />
        Blog
      </Link>

      <PageHeader title={post.title} />

      <PostForm post={post} action={updatePost.bind(null, id)} />
    </div>
  );
}

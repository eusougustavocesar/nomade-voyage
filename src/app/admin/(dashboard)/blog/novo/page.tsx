import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHeader from "../../_components/PageHeader";
import PostForm from "../PostForm";
import { createPost } from "../actions";

export const metadata = { title: "Novo post — Admin" };

export default function NovoPostPage() {
  return (
    <div>
      <Link
        href="/admin/blog"
        style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-1)", fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)", textDecoration: "none", marginBottom: "var(--space-4)" }}
      >
        <ArrowLeft size={12} />
        Blog
      </Link>

      <PageHeader title="Novo post" />

      <PostForm action={createPost} />
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import { FileText, Plus } from "lucide-react";
import Link from "next/link";
import PageHeader  from "../_components/PageHeader";
import SectionCard from "../_components/SectionCard";
import StatusBadge from "../_components/StatusBadge";

export const metadata = { title: "Blog — Admin" };

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  rascunho:  { label: "Rascunho",  color: "var(--color-accent)",           bg: "var(--color-accent-bg)" },
  publicado: { label: "Publicado", color: "var(--color-success)",          bg: "var(--color-success-bg)" },
  arquivado: { label: "Arquivado", color: "var(--color-muted-foreground)", bg: "var(--color-muted)" },
};

function fmtDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" });
}

const FILTERS = ["todos", "publicado", "rascunho", "arquivado"] as const;
const TH: React.CSSProperties = { padding: "var(--space-3) var(--space-4)", textAlign: "left" };
const TD: React.CSSProperties = { padding: "var(--space-3) var(--space-4)", verticalAlign: "middle" };

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status = "todos" } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("blog_posts")
    .select("id, title, slug, status, published_at, excerpt, created_at")
    .order("created_at", { ascending: false });

  if (status !== "todos") query = query.eq("status", status as any);

  const { data: posts } = await query;

  const NewPostButton = (
    <Link
      href="/admin/blog/novo"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        padding: "var(--space-2) var(--space-4)",
        background: "var(--color-primary)",
        color: "#fff",
        border: "none",
        borderRadius: "var(--radius-md)",
        fontSize: "var(--text-caption)",
        fontWeight: 600,
        textDecoration: "none",
      }}
    >
      <Plus size={13} />
      Novo post
    </Link>
  );

  return (
    <div>
      <PageHeader
        title="Blog"
        sub={`${posts?.length ?? 0} post${(posts?.length ?? 0) !== 1 ? "s" : ""}`}
        action={NewPostButton}
      />

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: "var(--space-2)", marginBottom: "var(--space-6)", flexWrap: "wrap" }}>
        {FILTERS.map((f) => {
          const active = f === status;
          return (
            <a
              key={f}
              href={f === "todos" ? "/admin/blog" : `/admin/blog?status=${f}`}
              style={{
                padding: "4px 12px",
                borderRadius: "var(--radius-full)",
                fontSize: "var(--admin-label-fs)",
                fontWeight: active ? 600 : 400,
                border: `1px solid ${active ? "var(--color-primary)" : "var(--color-border)"}`,
                background: active ? "var(--color-primary)" : "transparent",
                color: active ? "#fff" : "var(--color-muted-foreground)",
                textDecoration: "none",
              }}
            >
              {f === "todos" ? "Todos" : STATUS_MAP[f]?.label ?? f}
            </a>
          );
        })}
      </div>

      <SectionCard style={{ padding: 0, overflow: "hidden" }}>
        {!posts?.length ? (
          <div style={{ padding: "var(--space-16) var(--space-8)", textAlign: "center" }}>
            <FileText size={32} color="var(--color-muted-foreground)" style={{ margin: "0 auto var(--space-4)" }} />
            <p style={{ color: "var(--color-muted-foreground)", fontSize: "var(--text-caption)" }}>
              Nenhum post encontrado. Crie o primeiro!
            </p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                {["Título", "Slug", "Status", "Publicado em", "Criado em"].map((h) => (
                  <th key={h} className="admin-label" style={TH}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map((post, i) => {
                const s = STATUS_MAP[post.status] ?? STATUS_MAP.rascunho;
                return (
                  <tr
                    key={post.id}
                    style={{ borderTop: i > 0 ? "1px solid var(--color-border)" : "none", transition: "background 80ms", cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-muted)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={TD}>
                      <p style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-foreground)", marginBottom: 2 }}>
                        {post.title}
                      </p>
                      {post.excerpt && (
                        <p style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)", maxWidth: 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {post.excerpt}
                        </p>
                      )}
                    </td>
                    <td style={TD}>
                      <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)", fontFamily: "monospace" }}>
                        {post.slug}
                      </span>
                    </td>
                    <td style={TD}>
                      <StatusBadge label={s.label} color={s.color} bg={s.bg} />
                    </td>
                    <td style={TD}>
                      <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>
                        {fmtDate(post.published_at)}
                      </span>
                    </td>
                    <td style={TD}>
                      <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>
                        {fmtDate(post.created_at)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </SectionCard>
    </div>
  );
}

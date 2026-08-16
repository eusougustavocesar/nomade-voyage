import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import { Phone, Mail } from "lucide-react";
import ContactsFilters from "./ContactsFilters";
import NovoContatoModal from "./NovoContatoModal";
import PageHeader  from "../_components/PageHeader";
import StatusBadge from "../_components/StatusBadge";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata = { title: "Contatos — Admin" };

const SOURCE_LABEL: Record<string, string> = {
  site:      "Site",
  whatsapp:  "WhatsApp",
  instagram: "Instagram",
  facebook:  "Facebook",
  indicacao: "Indicação",
  google:    "Google",
  outro:     "Outro",
};

const SOURCE_COLOR: Record<string, { color: string; bg: string }> = {
  whatsapp:  { color: "var(--color-success)",          bg: "var(--color-success-bg)" },
  instagram: { color: "var(--color-accent)",           bg: "var(--color-accent-bg)" },
  site:      { color: "var(--color-primary-light)",    bg: "var(--color-muted)" },
  indicacao: { color: "var(--color-purple)",           bg: "var(--color-purple-bg)" },
  google:    { color: "var(--color-destructive)",      bg: "var(--color-destructive-bg)" },
  facebook:  { color: "var(--color-primary)",          bg: "var(--color-muted)" },
  outro:     { color: "var(--color-muted-foreground)", bg: "var(--color-muted)" },
};

function timeAgo(date: string) {
  const d = Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
  if (d === 0) return "hoje";
  if (d === 1) return "ontem";
  if (d < 30)  return `${d}d`;
  if (d < 365) return `${Math.floor(d / 30)}mes`;
  return `${Math.floor(d / 365)}a`;
}

const TH_STYLE: React.CSSProperties = {
  padding: "var(--space-3) var(--space-4)",
  textAlign: "left",
};

export default async function ContatosPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; source?: string }>;
}) {
  const { q = "", source = "" } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("contacts")
    .select("id, full_name, phone, email, source, created_at, leads(id)")
    .order("created_at", { ascending: false });

  if (source) query = query.eq("source", source as any);

  const { data: contacts } = await query;

  const filtered = q
    ? (contacts ?? []).filter((c) => {
        const term = q.toLowerCase();
        return (
          c.full_name.toLowerCase().includes(term) ||
          c.email?.toLowerCase().includes(term) ||
          c.phone?.includes(term)
        );
      })
    : (contacts ?? []);

  return (
    <div>

      <PageHeader
        title="Contatos"
        sub={`${filtered.length} contato${filtered.length !== 1 ? "s" : ""}`}
        action={<NovoContatoModal />}
      />

      <div style={{ marginBottom: "var(--space-6)" }}>
        <Suspense fallback={null}>
          <ContactsFilters />
        </Suspense>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <p style={{ padding: "var(--space-16) var(--space-8)", textAlign: "center", color: "var(--color-muted-foreground)", fontSize: "var(--text-caption)" }}>
            Nenhum contato encontrado.
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                {["Nome", "Contato", "Origem", "Leads", "Criado"].map((h) => (
                  <th key={h} className="admin-label" style={TH_STYLE}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => {
                const leads    = Array.isArray(c.leads) ? c.leads.length : 0;
                const srcStyle = SOURCE_COLOR[c.source] ?? SOURCE_COLOR.outro;
                return (
                  <tr
                    key={c.id}
                    className="admin-table-row"
                    style={{
                      borderTop: i > 0 ? "1px solid var(--color-border)" : "none",
                      transition: "background 80ms",
                    }}
                  >
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-foreground)" }}>
                        {c.full_name}
                      </span>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                        {c.phone && (
                          <a
                            href={buildWhatsAppLink(c.phone) ?? undefined}
                            target="_blank"
                            rel="noreferrer"
                            style={{ display: "flex", alignItems: "center", gap: "var(--space-1)", fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)", textDecoration: "none" }}
                          >
                            <Phone size={10} />
                            {c.phone}
                          </a>
                        )}
                        {c.email && (
                          <span style={{ display: "flex", alignItems: "center", gap: "var(--space-1)", fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>
                            <Mail size={10} />
                            {c.email}
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <StatusBadge
                        label={SOURCE_LABEL[c.source] ?? c.source}
                        color={srcStyle.color}
                        bg={srcStyle.bg}
                      />
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <span style={{ fontSize: "var(--text-caption)", color: leads > 0 ? "var(--color-primary)" : "var(--color-muted-foreground)", fontWeight: leads > 0 ? 600 : 400 }}>
                        {leads}
                      </span>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>
                        {timeAgo(c.created_at)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

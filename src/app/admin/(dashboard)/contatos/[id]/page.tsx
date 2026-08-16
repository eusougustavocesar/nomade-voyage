import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import PageHeader  from "../../_components/PageHeader";
import SectionCard from "../../_components/SectionCard";
import StatusBadge from "../../_components/StatusBadge";
import { fmtCurrency, fmtDate } from "@/lib/format";
import { updateContact } from "../actions";
import { SOURCE_LABEL } from "../page";

export const metadata = { title: "Contato — Admin" };

const STAGE_LABEL: Record<string, string> = {
  novo: "Novo", qualificado: "Qualificado", proposta_enviada: "Proposta",
  negociacao: "Negociação", reservado: "Reservado", perdido: "Perdido",
};

const INPUT_STYLE: React.CSSProperties = {
  width: "100%", padding: "var(--space-2) var(--space-3)",
  background: "var(--color-background)", border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)", fontSize: 12, color: "var(--color-foreground)",
  outline: "none", boxSizing: "border-box",
};

export default async function ContatoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: contact }, { data: leads }, { data: bookings }] = await Promise.all([
    supabase.from("contacts").select("id, full_name, phone, email, source, created_at").eq("id", id).single(),
    supabase.from("leads").select("id, stage, destination, created_at").eq("contact_id", id).order("created_at", { ascending: false }),
    supabase.from("bookings").select("id, reference, status, travel_date_from, total_price").eq("contact_id", id).order("created_at", { ascending: false }),
  ]);

  if (!contact) notFound();

  return (
    <div style={{ maxWidth: 640 }}>
      <Link
        href="/admin/contatos"
        style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-1)", fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)", textDecoration: "none", marginBottom: "var(--space-4)" }}
      >
        <ArrowLeft size={12} />
        Contatos
      </Link>

      <PageHeader title={contact.full_name} />

      <SectionCard title="Dados" style={{ marginBottom: "var(--gap-sm)" }}>
        <form action={updateContact.bind(null, id)} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <Field label="Nome completo *" name="full_name" required defaultValue={contact.full_name} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
            <Field label="Telefone" name="phone" defaultValue={contact.phone ?? ""} />
            <Field label="Email" name="email" type="email" defaultValue={contact.email ?? ""} />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "var(--color-muted-foreground)", display: "block", marginBottom: "var(--space-2)" }}>
              Origem
            </label>
            <select name="source" defaultValue={contact.source} style={INPUT_STYLE}>
              {Object.entries(SOURCE_LABEL).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              style={{
                padding: "var(--space-2) var(--space-4)", background: "var(--color-primary)",
                color: "#fff", border: "none", borderRadius: "var(--radius-md)",
                fontSize: 12, fontWeight: 600, cursor: "pointer",
              }}
            >
              Salvar
            </button>
          </div>
        </form>
      </SectionCard>

      <SectionCard title="Leads" style={{ marginBottom: "var(--gap-sm)" }}>
        {!leads?.length ? (
          <p style={{ fontSize: 12, color: "var(--color-muted-foreground)" }}>Nenhum lead registrado.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {leads.map((l) => (
              <div key={l.id} className="flex items-center justify-between">
                <span style={{ fontSize: 12, color: "var(--color-foreground)" }}>{l.destination ?? "—"}</span>
                <StatusBadge label={STAGE_LABEL[l.stage] ?? l.stage} color="var(--color-primary-light)" bg="var(--color-muted)" />
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title="Reservas">
        {!bookings?.length ? (
          <p style={{ fontSize: 12, color: "var(--color-muted-foreground)" }}>Nenhuma reserva registrada.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {bookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between">
                <Link href={`/admin/reservas/${b.id}`} style={{ fontSize: 12, fontWeight: 600, color: "var(--color-foreground)", fontFamily: "monospace", textDecoration: "none" }}>
                  {b.reference ?? "—"}
                </Link>
                <span style={{ fontSize: 12, color: "var(--color-muted-foreground)" }}>
                  {fmtDate(b.travel_date_from)} · {fmtCurrency(b.total_price)}
                </span>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}

function Field({
  label, name, defaultValue, required, type = "text",
}: {
  label: string; name: string; defaultValue?: string; required?: boolean; type?: string;
}) {
  return (
    <div>
      <label style={{ fontSize: 11, fontWeight: 600, color: "var(--color-muted-foreground)", display: "block", marginBottom: "var(--space-2)" }}>
        {label}
      </label>
      <input name={name} required={required} defaultValue={defaultValue} type={type} style={INPUT_STYLE} />
    </div>
  );
}

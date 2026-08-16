"use client";

import { MapPin } from "lucide-react";
import { STAGES, type Lead } from "./PipelineBoard";
import StatusBadge from "../_components/StatusBadge";

const STAGE_LABEL = Object.fromEntries(STAGES.map((s) => [s.key, s.label]));
const STAGE_COLOR = Object.fromEntries(STAGES.map((s) => [s.key, s.color]));

function fmt(v: number | null) {
  if (!v) return "—";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);
}

function fmtDate(date: string | null) {
  if (!date) return "—";
  return new Date(date + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

function daysAgo(date: string) {
  const d = Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
  if (d === 0) return "hoje";
  if (d === 1) return "ontem";
  return `${d}d`;
}

const TH_STYLE: React.CSSProperties = {
  padding: "var(--space-3) var(--space-4)",
  textAlign: "left",
};

export default function PipelineTable({
  leads,
  onOpenLead,
}: {
  leads: Lead[];
  onOpenLead: (lead: Lead) => void;
}) {
  return (
    <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
      {leads.length === 0 ? (
        <p style={{ padding: "var(--space-16) var(--space-8)", textAlign: "center", color: "var(--color-muted-foreground)", fontSize: "var(--text-caption)" }}>
          Nenhum lead encontrado.
        </p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              {["Nome", "Destino", "Estágio", "Grupo", "Valor estimado", "Partida", "Criado"].map((h) => (
                <th key={h} className="admin-label" style={TH_STYLE}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, i) => (
              <tr
                key={lead.id}
                onClick={() => onOpenLead(lead)}
                style={{
                  borderTop: i > 0 ? "1px solid var(--color-border)" : "none",
                  transition: "background 80ms",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-muted)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                  <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-foreground)" }}>
                    {lead.contacts?.full_name ?? "—"}
                  </span>
                </td>
                <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                  {lead.destination ? (
                    <span style={{ display: "flex", alignItems: "center", gap: "var(--space-1)", fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>
                      <MapPin size={10} />
                      {lead.destination}
                    </span>
                  ) : (
                    <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>—</span>
                  )}
                </td>
                <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                  <StatusBadge label={STAGE_LABEL[lead.stage] ?? lead.stage} color={STAGE_COLOR[lead.stage]} bg="var(--color-muted)" />
                </td>
                <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                  <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>
                    {lead.adults || lead.children ? (lead.adults ?? 0) + (lead.children ?? 0) : "—"}
                  </span>
                </td>
                <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                  <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-primary)" }}>
                    {fmt(lead.estimated_value)}
                  </span>
                </td>
                <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                  <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>
                    {fmtDate(lead.travel_date_from)}
                  </span>
                </td>
                <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                  <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>
                    {daysAgo(lead.created_at)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

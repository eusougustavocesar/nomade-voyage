import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { MapPin, Calendar, Users } from "lucide-react";
import PageHeader  from "../_components/PageHeader";
import SectionCard from "../_components/SectionCard";
import StatusBadge from "../_components/StatusBadge";
import { STATUS_MAP } from "./status";

export const metadata = { title: "Reservas — Admin" };

const FILTERS = ["todas", "confirmado", "pago", "em_viagem", "concluido", "cancelado"] as const;

function fmt(v: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);
}

function fmtDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" });
}

const TH: React.CSSProperties = { padding: "var(--space-3) var(--space-4)", textAlign: "left" };
const TD: React.CSSProperties = { padding: "var(--space-3) var(--space-4)", verticalAlign: "middle" };

export default async function ReservasPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status = "todas" } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("bookings")
    .select("id, reference, status, travel_date_from, travel_date_to, group_size, total_price, amount_paid, contacts(full_name)")
    .order("travel_date_from", { ascending: true });

  if (status !== "todas") query = query.eq("status", status as any);

  const { data: bookings } = await query;

  return (
    <div>
      <PageHeader
        title="Reservas"
        sub={`${bookings?.length ?? 0} resultado${(bookings?.length ?? 0) !== 1 ? "s" : ""}`}
      />

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: "var(--space-2)", marginBottom: "var(--space-6)", flexWrap: "wrap" }}>
        {FILTERS.map((f) => {
          const active = f === status;
          return (
            <a
              key={f}
              href={f === "todas" ? "/admin/reservas" : `/admin/reservas?status=${f}`}
              style={{
                padding: "4px 12px",
                borderRadius: "var(--radius-full)",
                fontSize: "var(--admin-label-fs)",
                fontWeight: active ? 600 : 400,
                border: `1px solid ${active ? "var(--color-primary)" : "var(--color-border)"}`,
                background: active ? "var(--color-primary)" : "transparent",
                color: active ? "#fff" : "var(--color-muted-foreground)",
                textDecoration: "none",
                textTransform: "capitalize",
              }}
            >
              {f === "todas" ? "Todas" : STATUS_MAP[f]?.label ?? f}
            </a>
          );
        })}
      </div>

      <SectionCard style={{ padding: 0, overflow: "hidden" }}>
        {!bookings?.length ? (
          <p style={{ padding: "var(--space-16) var(--space-8)", textAlign: "center", color: "var(--color-muted-foreground)", fontSize: "var(--text-caption)" }}>
            Nenhuma reserva encontrada.
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                {["Referência", "Cliente", "Partida", "Grupo", "Total", "Pago", "Status"].map((h) => (
                  <th key={h} className="admin-label" style={TH}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => {
                const s = STATUS_MAP[b.status] ?? STATUS_MAP.rascunho;
                const contact = (b.contacts as { full_name: string } | null)?.full_name ?? "—";
                return (
                  <tr
                    key={b.id}
                    className="admin-table-row"
                    style={{ borderTop: i > 0 ? "1px solid var(--color-border)" : "none", transition: "background 80ms" }}
                  >
                    <td style={TD}>
                      <Link
                        href={`/admin/reservas/${b.id}`}
                        style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-foreground)", fontFamily: "monospace", textDecoration: "none" }}
                      >
                        {b.reference ?? "—"}
                      </Link>
                    </td>
                    <td style={TD}>
                      <span style={{ fontSize: "var(--text-caption)", color: "var(--color-foreground)", fontWeight: 500 }}>
                        {contact}
                      </span>
                    </td>
                    <td style={TD}>
                      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                        <Calendar size={11} color="var(--color-primary-light)" />
                        <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>
                          {fmtDate(b.travel_date_from)}
                        </span>
                      </div>
                    </td>
                    <td style={TD}>
                      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                        <Users size={11} color="var(--color-muted-foreground)" />
                        <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>
                          {b.group_size}
                        </span>
                      </div>
                    </td>
                    <td style={TD}>
                      <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-foreground)" }}>
                        {fmt(b.total_price)}
                      </span>
                    </td>
                    <td style={TD}>
                      <span style={{ fontSize: "var(--admin-label-fs)", color: b.amount_paid >= b.total_price ? "var(--color-success)" : "var(--color-muted-foreground)" }}>
                        {fmt(b.amount_paid)}
                      </span>
                    </td>
                    <td style={TD}>
                      <StatusBadge label={s.label} color={s.color} bg={s.bg} />
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

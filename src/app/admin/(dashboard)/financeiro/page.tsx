import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { DollarSign, TrendingUp, Clock, AlertTriangle } from "lucide-react";
import KpiCard     from "../_components/KpiCard";
import SectionCard from "../_components/SectionCard";
import PageHeader  from "../_components/PageHeader";
import StatusBadge from "../_components/StatusBadge";
import { markCommissionReceived } from "../reservas/actions";
import { PAYMENT_STATUS_MAP } from "./status";
import { fmtCurrency, fmtDate as fmtDateBase } from "@/lib/format";

export const metadata = { title: "Financeiro — Admin" };

const fmtDate = (d: string | null) => fmtDateBase(d, "compact");

export default async function FinanceiroPage() {
  const supabase = await createClient();

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  const todayStr = new Date().toISOString().split("T")[0];

  const [
    { data: monthBookings },
    { data: receivedThisMonth },
    { data: pendingCommissions },
    { data: pendingPayments },
  ] = await Promise.all([
    supabase.from("bookings")
      .select("total_price")
      .gte("created_at", startOfMonth.toISOString())
      .not("status", "in", "(rascunho,cancelado,reembolsado)"),
    supabase.from("booking_items")
      .select("total_price, commission_rate")
      .eq("commission_status", "recebido")
      .gte("commission_received_at", startOfMonth.toISOString()),
    supabase.from("booking_items")
      .select("id, total_price, commission_rate, description, bookings(id, reference, contacts(full_name))")
      .eq("commission_status", "pendente")
      .gt("commission_rate", 0)
      .order("total_price", { ascending: false }),
    supabase.from("payments")
      .select("id, amount, due_date, status, bookings(reference, contacts(full_name))")
      .in("status", ["pendente", "atrasado"])
      .order("due_date"),
  ]);

  const monthRevenue     = (monthBookings ?? []).reduce((s, b) => s + (b.total_price ?? 0), 0);
  const monthCommission  = (receivedThisMonth ?? []).reduce((s, i) => s + (i.total_price ?? 0) * i.commission_rate, 0);
  const pendingCommTotal = (pendingCommissions ?? []).reduce((s, i) => s + (i.total_price ?? 0) * i.commission_rate, 0);
  const overdueCount     = (pendingPayments ?? []).filter((p) => p.status === "atrasado" || (p.due_date && p.due_date < todayStr)).length;

  return (
    <div>
      <PageHeader title="Financeiro" sub="Comissões, pagamentos e faturamento" />

      <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: "var(--gap-sm)", marginBottom: "var(--gap-md)" }}>
        <KpiCard label="Faturamento do mês"  value={fmtCurrency(monthRevenue)}     sub="reservas fechadas"     icon={DollarSign}    accent="var(--color-success)" />
        <KpiCard label="Comissão do mês"     value={fmtCurrency(monthCommission)} sub="já recebida"           icon={TrendingUp}    accent="var(--color-primary-light)" />
        <KpiCard label="Comissão pendente"   value={fmtCurrency(pendingCommTotal)} sub="a receber da operadora" icon={Clock}         accent="var(--color-accent)" />
        <KpiCard label="Pagamentos em atraso" value={String(overdueCount)} sub="de clientes"           icon={AlertTriangle} accent="var(--color-destructive)" />
      </div>

      <SectionCard title="Comissões a receber" style={{ marginBottom: "var(--gap-sm)", padding: 0, overflow: "hidden" }}>
        {!pendingCommissions?.length ? (
          <p style={{ padding: "var(--space-8)", textAlign: "center", color: "var(--color-muted-foreground)", fontSize: "var(--text-caption)" }}>
            Nenhuma comissão pendente.
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                {["Reserva", "Cliente", "Item", "Comissão", ""].map((h) => (
                  <th key={h} className="admin-label" style={{ padding: "var(--space-3) var(--space-4)", textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pendingCommissions.map((item: any, i) => {
                const b = item.bookings;
                return (
                  <tr key={item.id} style={{ borderTop: i > 0 ? "1px solid var(--color-border)" : "none" }}>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <Link href={`/admin/reservas/${b?.id}`} style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-foreground)", fontFamily: "monospace", textDecoration: "none" }}>
                        {b?.reference ?? "—"}
                      </Link>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>{b?.contacts?.full_name ?? "—"}</span>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>{item.description}</span>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-foreground)" }}>
                        {fmtCurrency(item.total_price * item.commission_rate)}
                      </span>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <form action={markCommissionReceived.bind(null, item.id, b?.id)}>
                        <button
                          type="submit"
                          style={{
                            padding: "2px 8px", fontSize: 10, fontWeight: 600, cursor: "pointer",
                            color: "var(--color-primary)", background: "var(--color-accent-bg)",
                            border: "none", borderRadius: "var(--radius-full)",
                          }}
                        >
                          Marcar recebida
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </SectionCard>

      <SectionCard title="Pagamentos pendentes/atrasados" style={{ padding: 0, overflow: "hidden" }}>
        {!pendingPayments?.length ? (
          <p style={{ padding: "var(--space-8)", textAlign: "center", color: "var(--color-muted-foreground)", fontSize: "var(--text-caption)" }}>
            Nenhum pagamento pendente.
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                {["Reserva", "Cliente", "Valor", "Vencimento", "Status"].map((h) => (
                  <th key={h} className="admin-label" style={{ padding: "var(--space-3) var(--space-4)", textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pendingPayments.map((p: any, i) => {
                const st = PAYMENT_STATUS_MAP[p.status] ?? PAYMENT_STATUS_MAP.pendente;
                const b  = p.bookings;
                return (
                  <tr key={p.id} style={{ borderTop: i > 0 ? "1px solid var(--color-border)" : "none" }}>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <Link href={`/admin/reservas/${b?.id ?? ""}`} style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-foreground)", fontFamily: "monospace", textDecoration: "none" }}>
                        {b?.reference ?? "—"}
                      </Link>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>{b?.contacts?.full_name ?? "—"}</span>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-foreground)" }}>{fmtCurrency(p.amount)}</span>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>{fmtDate(p.due_date)}</span>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <StatusBadge label={st.label} color={st.color} bg={st.bg} />
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

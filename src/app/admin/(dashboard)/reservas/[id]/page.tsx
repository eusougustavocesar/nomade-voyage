import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Users, MessageCircle, Mail } from "lucide-react";
import PageHeader  from "../../_components/PageHeader";
import SectionCard from "../../_components/SectionCard";
import StatusBadge from "../../_components/StatusBadge";
import { STATUS_MAP } from "../status";
import { PAYMENT_STATUS_MAP } from "../../financeiro/status";
import { markCommissionReceived } from "../actions";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { fmtCurrency, fmtDate } from "@/lib/format";

export const metadata = { title: "Reserva — Admin" };

const ITEM_STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  pendente:   { label: "Pendente",   color: "var(--color-muted-foreground)", bg: "var(--color-muted)" },
  confirmado: { label: "Confirmado", color: "var(--color-success)",          bg: "var(--color-success-bg)" },
  cancelado:  { label: "Cancelado",  color: "var(--color-destructive)",      bg: "var(--color-destructive-bg)" },
};

const PRODUCT_TYPE_LABEL: Record<string, string> = {
  pacote_completo: "Pacote completo",
  pacote_personalizado: "Pacote personalizado",
  voo: "Voo",
  hotel: "Hotel",
  transfer: "Transfer",
  seguro: "Seguro",
  excursao: "Excursão",
  roteiro: "Roteiro",
  consultoria: "Consultoria",
};

function fmtDateTime(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("pt-BR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

function renderItemDetail(item: any): string | null {
  switch (item.product_type) {
    case "voo": {
      const f = item.booking_flights;
      if (!f) return null;
      return [f.airline, f.flight_number, f.pnr && `PNR ${f.pnr}`, `${f.departure_airport} → ${f.arrival_airport}`].filter(Boolean).join(" · ");
    }
    case "hotel": {
      const h = item.booking_hotels;
      if (!h) return null;
      return [h.hotel_name, `${h.city}`, `${fmtDate(h.check_in)} — ${fmtDate(h.check_out)}`].filter(Boolean).join(" · ");
    }
    case "transfer": {
      const t = item.booking_transfers;
      if (!t) return null;
      return [`${t.pickup_location} → ${t.dropoff_location}`, fmtDateTime(t.pickup_at)].filter(Boolean).join(" · ");
    }
    case "seguro": {
      const s = item.booking_insurance;
      if (!s) return null;
      return [s.provider, s.plan_name, s.policy_number && `apólice ${s.policy_number}`].filter(Boolean).join(" · ");
    }
    case "excursao": {
      const t = item.booking_tours;
      if (!t) return null;
      return [t.tour_name, t.city, fmtDateTime(t.starts_at)].filter(Boolean).join(" · ");
    }
    default:
      return null;
  }
}

export default async function ReservaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: booking } = await supabase
    .from("bookings")
    .select("id, reference, status, travel_date_from, travel_date_to, group_size, total_price, amount_paid, notes, contacts(full_name, phone, email), leads(destination)")
    .eq("id", id)
    .single();

  if (!booking) notFound();

  const [{ data: travelers }, { data: items }, { data: payments }] = await Promise.all([
    supabase
      .from("travelers")
      .select("id, full_name, email, phone, document_type, document_number, document_expiry, visa_expiry, nationality, date_of_birth, is_lead_traveler, notes")
      .eq("booking_id", id)
      .order("is_lead_traveler", { ascending: false }),
    supabase
      .from("booking_items")
      .select("id, product_type, description, quantity, unit_price, total_price, status, commission_rate, commission_status, commission_received_at, booking_flights(*), booking_hotels(*), booking_transfers(*), booking_insurance(*), booking_tours(*)")
      .eq("booking_id", id)
      .order("sort_order"),
    supabase
      .from("payments")
      .select("id, amount, method, installments, status, due_date, paid_at, notes")
      .eq("booking_id", id)
      .order("due_date"),
  ]);

  const contact = booking.contacts as { full_name: string; phone: string | null; email: string | null } | null;
  const lead     = booking.leads as { destination: string } | null;
  const s = STATUS_MAP[booking.status] ?? STATUS_MAP.rascunho;
  const waLink = buildWhatsAppLink(contact?.phone);

  return (
    <div>
      <Link
        href="/admin/reservas"
        style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-1)", fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)", textDecoration: "none", marginBottom: "var(--space-4)" }}
      >
        <ArrowLeft size={12} />
        Reservas
      </Link>

      <div className="flex items-center justify-between" style={{ marginBottom: "var(--gap-md)" }}>
        <PageHeader
          title={booking.reference ?? "Reserva"}
          sub={contact?.full_name ?? "—"}
        />
        <StatusBadge label={s.label} color={s.color} bg={s.bg} />
      </div>

      <SectionCard title="Detalhes da reserva" style={{ marginBottom: "var(--gap-sm)" }}>
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: "var(--gap-sm)" }}>
          <Detail label="Destino" value={lead?.destination ?? "—"} />
          <Detail label="Período" value={`${fmtDate(booking.travel_date_from)} — ${fmtDate(booking.travel_date_to)}`} icon={<Calendar size={11} />} />
          <Detail label="Grupo" value={`${booking.group_size} viajante${booking.group_size !== 1 ? "s" : ""}`} icon={<Users size={11} />} />
          <Detail label="Total / Pago" value={`${fmtCurrency(booking.total_price)} / ${fmtCurrency(booking.amount_paid)}`} />
        </div>
        {contact && (contact.phone || contact.email) && (
          <div className="flex items-center" style={{ gap: "var(--space-4)", marginTop: "var(--space-4)", paddingTop: "var(--space-4)", borderTop: "1px solid var(--color-border)" }}>
            {waLink && (
              <a href={waLink} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "var(--space-1)", fontSize: 12, color: "var(--color-success)", textDecoration: "none" }}>
                <MessageCircle size={12} />
                {contact.phone}
              </a>
            )}
            {contact.email && (
              <span style={{ display: "flex", alignItems: "center", gap: "var(--space-1)", fontSize: 12, color: "var(--color-muted-foreground)" }}>
                <Mail size={12} />
                {contact.email}
              </span>
            )}
          </div>
        )}
        {booking.notes && (
          <p style={{ marginTop: "var(--space-4)", paddingTop: "var(--space-4)", borderTop: "1px solid var(--color-border)", fontSize: 12, color: "var(--color-muted-foreground)" }}>
            {booking.notes}
          </p>
        )}
      </SectionCard>

      <SectionCard title="Viajantes" style={{ marginBottom: "var(--gap-sm)", padding: 0, overflow: "hidden" }}>
        {!travelers?.length ? (
          <p style={{ padding: "var(--space-8)", textAlign: "center", color: "var(--color-muted-foreground)", fontSize: "var(--text-caption)" }}>
            Nenhum viajante cadastrado.
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                {["Nome", "Documento", "Nascimento", "Nacionalidade", "Contato"].map((h) => (
                  <th key={h} className="admin-label" style={{ padding: "var(--space-3) var(--space-4)", textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {travelers.map((t, i) => {
                const twaLink = buildWhatsAppLink(t.phone);
                return (
                  <tr key={t.id} style={{ borderTop: i > 0 ? "1px solid var(--color-border)" : "none" }}>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
                        <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-foreground)" }}>{t.full_name}</span>
                        {t.is_lead_traveler && <StatusBadge label="Titular" color="var(--color-primary)" bg="var(--color-accent-bg)" />}
                      </div>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>
                        {t.document_number ? `${t.document_type} ${t.document_number}` : "—"}
                        {t.document_expiry && ` · val. ${fmtDate(t.document_expiry)}`}
                        {t.visa_expiry && ` · visto val. ${fmtDate(t.visa_expiry)}`}
                      </span>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>{fmtDate(t.date_of_birth)}</span>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>{t.nationality ?? "—"}</span>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      {twaLink ? (
                        <a href={twaLink} target="_blank" rel="noreferrer" style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-success)", textDecoration: "none" }}>
                          {t.phone}
                        </a>
                      ) : (
                        <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>{t.email ?? "—"}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </SectionCard>

      <SectionCard title="Itens da reserva" style={{ padding: 0, overflow: "hidden" }}>
        {!items?.length ? (
          <p style={{ padding: "var(--space-8)", textAlign: "center", color: "var(--color-muted-foreground)", fontSize: "var(--text-caption)" }}>
            Nenhum item cadastrado.
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                {["Tipo", "Descrição", "Qtd", "Valor unit.", "Total", "Status", "Comissão"].map((h) => (
                  <th key={h} className="admin-label" style={{ padding: "var(--space-3) var(--space-4)", textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item: any, i: number) => {
                const st = ITEM_STATUS_MAP[item.status] ?? ITEM_STATUS_MAP.pendente;
                const detail = renderItemDetail(item);
                return (
                  <tr key={item.id} style={{ borderTop: i > 0 ? "1px solid var(--color-border)" : "none" }}>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <span style={{ fontSize: "var(--text-caption)", color: "var(--color-foreground)" }}>
                        {PRODUCT_TYPE_LABEL[item.product_type] ?? item.product_type}
                      </span>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <div style={{ fontSize: "var(--text-caption)", color: "var(--color-foreground)" }}>{item.description}</div>
                      {detail && (
                        <div style={{ fontSize: 10, color: "var(--color-muted-foreground)", marginTop: 2 }}>{detail}</div>
                      )}
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>{item.quantity}</span>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>{fmtCurrency(item.unit_price)}</span>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-foreground)" }}>{fmtCurrency(item.total_price)}</span>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <StatusBadge label={st.label} color={st.color} bg={st.bg} />
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      {item.commission_rate > 0 ? (
                        <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
                          <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>
                            {fmtCurrency(item.total_price * item.commission_rate)}
                          </span>
                          {item.commission_status === "recebido" ? (
                            <StatusBadge label="Recebida" color="var(--color-success)" bg="var(--color-success-bg)" />
                          ) : (
                            <form action={markCommissionReceived.bind(null, item.id, booking.id)}>
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
                          )}
                        </div>
                      ) : (
                        <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </SectionCard>

      <SectionCard title="Pagamentos" style={{ marginTop: "var(--gap-sm)", padding: 0, overflow: "hidden" }}>
        {!payments?.length ? (
          <p style={{ padding: "var(--space-8)", textAlign: "center", color: "var(--color-muted-foreground)", fontSize: "var(--text-caption)" }}>
            Nenhum pagamento registrado.
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                {["Valor", "Método", "Parcelas", "Vencimento", "Pago em", "Status"].map((h) => (
                  <th key={h} className="admin-label" style={{ padding: "var(--space-3) var(--space-4)", textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.map((p, i) => {
                const st = PAYMENT_STATUS_MAP[p.status] ?? PAYMENT_STATUS_MAP.pendente;
                return (
                  <tr key={p.id} style={{ borderTop: i > 0 ? "1px solid var(--color-border)" : "none" }}>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-foreground)" }}>{fmtCurrency(p.amount)}</span>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>{p.method ?? "—"}</span>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>{p.installments}x</span>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>{fmtDate(p.due_date)}</span>
                    </td>
                    <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                      <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>{p.paid_at ? fmtDateTime(p.paid_at) : "—"}</span>
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

function Detail({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div>
      <p className="admin-label" style={{ marginBottom: "var(--space-1)" }}>{label}</p>
      <div className="flex items-center" style={{ gap: "var(--space-1)" }}>
        {icon}
        <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-foreground)" }}>{value}</span>
      </div>
    </div>
  );
}

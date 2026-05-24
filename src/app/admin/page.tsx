import { createClient } from "@/lib/supabase/server";
import {
  Users, TrendingUp, CalendarCheck, AlertCircle,
  MapPin, Clock, MessageCircle, FileText, CheckCircle2,
} from "lucide-react";
import KpiCard     from "./_components/KpiCard";
import SectionCard from "./_components/SectionCard";
import PageHeader  from "./_components/PageHeader";

// ── Helpers ──────────────────────────────────────────────────

const STAGE_LABELS: Record<string, string> = {
  novo:             "Novo",
  qualificado:      "Qualificado",
  proposta_enviada: "Proposta",
  negociacao:       "Negociação",
  reservado:        "Reservado",
};

const STAGE_COLOR: Record<string, string> = {
  novo:             "var(--color-muted-foreground)",
  qualificado:      "var(--color-primary-light)",
  proposta_enviada: "var(--color-accent)",
  negociacao:       "var(--color-purple)",
  reservado:        "var(--color-success)",
};

const ACTIVITY_ICON: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  mensagem:      MessageCircle,
  whatsapp:      MessageCircle,
  email:         FileText,
  nota:          FileText,
  proposta:      FileText,
  mudanca_stage: TrendingUp,
  reserva:       CheckCircle2,
  ligacao:       Clock,
};

const PIPELINE_STAGES = ["novo", "qualificado", "proposta_enviada", "negociacao", "reservado"] as const;

function fmt(value: number | null) {
  if (!value) return "—";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);
}

function timeAgo(date: string) {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diff < 60)    return "agora";
  if (diff < 3600)  return `${Math.floor(diff / 60)}min`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}


// ── Page ─────────────────────────────────────────────────────

export default async function AdminDashboard() {
  const supabase = await createClient();

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [
    { data: allLeads },
    { count: newThisMonth },
    { data: recentActivities },
    { data: upcomingBookings },
  ] = await Promise.all([
    supabase.from("leads").select("stage, estimated_value"),
    supabase.from("leads").select("*", { count: "exact", head: true })
      .gte("created_at", startOfMonth.toISOString()),
    supabase.from("lead_activities")
      .select("id, type, content, created_at, leads(contacts(full_name))")
      .order("created_at", { ascending: false })
      .limit(8),
    supabase.from("bookings")
      .select("id, reference, travel_date_from, group_size, total_price, contacts(full_name)")
      .gte("travel_date_from", new Date().toISOString().split("T")[0])
      .order("travel_date_from", { ascending: true })
      .limit(5),
  ]);

  const activeLeads   = allLeads?.filter((l) => !["perdido", "concluido"].includes(l.stage)) ?? [];
  const pipelineValue = activeLeads.reduce((s, l) => s + (l.estimated_value ?? 0), 0);
  const stageCounts   = (allLeads ?? []).reduce<Record<string, number>>((acc, l) => {
    acc[l.stage] = (acc[l.stage] ?? 0) + 1;
    return acc;
  }, {});
  const totalLeads = allLeads?.length ?? 0;
  const wonLeads   = (stageCounts["reservado"] ?? 0) + (stageCounts["concluido"] ?? 0);
  const convRate   = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;
  const maxInStage = Math.max(...PIPELINE_STAGES.map((s) => stageCounts[s] ?? 0), 1);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        sub={new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: "var(--gap-sm)", marginBottom: "var(--gap-md)" }}>
        <KpiCard label="Leads ativos"      value={String(activeLeads.length)} sub="não perdidos"       icon={Users} />
        <KpiCard label="Valor no pipeline" value={fmt(pipelineValue)}         sub="leads ativos"       icon={TrendingUp}  accent="var(--color-success)" />
        <KpiCard label="Novos este mês"    value={String(newThisMonth ?? 0)}  sub={new Date().toLocaleString("pt-BR", { month: "long" })} icon={AlertCircle} accent="var(--color-accent)" />
        <KpiCard label="Taxa de conversão" value={`${convRate}%`}             sub="leads → reservado"  icon={CalendarCheck} accent="var(--color-primary-light)" />
      </div>

      {/* Pipeline + Atividades */}
      <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: "var(--gap-sm)", marginBottom: "var(--gap-sm)" }}>

        <SectionCard title="Pipeline por stage" className="lg:col-span-2">
          {totalLeads === 0 ? (
            <p style={{ textAlign: "center", padding: "var(--space-8) 0", color: "var(--color-muted-foreground)", fontSize: "var(--text-caption)" }}>
              Nenhum lead cadastrado ainda.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {PIPELINE_STAGES.map((stage) => {
                const count = stageCounts[stage] ?? 0;
                const pct   = Math.round((count / maxInStage) * 100);
                return (
                  <div key={stage} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                    <span style={{ width: 96, fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)", flexShrink: 0 }}>
                      {STAGE_LABELS[stage]}
                    </span>
                    <div style={{ flex: 1, height: 6, background: "var(--color-muted)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: STAGE_COLOR[stage], borderRadius: "var(--radius-full)", transition: "width 500ms ease" }} />
                    </div>
                    <span style={{ width: 18, fontSize: "var(--admin-label-fs)", fontWeight: 600, color: "var(--color-foreground)", textAlign: "right", flexShrink: 0 }}>
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </SectionCard>

        <SectionCard title="Atividade recente" style={{ flex: 1 }}>
          {!recentActivities?.length ? (
            <p style={{ flex: 1, textAlign: "center", padding: "var(--space-6) 0", color: "var(--color-muted-foreground)", fontSize: "var(--text-caption)" }}>
              Sem atividades ainda.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {recentActivities.map((a) => {
                const Icon    = ACTIVITY_ICON[a.type] ?? MessageCircle;
                const contact = (a.leads as { contacts: { full_name: string } | null } | null)?.contacts?.full_name ?? "—";
                return (
                  <div key={a.id} style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)" }}>
                    <div style={{ width: "var(--admin-icon-box)", height: "var(--admin-icon-box)", borderRadius: "var(--radius-full)", background: "var(--color-muted)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={11} color="var(--color-primary-light)" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-foreground)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {contact}
                      </p>
                      <p style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {a.content}
                      </p>
                    </div>
                    <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)", flexShrink: 0 }}>
                      {timeAgo(a.created_at)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </SectionCard>
      </div>

      {/* Próximas partidas */}
      {(upcomingBookings?.length ?? 0) > 0 && (
        <SectionCard title="Próximas partidas">
          <div>
            {upcomingBookings!.map((b, i) => {
              const contact = (b.contacts as { full_name: string } | null)?.full_name ?? "—";
              const date    = new Date(b.travel_date_from!).toLocaleDateString("pt-BR", { day: "numeric", month: "short" });
              return (
                <div
                  key={b.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "var(--space-3) 0",
                    borderTop: i > 0 ? "1px solid var(--color-border)" : "none",
                    gap: "var(--space-4)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                    <MapPin size={12} color="var(--color-primary-light)" />
                    <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-foreground)" }}>{contact}</span>
                    <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>
                      {b.group_size} viajante{(b.group_size ?? 1) > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                    <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>{b.reference}</span>
                    <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-primary)" }}>{date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}
    </div>
  );
}

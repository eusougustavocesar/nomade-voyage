import { createClient } from "@/lib/supabase/server";
import { MapPin, Clock, CheckCircle2, XCircle } from "lucide-react";
import PageHeader  from "../_components/PageHeader";
import StatusBadge from "../_components/StatusBadge";
import { fmtCurrency as fmt } from "@/lib/format";

export const metadata = { title: "Pacotes — Admin" };

export default async function PacotesPage() {
  const supabase = await createClient();

  const { data: pacotes } = await supabase
    .from("packages")
    .select("id, name, destination, countries, cities, duration_days, price_from, is_active, is_popular, photo_url, badge")
    .order("is_active", { ascending: false })
    .order("name");

  const ativos   = pacotes?.filter((p) => p.is_active).length ?? 0;
  const inativos = (pacotes?.length ?? 0) - ativos;

  return (
    <div>
      <PageHeader
        title="Pacotes"
        sub={`${ativos} ativo${ativos !== 1 ? "s" : ""} · ${inativos} inativo${inativos !== 1 ? "s" : ""}`}
      />

      {!pacotes?.length ? (
        <div className="admin-card" style={{ textAlign: "center", padding: "var(--space-16) var(--space-8)", color: "var(--color-muted-foreground)", fontSize: "var(--text-caption)" }}>
          Nenhum pacote cadastrado ainda.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "var(--gap-sm)" }}>
          {pacotes.map((p) => (
            <div
              key={p.id}
              className="admin-card"
              style={{ padding: 0, overflow: "hidden", opacity: p.is_active ? 1 : 0.6 }}
            >
              {/* Cover */}
              <div style={{
                height: 140,
                background: p.photo_url
                  ? `url(${p.photo_url}) center/cover no-repeat`
                  : "var(--color-muted)",
                position: "relative",
              }}>
                {/* Badges */}
                <div style={{ position: "absolute", top: "var(--space-3)", left: "var(--space-3)", display: "flex", gap: "var(--space-2)" }}>
                  {p.is_popular && (
                    <StatusBadge label="Popular" color="var(--color-accent)" bg="var(--color-accent-bg)" />
                  )}
                  {p.badge && (
                    <StatusBadge label={p.badge} color="var(--color-primary)" bg="var(--color-muted)" />
                  )}
                </div>
                {/* Active indicator */}
                <div style={{ position: "absolute", top: "var(--space-3)", right: "var(--space-3)" }}>
                  {p.is_active
                    ? <CheckCircle2 size={16} color="var(--color-success)" />
                    : <XCircle      size={16} color="var(--color-destructive)" />
                  }
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "var(--space-4)" }}>
                <p style={{ fontSize: "var(--text-body-sm)", fontWeight: 700, color: "var(--color-foreground)", marginBottom: "var(--space-2)", fontFamily: "var(--font-heading)" }}>
                  {p.name}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-3)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "var(--space-1)", fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>
                    <MapPin size={10} />
                    {p.countries.join(" · ")}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "var(--space-1)", fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>
                    <Clock size={10} />
                    {p.duration_days}d
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p className="admin-label" style={{ marginBottom: 2 }}>A partir de</p>
                    <p style={{ fontSize: "var(--text-caption)", fontWeight: 700, color: "var(--color-primary)" }}>
                      {fmt(p.price_from)}
                    </p>
                  </div>
                  <StatusBadge
                    label={p.is_active ? "Ativo" : "Inativo"}
                    color={p.is_active ? "var(--color-success)" : "var(--color-muted-foreground)"}
                    bg={p.is_active ? "var(--color-success-bg)" : "var(--color-muted)"}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

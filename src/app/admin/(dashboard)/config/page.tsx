import { createClient } from "@/lib/supabase/server";
import { User } from "lucide-react";
import PageHeader  from "../_components/PageHeader";
import SectionCard from "../_components/SectionCard";
import StatusBadge from "../_components/StatusBadge";
import { updateProfile } from "./actions";

export const metadata = { title: "Config. — Admin" };

const ROLE_MAP: Record<string, { label: string; color: string; bg: string }> = {
  admin: { label: "Admin",  color: "var(--color-primary)",       bg: "var(--color-muted)" },
  agent: { label: "Agente", color: "var(--color-primary-light)", bg: "var(--color-muted)" },
};

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "var(--space-2) var(--space-3)",
  background: "var(--color-background)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  fontSize: 12,
  color: "var(--color-foreground)",
  outline: "none",
  boxSizing: "border-box",
};

const SUBMIT_STYLE: React.CSSProperties = {
  padding: "var(--space-2) var(--space-4)",
  background: "var(--color-primary)",
  color: "#fff",
  border: "none",
  borderRadius: "var(--radius-md)",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
};

export default async function ConfigPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from("profiles").select("full_name, email, phone, role, is_active, created_at").eq("id", user.id).single()
    : { data: null };

  const role = ROLE_MAP[profile?.role ?? ""] ?? ROLE_MAP.agent;

  return (
    <div style={{ maxWidth: 640 }}>
      <PageHeader title="Configurações" sub="Perfil e preferências da conta" />

      {/* Profile card */}
      <SectionCard title="Meu perfil" style={{ marginBottom: "var(--gap-sm)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-6)", marginBottom: "var(--space-8)" }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: "var(--radius-full)",
            background: "var(--color-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <User size={24} color="var(--color-primary-light)" />
          </div>
          <div>
            <p style={{ fontSize: "var(--text-body)", fontWeight: 700, color: "var(--color-foreground)", marginBottom: "var(--space-1)" }}>
              {profile?.full_name ?? "—"}
            </p>
            <StatusBadge label={role.label} color={role.color} bg={role.bg} />
          </div>
        </div>

        <form action={updateProfile} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "var(--color-muted-foreground)", display: "block", marginBottom: "var(--space-2)" }}>
              Nome completo
            </label>
            <input
              name="full_name"
              required
              defaultValue={profile?.full_name ?? ""}
              style={INPUT_STYLE}
            />
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "var(--color-muted-foreground)", display: "block", marginBottom: "var(--space-2)" }}>
              Telefone
            </label>
            <input
              name="phone"
              defaultValue={profile?.phone ?? ""}
              placeholder="+55 11 99999-9999"
              style={INPUT_STYLE}
            />
          </div>

          <Row label="Email" value={profile?.email ?? user?.email ?? "—"} />

          <div className="flex items-center justify-end">
            <button type="submit" style={SUBMIT_STYLE}>Salvar</button>
          </div>
        </form>
      </SectionCard>

      {/* Account info */}
      <SectionCard title="Conta">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <Row label="ID da conta" value={user?.id ? user.id.slice(0, 8) + "…" : "—"} mono />
          <Row
            label="Membro desde"
            value={profile?.created_at
              ? new Date(profile.created_at).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })
              : "—"}
          />
          <Row
            label="Status"
            value={profile?.is_active !== false ? "Ativo" : "Inativo"}
            valueColor={profile?.is_active !== false ? "var(--color-success)" : "var(--color-destructive)"}
          />
        </div>

        <div style={{ marginTop: "var(--space-8)", paddingTop: "var(--space-6)", borderTop: "1px solid var(--color-border)" }}>
          <p style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)", marginBottom: "var(--space-4)" }}>
            Para alterar senha ou email, acesse o painel do Supabase.
          </p>
        </div>
      </SectionCard>
    </div>
  );
}

function Row({
  icon, label, value, mono, valueColor,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
  valueColor?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
        {icon}
        <span className="admin-label">{label}</span>
      </div>
      <span style={{
        fontSize: "var(--text-caption)",
        fontWeight: 500,
        color: valueColor ?? "var(--color-foreground)",
        fontFamily: mono ? "monospace" : undefined,
      }}>
        {value}
      </span>
    </div>
  );
}

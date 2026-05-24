import type { ComponentType } from "react";

type Props = {
  label: string;
  value: string;
  sub?: string;
  icon: ComponentType<{ size?: number; color?: string }>;
  accent?: string;
};

export default function KpiCard({ label, value, sub, icon: Icon, accent }: Props) {
  return (
    <div className="admin-card" style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="admin-label">{label}</span>
        <div
          style={{
            width: "var(--admin-icon-box)",
            height: "var(--admin-icon-box)",
            borderRadius: "var(--radius-md)",
            background: "var(--color-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={13} color={accent ?? "var(--color-primary-light)"} />
        </div>
      </div>
      <div>
        <p className="admin-value">{value}</p>
        {sub && (
          <p style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)", marginTop: "var(--space-1)" }}>
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

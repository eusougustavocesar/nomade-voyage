type Props = {
  label: string;
  color?: string;     // CSS color value
  bg?: string;        // CSS background value
};

export default function StatusBadge({ label, color, bg }: Props) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontSize: "var(--admin-label-fs)",
        fontWeight: 600,
        padding: "2px var(--space-2)",
        borderRadius: "var(--radius-full)",
        color: color ?? "var(--color-muted-foreground)",
        background: bg ?? "var(--color-muted)",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

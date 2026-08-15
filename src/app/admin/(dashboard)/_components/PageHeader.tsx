type Props = {
  title: string;
  sub?: string;
  action?: React.ReactNode;
};

export default function PageHeader({ title, sub, action }: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: "var(--space-6)",
      }}
    >
      <div>
        <h1 style={{ fontSize: "var(--text-h3)", fontWeight: 700, fontFamily: "var(--font-heading)", color: "var(--color-foreground)", marginBottom: sub ? "var(--space-1)" : 0 }}>
          {title}
        </h1>
        {sub && (
          <p style={{ fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)" }}>
            {sub}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

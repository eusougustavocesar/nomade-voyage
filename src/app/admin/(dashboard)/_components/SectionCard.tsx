type Props = {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

export default function SectionCard({ title, action, children, style, className }: Props) {
  return (
    <div className={`admin-card${className ? ` ${className}` : ""}`} style={{ display: "flex", flexDirection: "column", ...style }}>
      {(title || action) && (
        <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-6)" }}>
          {title && (
            <p style={{ fontWeight: 600, fontSize: "var(--text-body-sm)", color: "var(--color-foreground)" }}>
              {title}
            </p>
          )}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

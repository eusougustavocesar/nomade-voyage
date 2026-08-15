type Props = {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

export default function SectionCard({ title, children, style, className }: Props) {
  return (
    <div className={`admin-card${className ? ` ${className}` : ""}`} style={{ display: "flex", flexDirection: "column", ...style }}>
      {title && (
        <p style={{ fontWeight: 600, fontSize: "var(--text-body-sm)", color: "var(--color-foreground)", marginBottom: "var(--space-6)" }}>
          {title}
        </p>
      )}
      {children}
    </div>
  );
}

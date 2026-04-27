type LogoProps = {
  size?: number;
  showWordmark?: boolean;
  theme?: "dark" | "light";
};

export default function Logo({ size = 32, showWordmark = true, theme = "light" }: LogoProps) {
  const textColor = theme === "dark" ? "white" : "var(--color-primary)";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <img src="/logo-icon.svg" alt="Nômade Voyage" width={size} height={size} style={{ display: "block", flexShrink: 0 }} />
      {showWordmark && (
        <span style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: `${Math.round(size * 0.56)}px`,
          color: textColor,
          lineHeight: 1,
        }}>
          Nômade Voyage
        </span>
      )}
    </div>
  );
}

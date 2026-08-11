type LogoProps = {
  /** Altura em px. Full lockup mantém aspect ratio ~1.51. Mark-only é quadrado. */
  size?: number;
  /** false = só o símbolo (personagem + arco). true = logo completa com wordmark. */
  showWordmark?: boolean;
  theme?: "dark" | "light";
  className?: string;
};

/** Aspect ratio da logo completa (1080×716). */
const FULL_RATIO = 1080 / 716;

export default function Logo({
  size = 32,
  showWordmark = true,
  theme = "light",
  className,
}: LogoProps) {
  const isDark = theme === "dark";

  if (showWordmark) {
    const height = size;
    const width = Math.round(size * FULL_RATIO);
    const src = isDark ? "/logo-white.png" : "/logo.png";

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt="Nômade Voyage"
        width={width}
        height={height}
        className={className}
        style={{ display: "block", height, width: "auto", maxWidth: width, flexShrink: 0 }}
      />
    );
  }

  // Símbolo only (favicon / ícone compacto)
  const src = isDark ? "/logo-mark-white.png" : "/logo-mark.png";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Nômade Voyage"
      width={size}
      height={size}
      className={className}
      style={{ display: "block", width: size, height: size, flexShrink: 0, objectFit: "contain" }}
    />
  );
}

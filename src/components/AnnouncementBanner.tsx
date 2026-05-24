const WA_LINK = "https://wa.me/351962221594?text=Olá!%20Quero%20verificar%20disponibilidade%20para%20julho%20ou%20agosto.";

export default function AnnouncementBanner() {
  return (
    <div
      style={{
        background: "var(--color-primary)",
        padding: "9px 0",
        textAlign: "center",
      }}
    >
      <p style={{
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-micro)",
        fontWeight: 500,
        color: "rgba(255,255,255,0.90)",
        letterSpacing: "0.01em",
      }}>
        Vagas abertas para julho e agosto{" "}
        <span style={{ color: "rgba(255,255,255,0.55)", margin: "0 6px" }}>·</span>
        Apenas 8 grupos por mês
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "white",
            fontWeight: 700,
            textDecoration: "none",
            marginLeft: 10,
            borderBottom: "1px solid rgba(255,255,255,0.40)",
            paddingBottom: 1,
          }}
        >
          Verificar disponibilidade →
        </a>
      </p>
    </div>
  );
}

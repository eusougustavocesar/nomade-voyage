import AuthForm from "./AuthForm";
import Logo from "@/components/Logo";
import { Plane, Shield, FileText, HeadphonesIcon, Hotel, Globe } from "lucide-react";

export const metadata = { title: "Entrar — Nômade Voyage" };

const SERVICES = [
  { label: "Passagens",  Icon: Plane },
  { label: "Hospedagem", Icon: Hotel },
  { label: "Vistos",     Icon: FileText },
  { label: "Seguros",    Icon: Shield },
  { label: "Roteiros",   Icon: Globe },
  { label: "Suporte",    Icon: HeadphonesIcon },
];

export default function LoginPage() {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        minHeight: "100svh",
        background: "var(--color-background)",
        padding: "var(--space-6)",
      }}
    >
      {/* Single card — two panels */}
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: 880,
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(30,14,4,0.18), 0 4px 16px rgba(30,14,4,0.10)",
          border: "1px solid var(--color-border)",
        }}
      >

        {/* ── Left: brand panel ── */}
        <div
          className="hidden md:flex"
          style={{
            width: 380,
            flexShrink: 0,
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "var(--space-10)",
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(160deg, #0A0A0A 0%, #171717 55%, #262626 100%)",
          }}
        >
          {/* Decorative circles */}
          <div style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, left: -60, width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />

          {/* Logo */}
          <a href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "var(--space-3)", position: "relative" }}>
            <Logo size={28} showWordmark={false} theme="dark" />
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-caption)", color: "var(--color-white-high)" }}>
              Nômade Voyage
            </span>
          </a>

          {/* Headline */}
          <div style={{ position: "relative" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 32, color: "#FFFFFF", lineHeight: 1.2, marginBottom: "var(--space-3)" }}>
              Pertença<br />ao mundo.
            </p>
            <p style={{ fontSize: "var(--text-caption)", color: "var(--color-white-mid)", lineHeight: 1.6 }}>
              Passagens, vistos, seguros e suporte para brasileiros que querem viver o mundo.
            </p>

            {/* Service pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-6)" }}>
              {SERVICES.map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex items-center"
                  style={{
                    gap: 5,
                    padding: "4px 10px",
                    borderRadius: "var(--radius-full)",
                    background: "var(--color-white-ghost)",
                    border: "1px solid var(--color-white-border)",
                  }}
                >
                  <Icon size={9} color="var(--color-white-mid)" />
                  <span style={{ fontSize: 11, color: "var(--color-white-high)", fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p style={{ fontSize: 11, color: "var(--color-white-muted)", position: "relative" }}>
            © {new Date().getFullYear()} Nômade Voyage
          </p>
        </div>

        {/* ── Right: form panel ── */}
        <div
          style={{
            flex: 1,
            background: "var(--color-surface)",
            padding: "var(--space-10)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Mobile logo */}
          <div className="md:hidden flex items-center" style={{ gap: "var(--space-3)", marginBottom: "var(--space-8)" }}>
            <a href="/"><Logo size={28} showWordmark={false} /></a>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-caption)", color: "var(--color-primary)" }}>
              Nômade Voyage
            </span>
          </div>

          <div style={{ marginBottom: "var(--space-6)" }}>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-h3)", fontWeight: 700, color: "var(--color-primary)", marginBottom: "var(--space-1)" }}>
              Bem-vindo
            </h1>
            <p style={{ fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)" }}>
              Entre na sua conta ou crie uma nova
            </p>
          </div>

          <AuthForm />

          <p style={{ fontSize: 11, color: "var(--color-muted-foreground)", marginTop: "var(--space-6)", lineHeight: 1.6 }}>
            Ao criar uma conta você concorda com os{" "}
            <a href="/termos" style={{ color: "var(--color-primary-light)", textDecoration: "none" }}>Termos de uso</a>
            {" "}e a{" "}
            <a href="/privacidade" style={{ color: "var(--color-primary-light)", textDecoration: "none" }}>Política de privacidade</a>.
          </p>
        </div>

      </div>
    </div>
  );
}

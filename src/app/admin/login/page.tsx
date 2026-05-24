import LoginForm from "./LoginForm";
import Logo from "@/components/Logo";

export const metadata = { title: "Admin — Nômade Voyage" };

export default function LoginPage() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: "100svh", background: "var(--color-background)", padding: "var(--space-6)" }}
    >
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div className="flex flex-col items-center" style={{ marginBottom: "var(--space-8)", gap: "var(--space-3)" }}>
          <Logo size={36} />
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "var(--text-h4)", marginBottom: "var(--space-1)" }}>
              Área administrativa
            </h1>
            <p style={{ fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)" }}>
              Nômade Voyage · Acesso restrito
            </p>
          </div>
        </div>

        <div className="card">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

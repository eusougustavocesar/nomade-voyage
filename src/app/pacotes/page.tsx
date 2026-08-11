import Navbar from "@/components/Navbar";
import NavAuthButton from "@/components/NavAuthButton";
import Footer from "@/components/Footer";
import PackageCatalog from "@/components/PackageCatalog";
import { packages } from "@/data/packages";
import { MessageCircle } from "lucide-react";

const WA_LINK = "https://wa.me/351962221594?text=Olá!%20Vim%20pelo%20site%20da%20Nômade%20Voyage%20e%20quero%20saber%20mais.";

export const metadata = {
  title: "Pacotes para a Europa — Nômade Voyage",
  description: `${packages.length} roteiros pra Europa. Lisboa, Madrid, Dublin, multi-destino — ajustados no WhatsApp.`,
};

export default function PacotesPage() {
  return (
    <>
      <Navbar authSlot={<NavAuthButton />} />

      {/* ── Page header ── */}
      <div style={{
        background: "var(--color-surface)",
        paddingTop: "calc(var(--nav-height) + var(--gap-xl))",
        paddingBottom: "var(--gap-xl)",
        borderBottom: "1px solid var(--color-border)",
      }}>
        <div className="container">
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)", marginBottom: "var(--space-3)" }}>
            <a href="/" style={{ color: "var(--color-muted-foreground)", textDecoration: "none" }}>Início</a>
            {" / "}
            <span>Pacotes</span>
          </p>
          <h1 style={{ color: "var(--color-foreground)", lineHeight: 1.15, marginBottom: "var(--space-4)" }}>
            Roteiros pra Europa
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-md)", color: "var(--color-muted-foreground)", maxWidth: 560, lineHeight: 1.65, marginBottom: "var(--space-6)" }}>
            {packages.length} bases prontas. Data, hotel e o que entra no pacote a gente muda com você no WhatsApp.
          </p>
          <div className="flex flex-wrap" style={{ gap: 10 }}>
            {["Lisboa", "Madrid", "Dublin", "Itália", "França", "Grécia", "Leste Europeu"].map((dest) => (
              <a
                key={dest}
                href={`/pacotes?q=${encodeURIComponent(dest)}`}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-caption)",
                  fontWeight: 500,
                  color: "var(--color-primary)",
                  background: "var(--color-muted)",
                  textDecoration: "none",
                  padding: "5px 14px",
                  borderRadius: "var(--radius-full)",
                  border: "1.5px solid var(--color-border)",
                  transition: "all 120ms",
                }}
              >
                {dest}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Catalog ── */}
      <div style={{ background: "var(--color-background)", paddingTop: "var(--gap-xl)", paddingBottom: "var(--gap-xl)" }}>
        <div className="container">
          <PackageCatalog />
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)", padding: "var(--gap-xl) 0" }}>
        <div className="container text-center">
          <h2 style={{ marginBottom: "var(--space-4)" }}>
            Não achou o que queria?
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-md)", color: "var(--color-muted-foreground)", marginBottom: "var(--space-8)", maxWidth: 480, margin: "0 auto var(--space-8)" }}>
            Conta no WhatsApp o destino e as datas. A gente monta um roteiro do zero se precisar.
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <MessageCircle size={18} />
            Falar no WhatsApp
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}

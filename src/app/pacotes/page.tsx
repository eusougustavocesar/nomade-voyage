import Navbar from "@/components/Navbar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Logo from "@/components/Logo";
import PackageCatalog from "@/components/PackageCatalog";
import { packages } from "@/data/packages";
import { MessageCircle } from "lucide-react";

const WA_LINK = "https://wa.me/351962221594?text=Olá!%20Vim%20pelo%20site%20da%20Nômade%20Voyage%20e%20quero%20saber%20mais.";

export const metadata = {
  title: "Pacotes para a Europa — Nômade Voyage",
  description: `${packages.length} roteiros para a Europa, todos personalizáveis. Lisboa, Madrid, Dublin, Itália, França e muito mais.`,
};

export default function PacotesPage() {
  return (
    <>
      <Navbar />
      <FloatingWhatsApp />

      {/* ── Page header ── */}
      <div style={{ background: "var(--color-surface)", paddingTop: "calc(var(--nav-height) + var(--gap-xl))", paddingBottom: "var(--gap-xl)", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container">
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)", marginBottom: "var(--space-2)" }}>
            <a href="/" style={{ color: "var(--color-muted-foreground)", textDecoration: "none" }}>Início</a>
            {" / "}
            <span>Pacotes</span>
          </p>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-display)", color: "var(--color-foreground)", lineHeight: 1.1, marginBottom: "var(--space-4)" }}>
            Roteiros para a Europa
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-md)", color: "var(--color-muted-foreground)", maxWidth: 540, lineHeight: 1.65 }}>
            {packages.length} roteiros base, todos personalizáveis. Escolha um destino, ajuste as datas e o que incluir — a gente cuida do resto.
          </p>
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
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-h2)", color: "var(--color-foreground)", marginBottom: "var(--space-4)" }}>
            Não encontrou o que queria?
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-md)", color: "var(--color-muted-foreground)", marginBottom: "var(--space-8)", maxWidth: 480, margin: "0 auto var(--space-8)" }}>
            Montamos qualquer roteiro personalizado. Manda uma mensagem e a gente desenha do zero para você.
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <MessageCircle size={18} />
            Falar com especialista
          </a>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer style={{ background: "var(--color-footer)", padding: "var(--gap-lg) 0" }}>
        <div className="container text-center">
          <Logo size={24} theme="dark" />
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "rgba(255,255,255,0.35)", marginTop: "var(--space-3)" }}>
            © 2026 Nômade Voyage
          </p>
        </div>
      </footer>
    </>
  );
}

import Link from "next/link";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import PackageCard from "@/components/PackageCard";
import HeroSearch from "@/components/HeroSearch";
import SectionDiferenciais from "@/components/SectionDiferenciais";
import SectionComoFunciona from "@/components/SectionComoFunciona";
import SectionDepoimentos from "@/components/SectionDepoimentos";
import SectionCTA from "@/components/SectionCTA";
import { getPopularPackages } from "@/data/packages";
import { ArrowRight, Clock } from "lucide-react";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section style={{ minHeight: "100svh", display: "flex", alignItems: "center", padding: 0 }}>
        <div className="container" style={{ paddingTop: "calc(var(--nav-height) + var(--gap-xl))", paddingBottom: "var(--gap-xl)" }}>
          <div className="flex flex-col items-center text-center" style={{ maxWidth: 700, margin: "0 auto" }}>
            <span className="badge badge-accent mb-6 inline-flex hero-enter" style={{ gap: 6 }}>
              <Clock size={11} />
              Consulta gratuita · Atendimento humano
            </span>
            <h1 className="hero-enter hero-enter-delay-1" style={{ color: "var(--color-primary)", marginBottom: "var(--space-6)" }}>
              Para quem sempre disse:<br />&ldquo;ano que vem, vou à Europa.&rdquo;
            </h1>
            <p className="hero-enter hero-enter-delay-2" style={{ fontSize: "var(--text-body-lg)", color: "var(--color-muted-foreground)", lineHeight: 1.65, marginBottom: "var(--space-8)", maxWidth: 520 }}>
              Passagens, hotéis, seguro e roteiro completo — tudo resolvido no WhatsApp, com quem já esteve no destino.
            </p>
            <div className="hero-enter hero-enter-delay-3 w-full flex justify-center" style={{ marginBottom: "var(--space-6)" }}>
              <HeroSearch />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PACOTES ───────────────────────────────────────────────────────── */}
      <section id="pacotes" style={{ background: "var(--color-background)" }}>
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="badge mb-4 inline-flex">Pacotes mais famosos</span>
              <h2>Os roteiros mais procurados pelos brasileiros</h2>
              <p className="section-subtitle">
                Pesquisamos os destinos mais vendidos para a Europa e montamos roteiros completos. Todos personalizáveis pelo WhatsApp.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: "var(--gap-md)" }}>
            {getPopularPackages().slice(0, 6).map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
          <div className="flex justify-center" style={{ marginTop: "var(--gap-xl)" }}>
            <Link href="/pacotes" className="btn-secondary">
              Ver todos os roteiros
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. DIFERENCIAIS ─────────────────────────────────────────────────── */}
      <SectionDiferenciais />

      {/* ── 4. COMO FUNCIONA ─────────────────────────────────────────────────── */}
      <SectionComoFunciona />

      {/* ── 5. DEPOIMENTOS ───────────────────────────────────────────────────── */}
      <SectionDepoimentos />

      {/* ── 6. FAQ ───────────────────────────────────────────────────────────── */}
      <section id="faq" style={{ background: "var(--color-background)" }}>
        <div className="container">
          <div className="section-header">
            <span className="badge mb-4 inline-flex">Perguntas frequentes</span>
            <h2>Tudo que você quer saber antes de mandar mensagem</h2>
            <p className="section-subtitle">
              Se a sua dúvida não estiver aqui, é só perguntar — a primeira conversa é gratuita.
            </p>
          </div>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <FAQ />
          </div>
        </div>
      </section>

      {/* ── 7. CTA FINAL ─────────────────────────────────────────────────────── */}
      <SectionCTA />

      <Footer />
    </>
  );
}

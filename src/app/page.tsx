import Link from "next/link";
import Navbar from "@/components/Navbar";
import NavAuthButton from "@/components/NavAuthButton";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import PackageCard from "@/components/PackageCard";
import HeroSearch from "@/components/HeroSearch";
import SectionDiferenciais from "@/components/SectionDiferenciais";
// import SectionCurador from "@/components/SectionCurador"; // TODO: redesign — reativar depois
import SectionComoFunciona from "@/components/SectionComoFunciona";
import SectionDepoimentos from "@/components/SectionDepoimentos";
import SectionCTA from "@/components/SectionCTA";
import { getPopularPackages } from "@/data/packages";
import { ArrowRight, Clock } from "lucide-react";

export default function LandingPage() {
  return (
    <>
      <Navbar authSlot={<NavAuthButton />} />

      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section style={{ minHeight: "100svh", display: "flex", alignItems: "center", padding: 0 }}>
        <div className="container" style={{ paddingTop: "calc(var(--nav-height) + var(--gap-xl))", paddingBottom: "var(--gap-xl)" }}>
          <div className="flex flex-col items-center text-center" style={{ maxWidth: 700, margin: "0 auto" }}>
            <span className="badge badge-accent mb-6 inline-flex hero-enter" style={{ gap: 6 }}>
              <Clock size={11} />
              Consulta grátis no WhatsApp
            </span>
            <h1 className="hero-enter hero-enter-delay-1" style={{ color: "var(--color-primary)", marginBottom: "var(--space-6)" }}>
              Para quem sempre disse:<br />&ldquo;ano que vem, vou à Europa.&rdquo;
            </h1>
            <p className="hero-enter hero-enter-delay-2" style={{ fontSize: "var(--text-body-lg)", color: "var(--color-muted-foreground)", lineHeight: 1.65, marginBottom: "var(--space-8)", maxWidth: 520 }}>
              A gente monta passagem, hotel, seguro e roteiro com você no WhatsApp. Sem formulário de 12 campos.
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
              <span className="badge mb-4 inline-flex">Roteiros prontos</span>
              <h2>Os destinos que mais pedem</h2>
              <p className="section-subtitle">
                Base pronta para Lisboa, Madrid, Dublin e multi-destino. Datas, hotel e o que incluir a gente ajusta no WhatsApp.
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

      {/* ── 3. CURADOR (pausado — redesign pendente) ─────────────────────────── */}
      {/* <SectionCurador /> */}

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
            <span className="badge mb-4 inline-flex">Dúvidas comuns</span>
            <h2>Antes de mandar mensagem</h2>
            <p className="section-subtitle">
              Não achou o que precisa? Manda no WhatsApp. A primeira conversa é grátis.
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

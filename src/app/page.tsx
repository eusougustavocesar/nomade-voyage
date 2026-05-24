import Link from "next/link";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import PackageCard from "@/components/PackageCard";
import HeroSearch from "@/components/HeroSearch";
import { getPopularPackages } from "@/data/packages";
import {
  ArrowRight, Star,
  FileText, HeartHandshake, User, Clock, Users, Globe, MessageCircle,
} from "lucide-react";

const WA_LINK  = "https://wa.me/351962221594?text=Olá!%20Vim%20pelo%20site%20da%20Nômade%20Voyage%20e%20quero%20saber%20mais.";
const WA_GUIDE = "https://wa.me/351962221594?text=Olá!%20Quero%20dicas%20sobre%20como%20planejar%20minha%20viagem%20para%20a%20Europa.";

// ── Dados ──────────────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Conta o que você quer",
    description: "Manda uma mensagem no WhatsApp. Sem formulário, sem robô — você fala com alguém que já viajou para o seu destino e sabe o que vale a pena.",
  },
  {
    number: "02",
    icon: FileText,
    title: "A gente monta o roteiro",
    description: "Entendemos seu perfil, destino e orçamento. Você recebe um plano completo: passagens, hotéis, experiências e seguro — sem surpresa.",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "Você embarca com tudo pronto",
    description: "Passagem confirmada, hotel reservado, roteiro na mão. Você curte cada momento — e a gente está disponível se precisar de algo.",
  },
];

const differentials = [
  {
    icon: Users,
    title: "Grupos de até 8 pessoas",
    description: "Você nunca vai ao Coliseu num ônibus com 40 estranhos. Grupos pequenos significam acesso a restaurantes, guias e experiências que o turismo de massa não alcança.",
  },
  {
    icon: Globe,
    title: "Quem fala lá sabe o que vale a pena",
    description: "A gente já comeu naquele restaurante sem fila, já perdeu o trem em Florença e já encontrou o hotel certo em Lisboa. Você não descobre isso no TripAdvisor.",
  },
  {
    icon: MessageCircle,
    title: "Primeira conversa gratuita, sem formulário",
    description: "Você descreve o que quer — a gente monta, sem 12 campos obrigatórios. Se não fizer sentido, falamos isso também. Sem pressão, sem compromisso.",
  },
];

const testimonials = [
  {
    text: "Era minha primeira viagem internacional, fui sozinha. Em menos de uma semana, tinha tudo: voo, hotel no centro de Lisboa e roteiro dia a dia. 10 dias, zero contratempo.",
    name: "Marina S.",
    age: "34 anos",
    city: "São Paulo, SP",
    trip: "Lisboa · 10 dias · Março 2026",
  },
  {
    text: "Tentei planejar duas vezes e desisti. Aqui foi diferente: 3 dias de conversa no WhatsApp e tinha Lisboa, Sevilha e Madrid resolvidos. Me avisaram de uma greve de trens antes de eu embarcar.",
    name: "Rafael M.",
    age: "41 anos",
    city: "Belo Horizonte, MG",
    trip: "Portugal e Espanha · 14 dias · Janeiro 2026",
  },
  {
    text: "O que me ganhou foi que não tentaram me empurrar o mais caro. Perguntaram quanto eu tinha e montaram o que fazia sentido. Dublin com 8 dias, dentro do orçamento. Voltei apaixonada.",
    name: "Camila T.",
    age: "28 anos",
    city: "Rio de Janeiro, RJ",
    trip: "Dublin e interior da Irlanda · 8 dias · Fevereiro 2026",
  },
];

// ── Page ───────────────────────────────────────────────────────────────────────

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
            <h1 className="hero-enter hero-enter-delay-1" style={{ marginBottom: "var(--space-6)" }}>
              Para quem sempre disse:<br />&ldquo;ano que vem, vou à Europa.&rdquo;
            </h1>
            <p className="hero-enter hero-enter-delay-2" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-lg)", color: "var(--color-muted-foreground)", lineHeight: 1.65, marginBottom: "var(--space-8)", maxWidth: "520px" }}>
              Passagens, hotéis, seguro e roteiro completo — tudo resolvido no WhatsApp, com quem já esteve no destino.
            </p>

            {/* Hero search */}
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

      {/* ── 3. DIFERENCIAIS ──────────────────────────────────────────────────── */}
      <section style={{ background: "var(--color-muted)" }}>
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="badge mb-4 inline-flex">Por que a Nômade Voyage</span>
              <h2>O que muda quando você viaja com a gente</h2>
              <p className="section-subtitle">
                Não é diferencial de apresentação. É o que você vai sentir na prática, do primeiro contato até o retorno.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "var(--gap-md)" }}>
            {differentials.map(({ icon: Icon, title, description }, i) => (
              <Reveal key={title} delay={((i + 1) as 1 | 2 | 3)}>
                <div className="card flex flex-col h-full" style={{ gap: "var(--space-4)" }}>
                  <div className="flex items-center justify-center flex-shrink-0" style={{ width: 52, height: 52, borderRadius: "var(--radius-full)", background: "var(--color-muted)", border: "2px solid var(--color-border)" }}>
                    <Icon size={22} color="var(--color-primary-light)" />
                  </div>
                  <h3 style={{ fontSize: "var(--text-h4)", lineHeight: 1.25 }}>{title}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-muted-foreground)", lineHeight: 1.7 }}>
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. COMO FUNCIONA ─────────────────────────────────────────────────── */}
      <section id="como-funciona" style={{ background: "var(--color-surface)" }}>
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="badge mb-4 inline-flex">Simples assim</span>
              <h2>Como funciona</h2>
              <p className="section-subtitle">
                Nada de formulário longo. Uma conversa, um roteiro — você parte.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "var(--gap-lg)" }}>
            {steps.map(({ number, icon: Icon, title, description }, i) => (
              <Reveal key={number} delay={((i + 1) as 1 | 2 | 3)}>
                <div className="flex flex-col items-center text-center">
                  <div className="relative" style={{ marginBottom: "var(--space-8)" }}>
                    <div className="flex items-center justify-center" style={{ width: 64, height: 64, borderRadius: "var(--radius-full)", background: "var(--color-muted)", border: "2px solid var(--color-border)" }}>
                      <Icon size={26} color="var(--color-primary-light)" />
                    </div>
                    <span style={{ position: "absolute", top: -8, right: -8, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-micro)", color: "white", background: "var(--color-accent)", width: 24, height: 24, borderRadius: "var(--radius-full)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {number}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "var(--text-h3)", marginBottom: "var(--space-4)" }}>{title}</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body)", color: "var(--color-muted-foreground)", lineHeight: 1.7 }}>
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. DEPOIMENTOS ───────────────────────────────────────────────────── */}
      <section id="depoimentos" style={{ background: "var(--color-muted)" }}>
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="badge mb-4 inline-flex">Quem já foi</span>
              <h2>De quem planejou com a gente</h2>
              {/* Rating agregado */}
              <div className="flex items-center justify-center" style={{ gap: 8, marginTop: "var(--space-4)" }}>
                <div className="flex" style={{ gap: 2 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--color-accent)" color="var(--color-accent)" />)}
                </div>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-body-md)", color: "var(--color-primary)" }}>4.9</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-muted-foreground)" }}>· 200+ viajantes atendidos</span>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "var(--gap-md)" }}>
            {testimonials.map(({ text, name, age, city, trip }, i) => (
              <Reveal key={name} delay={((i + 1) as 1 | 2 | 3)}>
                <div className="card" style={{ background: "var(--color-surface)", display: "flex", flexDirection: "column", height: "100%" }}>
                  <div className="flex" style={{ gap: "var(--space-1)", marginBottom: "var(--space-6)" }}>
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} size={14} fill="var(--color-accent)" color="var(--color-accent)" />
                    ))}
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-foreground)", lineHeight: 1.75, marginBottom: "var(--space-6)", flex: 1 }}>
                    &ldquo;{text}&rdquo;
                  </p>
                  <div className="flex items-start" style={{ gap: "var(--gap-xs)", paddingTop: "var(--space-4)", borderTop: "1px solid var(--color-border)" }}>
                    <div className="flex items-center justify-center flex-shrink-0" style={{ width: 36, height: 36, borderRadius: "var(--radius-full)", background: "var(--color-muted)", border: "1px solid var(--color-border)", marginTop: 2 }}>
                      <User size={15} color="var(--color-primary-light)" />
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "var(--text-body-sm)", color: "var(--color-foreground)" }}>
                        {name} <span style={{ fontWeight: 400, color: "var(--color-muted-foreground)" }}>· {age} · {city}</span>
                      </p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-accent)", fontWeight: 600, marginTop: 3 }}>{trip}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ───────────────────────────────────────────────────────────── */}
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

      {/* ── 9. CTA FINAL ─────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
        <div className="container text-center">
          <span className="badge badge-accent mb-5 inline-flex" style={{ gap: 6 }}>
            <Clock size={11} />
            Consulta gratuita · Máx. 8 grupos por mês
          </span>
          <h2 style={{ marginBottom: "var(--space-6)" }}>
            O &ldquo;ano que vem&rdquo;<br />começa agora.
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-lg)", color: "var(--color-muted-foreground)", maxWidth: "480px", margin: "0 auto", marginBottom: "var(--space-6)", lineHeight: 1.65 }}>
            Manda uma mensagem no WhatsApp. É grátis, sem compromisso, sem robô. Uma conversa real sobre a sua viagem.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-muted-foreground)", maxWidth: "360px", margin: "0 auto", marginBottom: "var(--space-10)", lineHeight: 1.6 }}>
            Atendemos no máximo 8 grupos por mês. Consulte a disponibilidade para a sua data.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: "var(--gap-sm)" }}>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp" style={{ fontSize: "var(--text-body-md)", padding: "var(--space-4) var(--space-8)" }}>
              <MessageCircle size={22} />
              Planejar minha viagem agora
            </a>
            <a href={WA_GUIDE} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "var(--text-body-sm)", color: "var(--color-muted-foreground)", textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer" }}>
              ou peça dicas gratuitas sobre a Europa →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

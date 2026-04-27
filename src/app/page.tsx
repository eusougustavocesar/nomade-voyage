import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import {
  Plane, Compass, Home as HomeIcon, MapPin, MessageCircle,
  ArrowRight, Check, Star, Shield, FileText, HeartHandshake, User,
  HelpCircle, ShieldAlert, BookOpen,
  Banknote, Laptop,
  CheckCircle2, XCircle,
  Users,
} from "lucide-react";

const WA_LINK = "https://wa.me/5500000000000?text=Olá!%20Vim%20pelo%20site%20da%20Nômade%20Voyage%20e%20quero%20saber%20mais.";
const WA_GUIDE = "https://wa.me/5500000000000?text=Olá!%20Quero%20o%20guia%20gratuito%20sobre%20como%20morar%20em%20Portugal.";

// ── Dados ──────────────────────────────────────────────────────────────────────

const stats = [
  { number: "+200",  label: "Brasileiros atendidos" },
  { number: "4",     label: "Destinos âncora" },
  { number: "100%",  label: "Atendimento humano 1x1" },
  { number: "R$ 0",  label: "Na primeira consulta" },
];

const pains = [
  {
    icon: HelpCircle,
    title: "Não sei por onde começar",
    description: "Você pesquisou, salvou posts, assistiu horas de YouTube. Mas quando chega na hora, o processo parece um labirinto: visto, documentação, passagem, moradia — tudo ao mesmo tempo.",
  },
  {
    icon: ShieldAlert,
    title: "Medo de errar — ou de cair em golpe",
    description: "Depois da 123Milhas, confiar em agência digital virou risco. Fazer sozinho também pode sair caro: um erro no visto pode custar meses e o processo inteiro.",
  },
  {
    icon: BookOpen,
    title: "Informação demais, clareza de menos",
    description: "Todo brasileiro que já morou fora compartilha a própria experiência. Mas cada caso é diferente — e ninguém te mostra o caminho do começo ao fim do SEU caso.",
  },
];

const pillars = [
  {
    id: "viajar",
    icon: Plane,
    badge: "Pilar I",
    title: "Viajar",
    description: "Para a primeira viagem internacional ou o próximo destino — passagens, hotéis e seguro com alguém do seu lado do começo ao fim.",
    items: ["Passagens nacionais e internacionais", "Hotéis e resorts curados", "Seguro viagem incluído"],
  },
  {
    id: "explorar",
    icon: Compass,
    badge: "Pilar II",
    title: "Explorar",
    description: "Para quem quer ir além do pacote padrão — roteiros alternativos, mochilão com planejamento real e suporte quando precisar.",
    items: ["Roteiros personalizados por destino", "Dicas exclusivas de quem conhece", "Suporte 24h durante a viagem"],
  },
  {
    id: "morar",
    icon: HomeIcon,
    badge: "Pilar III — Principal",
    title: "Morar",
    description: "Visto D7 parece complicado. Mudar de país parece assustador. Com a gente, você tem um roteiro claro — e alguém que já ajudou dezenas de brasileiros a dar esse passo.",
    items: ["Visto D7 e D8 passo a passo", "Rede de parceiros em Portugal e Espanha", "Do contrato de aluguel à chegada"],
  },
];

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Conta o que você quer",
    description: "Manda uma mensagem no WhatsApp. Sem formulário, sem robô — você fala com uma pessoa real que já ajudou dezenas de brasileiros na mesma situação.",
  },
  {
    number: "02",
    icon: FileText,
    title: "A gente monta o plano",
    description: "Entendemos seu perfil, seu destino e seu orçamento. Você recebe um roteiro claro: o que fazer, em qual ordem, e quanto vai custar — sem surpresa.",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "Você parte com segurança",
    description: "Com tudo resolvido — passagem, visto, seguro, moradia — você embarca sabendo que tem alguém ao seu lado caso precise.",
  },
];

const portugueseReasons = [
  "Mesmo idioma — menos choque cultural",
  "Visto acessível para brasileiros (D7 e D8)",
  "Porta de entrada para toda a União Europeia",
  "Comunidade brasileira consolidada em Lisboa e Porto",
  "Qualidade de vida acima da média europeia",
];

const visas = [
  {
    icon: Banknote,
    code: "D7",
    name: "Residência Passiva",
    for: "Aposentados, investidores e quem tem renda passiva (aluguel, dividendos)",
    income: "≈ €870/mês de renda comprovada",
    timeline: "2–3 meses de processo",
  },
  {
    icon: Laptop,
    code: "D8",
    name: "Nômade Digital",
    for: "Profissionais que trabalham remotamente para empresa sediada fora de Portugal",
    income: "≥ €3.480/mês de renda ativa",
    timeline: "2–3 meses de processo",
  },
];

const comparisons = [
  {
    label: "Por conta própria",
    tag: "Mais trabalhoso",
    tagColor: "var(--color-muted-foreground)",
    tagBg: "var(--color-muted)",
    highlighted: false,
    items: [
      { ok: false, text: "Processo fragmentado e confuso" },
      { ok: false, text: "Erro pode invalidar o visto" },
      { ok: false, text: "Meses sem progresso real" },
      { ok: false, text: "Sem suporte quando algo dá errado" },
      { ok: false, text: "Você descobre os problemas tarde demais" },
    ],
  },
  {
    label: "Grandes agências",
    tag: "Incompleto",
    tagColor: "var(--color-muted-foreground)",
    tagBg: "var(--color-muted)",
    highlighted: false,
    items: [
      { ok: true,  text: "Passagem aérea" },
      { ok: false, text: "Sem consultoria de visto" },
      { ok: false, text: "Sem suporte para relocation" },
      { ok: false, text: "Formulário frio, sem rosto" },
      { ok: false, text: "Caso 123Milhas: quem paga é o cliente" },
    ],
  },
  {
    label: "Nômade Voyage",
    tag: "Recomendado",
    tagColor: "var(--color-on-primary)",
    tagBg: "var(--color-primary-light)",
    highlighted: true,
    items: [
      { ok: true, text: "Voo + visto + seguro no mesmo lugar" },
      { ok: true, text: "Consultoria 1x1 humanizada" },
      { ok: true, text: "Especialistas em Portugal e Europa" },
      { ok: true, text: "Primeira conversa sempre gratuita" },
      { ok: true, text: "Sem formulário, sem robô" },
    ],
  },
];

const testimonials = [
  {
    text: "Fiquei meses pesquisando sobre o visto D7 e nunca avancei de verdade. Mandei mensagem pra eles sem expectativa — em 4 meses estava em Lisboa com visto, apartamento e emprego.",
    name: "Marina S.",
    location: "Lisboa, Portugal",
    date: "Março 2026",
  },
  {
    text: "Tentei entender o processo de visto sozinho e desisti três vezes. Com a Nômade Voyage foi diferente: me deram um roteiro claro, sem juridiquês, sem enrolação.",
    name: "Rafael M.",
    location: "Madrid, Espanha",
    date: "Janeiro 2026",
  },
  {
    text: "O que me convenceu foi a conversa. Não tentaram me vender nada de cara — entenderam o meu caso e me mostraram se fazia sentido. Isso é raro numa agência.",
    name: "Camila T.",
    location: "Dublin, Irlanda",
    date: "Fevereiro 2026",
  },
];

const trustItems = [
  { icon: Shield, label: "Agência registrada" },
  { icon: Star,   label: "+200 brasileiros atendidos" },
  { icon: Check,  label: "Sem formulário, sem robô" },
  { icon: MapPin, label: "Portugal · Espanha · Irlanda · EUA" },
];

// ── Page ───────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <FloatingWhatsApp />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="hero-gradient"
        style={{ paddingTop: "var(--section-hero-pt)", paddingBottom: "var(--section-y)" }}
      >
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center" style={{ gap: "var(--gap-xl)" }}>
            <div className="flex-1 max-w-2xl">
              <span className="badge badge-accent mb-5 inline-flex">Para quem quer morar, explorar e viajar fora</span>
              <h1 style={{ fontSize: "var(--text-hero)", fontWeight: 700, color: "white", lineHeight: 1.05, marginBottom: "var(--space-8)" }}>
                A agência para quem quer pertencer ao mundo.
              </h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-lg)", color: "var(--color-white-high)", lineHeight: 1.65, marginBottom: "var(--space-10)", maxWidth: "520px" }}>
                Você já pesquisou, já salvou os posts, já assistiu os vídeos. O que falta é alguém que te mostre o caminho de verdade — passagem, visto, seguro e tudo mais, sem enrolação.
              </p>
              <div className="flex flex-wrap" style={{ gap: "var(--gap-xs)" }}>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                  <MessageCircle size={20} />
                  Falar no WhatsApp
                </a>
                <a href="#morar" className="btn-secondary" style={{ borderColor: "var(--color-white-xlow)", color: "white" }}>
                  Quero morar fora
                  <ArrowRight size={18} />
                </a>
              </div>

              <div className="flex flex-wrap" style={{ gap: "var(--gap-sm)", marginTop: "var(--space-10)" }}>
                {trustItems.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center" style={{ gap: "var(--space-2)" }}>
                    <Icon size={15} color="var(--color-white-mid)" />
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-white-mid)" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex flex-1 justify-center">
              <div style={{
                width: 400, height: 400,
                borderRadius: "var(--radius-xl)",
                background: "var(--color-white-ghost)",
                border: "1px solid var(--color-white-border)",
                backdropFilter: "blur(12px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexDirection: "column", gap: "var(--gap-md)",
              }}>
                <span style={{ fontSize: 72 }}>🌍</span>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "var(--text-h4)", color: "white", textAlign: "center" }}>
                  Seu próximo capítulo<br />começa aqui.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS STRIP ──────────────────────────────────────────────────── */}
      <section style={{ background: "var(--color-surface)", paddingTop: "var(--gap-xl)", paddingBottom: "var(--gap-xl)" }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: "var(--gap-md)" }}>
            {stats.map(({ number, label }) => (
              <div key={label} className="text-center" style={{ padding: "var(--space-6) var(--space-4)" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(28px, 4vw, 40px)", color: "var(--color-primary)", lineHeight: 1, marginBottom: "var(--space-2)" }}>
                  {number}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-muted-foreground)", lineHeight: 1.4 }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. POR QUE AS PESSOAS NÃO SAEM ─────────────────────────────────── */}
      <section style={{ background: "var(--color-background)" }}>
        <div className="container">
          <div className="section-header">
            <span className="badge mb-4 inline-flex">O que impede quem quer ir</span>
            <h2>4 em cada 10 brasileiros querem morar fora.<br />Por que a maioria nunca vai?</h2>
            <p className="section-subtitle">
              Não é falta de vontade. É falta de clareza, de confiança e de alguém que mostre o caminho inteiro.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "var(--gap-md)" }}>
            {pains.map(({ icon: Icon, title, description }) => (
              <div key={title} className="card flex flex-col">
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 48, height: 48,
                    borderRadius: "var(--radius-lg)",
                    background: "#FFF7ED",
                    marginBottom: "var(--space-6)",
                  }}
                >
                  <Icon size={22} color="var(--color-accent)" />
                </div>
                <h3 style={{ fontSize: "var(--text-h4)", fontWeight: 600, marginBottom: "var(--space-4)", color: "var(--color-primary)" }}>{title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body)", color: "var(--color-muted-foreground)", lineHeight: 1.7 }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
          <p style={{
            fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "var(--text-body-lg)",
            color: "var(--color-primary)", textAlign: "center", marginTop: "var(--gap-lg)",
          }}>
            Essas três barreiras são exatamente o que a Nômade Voyage remove.
          </p>
        </div>
      </section>

      {/* ── 4. PILARES ──────────────────────────────────────────────────────── */}
      <section id="viajar" style={{ background: "var(--color-surface)" }}>
        <div className="container">
          <div className="section-header">
            <span className="badge mb-4 inline-flex">O que fazemos</span>
            <h2>Qualquer passo — do primeiro voo ao novo endereço</h2>
            <p className="section-subtitle">
              Seja para conhecer o mundo ou para recomeçar do outro lado do oceano, cada jornada começa com uma conversa.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "var(--gap-md)" }}>
            {pillars.map(({ id, icon: Icon, badge, title, description, items }) => (
              <div key={id} id={id} className="card flex flex-col">
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 48, height: 48,
                    borderRadius: "var(--radius-lg)",
                    background: "var(--color-muted)",
                    marginBottom: "var(--space-6)",
                  }}
                >
                  <Icon size={24} color="var(--color-primary-light)" />
                </div>
                <span className="badge mb-4 self-start">{badge}</span>
                <h3 style={{ fontSize: "var(--text-h3)", marginBottom: "var(--space-4)" }}>{title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body)", color: "var(--color-muted-foreground)", lineHeight: 1.7, marginBottom: "var(--space-8)" }}>
                  {description}
                </p>
                <ul className="flex flex-col mt-auto" style={{ gap: "var(--space-3)" }}>
                  {items.map((item) => (
                    <li key={item} className="flex items-center" style={{ gap: "var(--space-3)" }}>
                      <Check size={14} color="var(--color-primary-light)" />
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-muted-foreground)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. DESTINO ÂNCORA: PORTUGAL ─────────────────────────────────────── */}
      <section id="destinos" style={{ background: "var(--color-background)" }}>
        <div className="container">
          <div className="section-header">
            <span className="badge mb-4 inline-flex">Destino #1</span>
            <h2>Portugal — onde a maioria dos nossos clientes chega</h2>
            <p className="section-subtitle">
              6,7% de todos os brasileiros que emigram vão para Portugal. É o destino mais buscado, mais acessível em termos de visto — e onde temos mais experiência.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row" style={{ gap: "var(--gap-xl)" }}>
            {/* Por que Portugal */}
            <div className="flex-1">
              <h3 style={{ fontSize: "var(--text-h3)", marginBottom: "var(--space-8)" }}>Por que Portugal?</h3>
              <ul className="flex flex-col" style={{ gap: "var(--space-4)", marginBottom: "var(--space-10)" }}>
                {portugueseReasons.map((r) => (
                  <li key={r} className="flex items-start" style={{ gap: "var(--space-3)" }}>
                    <CheckCircle2 size={18} color="var(--color-primary-light)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body)", color: "var(--color-foreground)", lineHeight: 1.6 }}>{r}</span>
                  </li>
                ))}
              </ul>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <MessageCircle size={18} />
                Quero entender o meu caso
              </a>
            </div>

            {/* Visas */}
            <div className="flex-1 flex flex-col" style={{ gap: "var(--gap-md)" }}>
              <h3 style={{ fontSize: "var(--text-h3)", marginBottom: "var(--space-2)" }}>Qual visto é o seu?</h3>
              {visas.map(({ icon: Icon, code, name, for: forText, income, timeline }) => (
                <div key={code} className="card">
                  <div className="flex items-center" style={{ gap: "var(--space-4)", marginBottom: "var(--space-4)" }}>
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: 44, height: 44,
                        borderRadius: "var(--radius-md)",
                        background: "var(--color-muted)",
                      }}
                    >
                      <Icon size={20} color="var(--color-primary-light)" />
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-h4)", color: "var(--color-primary)" }}>
                        Visto {code} — {name}
                      </p>
                    </div>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-muted-foreground)", lineHeight: 1.6, marginBottom: "var(--space-4)" }}>
                    {forText}
                  </p>
                  <div className="flex flex-wrap" style={{ gap: "var(--gap-xs)" }}>
                    <span className="badge">{income}</span>
                    <span className="badge">{timeline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. COMO FUNCIONA ────────────────────────────────────────────────── */}
      <section style={{ background: "var(--color-surface)" }}>
        <div className="container">
          <div className="section-header">
            <span className="badge mb-4 inline-flex">Simples assim</span>
            <h2>Como funciona</h2>
            <p className="section-subtitle">
              Nada de formulário longo. Uma conversa, um plano — você parte.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "var(--gap-lg)" }}>
            {steps.map(({ number, icon: Icon, title, description }) => (
              <div key={number} className="flex flex-col items-center text-center">
                <div className="relative" style={{ marginBottom: "var(--space-8)" }}>
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: 64, height: 64,
                      borderRadius: "var(--radius-full)",
                      background: "var(--color-muted)",
                      border: "2px solid var(--color-border)",
                    }}
                  >
                    <Icon size={26} color="var(--color-primary-light)" />
                  </div>
                  <span style={{
                    position: "absolute", top: -8, right: -8,
                    fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-micro)",
                    color: "white", background: "var(--color-accent)",
                    width: 24, height: 24, borderRadius: "var(--radius-full)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>{number}</span>
                </div>
                <h3 style={{ fontSize: "var(--text-h3)", marginBottom: "var(--space-4)" }}>{title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body)", color: "var(--color-muted-foreground)", lineHeight: 1.7 }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center" style={{ marginTop: "var(--gap-xl)" }}>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <MessageCircle size={18} />
              Começar agora no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── 7. POR QUE A NÔMADE VOYAGE ──────────────────────────────────────── */}
      <section style={{ background: "var(--color-muted)" }}>
        <div className="container">
          <div className="section-header">
            <span className="badge mb-4 inline-flex">Compare antes de decidir</span>
            <h2>Existem três formas de fazer isso.<br />Só uma funciona de verdade.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "var(--gap-md)" }}>
            {comparisons.map(({ label, tag, tagColor, tagBg, highlighted, items }) => (
              <div
                key={label}
                className="card flex flex-col"
                style={highlighted ? {
                  border: "2px solid var(--color-primary-light)",
                  boxShadow: "var(--shadow-lg)",
                  transform: "translateY(-4px)",
                } : { opacity: 0.85 }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-6)" }}>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-h4)", color: "var(--color-primary)" }}>
                    {label}
                  </p>
                  <span
                    style={{
                      fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "var(--text-micro)",
                      color: tagColor, background: tagBg,
                      padding: "3px 10px", borderRadius: "var(--radius-full)",
                    }}
                  >
                    {tag}
                  </span>
                </div>
                <ul className="flex flex-col" style={{ gap: "var(--space-4)" }}>
                  {items.map(({ ok, text }) => (
                    <li key={text} className="flex items-start" style={{ gap: "var(--space-3)" }}>
                      {ok
                        ? <CheckCircle2 size={16} color="var(--color-primary-light)" style={{ flexShrink: 0, marginTop: 2 }} />
                        : <XCircle size={16} color="#DC2626" style={{ flexShrink: 0, marginTop: 2 }} />
                      }
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-muted-foreground)", lineHeight: 1.5 }}>
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
                {highlighted && (
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp justify-center"
                    style={{ marginTop: "var(--space-8)", fontSize: "var(--text-body-sm)", padding: "12px 20px" }}
                  >
                    <MessageCircle size={16} />
                    Começar agora
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. DEPOIMENTOS ──────────────────────────────────────────────────── */}
      <section style={{ background: "var(--color-background)" }}>
        <div className="container">
          <div className="section-header">
            <span className="badge mb-4 inline-flex">Quem já deu o passo</span>
            <h2>Brasileiros que saíram da paralisia</h2>
            <p className="section-subtitle">
              Não são influenciadores. São pessoas que estavam exatamente onde você está agora.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "var(--gap-md)" }}>
            {testimonials.map(({ text, name, location, date }) => (
              <div key={name} className="card" style={{ background: "var(--color-surface)" }}>
                <div className="flex" style={{ gap: "var(--space-1)", marginBottom: "var(--space-6)" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="var(--color-accent)" color="var(--color-accent)" />
                  ))}
                </div>
                <p style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "var(--text-body-md)", color: "var(--color-primary)", lineHeight: 1.7, marginBottom: "var(--space-8)" }}>
                  "{text}"
                </p>
                <div
                  className="flex items-center border-t border-[var(--color-border)]"
                  style={{ gap: "var(--gap-xs)", paddingTop: "var(--space-4)" }}
                >
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 36, height: 36,
                      borderRadius: "var(--radius-full)",
                      background: "var(--color-muted)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <User size={16} color="var(--color-primary-light)" />
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "var(--text-body-sm)", color: "var(--color-foreground)" }}>{name}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)" }}>{location} · {date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ──────────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--color-surface)" }}>
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

      {/* ── 10. CTA FINAL ───────────────────────────────────────────────────── */}
      <section style={{ background: "var(--color-primary)" }}>
        <div className="container text-center">
          <span className="badge badge-accent mb-5 inline-flex">A conversa é gratuita</span>
          <h2 style={{ fontSize: "var(--text-display)", fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: "var(--space-6)" }}>
            Ainda não sabe por onde começar?<br />É exatamente aí que a gente entra.
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-lg)", color: "var(--color-white-high)", maxWidth: "480px", margin: "0 auto", marginBottom: "var(--space-10)", lineHeight: 1.65 }}>
            Manda uma mensagem no WhatsApp. É grátis, sem compromisso e sem robô — só uma conversa real.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: "var(--gap-sm)" }}>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp" style={{ fontSize: "var(--text-body-md)", padding: "var(--space-4) var(--space-8)" }}>
              <MessageCircle size={22} />
              Iniciar conversa no WhatsApp
            </a>
            <a
              href={WA_GUIDE}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "var(--text-body-sm)",
                color: "var(--color-white-high)", textDecoration: "underline",
                textUnderlineOffset: 3, cursor: "pointer",
              }}
            >
              ou peça o guia gratuito: Como morar em Portugal →
            </a>
          </div>
        </div>
      </section>

      {/* ── 11. FOOTER ──────────────────────────────────────────────────────── */}
      <footer style={{ background: "var(--color-footer)", paddingTop: "var(--gap-xl)", paddingBottom: "var(--gap-lg)" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-white/10" style={{ gap: "var(--gap-lg)", paddingBottom: "var(--gap-lg)" }}>
            <div>
              <div className="flex items-center" style={{ gap: "10px", marginBottom: "var(--space-3)" }}>
                <img src="/logo-icon.svg" alt="Nômade Voyage" width={28} height={28} style={{ display: "block", opacity: 0.9 }} />
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-h4)", color: "white" }}>
                  Nômade Voyage
                </p>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-white-low)", lineHeight: 1.65 }}>
                Sua agência para morar,<br />explorar e viajar fora.
              </p>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "var(--text-caption)", color: "var(--color-white-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "var(--space-3)" }}>
                Serviços
              </p>
              {["Passagens aéreas", "Pacotes de viagem", "Seguro viagem", "Vistos e imigração"].map((item) => (
                <p key={item} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-white-low)", marginBottom: "var(--space-2)" }}>{item}</p>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "var(--text-caption)", color: "var(--color-white-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "var(--space-3)" }}>
                Contato
              </p>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp" style={{ padding: "10px 18px", fontSize: "var(--text-body-sm)", display: "inline-flex" }}>
                <MessageCircle size={16} />
                WhatsApp
              </a>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-white-xlow)", marginTop: "var(--space-3)" }}>
                Instagram: @_nomadevoyage
              </p>
            </div>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-white-ghost)", marginTop: "var(--space-6)", textAlign: "center" }}>
            © 2026 Nômade Voyage · Todos os direitos reservados
          </p>
        </div>
      </footer>
    </>
  );
}

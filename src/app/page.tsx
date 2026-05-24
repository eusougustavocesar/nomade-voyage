import Image from "next/image";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Reveal from "@/components/Reveal";
import Logo from "@/components/Logo";
import {
  MapPin, MessageCircle, Plane, Building2, Compass,
  ArrowRight, Check, Star, Shield, FileText, HeartHandshake, User, Clock,
} from "lucide-react";

const WA_LINK  = "https://wa.me/351962221594?text=Olá!%20Vim%20pelo%20site%20da%20Nômade%20Voyage%20e%20quero%20saber%20mais.";
const WA_GUIDE = "https://wa.me/351962221594?text=Olá!%20Quero%20dicas%20sobre%20como%20planejar%20minha%20viagem%20para%20a%20Europa.";

// ── Dados ──────────────────────────────────────────────────────────────────────

const stats = [
  { number: "+200", label: "Viagens realizadas" },
  { number: "4",    label: "Destinos âncora na Europa" },
  { number: "100%", label: "Atendimento humano 1x1" },
  { number: "R$ 0", label: "Na primeira consulta" },
];

const destinations = [
  {
    id: "lisboa",
    photo: "/dest-lisboa.jpg",
    city: "Lisboa",
    country: "Portugal",
    tagline: "A favorita dos brasileiros",
    description: "Fado, pastéis de Belém e o Tejo ao entardecer. A cidade europeia mais acolhedora para quem vem do Brasil.",
  },
  {
    id: "madrid",
    photo: "/dest-madrid.jpg",
    city: "Madrid",
    country: "Espanha",
    tagline: "Arte, gastronomia e energia",
    description: "A capital espanhola que não decepciona — museus, mercados e uma vida noturna que não acaba.",
  },
  {
    id: "dublin",
    photo: "/dest-dublin.jpg",
    city: "Dublin",
    country: "Irlanda",
    tagline: "Charme, pubs e paisagens verdes",
    description: "Pubs históricos, cliffs de tirar o fôlego e um charme único que faz querer voltar.",
  },
];

const services = [
  {
    icon: Plane,
    title: "Passagens aéreas",
    description: "Já encontramos São Paulo, Lisboa em menos de 14h com escala em Frankfurt, por R$ 2.800 ida e volta. Cada rota é curada: sem escala inútil, sem tarifa-armadilha.",
    items: ["Nacionais e internacionais", "Melhor custo por rota e duração", "Suporte para alterações e cancelamentos"],
  },
  {
    icon: Building2,
    title: "Hotéis e acomodações",
    description: "De hostel boutique no Bairro Alto a hotel com vista para o Castelo de São Jorge — indicamos o que combina com o seu perfil e reservamos por você.",
    items: ["Hotéis boutique e resorts selecionados", "Hostels com curadoria para mochileiros", "Apartamentos para estadias longas"],
  },
  {
    icon: Compass,
    title: "Roteiro personalizado",
    description: "Tarde livre em Sintra, jantar num tasca que nenhum guia do Google conhece, passeio a pé pelos canais de Dublin. Cada dia pensado para você — nada genérico.",
    items: ["Itinerário personalizado por destino", "Dicas exclusivas de locais", "Seguro viagem incluído"],
  },
];

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
    description: "Entendemos o seu perfil, destino e orçamento. Você recebe um plano completo: passagens, hotéis, experiências e seguro — sem surpresa.",
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
    icon: HeartHandshake,
    title: "Humano de verdade",
    description: "Sem formulário, sem robô. Você fala diretamente com quem já esteve no destino e sabe o que realmente vale a pena visitar.",
  },
  {
    icon: Shield,
    title: "Tudo em um lugar",
    description: "Passagens, hotéis, seguro e roteiro — um único contato, zero correria. Sem ficar pulando entre 4 sites diferentes.",
  },
  {
    icon: MessageCircle,
    title: "Primeira consulta gratuita",
    description: "Antes de qualquer compromisso, entendemos o que você quer e mostramos o que é possível dentro do seu orçamento. Sem pressão.",
  },
];

const testimonials = [
  {
    text: "Era minha primeira viagem internacional, fui sozinha. Não sabia nem como pesquisar passagem. Em menos de uma semana, tinha tudo: voo, hotel no centro de Lisboa e roteiro dia a dia. 10 dias, zero contratempo. Nunca me senti perdida.",
    name: "Marina Souza",
    trip: "Primeira viagem solo, Lisboa, 10 dias",
    location: "São Paulo, SP",
    date: "Março 2026",
  },
  {
    text: "Tentei planejar duas vezes e desisti. Aqui foi diferente: 3 dias de conversa no WhatsApp e tinha Lisboa, Sevilha e Madrid resolvidos, 14 dias, 3 países, dentro do orçamento que eu coloquei. Me avisaram de uma greve de trens antes de eu embarcar.",
    name: "Rafael Mendes",
    trip: "Lua de mel, Portugal e Espanha, 14 dias",
    location: "Belo Horizonte, MG",
    date: "Janeiro 2026",
  },
  {
    text: "O que me ganhou foi que não tentaram me empurrar o mais caro. Perguntaram quanto eu tinha e o que eu gostava, e montaram o que fazia sentido. Dublin com 8 dias, hostels incríveis, excursão para os Cliffs of Moher. Voltei apaixonada pela Irlanda.",
    name: "Camila Torres",
    trip: "Viagem solo, Dublin e interior da Irlanda, 8 dias",
    location: "Rio de Janeiro, RJ",
    date: "Fevereiro 2026",
  },
];

const trustItems = [
  { icon: Shield, label: "Agência registrada" },
  { icon: Star,   label: "+200 viagens realizadas" },
  { icon: Clock,  label: "Máx. 8 grupos por mês" },
  { icon: MapPin, label: "Portugal · Espanha · Irlanda · EUA" },
];

// ── Page ───────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <FloatingWhatsApp />

      {/* ── 1. HERO — full-bleed ─────────────────────────────────────────────── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <Image
          src="/hero-window.jpg"
          alt="Vista europeia ao entardecer"
          fill
          priority
          quality={90}
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.60) 50%, rgba(0,0,0,0.80) 100%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "calc(var(--nav-height) + var(--gap-xl))", paddingBottom: "var(--gap-xl)" }}>
          <div className="flex flex-col items-center text-center" style={{ maxWidth: 700, margin: "0 auto" }}>
            <span className="badge badge-accent mb-6 inline-flex hero-enter" style={{ gap: 6 }}>
              <Clock size={11} />
              Vagas abertas para junho · Consulta gratuita
            </span>
            <h1 className="hero-enter hero-enter-delay-1" style={{ fontSize: "var(--text-hero)", fontWeight: 700, color: "white", lineHeight: 1.05, marginBottom: "var(--space-8)" }}>
              Para quem sempre disse:<br />&ldquo;ano que vem, vou à Europa.&rdquo;
            </h1>
            <p className="hero-enter hero-enter-delay-2" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-lg)", color: "var(--color-white-high)", lineHeight: 1.65, marginBottom: "var(--space-10)", maxWidth: "540px" }}>
              Passagens, hotéis, seguro e roteiro completo no WhatsApp, com atendimento humano. Você aproveita cada dia. A gente cuida do resto.
            </p>
            <div className="flex flex-wrap justify-center hero-enter hero-enter-delay-3" style={{ gap: "var(--gap-xs)" }}>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <MessageCircle size={20} />
                Planejar minha viagem
              </a>
              <a href="#destinos" className="btn-secondary" style={{ borderColor: "var(--color-white-xlow)", color: "white" }}>
                Ver destinos
                <ArrowRight size={18} />
              </a>
            </div>
            <div className="flex flex-wrap justify-center hero-enter hero-enter-delay-4" style={{ gap: "var(--gap-sm)", marginTop: "var(--space-10)" }}>
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center" style={{ gap: "var(--space-2)" }}>
                  <Icon size={15} color="var(--color-white-mid)" />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-white-mid)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS STRIP ──────────────────────────────────────────────────── */}
      <section style={{ background: "var(--color-surface)", paddingTop: "var(--gap-xl)", paddingBottom: "var(--gap-xl)" }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: "var(--gap-md)" }}>
            {stats.map(({ number, label }, i) => (
              <Reveal key={label} delay={((i % 3 + 1) as 1 | 2 | 3)}>
                <div className="text-center" style={{ padding: "var(--space-6) var(--space-4)" }}>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(28px, 4vw, 40px)", color: "var(--color-primary)", lineHeight: 1, marginBottom: "var(--space-2)" }}>
                    {number}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-muted-foreground)", lineHeight: 1.4 }}>
                    {label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. DESTINOS — photo cards ────────────────────────────────────────── */}
      <section id="destinos" style={{ background: "var(--color-background)" }}>
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="badge mb-4 inline-flex">Destinos favoritos dos nossos clientes</span>
              <h2>Onde você quer estar?</h2>
              <p className="section-subtitle">
                Lisboa, Madrid ou Dublin — roteiros personalizados, hotéis curados e tudo planejado para você aproveitar cada momento.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "var(--gap-md)" }}>
            {destinations.map(({ id, photo, city, country, tagline, description }, i) => (
              <Reveal key={id} delay={((i + 1) as 1 | 2 | 3)}>
                <div
                  className="group"
                  style={{ position: "relative", height: 520, borderRadius: "var(--radius-xl)", overflow: "hidden" }}
                >
                  <Image
                    src={photo}
                    alt={`${city}, ${country}`}
                    fill
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="transition-transform duration-500 ease-out group-hover:scale-105"
                    style={{ objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(7,19,30,0.92) 0%, rgba(7,19,30,0.30) 55%, transparent 100%)" }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "var(--card-padding)" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", fontWeight: 500, color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "var(--space-1)" }}>{country}</span>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(28px, 3vw, 38px)", color: "white", marginBottom: "var(--space-3)", lineHeight: 1.05 }}>{city}</h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "rgba(255,255,255,0.72)", lineHeight: 1.6, marginBottom: "var(--space-6)" }}>{description}</p>
                    <span style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", fontWeight: 500, padding: "5px 14px", borderRadius: "var(--radius-full)", border: "1px solid rgba(255,255,255,0.18)", width: "fit-content" }}>{tagline}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CURADOR ──────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--color-surface)" }}>
        <div className="container">
          <Reveal>
            <div className="flex flex-col md:flex-row items-center" style={{ gap: "var(--gap-xl)", maxWidth: 860, margin: "0 auto" }}>
              <div className="flex-shrink-0 flex flex-col items-center" style={{ gap: "var(--space-4)" }}>
                <div className="flex items-center justify-center" style={{ width: 120, height: 120, borderRadius: "var(--radius-full)", background: "var(--color-muted)", border: "2px solid var(--color-border)" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 38, color: "var(--color-primary)", letterSpacing: "-0.02em" }}>NV</span>
                </div>
                <div className="flex" style={{ gap: 3 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="var(--color-accent)" color="var(--color-accent)" />)}
                </div>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)" }}>+200 viagens</span>
              </div>
              <div>
                <span className="badge mb-4 inline-flex">Quem cuida da sua viagem</span>
                <h2 style={{ textAlign: "left", fontSize: "var(--text-h2)", marginBottom: "var(--space-6)" }}>Planejado por quem morou e viveu lá.</h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-md)", color: "var(--color-muted-foreground)", lineHeight: 1.75, marginBottom: "var(--space-4)" }}>
                  Fui a Lisboa pela primeira vez sem saber nada, com o hotel no lugar errado e um mapa de papel. Adorei, mas aprendi da forma difícil. Desde então, já planejei mais de 200 viagens para brasileiros que queriam ir à Europa sem cometer os mesmos erros que eu.
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-md)", color: "var(--color-muted-foreground)", lineHeight: 1.75 }}>
                  Cada viagem é atendida pessoalmente. Sem terceirização, sem chatbot, sem formulário. Você fala comigo do primeiro &ldquo;como funciona?&rdquo; até o &ldquo;cheguei bem, obrigado.&rdquo;
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5. SERVIÇOS ─────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--color-muted)" }}>
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="badge mb-4 inline-flex">O que a gente resolve por você</span>
              <h2>Você escolhe o destino. A gente cuida do resto.</h2>
              <p className="section-subtitle">
                Do início ao fim — passagens, acomodação, seguro e roteiro personalizado, tudo em uma única conversa no WhatsApp.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "var(--gap-md)" }}>
            {services.map(({ icon: Icon, title, description, items }, i) => (
              <Reveal key={title} delay={((i + 1) as 1 | 2 | 3)}>
                <div className="card flex flex-col">
                  <div className="flex items-center justify-center flex-shrink-0" style={{ width: 48, height: 48, borderRadius: "var(--radius-lg)", background: "var(--color-muted)", marginBottom: "var(--space-6)" }}>
                    <Icon size={22} color="var(--color-primary-light)" />
                  </div>
                  <h3 style={{ fontSize: "var(--text-h4)", fontWeight: 600, marginBottom: "var(--space-4)", color: "var(--color-primary)" }}>{title}</h3>
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. COMO FUNCIONA ────────────────────────────────────────────────── */}
      <section style={{ background: "var(--color-background)" }}>
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
          <div className="flex justify-center" style={{ marginTop: "var(--gap-xl)" }}>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <MessageCircle size={18} />
              Começar agora no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── 6. POR QUE A NÔMADE VOYAGE ──────────────────────────────────────── */}
      <section style={{ background: "var(--color-surface)" }}>
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="badge mb-4 inline-flex">Por que a Nômade Voyage</span>
              <h2>Três diferenciais que mudam tudo</h2>
              <p className="section-subtitle">
                Não somos o Google nem um formulário. Somos pessoas que já foram a esses destinos e sabem o que funciona.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "var(--gap-md)" }}>
            {differentials.map(({ icon: Icon, title, description }, i) => (
              <Reveal key={title} delay={((i + 1) as 1 | 2 | 3)}>
                <div className="card flex flex-col items-center text-center h-full">
                  <div className="flex items-center justify-center flex-shrink-0" style={{ width: 56, height: 56, borderRadius: "var(--radius-full)", background: "var(--color-muted)", border: "2px solid var(--color-border)", marginBottom: "var(--space-6)" }}>
                    <Icon size={24} color="var(--color-primary-light)" />
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

      {/* ── 7. DEPOIMENTOS ──────────────────────────────────────────────────── */}
      <section style={{ background: "var(--color-muted)" }}>
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="badge mb-4 inline-flex">Quem já foi</span>
              <h2>De quem planejou com a gente</h2>
              <p className="section-subtitle">
                Brasileiros que trocaram horas de pesquisa por uma conversa no WhatsApp.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "var(--gap-md)" }}>
            {testimonials.map(({ text, name, trip, location, date }, i) => (
              <Reveal key={name} delay={((i + 1) as 1 | 2 | 3)}>
                <div className="card" style={{ background: "var(--color-surface)" }}>
                  <div className="flex" style={{ gap: "var(--space-1)", marginBottom: "var(--space-6)" }}>
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} size={15} fill="var(--color-accent)" color="var(--color-accent)" />
                    ))}
                  </div>
                  <p style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "var(--text-body-md)", color: "var(--color-primary)", lineHeight: 1.7, marginBottom: "var(--space-8)" }}>
                    &ldquo;{text}&rdquo;
                  </p>
                  <div className="flex items-start border-t border-[var(--color-border)]" style={{ gap: "var(--gap-xs)", paddingTop: "var(--space-4)" }}>
                    <div className="flex items-center justify-center flex-shrink-0" style={{ width: 36, height: 36, borderRadius: "var(--radius-full)", background: "var(--color-muted)", border: "1px solid var(--color-border)", marginTop: 2 }}>
                      <User size={16} color="var(--color-primary-light)" />
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "var(--text-body-sm)", color: "var(--color-foreground)" }}>{name}</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-accent)", fontWeight: 500, marginTop: 2 }}>{trip}</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)", marginTop: 1 }}>{location} · {date}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ──────────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--color-background)" }}>
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

      {/* ── 9. CTA FINAL ────────────────────────────────────────────────────── */}
      <section style={{ background: "#111111" }}>
        <div className="container text-center">
          <span className="badge badge-accent mb-5 inline-flex" style={{ gap: 6 }}>
            <Clock size={11} />
            Consulta gratuita · Máx. 8 grupos por mês
          </span>
          <h2 style={{ fontSize: "var(--text-display)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "var(--space-6)" }}>
            O &ldquo;ano que vem&rdquo;<br />começa agora.
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-lg)", color: "var(--color-white-high)", maxWidth: "480px", margin: "0 auto", marginBottom: "var(--space-6)", lineHeight: 1.65 }}>
            Manda uma mensagem no WhatsApp. É grátis, sem compromisso, sem robô. Uma conversa real sobre a sua viagem.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-white-muted)", maxWidth: "360px", margin: "0 auto", marginBottom: "var(--space-10)", lineHeight: 1.6 }}>
            Atendemos no máximo 8 grupos por mês. Consulte a disponibilidade para a sua data.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: "var(--gap-sm)" }}>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp" style={{ fontSize: "var(--text-body-md)", padding: "var(--space-4) var(--space-8)" }}>
              <MessageCircle size={22} />
              Planejar minha viagem agora
            </a>
            <a href={WA_GUIDE} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "var(--text-body-sm)", color: "var(--color-white-high)", textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer" }}>
              ou peça dicas gratuitas sobre a Europa →
            </a>
          </div>
        </div>
      </section>

      {/* ── 10. FOOTER ──────────────────────────────────────────────────────── */}
      <footer style={{ background: "var(--color-footer)", paddingTop: "var(--gap-xl)", paddingBottom: "var(--gap-lg)" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-white/10" style={{ gap: "var(--gap-lg)", paddingBottom: "var(--gap-lg)" }}>
            <div>
              <div style={{ marginBottom: "var(--space-3)" }}>
                <Logo size={28} theme="dark" />
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-white-low)", lineHeight: 1.65 }}>
                Viagens para a Europa planejadas<br />por quem conhece cada destino.
              </p>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "var(--text-caption)", color: "var(--color-white-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "var(--space-3)" }}>
                Serviços
              </p>
              {["Passagens aéreas", "Hotéis e acomodações", "Roteiros personalizados", "Seguro viagem"].map((item) => (
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

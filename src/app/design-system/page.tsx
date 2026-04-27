"use client";

import Logo from "@/components/Logo";
import {
  Plane,
  Compass,
  Home,
  MessageCircle,
  ArrowRight,
  Check,
  Star,
  Globe,
  Shield,
  MapPin,
  ChevronDown,
  Search,
  User,
  Mail,
  Phone,
} from "lucide-react";

// ─── Section wrapper ───────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-12 border-b border-[var(--color-border)]">
      <h2 className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted-foreground)] mb-8">
        {title}
      </h2>
      {children}
    </section>
  );
}

// ─── Color Swatch ──────────────────────────────────────────────────────────────
function Swatch({ name, hex, token, textDark = false }: { name: string; hex: string; token: string; textDark?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 rounded-[var(--radius-lg)] border border-[var(--color-border)]"
        style={{ background: hex }}
      />
      <div>
        <p className={`text-sm font-medium ${textDark ? "text-[var(--color-foreground)]" : "text-[var(--color-foreground)]"}`}>{name}</p>
        <p className="text-xs text-[var(--color-muted-foreground)] font-mono">{hex}</p>
        <p className="text-xs text-[var(--color-muted-foreground)] font-mono">{token}</p>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <div style={{ background: "var(--color-background)", minHeight: "100vh" }}>
      {/* Header */}
      <div className="hero-gradient py-16">
        <div className="container">
          <span className="badge badge-accent mb-4">Design System</span>
          <div className="mt-2 mb-1">
            <Logo size={52} theme="dark" />
          </div>
          <p className="text-lg text-white/80 mt-3 max-w-xl">
            Referência visual completa — cores, tipografia, componentes e padrões de layout.
          </p>
        </div>
      </div>

      <div className="container py-12">

        {/* ── LOGO ── */}
        <Section title="00 — Logotipo">
          {/* Versões */}
          <p className="text-sm font-medium text-[var(--color-foreground)] mb-4">Versões</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {/* Fundo claro */}
            <div className="card flex flex-col gap-4 p-8">
              <p className="text-xs text-[var(--color-muted-foreground)] font-medium uppercase tracking-widest">Fundo claro</p>
              <Logo size={40} />
              <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--color-muted-foreground)" }}>
                Uso padrão — fundo branco ou #F0F9FF
              </p>
            </div>

            {/* Fundo escuro */}
            <div className="card flex flex-col gap-4 p-8" style={{ background: "var(--color-primary)" }}>
              <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>Fundo escuro</p>
              <Logo size={40} theme="dark" />
              <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
                Navbar hero, footer — fundo #0C4A6E
              </p>
            </div>

            {/* Ícone isolado */}
            <div className="card flex flex-col gap-4 p-8">
              <p className="text-xs text-[var(--color-muted-foreground)] font-medium uppercase tracking-widest">Ícone isolado</p>
              <div className="flex items-center gap-5">
                <img src="/logo-icon.svg" alt="Nômade Voyage" width={48} height={48} />
                <img src="/logo-icon.svg" alt="Nômade Voyage" width={32} height={32} />
                <img src="/logo-icon.svg" alt="Nômade Voyage" width={20} height={20} />
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--color-muted-foreground)" }}>
                Favicon, app icon, avatar — sem wordmark
              </p>
            </div>
          </div>

          {/* Tamanhos e espaçamento */}
          <p className="text-sm font-medium text-[var(--color-foreground)] mb-4">Tamanhos de uso</p>
          <div className="card p-6 mb-8">
            <div className="flex flex-wrap items-end gap-8">
              {[
                { size: 48, label: "48px — Hero / splash" },
                { size: 40, label: "40px — Seções destacadas" },
                { size: 32, label: "32px — Navbar" },
                { size: 28, label: "28px — Footer" },
                { size: 20, label: "20px — Mín. recomendado" },
              ].map(({ size, label }) => (
                <div key={size} className="flex flex-col items-center gap-3">
                  <img src="/logo-icon.svg" alt="" width={size} height={size} />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--color-muted-foreground)", textAlign: "center", maxWidth: 80 }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dos & don'ts */}
          <p className="text-sm font-medium text-[var(--color-foreground)] mb-4">Uso correto</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Do */}
            <div className="p-6 rounded-[var(--radius-lg)] border-2 border-[#166534] bg-[#F0FDF4]">
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "12px", color: "#166534", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "16px" }}>
                ✓ Correto
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  "Usar sempre sobre fundos lisos (branco, #F0F9FF, #0C4A6E)",
                  "Manter proporção original — nunca distorcer",
                  "Respeitar área de respiro mínima equivalente a ½ do ícone",
                  "Tamanho mínimo: 20px (ícone) — abaixo usar só wordmark",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Check size={13} color="#166534" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#166534", lineHeight: 1.5 }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Don't */}
            <div className="p-6 rounded-[var(--radius-lg)] border-2 border-[#DC2626] bg-[#FEF2F2]">
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "12px", color: "#DC2626", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "16px" }}>
                ✗ Incorreto
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  "Não alterar as cores do ícone fora do design system",
                  "Não usar sobre fundos fotográficos sem overlay",
                  "Não aplicar efeitos (sombra extra, contorno, opacidade < 80%)",
                  "Não recriar o wordmark em outra fonte",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span style={{ flexShrink: 0, fontSize: 13, color: "#DC2626", marginTop: 1 }}>✕</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#DC2626", lineHeight: 1.5 }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ── COLORS ── */}
        <Section title="01 — Paleta de Cores">
          <div className="mb-6">
            <p className="text-sm font-medium text-[var(--color-foreground)] mb-4">Cores Primárias</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Swatch name="Ocean Blue" hex="#0C4A6E" token="--color-primary" />
              <Swatch name="Sky Blue" hex="#0EA5E9" token="--color-primary-light" />
              <Swatch name="Terra" hex="#EA580C" token="--color-accent" />
              <Swatch name="WhatsApp" hex="#25D366" token="whatsapp" />
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-[var(--color-foreground)] mb-4">Superfícies</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Swatch name="Sky White" hex="#F0F9FF" token="--color-background" />
              <Swatch name="Pure White" hex="#FFFFFF" token="--color-surface" />
              <Swatch name="Soft Sky" hex="#E8F2F8" token="--color-muted" />
              <Swatch name="Sky Border" hex="#BAE6FD" token="--color-border" />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--color-foreground)] mb-4">Texto</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Swatch name="Deep Ocean" hex="#0C4A6E" token="--color-foreground" />
              <Swatch name="Slate" hex="#64748B" token="--color-muted-foreground" />
              <Swatch name="Error Red" hex="#DC2626" token="--color-destructive" />
            </div>
          </div>
        </Section>

        {/* ── TYPOGRAPHY ── */}
        <Section title="02 — Tipografia">
          <div className="space-y-6">
            <div className="p-6 card">
              <p className="text-xs text-[var(--color-muted-foreground)] mb-1">Display — Poppins 700 · 56px</p>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "56px", fontWeight: 700, lineHeight: 1.05, color: "var(--color-primary)" }}>
                Pertença ao mundo
              </p>
            </div>
            <div className="p-6 card">
              <p className="text-xs text-[var(--color-muted-foreground)] mb-1">H1 — Poppins 700 · 48px</p>
              <h1 style={{ fontSize: "48px" }}>Sua vida no exterior começa aqui</h1>
            </div>
            <div className="p-6 card">
              <p className="text-xs text-[var(--color-muted-foreground)] mb-1">H2 — Poppins 600 · 36px</p>
              <h2 style={{ fontSize: "36px" }}>Como funciona a Nômade Voyage</h2>
            </div>
            <div className="p-6 card">
              <p className="text-xs text-[var(--color-muted-foreground)] mb-1">H3 — Poppins 600 · 24px</p>
              <h3 style={{ fontSize: "24px" }}>Portugal, Espanha e muito mais</h3>
            </div>
            <div className="p-6 card">
              <p className="text-xs text-[var(--color-muted-foreground)] mb-1">Body Large — Inter 400 · 18px</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "18px", lineHeight: 1.65, color: "var(--color-muted-foreground)" }}>
                Ajudamos brasileiros a dar o passo mais importante das suas vidas — com segurança, clareza e alguém do lado.
              </p>
            </div>
            <div className="p-6 card">
              <p className="text-xs text-[var(--color-muted-foreground)] mb-1">Body — Inter 400 · 16px</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", lineHeight: 1.6, color: "var(--color-muted-foreground)" }}>
                Não somos uma OTA. Somos a pessoa que já fez esse caminho e quer te ajudar a fazer o mesmo. Do visto à passagem, do seguro ao primeiro apartamento em Lisboa.
              </p>
            </div>
            <div className="p-6 card">
              <p className="text-xs text-[var(--color-muted-foreground)] mb-1">Quote — Poppins Italic 400 · 20px</p>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "20px", fontStyle: "italic", lineHeight: 1.5, color: "var(--color-primary)" }}>
                "Finalmente alguém que explica tudo sem enrolação. Mudei para Lisboa em 3 meses."
              </p>
            </div>
            <div className="p-6 card">
              <p className="text-xs text-[var(--color-muted-foreground)] mb-2">Label — Inter 500 · 12px uppercase</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-muted-foreground)" }}>
                Destinos disponíveis
              </p>
            </div>
          </div>
        </Section>

        {/* ── BUTTONS ── */}
        <Section title="03 — Botões">
          <div className="flex flex-wrap gap-4 items-center">
            <a href="#" className="btn-primary">
              <Plane size={18} />
              Quero viajar
            </a>
            <a href="#" className="btn-primary">
              Falar no WhatsApp
              <ArrowRight size={18} />
            </a>
            <a href="#" className="btn-secondary">
              Saiba mais
            </a>
            <a href="#" className="btn-secondary">
              <Globe size={18} />
              Ver destinos
            </a>
            <a href="#" className="btn-whatsapp">
              <MessageCircle size={20} />
              Conversar agora
            </a>
          </div>

          <div className="mt-6 p-4 rounded-[var(--radius-lg)] bg-[var(--color-muted)]">
            <p className="text-xs text-[var(--color-muted-foreground)] mb-2 font-medium">Estados</p>
            <div className="flex flex-wrap gap-4 items-center">
              <button className="btn-primary opacity-50 cursor-not-allowed" disabled>Desabilitado</button>
              <button className="btn-primary" style={{ background: "#C2410C" }}>Hover state</button>
            </div>
          </div>
        </Section>

        {/* ── CARDS ── */}
        <Section title="04 — Cards">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Pillar card */}
            <div className="card flex flex-col items-center text-center p-8">
              <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--color-muted)] flex items-center justify-center mb-4">
                <Plane size={24} color="var(--color-primary-light)" />
              </div>
              <span className="badge mb-3">Pilar I</span>
              <h3 className="text-xl mb-2">Viajar</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--color-muted-foreground)", lineHeight: 1.6 }}>
                Passagens, hotéis e pacotes curados para experiências internacionais inesquecíveis.
              </p>
            </div>
            <div className="card flex flex-col items-center text-center p-8">
              <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--color-muted)] flex items-center justify-center mb-4">
                <Compass size={24} color="var(--color-primary-light)" />
              </div>
              <span className="badge mb-3">Pilar II</span>
              <h3 className="text-xl mb-2">Explorar</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--color-muted-foreground)", lineHeight: 1.6 }}>
                Mochilões e roteiros alternativos para quem quer mais do que o roteiro padrão.
              </p>
            </div>
            <div className="card flex flex-col items-center text-center p-8">
              <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--color-muted)] flex items-center justify-center mb-4">
                <Home size={24} color="var(--color-primary-light)" />
              </div>
              <span className="badge mb-3">Pilar III</span>
              <h3 className="text-xl mb-2">Morar</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--color-muted-foreground)", lineHeight: 1.6 }}>
                Vistos, documentação e suporte completo para quem quer mudar de vida.
              </p>
            </div>
          </div>

          {/* Testimonial card */}
          <div className="mt-6">
            <div className="card p-8" style={{ background: "var(--color-muted)" }}>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#EA580C" color="#EA580C" />
                ))}
              </div>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "18px", fontStyle: "italic", color: "var(--color-primary)", lineHeight: 1.6, marginBottom: "16px" }}>
                "Pensei que seria impossível. Em 4 meses estava em Lisboa com visto, apartamento e emprego. A Nômade Voyage curou tudo."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
                  <User size={18} color="white" />
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "14px", color: "var(--color-foreground)" }}>Marina S.</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--color-muted-foreground)" }}>Lisboa, Portugal · Março 2026</p>
                </div>
              </div>
            </div>
          </div>

          {/* Destination card */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { city: "Lisboa", country: "Portugal", badge: "Mais popular", icon: MapPin },
              { city: "Madrid", country: "Espanha", badge: "Alta demanda", icon: MapPin },
            ].map((dest) => (
              <div key={dest.city} className="card flex items-center gap-4 cursor-pointer">
                <div className="w-14 h-14 rounded-[var(--radius-lg)] flex items-center justify-center flex-shrink-0" style={{ background: "var(--color-muted)" }}>
                  <dest.icon size={24} color="var(--color-primary-light)" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "18px", color: "var(--color-primary)" }}>{dest.city}</h4>
                    <span className="badge badge-accent">{dest.badge}</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--color-muted-foreground)" }}>{dest.country}</p>
                </div>
                <ArrowRight size={20} color="var(--color-primary-light)" />
              </div>
            ))}
          </div>
        </Section>

        {/* ── BADGES ── */}
        <Section title="05 — Badges e Tags">
          <div className="flex flex-wrap gap-3">
            <span className="badge">Portugal</span>
            <span className="badge">Visto D7</span>
            <span className="badge">Nômade Digital</span>
            <span className="badge badge-accent">Mais popular</span>
            <span className="badge badge-accent">Alta demanda</span>
            <span className="badge" style={{ background: "#F0FDF4", color: "#166534" }}>
              <Check size={12} className="mr-1" />
              Verificado
            </span>
          </div>
        </Section>

        {/* ── INPUTS ── */}
        <Section title="06 — Formulários">
          <div className="max-w-lg space-y-5">
            <div>
              <label htmlFor="name">Nome completo</label>
              <input id="name" className="input mt-1" type="text" placeholder="Seu nome" />
            </div>
            <div>
              <label htmlFor="email">E-mail</label>
              <input id="email" className="input mt-1" type="email" placeholder="seu@email.com" />
            </div>
            <div>
              <label htmlFor="phone">WhatsApp</label>
              <input id="phone" className="input mt-1" type="tel" placeholder="+55 (11) 99999-9999" />
            </div>
            <div>
              <label htmlFor="destino">Destino de interesse</label>
              <div className="relative">
                <select id="destino" className="input mt-1 pr-10 appearance-none cursor-pointer">
                  <option value="">Selecione um destino</option>
                  <option>Portugal</option>
                  <option>Espanha</option>
                  <option>Irlanda</option>
                  <option>Estados Unidos</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" color="var(--color-muted-foreground)" />
              </div>
            </div>
            <div>
              <label htmlFor="invalid">Campo com erro</label>
              <input id="invalid" className="input error mt-1" type="email" placeholder="email-invalido" defaultValue="email-invalido" />
              <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--color-destructive)", marginTop: "4px" }}>
                Digite um e-mail válido.
              </p>
            </div>
            <button className="btn-primary w-full justify-center">
              Quero falar com um especialista
              <ArrowRight size={18} />
            </button>
          </div>
        </Section>

        {/* ── ICONS ── */}
        <Section title="07 — Ícones (Lucide)">
          <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--color-muted-foreground)", marginBottom: "16px" }}>
            Stroke 1.5px · Outline style · Tamanho padrão 24px
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { Icon: Plane, label: "Plane" },
              { Icon: Compass, label: "Compass" },
              { Icon: Home, label: "Home" },
              { Icon: Globe, label: "Globe" },
              { Icon: Shield, label: "Shield" },
              { Icon: MapPin, label: "MapPin" },
              { Icon: MessageCircle, label: "Message" },
              { Icon: Search, label: "Search" },
              { Icon: User, label: "User" },
              { Icon: Mail, label: "Mail" },
              { Icon: Phone, label: "Phone" },
              { Icon: Star, label: "Star" },
              { Icon: Check, label: "Check" },
              { Icon: ArrowRight, label: "Arrow" },
              { Icon: ChevronDown, label: "Chevron" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--color-muted)] flex items-center justify-center">
                  <Icon size={22} color="var(--color-primary-light)" strokeWidth={1.5} />
                </div>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--color-muted-foreground)" }}>{label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── SHADOWS & RADIUS ── */}
        <Section title="08 — Sombras e Raios">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {[
              { label: "shadow-sm", shadow: "var(--shadow-sm)", desc: "Cards padrão" },
              { label: "shadow-md", shadow: "var(--shadow-md)", desc: "Card hover / dropdowns" },
              { label: "shadow-lg", shadow: "var(--shadow-lg)", desc: "Modais / overlays" },
            ].map(({ label, shadow, desc }) => (
              <div key={label} className="p-6 rounded-[var(--radius-lg)] bg-white" style={{ boxShadow: shadow }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 600, color: "var(--color-foreground)", marginBottom: "4px" }}>{label}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--color-muted-foreground)" }}>{desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            {[
              { label: "radius-sm (4px)", r: "4px" },
              { label: "radius-md (8px)", r: "8px" },
              { label: "radius-lg (16px)", r: "16px" },
              { label: "radius-xl (24px)", r: "24px" },
              { label: "radius-full (pill)", r: "999px" },
            ].map(({ label, r }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-[var(--color-muted)] border border-[var(--color-border)]" style={{ borderRadius: r }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--color-muted-foreground)", textAlign: "center" }}>{label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── GRADIENT ── */}
        <Section title="09 — Gradiente Hero">
          <div className="hero-gradient rounded-[var(--radius-xl)] p-12 flex flex-col items-start gap-4">
            <span className="badge badge-accent">Nômade Voyage</span>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "40px", color: "white", lineHeight: 1.1 }}>
              A agência para quem quer pertencer ao mundo.
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "18px", color: "rgba(255,255,255,0.8)", maxWidth: "540px", lineHeight: 1.6 }}>
              Passagens, seguro, visto e suporte completo para brasileiros que querem dar o próximo passo.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <a href="#" className="btn-primary">Falar no WhatsApp <ArrowRight size={18} /></a>
              <a href="#" className="btn-secondary" style={{ borderColor: "rgba(255,255,255,0.4)", color: "white" }}>Ver destinos</a>
            </div>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--color-muted-foreground)", marginTop: "8px" }}>
            ⚠ Usar apenas na seção hero. Não repetir em outros componentes.
          </p>
        </Section>

      </div>

      {/* Footer */}
      <footer style={{ background: "var(--color-primary)", padding: "48px 0" }}>
        <div className="container">
          <div style={{ marginBottom: "8px" }}>
            <Logo size={28} theme="dark" />
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
            Design System v1.0 · 2026
          </p>
        </div>
      </footer>
    </div>
  );
}

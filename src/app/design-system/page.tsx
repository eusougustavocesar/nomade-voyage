"use client";

import Logo from "@/components/Logo";
import {
  Plane, Compass, Home, MessageCircle, ArrowRight, Check,
  Star, Globe, Shield, MapPin, ChevronDown, Search, User,
  Mail, Phone,
} from "lucide-react";

const dsLinks = [
  { label: "Logo",        href: "#logo" },
  { label: "Cores",       href: "#cores" },
  { label: "Tipografia",  href: "#tipografia" },
  { label: "Botões",      href: "#botoes" },
  { label: "Cards",       href: "#cards" },
  { label: "Badges",      href: "#badges" },
  { label: "Forms",       href: "#formularios" },
  { label: "Ícones",      href: "#icones" },
  { label: "Sombras",     href: "#sombras" },
  { label: "Espaçamento", href: "#espacamento" },
  { label: "Tokens UI",   href: "#tokens-ui" },
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ paddingTop: "var(--gap-xl)", paddingBottom: "var(--gap-xl)", borderBottom: "1px solid var(--color-border)", scrollMarginTop: 72 }}>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-muted-foreground)", marginBottom: "var(--space-8)" }}>
        {title}
      </p>
      {children}
    </section>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", fontWeight: 500, color: "var(--color-foreground)", marginBottom: "var(--space-4)" }}>
      {children}
    </p>
  );
}

function Swatch({ name, hex, token }: { name: string; hex: string; token: string }) {
  return (
    <div className="flex flex-col" style={{ gap: "var(--space-2)" }}>
      <div style={{ height: 56, borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", background: hex }} />
      <div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", fontWeight: 500, color: "var(--color-foreground)" }}>{name}</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)", fontVariantNumeric: "tabular-nums" }}>{hex}</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)" }}>{token}</p>
      </div>
    </div>
  );
}

function OverlaySwatch({ name, value, token, bg }: { name: string; value: string; token: string; bg: string }) {
  return (
    <div className="flex flex-col" style={{ gap: "var(--space-2)" }}>
      <div style={{ height: 56, borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", background: bg, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: value }} />
      </div>
      <div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", fontWeight: 500, color: "var(--color-foreground)" }}>{name}</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)", fontVariantNumeric: "tabular-nums" }}>{value}</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)" }}>{token}</p>
      </div>
    </div>
  );
}

function TokenRow({ token, value, desc }: { token: string; value: string; desc: string }) {
  return (
    <div className="flex flex-wrap items-baseline" style={{ gap: "var(--gap-sm)", padding: "var(--space-3) 0", borderBottom: "1px solid var(--color-border)" }}>
      <code style={{ fontFamily: "monospace", fontSize: "var(--text-caption)", color: "var(--color-primary)", minWidth: 220 }}>{token}</code>
      <span style={{ fontFamily: "monospace", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)", minWidth: 260 }}>{value}</span>
      <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)" }}>{desc}</span>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <div style={{ background: "var(--color-background)", minHeight: "100vh" }}>

      {/* ── Hero header ── */}
      <div style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)", paddingTop: "var(--space-16)", paddingBottom: "var(--space-16)" }}>
        <div className="container">
          <span className="badge badge-accent" style={{ marginBottom: "var(--space-4)", display: "inline-flex" }}>Design System</span>
          <div style={{ marginTop: "var(--space-2)", marginBottom: "var(--space-3)" }}>
            <Logo size={52} />
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-lg)", color: "var(--color-muted-foreground)", maxWidth: 520, lineHeight: 1.65 }}>
            Referência visual completa — cores, tipografia, componentes e padrões de layout.
          </p>
        </div>
      </div>

      {/* ── Sticky pill nav ── */}
      <div className="sticky z-40" style={{ top: 0, background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)" }}>
        <div className="container" style={{ paddingTop: "var(--space-3)", paddingBottom: "var(--space-3)" }}>
          <div className="flex items-center overflow-x-auto" style={{ gap: "var(--space-1)", scrollbarWidth: "none" }}>
            {dsLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)", textDecoration: "none", padding: "5px 12px", borderRadius: "var(--radius-full)", border: "1px solid transparent", whiteSpace: "nowrap", transition: "color 150ms, background 150ms, border-color 150ms", flexShrink: 0 }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--color-primary)"; e.currentTarget.style.background = "var(--color-muted)"; e.currentTarget.style.borderColor = "var(--color-border)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--color-muted-foreground)"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "var(--space-4)", paddingBottom: "var(--space-20)" }}>

        {/* ── 00 LOGO ── */}
        <Section id="logo" title="00 — Logotipo">
          <SubLabel>Versões</SubLabel>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "var(--gap-sm)", marginBottom: "var(--space-10)" }}>
            <div className="card flex flex-col" style={{ gap: "var(--space-4)", padding: "var(--space-8)" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-muted-foreground)" }}>Navbar / Adaptativo</p>
              <Logo size={40} />
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)" }}>theme light (default) — logo preta em PNG transparente</p>
            </div>
            <div className="card flex flex-col" style={{ gap: "var(--space-4)", padding: "var(--space-8)", background: "var(--color-footer)" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-white-low)" }}>Footer / Sempre escuro</p>
              <Logo size={40} theme="dark" />
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-white-low)" }}>theme=&quot;dark&quot; — logo branca; usar em fundo escuro</p>
            </div>
            <div className="card flex flex-col" style={{ gap: "var(--space-4)", padding: "var(--space-8)" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-muted-foreground)" }}>Ícone isolado</p>
              <div className="flex items-center" style={{ gap: "var(--gap-sm)" }}>
                <Logo size={48} showWordmark={false} />
                <Logo size={32} showWordmark={false} />
                <Logo size={20} showWordmark={false} />
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)" }}>Favicon, app icon, avatar — sem wordmark</p>
            </div>
          </div>

          <SubLabel>Tamanhos de uso</SubLabel>
          <div className="card" style={{ padding: "var(--space-6)", marginBottom: "var(--space-8)" }}>
            <div className="flex flex-wrap items-end" style={{ gap: "var(--gap-lg)" }}>
              {[{ size: 48, label: "48px — Hero" }, { size: 40, label: "40px — Destaque" }, { size: 32, label: "32px — Navbar" }, { size: 28, label: "28px — Footer" }, { size: 20, label: "20px — Mín." }].map(({ size, label }) => (
                <div key={size} className="flex flex-col items-center" style={{ gap: "var(--space-3)" }}>
                  <Logo size={size} showWordmark={false} />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)", textAlign: "center", maxWidth: 80 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <SubLabel>Uso correto</SubLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "var(--gap-sm)" }}>
            <div style={{ padding: "var(--space-6)", borderRadius: "var(--radius-lg)", border: "2px solid var(--color-primary-light)", background: "var(--color-success-bg)" }}>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "var(--text-micro)", color: "var(--color-primary-light)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "var(--space-4)" }}>✓ Correto</p>
              <ul className="flex flex-col" style={{ gap: "var(--space-2)" }}>
                {["Sobre fundos lisos — escuros em dark mode, claros em light mode", "Manter proporção original — nunca distorcer", "Respeitar área de respiro mínima equivalente a ½ do ícone", "Tamanho mínimo: 20px (ícone) — abaixo usar só wordmark"].map(t => (
                  <li key={t} className="flex items-start" style={{ gap: "var(--space-2)" }}>
                    <Check size={13} color="var(--color-primary-light)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)", lineHeight: 1.5 }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ padding: "var(--space-6)", borderRadius: "var(--radius-lg)", border: "2px solid var(--color-destructive)", background: "var(--color-destructive-bg)" }}>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "var(--text-micro)", color: "var(--color-destructive)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "var(--space-4)" }}>✗ Incorreto</p>
              <ul className="flex flex-col" style={{ gap: "var(--space-2)" }}>
                {["Não alterar as cores do ícone fora do design system", "Não usar sobre fundos fotográficos sem overlay", "Não aplicar efeitos (sombra extra, contorno, opacidade < 80%)", "Não recriar o wordmark em outra fonte"].map(t => (
                  <li key={t} className="flex items-start" style={{ gap: "var(--space-2)" }}>
                    <span style={{ flexShrink: 0, fontSize: 13, color: "var(--color-destructive)", marginTop: 1 }}>✕</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)", lineHeight: 1.5 }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ── 01 COLORS ── */}
        <Section id="cores" title="01 — Paleta de Cores">
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-muted-foreground)", marginBottom: "var(--space-8)", lineHeight: 1.6 }}>
            Tema adapta via <code style={{ fontFamily: "monospace", fontSize: "var(--text-caption)", background: "var(--color-muted)", padding: "2px 6px", borderRadius: "var(--radius-sm)" }}>prefers-color-scheme</code>. Swatches: esquerda = light · direita = dark.
          </p>

          {/* Marca */}
          <SubLabel>Marca</SubLabel>
          <div style={{ marginBottom: "var(--space-10)" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "var(--gap-sm)" }}>
              {[
                { theme: "Light", swatches: [{ name: "Primary", hex: "#0A0A0A", token: "--color-primary" }, { name: "Primary Light", hex: "#525252", token: "--color-primary-light" }, { name: "Accent", hex: "#0A0A0A", token: "--color-accent" }, { name: "WhatsApp", hex: "#25D366", token: "—" }] },
                { theme: "Dark",  swatches: [{ name: "Primary", hex: "#FAFAFA", token: "--color-primary" }, { name: "Primary Light", hex: "#A3A3A3", token: "--color-primary-light" }, { name: "Accent", hex: "#FAFAFA", token: "--color-accent" }, { name: "WhatsApp", hex: "#25D366", token: "—" }] },
              ].map(({ theme, swatches }) => (
                <div key={theme}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", fontWeight: 500, color: "var(--color-muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "var(--space-3)" }}>{theme}</p>
                  <div className="grid grid-cols-2" style={{ gap: "var(--gap-xs)" }}>
                    {swatches.map(s => <Swatch key={s.name} {...s} />)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Superfícies */}
          <SubLabel>Superfícies</SubLabel>
          <div style={{ marginBottom: "var(--space-10)" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "var(--gap-sm)" }}>
              {[
                { theme: "Light", swatches: [{ name: "Background", hex: "#FAFAFA", token: "--color-background" }, { name: "Surface", hex: "#FFFFFF", token: "--color-surface" }, { name: "Muted", hex: "#F5F5F5", token: "--color-muted" }, { name: "Footer", hex: "#0A0A0A", token: "--color-footer" }] },
                { theme: "Dark",  swatches: [{ name: "Background", hex: "#0A0A0A", token: "--color-background" }, { name: "Surface", hex: "#141414", token: "--color-surface" }, { name: "Muted", hex: "#1F1F1F", token: "--color-muted" }, { name: "Footer", hex: "#000000", token: "--color-footer" }] },
              ].map(({ theme, swatches }) => (
                <div key={theme}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", fontWeight: 500, color: "var(--color-muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "var(--space-3)" }}>{theme}</p>
                  <div className="grid grid-cols-2" style={{ gap: "var(--gap-xs)" }}>
                    {swatches.map(s => <Swatch key={s.name} {...s} />)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Texto e Utility */}
          <SubLabel>Texto e utilidade</SubLabel>
          <div style={{ marginBottom: "var(--space-10)" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "var(--gap-sm)" }}>
              {[
                { theme: "Light", swatches: [{ name: "Foreground", hex: "#0A0A0A", token: "--color-foreground" }, { name: "Muted Text", hex: "#737373", token: "--color-muted-foreground" }, { name: "On Primary", hex: "#FFFFFF", token: "--color-on-primary" }, { name: "Ring / Focus", hex: "#0A0A0A", token: "--color-ring" }, { name: "Border", hex: "#E5E5E5", token: "--color-border" }, { name: "Destructive", hex: "#DC2626", token: "--color-destructive" }] },
                { theme: "Dark",  swatches: [{ name: "Foreground", hex: "#F5F5F5", token: "--color-foreground" }, { name: "Muted Text", hex: "#A3A3A3", token: "--color-muted-foreground" }, { name: "On Primary", hex: "#0A0A0A", token: "--color-on-primary" }, { name: "Ring / Focus", hex: "#FAFAFA", token: "--color-ring" }, { name: "Border", hex: "#2A2A2A", token: "--color-border" }, { name: "Destructive", hex: "#FCA5A5", token: "--color-destructive" }] },
              ].map(({ theme, swatches }) => (
                <div key={theme}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", fontWeight: 500, color: "var(--color-muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "var(--space-3)" }}>{theme}</p>
                  <div className="grid grid-cols-2" style={{ gap: "var(--gap-xs)" }}>
                    {swatches.map(s => <Swatch key={s.name} {...s} />)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cores semânticas */}
          <SubLabel>Cores semânticas (ambos os temas)</SubLabel>
          <div style={{ marginBottom: "var(--space-10)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)", marginBottom: "var(--space-4)" }}>
              Usadas em badges de pacote. O valor adapta entre light e dark automaticamente.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3" style={{ gap: "var(--gap-sm)" }}>
              <div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", fontWeight: 500, color: "var(--color-muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "var(--space-3)" }}>Light</p>
                <div className="flex flex-col" style={{ gap: "var(--gap-xs)" }}>
                  <Swatch name="Success"     hex="#16A34A" token="--color-success" />
                  <Swatch name="Success BG"  hex="rgba(22,163,74,0.12)" token="--color-success-bg" />
                  <Swatch name="Accent BG"   hex="rgba(10,10,10,0.06)" token="--color-accent-bg" />
                  <Swatch name="Destruct BG" hex="rgba(220,38,38,0.12)" token="--color-destructive-bg" />
                  <Swatch name="Purple"      hex="#7C3AED" token="--color-purple" />
                  <Swatch name="Purple BG"   hex="rgba(124,58,237,0.12)" token="--color-purple-bg" />
                </div>
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", fontWeight: 500, color: "var(--color-muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "var(--space-3)" }}>Dark</p>
                <div className="flex flex-col" style={{ gap: "var(--gap-xs)" }}>
                  <Swatch name="Success"     hex="#4ADE80" token="--color-success" />
                  <Swatch name="Success BG"  hex="rgba(74,222,128,0.12)" token="--color-success-bg" />
                  <Swatch name="Accent BG"   hex="rgba(255,255,255,0.08)" token="--color-accent-bg" />
                  <Swatch name="Destruct BG" hex="rgba(252,165,165,0.12)" token="--color-destructive-bg" />
                  <Swatch name="Purple"      hex="#A78BFA" token="--color-purple" />
                  <Swatch name="Purple BG"   hex="rgba(167,139,250,0.12)" token="--color-purple-bg" />
                </div>
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", fontWeight: 500, color: "var(--color-muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "var(--space-3)" }}>Uso</p>
                <div className="flex flex-col" style={{ gap: "var(--gap-xs)" }}>
                  {[
                    { bg: "var(--color-success-bg)",     color: "var(--color-success)",     label: "Novo · Melhor custo" },
                    { bg: "var(--color-accent-bg)",      color: "var(--color-accent)",      label: "Mais pedido" },
                    { bg: "var(--color-destructive-bg)", color: "var(--color-destructive)", label: "Últimas vagas" },
                    { bg: "var(--color-purple-bg)",      color: "var(--color-purple)",      label: "Favorito casais" },
                  ].map(({ bg, color, label }) => (
                    <div key={label} style={{ height: 30, borderRadius: "var(--radius-md)", background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", fontWeight: 600, color }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* White overlays */}
          <SubLabel>White overlays (sobre fundos escuros/coloridos)</SubLabel>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)", marginBottom: "var(--space-4)" }}>
            Usadas em footer, banners e sobreposições. Mostradas sobre fundo escuro.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: "var(--gap-xs)" }}>
            <OverlaySwatch name="High · 82%"   value="rgba(255,255,255,0.82)" token="--color-white-high"   bg="#0A0A0A" />
            <OverlaySwatch name="Mid · 70%"    value="rgba(255,255,255,0.70)" token="--color-white-mid"    bg="#0A0A0A" />
            <OverlaySwatch name="Muted · 60%"  value="rgba(255,255,255,0.60)" token="--color-white-muted"  bg="#0A0A0A" />
            <OverlaySwatch name="Low · 50%"    value="rgba(255,255,255,0.50)" token="--color-white-low"    bg="#0A0A0A" />
            <OverlaySwatch name="XLow · 40%"   value="rgba(255,255,255,0.40)" token="--color-white-xlow"   bg="#0A0A0A" />
            <OverlaySwatch name="Ghost · 30%"  value="rgba(255,255,255,0.30)" token="--color-white-ghost"  bg="#0A0A0A" />
            <OverlaySwatch name="Border · 20%" value="rgba(255,255,255,0.20)" token="--color-white-border" bg="#0A0A0A" />
          </div>
        </Section>

        {/* ── 02 TYPOGRAPHY ── */}
        <Section id="tipografia" title="02 — Tipografia">
          <div className="flex flex-col" style={{ gap: "var(--gap-sm)" }}>
            {[
              { label: "Heading (h1–h6) — Poppins 600 · clamp(28px, 3.5vw, 38px)", size: "var(--text-h2)", weight: 600, family: "var(--font-heading)", text: "Como funciona a Nômade Voyage", lh: 1.15 },
              { label: "Título de card (override inline) — Poppins 600 · 18px", size: "var(--text-h4)", weight: 600, family: "var(--font-heading)", text: "Lisboa — 10 dias, grupo pequeno", lh: 1.3 },
              { label: "Body Large — Inter 400 · 18px", size: "var(--text-body-lg)", weight: 400, family: "var(--font-body)", text: "Passagens, hotéis, seguro e roteiro completo — tudo resolvido no WhatsApp, com quem já esteve no destino.", lh: 1.65 },
              { label: "Body MD — Inter 400 · 17px", size: "var(--text-body-md)", weight: 400, family: "var(--font-body)", text: "Atendemos no máximo 8 grupos por mês. Consulte a disponibilidade para a sua data.", lh: 1.65 },
              { label: "Body — Inter 400 · 16px", size: "var(--text-body)", weight: 400, family: "var(--font-body)", text: "Não somos uma OTA. Somos a pessoa que já fez esse caminho e quer te ajudar.", lh: 1.6 },
              { label: "Body SM — Inter 400 · 15px", size: "var(--text-body-sm)", weight: 400, family: "var(--font-body)", text: "Inclui seguro viagem, consultoria 1x1 e suporte durante toda a estadia.", lh: 1.6 },
              { label: "Quote — Poppins Italic · 17px", size: "var(--text-body-md)", weight: 400, family: "var(--font-heading)", italic: true, text: '"Finalmente alguém que explica tudo sem enrolação. Mudei para Lisboa em 3 meses."', lh: 1.5 },
              { label: "Caption — Inter 500 · 13px", size: "var(--text-caption)", weight: 500, family: "var(--font-body)", text: "Lisboa, Portugal · Março 2026", lh: 1.4 },
              { label: "Micro / Label — Inter 500 · 12px uppercase", size: "var(--text-micro)", weight: 500, family: "var(--font-body)", upper: true, ls: "0.06em", text: "Destinos disponíveis", lh: 1.4 },
            ].map(({ label, size, weight, family, text, lh, italic, upper, ls }) => (
              <div key={label} className="card" style={{ padding: "var(--space-6)" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)", marginBottom: "var(--space-2)" }}>{label}</p>
                <p style={{ fontFamily: family, fontSize: size, fontWeight: weight, lineHeight: lh, color: "var(--color-primary)", fontStyle: italic ? "italic" : undefined, textTransform: upper ? "uppercase" : undefined, letterSpacing: ls }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 03 BUTTONS ── */}
        <Section id="botoes" title="03 — Botões">
          <div className="flex flex-wrap items-center" style={{ gap: "var(--gap-sm)" }}>
            <a href="#" className="btn-primary"><Plane size={18} />Quero viajar</a>
            <a href="#" className="btn-primary">Ver roteiro<ArrowRight size={18} /></a>
            <a href="#" className="btn-secondary">Saiba mais</a>
            <a href="#" className="btn-secondary"><Globe size={18} />Ver destinos</a>
            <a href="#" className="btn-whatsapp"><MessageCircle size={20} />Conversar agora</a>
          </div>
          <div style={{ marginTop: "var(--space-6)", padding: "var(--space-4)", borderRadius: "var(--radius-lg)", background: "var(--color-muted)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", fontWeight: 500, color: "var(--color-muted-foreground)", marginBottom: "var(--space-2)" }}>Estados</p>
            <div className="flex flex-wrap items-center" style={{ gap: "var(--gap-sm)" }}>
              <button className="btn-primary" style={{ opacity: 0.5, cursor: "not-allowed" }} disabled>Desabilitado</button>
              <button className="btn-primary" style={{ background: "#262626" }}>Hover (btn-primary)</button>
            </div>
          </div>
        </Section>

        {/* ── 04 CARDS ── */}
        <Section id="cards" title="04 — Cards">
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "var(--gap-md)" }}>
            {[
              { Icon: Plane,   badge: "Pilar I",   title: "Viajar",   desc: "Passagens, hotéis e pacotes curados para experiências internacionais." },
              { Icon: Compass, badge: "Pilar II",  title: "Explorar", desc: "Mochilões e roteiros alternativos para quem quer mais do que o padrão." },
              { Icon: Home,    badge: "Pilar III", title: "Morar",    desc: "Vistos, documentação e suporte completo para quem quer mudar de vida." },
            ].map(({ Icon, badge, title, desc }) => (
              <div key={title} className="card flex flex-col items-center text-center" style={{ padding: "var(--space-8)" }}>
                <div className="flex items-center justify-center" style={{ width: 48, height: 48, borderRadius: "var(--radius-lg)", background: "var(--color-muted)", marginBottom: "var(--space-4)" }}>
                  <Icon size={24} color="var(--color-primary-light)" />
                </div>
                <span className="badge" style={{ marginBottom: "var(--space-3)" }}>{badge}</span>
                <h3 style={{ fontSize: "var(--text-h4)", marginBottom: "var(--space-2)" }}>{title}</h3>
                <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-muted-foreground)", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Testimonial card */}
          <div style={{ marginTop: "var(--gap-md)" }}>
            <div className="card" style={{ padding: "var(--space-8)", background: "var(--color-muted)" }}>
              <div className="flex" style={{ gap: "var(--space-1)", marginBottom: "var(--space-4)" }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--color-accent)" color="var(--color-accent)" />)}
              </div>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-body-md)", fontStyle: "italic", color: "var(--color-primary)", lineHeight: 1.65, marginBottom: "var(--space-4)" }}>
                "Pensei que seria impossível. Em 4 meses estava em Lisboa com visto, apartamento e emprego."
              </p>
              <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
                <div className="flex items-center justify-center" style={{ width: 40, height: 40, borderRadius: "var(--radius-full)", background: "var(--color-primary-light)" }}>
                  <User size={18} color="var(--color-on-primary)" />
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "var(--text-body-sm)", color: "var(--color-foreground)" }}>Marina S.</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)" }}>Lisboa, Portugal · Março 2026</p>
                </div>
              </div>
            </div>
          </div>

          {/* Destination card */}
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "var(--gap-md)", marginTop: "var(--gap-md)" }}>
            {[
              { city: "Lisboa", country: "Portugal", badge: "Mais popular" },
              { city: "Madrid", country: "Espanha",  badge: "Alta demanda" },
            ].map(({ city, country, badge }) => (
              <div key={city} className="card flex items-center cursor-pointer" style={{ gap: "var(--gap-xs)" }}>
                <div className="flex items-center justify-center flex-shrink-0" style={{ width: 56, height: 56, borderRadius: "var(--radius-lg)", background: "var(--color-muted)" }}>
                  <MapPin size={24} color="var(--color-primary-light)" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center" style={{ gap: "var(--space-2)", marginBottom: "var(--space-1)" }}>
                    <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "var(--text-h4)", color: "var(--color-primary)" }}>{city}</h4>
                    <span className="badge badge-accent">{badge}</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)" }}>{country}</p>
                </div>
                <ArrowRight size={20} color="var(--color-primary-light)" />
              </div>
            ))}
          </div>
        </Section>

        {/* ── 05 BADGES ── */}
        <Section id="badges" title="05 — Badges e Tags">
          <SubLabel>Base</SubLabel>
          <div className="flex flex-wrap" style={{ gap: "var(--space-3)", marginBottom: "var(--space-8)" }}>
            <span className="badge">Portugal</span>
            <span className="badge">Visto D7</span>
            <span className="badge">Nômade Digital</span>
            <span className="badge badge-accent">Mais popular</span>
            <span className="badge badge-accent">Alta demanda</span>
            <span className="badge" style={{ background: "rgba(56,189,248,0.12)", color: "var(--color-primary-light)" }}>
              <Check size={12} style={{ marginRight: "var(--space-1)" }} />Verificado
            </span>
          </div>
          <SubLabel>Badges de pacote (semânticas)</SubLabel>
          <div className="flex flex-wrap" style={{ gap: "var(--space-3)" }}>
            {[
              { label: "Mais pedido",            bg: "var(--color-accent-bg)",      color: "var(--color-accent)" },
              { label: "Mais procurado",          bg: "var(--color-accent-bg)",      color: "var(--color-accent)" },
              { label: "Últimas vagas",           bg: "var(--color-destructive-bg)", color: "var(--color-destructive)" },
              { label: "Novo",                    bg: "var(--color-success-bg)",     color: "var(--color-success)" },
              { label: "Melhor custo-benefício",  bg: "var(--color-success-bg)",     color: "var(--color-success)" },
              { label: "Favorito de casais",      bg: "var(--color-purple-bg)",      color: "var(--color-purple)" },
            ].map(({ label, bg, color }) => (
              <span key={label} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", fontWeight: 700, padding: "4px 10px", borderRadius: "var(--radius-full)", background: bg, color }}>
                {label}
              </span>
            ))}
          </div>
        </Section>

        {/* ── 06 FORMS ── */}
        <Section id="formularios" title="06 — Formulários">
          <div className="flex flex-col" style={{ gap: "var(--space-6)", maxWidth: 512 }}>
            {[
              { id: "name",  label: "Nome completo", type: "text",  placeholder: "Seu nome" },
              { id: "email", label: "E-mail",         type: "email", placeholder: "seu@email.com" },
              { id: "phone", label: "WhatsApp",        type: "tel",   placeholder: "+55 (11) 99999-9999" },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label htmlFor={id}>{label}</label>
                <input id={id} className="input" style={{ marginTop: "var(--space-1)" }} type={type} placeholder={placeholder} />
              </div>
            ))}
            <div>
              <label htmlFor="destino">Destino de interesse</label>
              <div className="relative">
                <select id="destino" className="input appearance-none cursor-pointer" style={{ marginTop: "var(--space-1)", paddingRight: "var(--space-10)" }}>
                  <option value="">Selecione um destino</option>
                  <option>Portugal</option><option>Espanha</option><option>Irlanda</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" color="var(--color-muted-foreground)" />
              </div>
            </div>
            <div>
              <label htmlFor="invalid">Campo com erro</label>
              <input id="invalid" className="input" style={{ marginTop: "var(--space-1)", borderColor: "var(--color-destructive)" }} type="email" defaultValue="email-invalido" />
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-destructive)", marginTop: "var(--space-1)" }}>Digite um e-mail válido.</p>
            </div>
            <button className="btn-primary" style={{ justifyContent: "center" }}>
              Quero falar com um especialista<ArrowRight size={18} />
            </button>
          </div>
        </Section>

        {/* ── 07 ICONS ── */}
        <Section id="icones" title="07 — Ícones (Lucide)">
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-muted-foreground)", marginBottom: "var(--space-4)" }}>
            Stroke 1.5px · Outline style · Tamanho padrão 24px
          </p>
          <div className="flex flex-wrap" style={{ gap: "var(--gap-md)" }}>
            {([
              { Icon: Plane, label: "Plane" }, { Icon: Compass, label: "Compass" }, { Icon: Home, label: "Home" },
              { Icon: Globe, label: "Globe" }, { Icon: Shield, label: "Shield" }, { Icon: MapPin, label: "MapPin" },
              { Icon: MessageCircle, label: "Message" }, { Icon: Search, label: "Search" }, { Icon: User, label: "User" },
              { Icon: Mail, label: "Mail" }, { Icon: Phone, label: "Phone" }, { Icon: Star, label: "Star" },
              { Icon: Check, label: "Check" }, { Icon: ArrowRight, label: "Arrow" }, { Icon: ChevronDown, label: "Chevron" },
            ] as const).map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center" style={{ gap: "var(--space-2)" }}>
                <div className="flex items-center justify-center" style={{ width: 48, height: 48, borderRadius: "var(--radius-lg)", background: "var(--color-muted)" }}>
                  <Icon size={22} color="var(--color-primary-light)" strokeWidth={1.5} />
                </div>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)" }}>{label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 08 SHADOWS & RADIUS ── */}
        <Section id="sombras" title="08 — Sombras e Raios">
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "var(--gap-md)", marginBottom: "var(--space-8)" }}>
            {[
              { label: "shadow-sm", shadow: "var(--shadow-sm)", desc: "Cards padrão" },
              { label: "shadow-md", shadow: "var(--shadow-md)", desc: "Card hover / dropdowns" },
              { label: "shadow-lg", shadow: "var(--shadow-lg)", desc: "Modais / overlays" },
            ].map(({ label, shadow, desc }) => (
              <div key={label} style={{ padding: "var(--space-6)", borderRadius: "var(--radius-lg)", background: "var(--color-surface)", boxShadow: shadow }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-foreground)", marginBottom: "var(--space-1)" }}>{label}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)" }}>{desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center" style={{ gap: "var(--gap-md)" }}>
            {[
              { label: "radius-sm · 4px",    r: "var(--radius-sm)" },
              { label: "radius-md · 8px",    r: "var(--radius-md)" },
              { label: "radius-lg · 16px",   r: "var(--radius-lg)" },
              { label: "radius-xl · 24px",   r: "var(--radius-xl)" },
              { label: "radius-full · pill", r: "var(--radius-full)" },
            ].map(({ label, r }) => (
              <div key={label} className="flex flex-col items-center" style={{ gap: "var(--space-2)" }}>
                <div style={{ width: 64, height: 64, background: "var(--color-muted)", border: "1px solid var(--color-border)", borderRadius: r }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)", textAlign: "center" }}>{label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 09 SPACING ── */}
        <Section id="espacamento" title="09 — Espaçamento">
          <SubLabel>Gap scale (layout)</SubLabel>
          <div className="flex flex-col" style={{ gap: "var(--space-3)", marginBottom: "var(--space-8)" }}>
            {[
              { token: "--gap-xs", px: "12px" }, { token: "--gap-sm", px: "20px" },
              { token: "--gap-md", px: "28px" }, { token: "--gap-lg", px: "40px" },
              { token: "--gap-xl", px: "56px" },
            ].map(({ token, px }) => (
              <div key={token} className="flex items-center" style={{ gap: "var(--space-4)" }}>
                <div style={{ width: `calc(${px} * 1.5)`, height: 20, background: "var(--color-primary-light)", borderRadius: "var(--radius-sm)", opacity: 0.5, flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-foreground)", fontVariantNumeric: "tabular-nums", minWidth: 120 }}>{token}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)" }}>{px}</span>
              </div>
            ))}
          </div>
          <SubLabel>Space scale (componentes)</SubLabel>
          <div className="flex flex-col" style={{ gap: "var(--space-3)" }}>
            {[
              { token: "--space-1", px: "4px" }, { token: "--space-2", px: "8px" },
              { token: "--space-3", px: "12px" }, { token: "--space-4", px: "16px" },
              { token: "--space-6", px: "24px" }, { token: "--space-8", px: "32px" },
              { token: "--space-10", px: "40px" }, { token: "--space-12", px: "48px" },
              { token: "--space-16", px: "64px" }, { token: "--space-20", px: "80px" },
            ].map(({ token, px }) => (
              <div key={token} className="flex items-center" style={{ gap: "var(--space-4)" }}>
                <div style={{ width: px, height: 20, background: "var(--color-primary)", borderRadius: "var(--radius-sm)", opacity: 0.3, flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-foreground)", fontVariantNumeric: "tabular-nums", minWidth: 120 }}>{token}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)" }}>{px}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 10 TOKENS DE COMPONENTE ── */}
        <Section id="tokens-ui" title="10 — Tokens de Componente">
          <SubLabel>Navbar glass</SubLabel>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)", marginBottom: "var(--space-6)", lineHeight: 1.6 }}>
            Aplicados ao pill nav e ao menu mobile. Adaptam entre light e dark.
          </p>
          <div className="card" style={{ marginBottom: "var(--space-10)" }}>
            <TokenRow token="--nav-bg"       value="rgba(255,255,255,0.82) / rgba(15,15,15,0.80)"  desc="Fundo translúcido do pill nav" />
            <TokenRow token="--nav-bg-solid" value="rgba(255,255,255,0.97) / rgba(15,15,15,0.97)"  desc="Fundo do menu mobile (mais opaco)" />
            <TokenRow token="--nav-border"   value="rgba(0,0,0,0.08) / rgba(255,255,255,0.08)"     desc="Borda sutil do glassmorphism" />
            <TokenRow token="--nav-shadow"   value="0 2px 16px rgba(0,0,0,0.10/0.40)"              desc="Sombra do pill nav" />
            <TokenRow token="--nav-height"   value="72px"                                           desc="Altura da navbar (para padding-top de seções)" />
          </div>

          <SubLabel>On-primary</SubLabel>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)", marginBottom: "var(--space-6)", lineHeight: 1.6 }}>
            Texto/ícone sobre fundo <code style={{ fontFamily: "monospace", background: "var(--color-muted)", padding: "1px 5px", borderRadius: "var(--radius-sm)" }}>var(--color-primary)</code> ou <code style={{ fontFamily: "monospace", background: "var(--color-muted)", padding: "1px 5px", borderRadius: "var(--radius-sm)" }}>var(--color-accent)</code>.
          </p>
          <div className="card">
            <TokenRow token="--color-on-primary"     value="#FFFFFF (light) / #0A0A0A (dark)"             desc="Texto/ícone principal sobre primary ou accent" />
            <TokenRow token="--color-on-primary-dim" value="rgba(255,255,255,0.65) / rgba(0,0,0,0.55)"   desc="Texto/ícone secundário (strip de info, sub-labels)" />
          </div>
        </Section>

      </div>

      <footer style={{ background: "var(--color-footer)", paddingTop: "var(--gap-xl)", paddingBottom: "var(--gap-lg)" }}>
        <div className="container">
          <div style={{ marginBottom: "var(--space-2)" }}>
            <Logo size={28} theme="dark" />
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-white-muted)" }}>
            Design System v2.1 · 2026
          </p>
        </div>
      </footer>
    </div>
  );
}

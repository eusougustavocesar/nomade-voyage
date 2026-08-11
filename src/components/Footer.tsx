"use client";

import { MessageCircle, Camera } from "lucide-react";
import Logo from "@/components/Logo";

const WA_LINK = "https://wa.me/351962221594?text=Olá!%20Vim%20pelo%20site%20da%20Nômade%20Voyage%20e%20quero%20saber%20mais.";

const destinos = [
  { label: "Lisboa",            href: "/pacotes?q=Lisboa" },
  { label: "Madrid",            href: "/pacotes?q=Madrid" },
  { label: "Dublin",            href: "/pacotes?q=Dublin" },
  { label: "Itália",            href: "/pacotes?q=Roma" },
  { label: "França",            href: "/pacotes?q=Paris" },
  { label: "Grécia",            href: "/pacotes?q=Atenas" },
  { label: "Ver todos →",       href: "/pacotes" },
];

const links = [
  { label: "Como funciona",     href: "/#como-funciona" },
  { label: "Depoimentos",       href: "/#depoimentos" },
  { label: "FAQ",               href: "/#faq" },
  { label: "Política de privacidade", href: "/privacidade" },
  { label: "Termos de uso",     href: "/termos" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-footer)" }}>
      {/* ── Main columns ── */}
      <div className="container" style={{ paddingTop: "var(--gap-xl)", paddingBottom: "var(--gap-lg)" }}>
        <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: "var(--gap-lg)", paddingBottom: "var(--gap-lg)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>

          {/* Col 1: Brand */}
          <div>
            <div style={{ marginBottom: "var(--space-4)" }}>
              <Logo size={44} theme="dark" />
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "rgba(255,255,255,0.50)", lineHeight: 1.65, marginBottom: "var(--space-6)" }}>
              Viagem pra Europa montada no WhatsApp, em grupo pequeno. Passagem, hotel, seguro e roteiro.
            </p>
            <a
              href={`https://www.instagram.com/_nomadevoyage`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
              style={{ gap: 8, color: "rgba(255,255,255,0.50)", textDecoration: "none", fontSize: "var(--text-caption)", fontFamily: "var(--font-body)" }}
            >
              <Camera size={15} />
              @_nomadevoyage
            </a>
          </div>

          {/* Col 2: Destinos */}
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "var(--text-micro)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "var(--space-4)" }}>
              Destinos
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {destinos.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "rgba(255,255,255,0.50)", textDecoration: "none", transition: "color 120ms" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.50)")}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Links úteis */}
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "var(--text-micro)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "var(--space-4)" }}>
              Links úteis
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "rgba(255,255,255,0.50)", textDecoration: "none", transition: "color 120ms" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.50)")}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4: Contato */}
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "var(--text-micro)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "var(--space-4)" }}>
              Contato
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ padding: "10px 18px", fontSize: "var(--text-body-sm)", display: "inline-flex", marginBottom: "var(--space-4)" }}
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "rgba(255,255,255,0.30)", lineHeight: 1.6 }}>
              +351 962 221 594<br />
              Resposta em até 24h
            </p>
          </div>
        </div>

        {/* ── Bottom: credenciais + copyright ── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between" style={{ paddingTop: "var(--space-6)", gap: "var(--space-4)" }}>
          <div className="flex flex-wrap items-center" style={{ gap: "var(--gap-sm)" }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "rgba(255,255,255,0.25)" }}>
              © 2026 Nômade Voyage · Todos os direitos reservados
            </span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "rgba(255,255,255,0.25)" }}>
              CNPJ 00.000.000/0001-00
            </span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "rgba(255,255,255,0.25)" }}>
              Cadastur 00.123456.10.0001-8
            </span>
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "var(--radius-full)",
              padding: "4px 12px",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-success)", flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "rgba(255,255,255,0.35)" }}>
              Agência registrada no Ministério do Turismo
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

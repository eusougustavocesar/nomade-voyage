"use client";

import { useState } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";

const links = [
  { label: "Viajar", href: "#viajar" },
  { label: "Explorar", href: "#explorar" },
  { label: "Morar", href: "#morar" },
  { label: "Destinos", href: "#destinos" },
];

const WA_LINK = "https://wa.me/5500000000000?text=Olá!%20Vim%20pelo%20site%20da%20Nômade%20Voyage%20e%20quero%20saber%20mais.";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4" style={{ pointerEvents: "none" }}>
      <div
        className="container flex items-center justify-between relative"
        style={{ pointerEvents: "all" }}
      >
        {/* Logo */}
        <a href="/" style={{ textDecoration: "none" }}>
          <Logo size={32} />
        </a>

        {/* Desktop pill nav */}
        <nav
          className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-0.5 px-2 py-1.5"
          style={{
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--color-border)",
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            boxShadow: "0 1px 8px rgba(14,165,233,0.10), 0 0 0 1px rgba(14,165,233,0.06)",
          }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "14px",
                color: "var(--color-muted-foreground)",
                textDecoration: "none",
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                transition: "color 150ms, background 150ms",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "var(--color-primary)";
                e.currentTarget.style.background = "var(--color-muted)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "var(--color-muted-foreground)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex btn-whatsapp"
          style={{ padding: "8px 18px", fontSize: "13px", gap: "7px" }}
        >
          <MessageCircle size={15} />
          WhatsApp
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          style={{ pointerEvents: "all" }}
        >
          {open ? <X size={22} color="var(--color-primary)" /> : <Menu size={22} color="var(--color-primary)" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden mx-4 mt-2 flex flex-col gap-1 px-3 py-3"
          style={{
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            boxShadow: "var(--shadow-md)",
            pointerEvents: "all",
          }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "15px",
                color: "var(--color-foreground)",
                textDecoration: "none",
                padding: "10px 12px",
                borderRadius: "var(--radius-md)",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp justify-center mt-1"
          >
            <MessageCircle size={16} />
            Falar no WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

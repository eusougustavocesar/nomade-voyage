"use client";

import { useState } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";

const links = [
  { label: "Pacotes",       href: "/pacotes" },
  { label: "Como funciona", href: "/#como-funciona" },
];

const WA_LINK = "https://wa.me/351962221594?text=Olá!%20Vim%20pelo%20site%20da%20Nômade%20Voyage%20e%20quero%20falar%20com%20um%20especialista.";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4" style={{ pointerEvents: "none" }}>
      <div className="container flex items-center justify-between relative" style={{ pointerEvents: "all" }}>

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
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "var(--text-caption)",
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

        {/* Desktop right: CTA */}
        <div className="hidden md:flex items-center" style={{ gap: "var(--space-3)" }}>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{ padding: "8px 18px", fontSize: "var(--text-micro)", gap: "7px" }}
          >
            <MessageCircle size={15} />
            Falar com especialista
          </a>
        </div>

        {/* Mobile: hamburger */}
        <div className="md:hidden flex items-center" style={{ gap: "var(--space-2)", pointerEvents: "all" }}>
          <button
            className="p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open
              ? <X    size={22} color="var(--color-primary)" />
              : <Menu size={22} color="var(--color-primary)" />
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden mx-4 mt-2 flex flex-col px-3 py-3"
          style={{
            gap: "var(--space-1)",
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
                fontSize: "var(--text-body-sm)",
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
            className="btn-whatsapp justify-center"
            style={{ marginTop: "var(--space-1)" }}
          >
            <MessageCircle size={16} />
            Falar com especialista
          </a>
        </div>
      )}
    </header>
  );
}

"use client";

import { MessageCircle } from "lucide-react";

const WA_LINK = "https://wa.me/351962221594?text=Olá!%20Vim%20pelo%20site%20da%20Nômade%20Voyage%20e%20quero%20saber%20mais.";

export default function FloatingWhatsApp() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="hidden sm:flex"
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 90,
        alignItems: "center",
        gap: 10,
        background: "#25D366",
        color: "#FFFFFF",
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        fontSize: "var(--text-body-sm)",
        padding: "13px 22px",
        borderRadius: "var(--radius-full)",
        textDecoration: "none",
        boxShadow: "0 4px 24px rgba(37, 211, 102, 0.45)",
        transition: "transform 150ms, box-shadow 150ms",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(37, 211, 102, 0.55)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(37, 211, 102, 0.45)";
      }}
    >
      <MessageCircle size={20} />
      Falar no WhatsApp
    </a>
  );
}

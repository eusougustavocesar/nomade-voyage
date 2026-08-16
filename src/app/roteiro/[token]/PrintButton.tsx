"use client";

import { Printer, MessageCircle } from "lucide-react";

export default function PrintButton({ waLink }: { waLink: string }) {
  return (
    <div className="flex items-center no-print" style={{ gap: "var(--space-3)" }}>
      <button
        onClick={() => window.print()}
        className="flex items-center"
        style={{
          gap: "var(--space-2)",
          padding: "var(--space-2) var(--space-4)",
          background: "var(--color-primary)",
          color: "#fff",
          border: "none",
          borderRadius: "var(--radius-md)",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        <Printer size={14} />
        Exportar PDF
      </button>
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="flex items-center"
        style={{
          gap: "var(--space-2)",
          padding: "var(--space-2) var(--space-4)",
          background: "#25D366",
          color: "#fff",
          borderRadius: "var(--radius-md)",
          fontSize: 13,
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        <MessageCircle size={14} />
        Compartilhar
      </a>
    </div>
  );
}

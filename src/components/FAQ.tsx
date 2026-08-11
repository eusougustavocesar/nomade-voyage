"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "A primeira conversa é paga?",
    a: "Não. Você manda o que quer, a gente entende se dá pra ajudar e só depois fala de proposta. Sem cobrança pra conversar.",
  },
  {
    q: "Vocês só fazem pacote fechado?",
    a: "Não. Tem roteiro base (Lisboa, multi-destino, etc.), mas a gente muda data, hotel e o que entra ou sai. Quase todo mundo mexe em alguma coisa.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Depende do que for reservado (passagem, hotel, seguro). Combinamos no WhatsApp, com os valores e prazos claros antes de você pagar qualquer coisa.",
  },
  {
    q: "E se eu ainda não tiver data certa?",
    a: "Pode mandar mesmo assim. Muita gente começa com “quero ir no segundo semestre” e a gente ajuda a achar janela e preço.",
  },
  {
    q: "Vocês só fazem Europa?",
    a: "O foco é Europa — Portugal, Espanha, Irlanda e multi-destino. Outros lugares a gente avalia caso a caso.",
  },
  {
    q: "E se eu quiser morar fora, não só viajar?",
    a: "A gente também conversa sobre visto e relocation (D7, D8 e afins). Não é o mesmo produto da viagem, mas dá pra tirar a dúvida na primeira mensagem.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
      {faqs.map((faq, i) => (
        <div
          key={i}
          style={{
            background: "var(--color-surface)",
            border: `1px solid ${open === i ? "var(--color-primary-light)" : "var(--color-border)"}`,
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            transition: "border-color 200ms, box-shadow 200ms",
            boxShadow: open === i ? "var(--shadow-sm)" : "none",
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "var(--space-6)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "var(--space-4)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "var(--text-body)",
              color: "var(--color-primary)",
              lineHeight: 1.4,
            }}
          >
            {faq.q}
            <ChevronDown
              size={18}
              color="var(--color-primary-light)"
              style={{
                flexShrink: 0,
                transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 200ms ease-out",
              }}
            />
          </button>
          {open === i && (
            <div
              style={{
                padding: "0 var(--space-6) var(--space-6)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-body)",
                color: "var(--color-muted-foreground)",
                lineHeight: 1.7,
              }}
            >
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

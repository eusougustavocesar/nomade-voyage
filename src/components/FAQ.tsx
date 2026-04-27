"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "A primeira conversa é paga?",
    a: "Não. A primeira consulta é 100% gratuita e sem compromisso. Você conta o seu caso, a gente entende o que faz sentido para o seu perfil — e só depois decide se quer seguir em frente.",
  },
  {
    q: "Quanto tempo demora o processo do visto D7?",
    a: "Em média 2 a 3 meses após a entrega da documentação completa. O processo começa com a consulta, passa pela organização de documentos e culmina na entrevista no consulado. A gente te acompanha em cada etapa.",
  },
  {
    q: "Vocês garantem a aprovação do visto?",
    a: "Nenhuma agência pode garantir aprovação — isso é decisão do consulado. O que garantimos é que você chega na entrevista com toda a documentação certa, nas especificações corretas, sem os erros que custam meses de espera.",
  },
  {
    q: "Qual a diferença entre o visto D7 e o D8?",
    a: "O D7 é para quem tem renda passiva — aposentadoria, dividendos ou aluguéis. O D8 é para nômades digitais que trabalham remotamente com renda ativa de empresa no exterior. Na primeira conversa, a gente te ajuda a identificar qual se encaixa no seu perfil.",
  },
  {
    q: "E se eu ainda não souber se quero ir de verdade?",
    a: "Esse é exatamente o momento certo para conversar — antes de decidir, não depois. A gente não vende nada para quem não está pronto. A primeira conversa existe para entender se faz sentido para você, agora.",
  },
  {
    q: "Vocês atendem só Portugal ou outros destinos também?",
    a: "Portugal é nosso destino mais forte, mas atendemos Espanha, Irlanda e EUA. Para cada destino temos parceiros especializados no processo de visto e relocation local.",
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

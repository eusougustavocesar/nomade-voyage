import Reveal from "@/components/Reveal";
import { Users, Globe, MessageCircle } from "lucide-react";

const items = [
  {
    icon: Users,
    title: "No máximo 8 por grupo",
    description:
      "Não é ônibus de 40 pessoas. Grupo pequeno cabe em restaurante local, muda o plano se chover e não te deixa perdido no meio da multidão.",
  },
  {
    icon: Globe,
    title: "Quem monta já esteve lá",
    description:
      "Já perdemos trem em Florença e já achamos hotel decente em Lisboa no pico da temporada. O roteiro sai da experiência, não de um PDF genérico.",
  },
  {
    icon: MessageCircle,
    title: "Começa no WhatsApp",
    description:
      "Manda o que você quer e o orçamento. Se não der, a gente fala. Sem cadastro, sem call agendada, sem pressão pra fechar na hora.",
  },
];

export default function SectionDiferenciais() {
  return (
    <section style={{ background: "var(--color-muted)" }}>
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="badge mb-4 inline-flex">Como a gente trabalha</span>
            <h2>O que você pode esperar</h2>
            <p className="section-subtitle">
              Pouca gente por grupo, roteiro feito por quem já foi, e conversa no WhatsApp do começo ao fim.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "var(--gap-md)" }}>
          {items.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={((i + 1) as 1 | 2 | 3)}>
              <div className="card flex flex-col h-full" style={{ gap: "var(--space-4)" }}>
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 52, height: 52, borderRadius: "var(--radius-full)", background: "var(--color-background)" }}
                >
                  <Icon size={22} color="var(--color-primary-light)" />
                </div>
                <h3 style={{ fontSize: "var(--text-h4)", lineHeight: 1.25 }}>{title}</h3>
                <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-muted-foreground)", lineHeight: 1.7 }}>
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import Reveal from "@/components/Reveal";
import { Users, Globe, MessageCircle } from "lucide-react";

const items = [
  {
    icon: Users,
    title: "Grupos de até 8 pessoas",
    description:
      "Você nunca vai ao Coliseu num ônibus com 40 estranhos. Grupos pequenos significam acesso a restaurantes, guias e experiências que o turismo de massa não alcança.",
  },
  {
    icon: Globe,
    title: "Quem fala lá sabe o que vale a pena",
    description:
      "A gente já comeu naquele restaurante sem fila, já perdeu o trem em Florença e já encontrou o hotel certo em Lisboa. Você não descobre isso no TripAdvisor.",
  },
  {
    icon: MessageCircle,
    title: "Primeira conversa gratuita, sem formulário",
    description:
      "Você descreve o que quer — a gente monta, sem 12 campos obrigatórios. Se não fizer sentido, falamos isso também. Sem pressão, sem compromisso.",
  },
];

export default function SectionDiferenciais() {
  return (
    <section style={{ background: "var(--color-muted)" }}>
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="badge mb-4 inline-flex">Por que a Nômade Voyage</span>
            <h2>O que muda quando você viaja com a gente</h2>
            <p className="section-subtitle">
              Não é diferencial de apresentação. É o que você vai sentir na prática, do primeiro contato até o retorno.
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

import Reveal from "@/components/Reveal";
import { MessageCircle, FileText, HeartHandshake } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Conta o que você quer",
    description:
      "Manda uma mensagem no WhatsApp. Sem formulário, sem robô — você fala com alguém que já viajou para o seu destino e sabe o que vale a pena.",
  },
  {
    number: "02",
    icon: FileText,
    title: "A gente monta o roteiro",
    description:
      "Entendemos seu perfil, destino e orçamento. Você recebe um plano completo: passagens, hotéis, experiências e seguro — sem surpresa.",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "Você embarca com tudo pronto",
    description:
      "Passagem confirmada, hotel reservado, roteiro na mão. Você curte cada momento — e a gente está disponível se precisar de algo.",
  },
];

export default function SectionComoFunciona() {
  return (
    <section id="como-funciona" style={{ background: "var(--color-surface)" }}>
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="badge mb-4 inline-flex">Simples assim</span>
            <h2>Como funciona</h2>
            <p className="section-subtitle">
              Nada de formulário longo. Uma conversa, um roteiro — você parte.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "var(--gap-lg)" }}>
          {steps.map(({ number, icon: Icon, title, description }, i) => (
            <Reveal key={number} delay={((i + 1) as 1 | 2 | 3)}>
              <div className="flex flex-col items-center text-center">
                <div className="relative" style={{ marginBottom: "var(--space-8)" }}>
                  <div
                    className="flex items-center justify-center"
                    style={{ width: 64, height: 64, borderRadius: "var(--radius-full)", background: "var(--color-muted)" }}
                  >
                    <Icon size={26} color="var(--color-primary-light)" />
                  </div>
                  <span style={{
                    position: "absolute", top: -8, right: -8,
                    fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-micro)",
                    color: "var(--color-on-primary)", background: "var(--color-accent)",
                    width: 24, height: 24, borderRadius: "var(--radius-full)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {number}
                  </span>
                </div>
                <h3 style={{ fontSize: "var(--text-h4)", marginBottom: "var(--space-4)" }}>{title}</h3>
                <p style={{ fontSize: "var(--text-body)", color: "var(--color-muted-foreground)", lineHeight: 1.7 }}>
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

import Reveal from "@/components/Reveal";
import { MessageCircle, FileText, HeartHandshake } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Manda no WhatsApp",
    description:
      "Conta destino, datas e quanto quer gastar. Resposta de pessoa de verdade, não de chatbot.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Recebe a proposta",
    description:
      "Passagem, hotel, seguro e dia a dia. Você mexe no que quiser antes de fechar.",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "Embarca com tudo resolvido",
    description:
      "Voucher na mão e suporte no WhatsApp se algo der errado no caminho.",
  },
];

export default function SectionComoFunciona() {
  return (
    <section id="como-funciona">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="badge mb-4 inline-flex">Passo a passo</span>
            <h2>Como funciona</h2>
            <p className="section-subtitle">
              Três etapas. Do WhatsApp ao aeroporto.
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

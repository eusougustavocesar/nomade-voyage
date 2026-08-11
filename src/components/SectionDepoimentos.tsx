import Reveal from "@/components/Reveal";
import { Star, User } from "lucide-react";

const testimonials = [
  {
    text: "Primeira vez fora do Brasil, sozinha. Em uns 5 dias tinha voo, hotel no centro e o roteiro no celular. Lisboa em 10 dias, sem dor de cabeça.",
    name: "Marina S.",
    age: "34 anos",
    city: "São Paulo, SP",
    trip: "Lisboa · 10 dias · Março 2026",
  },
  {
    text: "Tentei planejar sozinho duas vezes e larguei. No WhatsApp foi mais rápido: em 3 dias tava com Lisboa, Sevilha e Madrid fechados. Ainda me avisaram de greve de trem antes de embarcar.",
    name: "Rafael M.",
    age: "41 anos",
    city: "Belo Horizonte, MG",
    trip: "Portugal e Espanha · 14 dias · Janeiro 2026",
  },
  {
    text: "Não tentaram me vender o pacote caro. Perguntaram o teto e montaram em cima. 8 dias em Dublin no orçamento que eu tinha.",
    name: "Camila T.",
    age: "28 anos",
    city: "Rio de Janeiro, RJ",
    trip: "Dublin e interior da Irlanda · 8 dias · Fevereiro 2026",
  },
];

export default function SectionDepoimentos() {
  return (
    <section id="depoimentos">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="badge mb-4 inline-flex">Quem já viajou</span>
            <h2>O que o pessoal fala</h2>
            <div className="flex items-center justify-center" style={{ gap: 8, marginTop: "var(--space-4)" }}>
              <div className="flex" style={{ gap: 2 }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--color-accent)" color="var(--color-accent)" />
                ))}
              </div>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-body-md)", color: "var(--color-primary)" }}>
                4.9
              </span>
              <span style={{ fontSize: "var(--text-body-sm)", color: "var(--color-muted-foreground)" }}>
                · 200+ viajantes atendidos
              </span>
            </div>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "var(--gap-md)" }}>
          {testimonials.map(({ text, name, age, city, trip }, i) => (
            <Reveal key={name} delay={((i + 1) as 1 | 2 | 3)}>
              <div className="card flex flex-col h-full" style={{ background: "var(--color-surface)" }}>
                <div className="flex" style={{ gap: "var(--space-1)", marginBottom: "var(--space-6)" }}>
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} size={14} fill="var(--color-accent)" color="var(--color-accent)" />
                  ))}
                </div>
                <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-foreground)", lineHeight: 1.75, marginBottom: "var(--space-6)", flex: 1 }}>
                  &ldquo;{text}&rdquo;
                </p>
                <div
                  className="flex items-start"
                  style={{ gap: "var(--gap-xs)", paddingTop: "var(--space-4)", borderTop: "1px solid var(--color-border)" }}
                >
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{ width: 36, height: 36, borderRadius: "var(--radius-full)", background: "var(--color-muted)", marginTop: 2 }}
                  >
                    <User size={15} color="var(--color-primary-light)" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "var(--text-body-sm)", color: "var(--color-foreground)" }}>
                      {name}{" "}
                      <span style={{ fontWeight: 400, color: "var(--color-muted-foreground)" }}>
                        · {age} · {city}
                      </span>
                    </p>
                    <p style={{ fontSize: "var(--text-micro)", color: "var(--color-accent)", fontWeight: 600, marginTop: 3 }}>
                      {trip}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

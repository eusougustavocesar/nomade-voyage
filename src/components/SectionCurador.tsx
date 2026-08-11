import fs from "fs";
import path from "path";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { MessageCircle, MapPin, Users, HeartHandshake } from "lucide-react";

const WA_LINK =
  "https://wa.me/351962221594?text=Olá!%20Vim%20pelo%20site%20e%20quero%20falar%20com%20o%20Alexandre%20sobre%20minha%20viagem.";

const stats = [
  { icon: Users, value: "200+", label: "viajantes atendidos" },
  { icon: HeartHandshake, value: "Até 8", label: "grupos por mês" },
  { icon: MapPin, value: "Europa", label: "no chão, não no Google" },
];

function hasCuradorPhoto(): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "curador.jpg"));
  } catch {
    return false;
  }
}

export default function SectionCurador() {
  const photo = hasCuradorPhoto();

  return (
    <section id="curador" style={{ background: "var(--color-background)" }}>
      <div className="container">
        <Reveal>
          <div
            className="grid grid-cols-1 md:grid-cols-2 items-center"
            style={{
              gap: "var(--gap-xl)",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-xl)",
              padding: "var(--gap-lg)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            {/* ── Foto / avatar ── */}
            <div className="flex flex-col items-center md:items-start" style={{ gap: "var(--space-6)" }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 360,
                  aspectRatio: "4 / 5",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  background: "var(--color-muted)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {photo ? (
                  <Image
                    src="/curador.jpg"
                    alt="Alexandre Ferreira — curador da Nômade Voyage"
                    fill
                    quality={85}
                    sizes="(max-width: 768px) 90vw, 360px"
                    style={{ objectFit: "cover" }}
                    priority={false}
                  />
                ) : (
                  <div
                    className="flex flex-col items-center justify-center h-full w-full"
                    style={{ gap: "var(--space-4)", padding: "var(--space-8)" }}
                  >
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: "var(--radius-full)",
                        background: "var(--color-primary)",
                        color: "var(--color-on-primary)",
                        fontFamily: "var(--font-heading)",
                        fontWeight: 700,
                        fontSize: 42,
                        letterSpacing: "-0.02em",
                      }}
                      aria-hidden
                    >
                      AF
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 600,
                        fontSize: "var(--text-h4)",
                        color: "var(--color-primary)",
                        textAlign: "center",
                      }}
                    >
                      Alexandre Ferreira
                    </p>
                    <p
                      style={{
                        fontSize: "var(--text-caption)",
                        color: "var(--color-muted-foreground)",
                        textAlign: "center",
                      }}
                    >
                      Foto real em breve · @_eusounomade
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ── Texto ── */}
            <div className="flex flex-col" style={{ gap: "var(--space-6)" }}>
              <div>
                <span className="badge badge-accent mb-4 inline-flex">Quem planeja a sua viagem</span>
                <h2 style={{ marginBottom: "var(--space-3)", fontSize: "var(--text-h2)" }}>
                  Alexandre Ferreira
                </h2>
                <p
                  style={{
                    fontSize: "var(--text-body-sm)",
                    fontWeight: 600,
                    color: "var(--color-accent)",
                    marginBottom: "var(--space-6)",
                  }}
                >
                  Curador · Nômade Voyage · @_eusounomade
                </p>
                <p
                  style={{
                    fontSize: "var(--text-body-md)",
                    color: "var(--color-foreground)",
                    lineHeight: 1.75,
                    marginBottom: "var(--space-4)",
                  }}
                >
                  Não sou um call center. Sou o cara que já perdeu o trem em Florença, já encontrou o
                  hotel certo em Lisboa e vive a Europa no chão — não no TripAdvisor.
                </p>
                <p
                  style={{
                    fontSize: "var(--text-body)",
                    color: "var(--color-muted-foreground)",
                    lineHeight: 1.75,
                  }}
                >
                  Hoje planejo a sua viagem no WhatsApp: passagens, hotéis, seguro e roteiro do jeito
                  que eu gostaria que alguém tivesse feito por mim. Sem robô. Sem 12 campos. Uma
                  conversa real sobre a sua Europa.
                </p>
              </div>

              {/* Stats */}
              <div
                className="grid grid-cols-3"
                style={{
                  gap: "var(--gap-xs)",
                  paddingTop: "var(--space-2)",
                  paddingBottom: "var(--space-2)",
                }}
              >
                {stats.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex flex-col" style={{ gap: 4 }}>
                    <div className="flex items-center" style={{ gap: 6 }}>
                      <Icon size={14} color="var(--color-primary-light)" aria-hidden />
                      <span
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontWeight: 700,
                          fontSize: "var(--text-body-md)",
                          color: "var(--color-primary)",
                        }}
                      >
                        {value}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "var(--text-micro)",
                        color: "var(--color-muted-foreground)",
                        lineHeight: 1.4,
                      }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <div>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ fontSize: "var(--text-body-sm)", padding: "12px 22px" }}
                >
                  <MessageCircle size={18} />
                  Falar com o Alexandre
                </a>
                <p
                  style={{
                    fontSize: "var(--text-micro)",
                    color: "var(--color-muted-foreground)",
                    marginTop: "var(--space-3)",
                  }}
                >
                  Primeira conversa gratuita · sem compromisso
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

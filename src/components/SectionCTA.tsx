import { MessageCircle, Clock } from "lucide-react";

const WA_LINK  = "https://wa.me/351962221594?text=Olá!%20Vim%20pelo%20site%20da%20Nômade%20Voyage%20e%20quero%20saber%20mais.";
const WA_GUIDE = "https://wa.me/351962221594?text=Olá!%20Quero%20dicas%20sobre%20como%20planejar%20minha%20viagem%20para%20a%20Europa.";

export default function SectionCTA() {
  return (
    <section style={{ padding: "var(--gap-xl) 0" }}>
      <div className="container">
        <div className="text-center" style={{
          background: "var(--color-surface)",
          borderRadius: "var(--radius-xl)",
          padding: "var(--section-y) var(--gap-lg)",
          border: "1px solid var(--color-border)",
        }}>
        <span className="badge badge-accent mb-5 inline-flex" style={{ gap: 6 }}>
          <Clock size={11} />
          Até 8 grupos por mês
        </span>
        <h2 style={{ marginBottom: "var(--space-6)" }}>
          Cansou de adiar?
        </h2>
        <p style={{ fontSize: "var(--text-body-lg)", color: "var(--color-muted-foreground)", maxWidth: 480, margin: "0 auto var(--space-6)", lineHeight: 1.65 }}>
          Manda no WhatsApp o destino e as datas. A gente responde com o que dá pra montar no seu orçamento.
        </p>
        <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-muted-foreground)", maxWidth: 360, margin: "0 auto var(--space-10)", lineHeight: 1.6 }}>
          Se a agenda do mês estiver cheia, a gente avisa e encaixa no próximo.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: "var(--gap-sm)" }}>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{ fontSize: "var(--text-body-md)", padding: "var(--space-4) var(--space-8)" }}
          >
            <MessageCircle size={22} />
            Falar no WhatsApp
          </a>
          <a
            href={WA_GUIDE}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 500, fontSize: "var(--text-body-sm)", color: "var(--color-muted-foreground)", textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            ou pedir uma dica rápida sobre a Europa →
          </a>
        </div>
        </div>
      </div>
    </section>
  );
}

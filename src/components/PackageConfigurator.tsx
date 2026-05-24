"use client";

import { useState } from "react";
import { MessageCircle, MapPin } from "lucide-react";

const INCLUSIONS = [
  { id: "passagem", label: "Passagem aérea ida e volta" },
  { id: "hotel", label: "Hotel" },
  { id: "seguro", label: "Seguro viagem" },
  { id: "roteiro", label: "Roteiro dia a dia" },
  { id: "transfers", label: "Transfers aeroporto/hotel" },
  { id: "ingressos", label: "Ingressos e passeios" },
  { id: "chip", label: "Chip internacional" },
];

const NIGHT_OPTIONS = ["7", "10", "14"];
const HOTEL_CATEGORIES = ["Hostel", "Hotel 3★", "Hotel 4★", "Apartamento"];

const WA_BASE = "https://wa.me/351962221594?text=";

export default function PackageConfigurator({ destination }: { destination: string }) {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(["passagem", "hotel", "seguro", "roteiro", "transfers"])
  );
  const [nights, setNights] = useState("10");
  const [customNights, setCustomNights] = useState("");
  const [hotelCategory, setHotelCategory] = useState("Hotel 3★");

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function buildMessage() {
    const inclusions = INCLUSIONS.filter((i) => selected.has(i.id)).map((i) => i.label);
    const nightCount = nights === "outro" ? (customNights || "a combinar") : `${nights} noites`;
    return encodeURIComponent(
      [
        `Olá! Quero montar um pacote personalizado para ${destination}.`,
        ``,
        `Duração: ${nightCount}`,
        `Hospedagem: ${hotelCategory}`,
        `Incluir:`,
        ...inclusions.map((inc) => `• ${inc}`),
        ``,
        `Pode me passar uma proposta?`,
      ].join("\n")
    );
  }

  const pillStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-caption)",
    fontWeight: 500,
    padding: "5px 14px",
    borderRadius: "var(--radius-full)",
    border: "1.5px solid",
    cursor: "pointer",
    transition: "all 120ms ease-out",
    borderColor: active ? "var(--color-primary)" : "var(--color-border)",
    background: active ? "var(--color-primary)" : "transparent",
    color: active ? "#fff" : "var(--color-muted-foreground)",
  });

  return (
    <div className="card" style={{ maxWidth: 600, margin: "0 auto" }}>
      <div className="flex items-center" style={{ gap: 10, marginBottom: "var(--space-4)" }}>
        <MapPin size={20} color="var(--color-primary-light)" />
        <div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Montar pacote para
          </p>
          <h3 style={{ fontSize: "var(--text-h3)", fontWeight: 700 }}>{destination}</h3>
        </div>
      </div>

      <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-muted-foreground)", marginBottom: "var(--gap-md)", lineHeight: 1.6 }}>
        Ainda não temos um roteiro pronto para esse destino, mas montamos um personalizado para você. Selecione o que quer incluir:
      </p>

      {/* Checklist */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginBottom: "var(--gap-md)" }}>
        {INCLUSIONS.map(({ id, label }) => (
          <label
            key={id}
            onClick={() => toggle(id)}
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" }}
          >
            <div style={{
              width: 20,
              height: 20,
              borderRadius: 5,
              border: `2px solid ${selected.has(id) ? "var(--color-primary)" : "var(--color-border)"}`,
              background: selected.has(id) ? "var(--color-primary)" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "all 120ms",
            }}>
              {selected.has(id) && (
                <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                  <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-foreground)" }}>
              {label}
            </span>
          </label>
        ))}
      </div>

      {/* Nights */}
      <div style={{ marginBottom: "var(--space-6)" }}>
        <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "var(--text-caption)", color: "var(--color-foreground)", marginBottom: "var(--space-3)" }}>
          Quantas noites?
        </p>
        <div className="flex flex-wrap" style={{ gap: "var(--space-2)" }}>
          {NIGHT_OPTIONS.map((n) => (
            <button key={n} onClick={() => setNights(n)} style={pillStyle(nights === n)}>
              {n} noites
            </button>
          ))}
          <button onClick={() => setNights("outro")} style={pillStyle(nights === "outro")}>
            Outro
          </button>
          {nights === "outro" && (
            <input
              type="number"
              min={1}
              placeholder="ex: 21"
              value={customNights}
              onChange={(e) => setCustomNights(e.target.value)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-caption)",
                padding: "5px 12px",
                borderRadius: "var(--radius-md)",
                border: "1.5px solid var(--color-border)",
                width: 80,
                background: "transparent",
                color: "var(--color-foreground)",
                outline: "none",
              }}
            />
          )}
        </div>
      </div>

      {/* Hotel category */}
      <div style={{ marginBottom: "var(--gap-md)" }}>
        <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "var(--text-caption)", color: "var(--color-foreground)", marginBottom: "var(--space-3)" }}>
          Categoria de hospedagem
        </p>
        <div className="flex flex-wrap" style={{ gap: "var(--space-2)" }}>
          {HOTEL_CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setHotelCategory(cat)} style={pillStyle(hotelCategory === cat)}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <a
        href={`${WA_BASE}${buildMessage()}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp"
        style={{ width: "100%", justifyContent: "center" }}
      >
        <MessageCircle size={18} />
        Quero este pacote personalizado
      </a>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)", textAlign: "center", marginTop: "var(--space-3)" }}>
        Sem compromisso · Resposta em até 24h
      </p>
    </div>
  );
}

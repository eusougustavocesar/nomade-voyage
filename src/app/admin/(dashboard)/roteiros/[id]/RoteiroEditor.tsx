"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2, Link as LinkIcon, MessageCircle, Check } from "lucide-react";
import { updateItineraryDays } from "../actions";
import type { ItineraryDay } from "@/components/ItineraryTimeline";

export default function RoteiroEditor({
  itineraryId,
  shareToken,
  initialDays,
}: {
  itineraryId: string;
  shareToken: string;
  initialDays: ItineraryDay[];
}) {
  const [days, setDays]   = useState<ItineraryDay[]>(initialDays);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const publicUrl = typeof window !== "undefined" ? `${window.location.origin}/roteiro/${shareToken}` : "";

  function addDay() {
    setDays((prev) => [...prev, { day: prev.length + 1, title: "", description: "", photo_url: "" }]);
  }

  function removeDay(index: number) {
    setDays((prev) => prev.filter((_, i) => i !== index).map((d, i) => ({ ...d, day: i + 1 })));
  }

  function updateDay(index: number, field: keyof ItineraryDay, value: string) {
    setDays((prev) => prev.map((d, i) => (i === index ? { ...d, [field]: value } : d)));
  }

  function handleSave() {
    setError(null);
    startTransition(async () => {
      try {
        await updateItineraryDays(itineraryId, days);
      } catch (err: any) {
        setError(err.message);
      }
    });
  }

  function copyLink() {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const waShareLink = `https://wa.me/?text=${encodeURIComponent(`Confira seu roteiro personalizado: ${publicUrl}`)}`;

  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-4)" }}>
        <h2 style={{ fontSize: "var(--text-body)", fontWeight: 700 }}>Dias do roteiro</h2>
        <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
          <button onClick={copyLink} style={linkBtnStyle}>
            {copied ? <Check size={12} /> : <LinkIcon size={12} />}
            {copied ? "Copiado" : "Copiar link público"}
          </button>
          <a href={waShareLink} target="_blank" rel="noreferrer" style={{ ...linkBtnStyle, textDecoration: "none", color: "var(--color-success)" }}>
            <MessageCircle size={12} />
            WhatsApp
          </a>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", marginBottom: "var(--space-4)" }}>
        {days.map((d, i) => (
          <div key={i} className="admin-card" style={{ position: "relative" }}>
            <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-3)" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--color-primary)" }}>Dia {d.day}</span>
              <button onClick={() => removeDay(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-destructive)" }}>
                <Trash2 size={13} />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <input
                value={d.title}
                onChange={(e) => updateDay(i, "title", e.target.value)}
                placeholder="Título do dia (ex: Chegada em Lisboa)"
                style={inputStyle}
              />
              <textarea
                value={d.description}
                onChange={(e) => updateDay(i, "description", e.target.value)}
                placeholder="Descrição"
                rows={3}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
              />
              <input
                value={d.photo_url ?? ""}
                onChange={(e) => updateDay(i, "photo_url", e.target.value)}
                placeholder="URL da foto (opcional)"
                style={inputStyle}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button onClick={addDay} className="flex items-center" style={linkBtnStyle}>
          <Plus size={12} />
          Adicionar dia
        </button>

        <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
          {error && <p style={{ fontSize: 12, color: "var(--color-destructive)" }}>{error}</p>}
          <button
            onClick={handleSave}
            disabled={isPending}
            style={{
              padding: "var(--space-2) var(--space-4)",
              background: "var(--color-primary)",
              color: "#fff",
              border: "none",
              borderRadius: "var(--radius-md)",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              opacity: isPending ? 0.6 : 1,
            }}
          >
            {isPending ? "Salvando..." : "Salvar roteiro"}
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "var(--space-2) var(--space-3)",
  background: "var(--color-background)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  fontSize: 12,
  color: "var(--color-foreground)",
  outline: "none",
  boxSizing: "border-box",
};

const linkBtnStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-1)",
  padding: "4px 10px",
  fontSize: 11,
  fontWeight: 600,
  cursor: "pointer",
  color: "var(--color-primary)",
  background: "var(--color-accent-bg)",
  border: "none",
  borderRadius: "var(--radius-full)",
};

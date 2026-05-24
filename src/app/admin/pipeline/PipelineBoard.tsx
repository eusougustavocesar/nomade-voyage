"use client";

import { useState, useRef } from "react";
import { MapPin, Users, DollarSign } from "lucide-react";
import { updateLeadStage } from "./actions";

type Lead = {
  id: string;
  stage: string;
  destination: string | null;
  estimated_value: number | null;
  group_size: number | null;
  travel_date_from: string | null;
  created_at: string;
  contacts: { full_name: string; phone: string | null } | null;
};

const STAGES = [
  { key: "novo",             label: "Novo",       color: "var(--color-muted-foreground)" },
  { key: "qualificado",      label: "Qualificado", color: "var(--color-primary-light)" },
  { key: "proposta_enviada", label: "Proposta",   color: "var(--color-accent)" },
  { key: "negociacao",       label: "Negociação", color: "var(--color-purple, #8b5cf6)" },
  { key: "reservado",        label: "Reservado",  color: "var(--color-success, #22c55e)" },
];

function fmt(v: number | null) {
  if (!v) return null;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency", currency: "BRL", maximumFractionDigits: 0,
  }).format(v);
}

function daysAgo(date: string) {
  const d = Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
  if (d === 0) return "hoje";
  if (d === 1) return "ontem";
  return `${d}d`;
}

function LeadCard({
  lead,
  onDragStart,
}: {
  lead: Lead;
  onDragStart: (id: string) => void;
}) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(lead.id)}
      style={{
        background: "var(--color-background)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        padding: "var(--space-3)",
        cursor: "grab",
        userSelect: "none",
      }}
    >
      <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-1)" }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: "var(--color-foreground)" }}>
          {lead.contacts?.full_name ?? "—"}
        </p>
        <span style={{ fontSize: 10, color: "var(--color-muted-foreground)" }}>
          {daysAgo(lead.created_at)}
        </span>
      </div>

      {lead.destination && (
        <div className="flex items-center" style={{ gap: 4, marginBottom: "var(--space-2)" }}>
          <MapPin size={10} color="var(--color-primary-light)" />
          <span style={{ fontSize: 11, color: "var(--color-muted-foreground)" }}>
            {lead.destination}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
          {lead.group_size && (
            <span className="flex items-center" style={{ gap: 3, fontSize: 10, color: "var(--color-muted-foreground)" }}>
              <Users size={9} />
              {lead.group_size}
            </span>
          )}
        </div>
        {fmt(lead.estimated_value) && (
          <span className="flex items-center" style={{ gap: 3, fontSize: 11, fontWeight: 600, color: "var(--color-primary)" }}>
            <DollarSign size={9} />
            {fmt(lead.estimated_value)}
          </span>
        )}
      </div>
    </div>
  );
}

export default function PipelineBoard({ leads: initial }: { leads: Lead[] }) {
  const [leads, setLeads] = useState(initial);
  const [draggingOver, setDraggingOver] = useState<string | null>(null);
  const draggingId = useRef<string | null>(null);

  function handleDragStart(id: string) {
    draggingId.current = id;
  }

  function handleDrop(targetStage: string) {
    const id = draggingId.current;
    if (!id) return;

    const lead = leads.find((l) => l.id === id);
    if (!lead || lead.stage === targetStage) {
      setDraggingOver(null);
      draggingId.current = null;
      return;
    }

    // Optimistic update
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, stage: targetStage } : l))
    );
    setDraggingOver(null);
    draggingId.current = null;

    updateLeadStage(id, targetStage).catch(() => {
      // Revert on error
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, stage: lead.stage } : l))
      );
    });
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "var(--gap-sm)",
        overflowX: "auto",
        height: "100%",
        paddingBottom: "var(--space-4)",
      }}
    >
      {STAGES.map(({ key, label, color }) => {
        const col = leads.filter((l) => l.stage === key);
        const isOver = draggingOver === key;

        return (
          <div
            key={key}
            onDragOver={(e) => { e.preventDefault(); setDraggingOver(key); }}
            onDragLeave={() => setDraggingOver(null)}
            onDrop={() => handleDrop(key)}
            style={{
              width: 240,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
              background: isOver ? "var(--color-muted)" : "var(--color-surface)",
              border: `1px solid ${isOver ? color : "var(--color-border)"}`,
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-4)",
              transition: "background 120ms, border-color 120ms",
            }}
          >
            {/* Column header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-foreground)" }}>
                  {label}
                </span>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 600,
                background: "var(--color-muted)",
                color: "var(--color-muted-foreground)",
                borderRadius: "var(--radius-full)",
                padding: "0 6px",
                lineHeight: "18px",
              }}>
                {col.length}
              </span>
            </div>

            {/* Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", flex: 1 }}>
              {col.length === 0 ? (
                <div style={{
                  flex: 1,
                  minHeight: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px dashed var(--color-border)`,
                  borderRadius: "var(--radius-md)",
                  color: "var(--color-muted-foreground)",
                  fontSize: 11,
                }}>
                  {isOver ? "Soltar aqui" : "Vazio"}
                </div>
              ) : (
                col.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} onDragStart={handleDragStart} />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

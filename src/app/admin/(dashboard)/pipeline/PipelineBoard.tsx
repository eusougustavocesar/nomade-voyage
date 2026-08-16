"use client";

import { useState, useRef, useTransition } from "react";
import { MapPin, Users, DollarSign, Pencil, MessageCircle } from "lucide-react";
import { updateLeadStage, updateLeadToLost, convertLeadToBooking } from "./actions";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { fmtCurrency } from "@/lib/format";
import LostReasonModal from "./LostReasonModal";
import ConvertBookingModal from "./ConvertBookingModal";

export type Lead = {
  id: string;
  stage: string;
  destination: string | null;
  estimated_value: number | null;
  adults: number | null;
  children: number | null;
  travel_date_from: string | null;
  travel_date_to: string | null;
  duration_days: number | null;
  budget_min: number | null;
  budget_max: number | null;
  flexible_dates: boolean | null;
  observations: string | null;
  created_at: string;
  contacts: { full_name: string; phone: string | null } | null;
};

export const STAGES = [
  { key: "novo",             label: "Novo",       color: "var(--color-muted-foreground)" },
  { key: "qualificado",      label: "Qualificado", color: "var(--color-primary-light)" },
  { key: "proposta_enviada", label: "Proposta",   color: "var(--color-accent)" },
  { key: "negociacao",       label: "Negociação", color: "var(--color-purple, #8b5cf6)" },
  { key: "reservado",        label: "Reservado",  color: "var(--color-success, #22c55e)" },
  { key: "perdido",          label: "Perdido",    color: "var(--color-destructive)" },
];

function daysAgo(date: string) {
  const d = Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
  if (d === 0) return "hoje";
  if (d === 1) return "ontem";
  return `${d}d`;
}

function LeadCard({
  lead,
  onDragStart,
  onOpenLead,
}: {
  lead: Lead;
  onDragStart: (id: string) => void;
  onOpenLead: (lead: Lead) => void;
}) {
  const waLink = buildWhatsAppLink(lead.contacts?.phone);

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
        <div className="flex items-center" style={{ gap: 6 }}>
          {waLink && (
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{ display: "flex", color: "var(--color-success)" }}
              title="Abrir WhatsApp"
            >
              <MessageCircle size={11} />
            </a>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onOpenLead(lead); }}
            style={{ display: "flex", background: "none", border: "none", cursor: "pointer", color: "var(--color-muted-foreground)", padding: 0 }}
            title="Editar lead"
          >
            <Pencil size={11} />
          </button>
          <span style={{ fontSize: 10, color: "var(--color-muted-foreground)" }}>
            {daysAgo(lead.created_at)}
          </span>
        </div>
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
          {(lead.adults || lead.children) && (
            <span className="flex items-center" style={{ gap: 3, fontSize: 10, color: "var(--color-muted-foreground)" }}>
              <Users size={9} />
              {(lead.adults ?? 0) + (lead.children ?? 0)}
              {!!lead.children && ` (${lead.children} criança${lead.children > 1 ? "s" : ""})`}
            </span>
          )}
        </div>
        {fmtCurrency(lead.estimated_value, null) && (
          <span className="flex items-center" style={{ gap: 3, fontSize: 11, fontWeight: 600, color: "var(--color-primary)" }}>
            <DollarSign size={9} />
            {fmtCurrency(lead.estimated_value, null)}
          </span>
        )}
      </div>
    </div>
  );
}

export default function PipelineBoard({
  leads,
  setLeads,
  onOpenLead,
}: {
  leads: Lead[];
  setLeads: (updater: (prev: Lead[]) => Lead[]) => void;
  onOpenLead: (lead: Lead) => void;
}) {
  const [draggingOver, setDraggingOver] = useState<string | null>(null);
  const draggingId = useRef<string | null>(null);
  const [lostPromptFor, setLostPromptFor] = useState<{ id: string; previousStage: string } | null>(null);
  const [lostError, setLostError] = useState<string | null>(null);
  const [convertPromptFor, setConvertPromptFor] = useState<Lead | null>(null);
  const [convertError, setConvertError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDragStart(id: string) {
    draggingId.current = id;
  }

  function handleDrop(targetStage: string) {
    const id = draggingId.current;
    setDraggingOver(null);
    draggingId.current = null;
    if (!id) return;

    const lead = leads.find((l) => l.id === id);
    if (!lead || lead.stage === targetStage) return;

    if (targetStage === "perdido") {
      setLostPromptFor({ id, previousStage: lead.stage });
      return;
    }

    if (targetStage === "reservado") {
      setConvertPromptFor(lead);
      return;
    }

    // Optimistic update
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, stage: targetStage } : l)));

    updateLeadStage(id, targetStage).catch(() => {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, stage: lead.stage } : l)));
    });
  }

  function confirmLost(reason: string) {
    if (!lostPromptFor) return;
    setLostError(null);
    startTransition(async () => {
      try {
        await updateLeadToLost(lostPromptFor.id, reason);
        setLeads((prev) => prev.map((l) => (l.id === lostPromptFor.id ? { ...l, stage: "perdido" } : l)));
        setLostPromptFor(null);
      } catch (err: any) {
        setLostError(err.message);
      }
    });
  }

  function confirmConvert(fd: FormData) {
    if (!convertPromptFor) return;
    setConvertError(null);
    startTransition(async () => {
      try {
        await convertLeadToBooking(convertPromptFor.id, fd);
        setLeads((prev) => prev.map((l) => (l.id === convertPromptFor.id ? { ...l, stage: "reservado" } : l)));
        setConvertPromptFor(null);
      } catch (err: any) {
        setConvertError(err.message);
      }
    });
  }

  return (
    <>
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
                    <LeadCard key={lead.id} lead={lead} onDragStart={handleDragStart} onOpenLead={onOpenLead} />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {lostPromptFor && (
        <LostReasonModal
          onCancel={() => { setLostPromptFor(null); setLostError(null); }}
          onConfirm={confirmLost}
          isPending={isPending}
          error={lostError}
        />
      )}

      {convertPromptFor && (
        <ConvertBookingModal
          lead={convertPromptFor}
          onCancel={() => { setConvertPromptFor(null); setConvertError(null); }}
          onConfirm={confirmConvert}
          isPending={isPending}
          error={convertError}
        />
      )}
    </>
  );
}

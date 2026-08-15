"use client";

import { useState, useTransition } from "react";
import { X, MessageCircle } from "lucide-react";
import { updateLead } from "./actions";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { Lead } from "./PipelineBoard";

export default function LeadDetailModal({
  lead,
  onClose,
}: {
  lead: Lead;
  onClose: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const waLink = buildWhatsAppLink(lead.contacts?.phone);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await updateLead(lead.id, fd);
        onClose();
      } catch (err: any) {
        setError(err.message);
      }
    });
  }

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        background: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "var(--space-6)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        width: "100%", maxWidth: 480,
        maxHeight: "90vh",
        overflowY: "auto",
        background: "var(--color-surface)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--color-border)",
        padding: "var(--space-6)",
      }}>
        <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-2)" }}>
          <h2 style={{ fontSize: "var(--text-body)", fontWeight: 700 }}>{lead.contacts?.full_name ?? "Lead"}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted-foreground)" }}>
            <X size={16} />
          </button>
        </div>

        {waLink && (
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-1)", fontSize: 11, color: "var(--color-success)", textDecoration: "none", marginBottom: "var(--space-6)" }}
          >
            <MessageCircle size={11} />
            {lead.contacts?.phone}
          </a>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", marginTop: waLink ? 0 : "var(--space-4)" }}>
          <Field label="Destino" name="destination" defaultValue={lead.destination ?? ""} placeholder="Lisboa, Portugal" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
            <Field label="Data de ida" name="travel_date_from" type="date" defaultValue={lead.travel_date_from ?? ""} />
            <Field label="Data de volta" name="travel_date_to" type="date" defaultValue={lead.travel_date_to ?? ""} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
            <Field label="Duração (dias)" name="duration_days" type="number" defaultValue={lead.duration_days ?? ""} />
            <Field label="Passageiros" name="group_size" type="number" defaultValue={lead.group_size ?? ""} />
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", fontSize: 12, color: "var(--color-muted-foreground)" }}>
            <input type="checkbox" name="flexible_dates" defaultChecked={lead.flexible_dates ?? false} />
            Datas flexíveis
          </label>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
            <Field label="Orçamento mín. (R$)" name="budget_min" type="number" defaultValue={lead.budget_min ?? ""} />
            <Field label="Orçamento máx. (R$)" name="budget_max" type="number" defaultValue={lead.budget_max ?? ""} />
          </div>

          <Field label="Valor estimado (R$)" name="estimated_value" type="number" defaultValue={lead.estimated_value ?? ""} />

          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "var(--color-muted-foreground)", display: "block", marginBottom: "var(--space-2)" }}>
              Observações
            </label>
            <textarea
              name="observations"
              defaultValue={lead.observations ?? ""}
              rows={3}
              style={{
                width: "100%",
                padding: "var(--space-2) var(--space-3)",
                background: "var(--color-background)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                fontSize: 12,
                color: "var(--color-foreground)",
                outline: "none",
                boxSizing: "border-box",
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
          </div>

          {error && (
            <p style={{ fontSize: 12, color: "var(--color-destructive)" }}>{error}</p>
          )}

          <div className="flex items-center justify-end" style={{ gap: "var(--space-3)", marginTop: "var(--space-2)" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "var(--space-2) var(--space-4)",
                background: "transparent",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                fontSize: 12,
                cursor: "pointer",
                color: "var(--color-muted-foreground)",
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
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
              {isPending ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label, name, defaultValue, placeholder, type = "text",
}: {
  label: string; name: string; defaultValue?: string | number; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label style={{ fontSize: 11, fontWeight: 600, color: "var(--color-muted-foreground)", display: "block", marginBottom: "var(--space-2)" }}>
        {label}
      </label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "var(--space-2) var(--space-3)",
          background: "var(--color-background)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          fontSize: 12,
          color: "var(--color-foreground)",
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

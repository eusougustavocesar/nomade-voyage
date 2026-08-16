"use client";

import { useState } from "react";
import ModalShell from "@/components/ModalShell";
import type { Lead } from "./PipelineBoard";

export default function ConvertBookingModal({
  lead,
  onCancel,
  onConfirm,
  isPending,
  error,
}: {
  lead: Lead;
  onCancel: () => void;
  onConfirm: (fd: FormData) => void;
  isPending: boolean;
  error: string | null;
}) {
  const [groupSize] = useState((lead.adults ?? 1) + (lead.children ?? 0));

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onConfirm(new FormData(e.currentTarget));
  }

  return (
    <ModalShell title="Converter em reserva" onClose={onCancel}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        <p style={{ fontSize: 12, color: "var(--color-muted-foreground)" }}>
          Cria uma reserva pra {lead.contacts?.full_name ?? "este lead"}. Confira os dados antes de confirmar.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
          <Field label="Data de ida" name="travel_date_from" type="date" defaultValue={lead.travel_date_from ?? ""} />
          <Field label="Data de volta" name="travel_date_to" type="date" defaultValue={lead.travel_date_to ?? ""} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
          <Field label="Viajantes" name="group_size" type="number" defaultValue={groupSize} required />
          <Field label="Valor total (R$)" name="total_price" type="number" defaultValue={lead.estimated_value ?? ""} required />
        </div>

        {error && (
          <p style={{ fontSize: 12, color: "var(--color-destructive)" }}>{error}</p>
        )}

        <div className="flex items-center justify-end" style={{ gap: "var(--space-3)", marginTop: "var(--space-2)" }}>
          <button
            type="button"
            onClick={onCancel}
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
            {isPending ? "Criando..." : "Criar reserva"}
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

function Field({
  label, name, defaultValue, type = "text", required,
}: {
  label: string; name: string; defaultValue?: string | number; type?: string; required?: boolean;
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
        required={required}
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

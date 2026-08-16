"use client";

import { useState, useTransition } from "react";
import { UserPlus } from "lucide-react";
import { addTraveler } from "../actions";
import ModalShell from "@/components/ModalShell";

export default function AddTravelerModal({ bookingId }: { bookingId: string }) {
  const [open, setOpen]   = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await addTraveler(bookingId, fd);
        setOpen(false);
      } catch (err: any) {
        setError(err.message);
      }
    });
  }

  return (
    <>
      <button onClick={() => setOpen(true)} style={TRIGGER_STYLE}>
        <UserPlus size={12} />
        Adicionar viajante
      </button>

      {open && (
        <ModalShell title="Adicionar viajante" onClose={() => setOpen(false)}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <Field label="Nome completo *" name="full_name" required />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
              <Field label="Telefone" name="phone" />
              <Field label="Email" name="email" type="email" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
              <Field label="Documento" name="document_number" placeholder="Nº do passaporte/RG" />
              <Field label="Nascimento" name="date_of_birth" type="date" />
            </div>
            <Field label="Nacionalidade" name="nationality" defaultValue="Brasileira" />
            <label style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", fontSize: 12, color: "var(--color-muted-foreground)" }}>
              <input type="checkbox" name="is_lead_traveler" />
              Titular da reserva
            </label>

            {error && <p style={{ fontSize: 12, color: "var(--color-destructive)" }}>{error}</p>}

            <div className="flex items-center justify-end" style={{ gap: "var(--space-3)", marginTop: "var(--space-2)" }}>
              <button type="button" onClick={() => setOpen(false)} style={CANCEL_STYLE}>Cancelar</button>
              <button type="submit" disabled={isPending} style={{ ...SUBMIT_STYLE, opacity: isPending ? 0.6 : 1 }}>
                {isPending ? "Salvando..." : "Adicionar"}
              </button>
            </div>
          </form>
        </ModalShell>
      )}
    </>
  );
}

const TRIGGER_STYLE: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: "var(--space-1)",
  padding: "4px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer",
  color: "var(--color-primary)", background: "var(--color-accent-bg)",
  border: "none", borderRadius: "var(--radius-full)",
};

const CANCEL_STYLE: React.CSSProperties = {
  padding: "var(--space-2) var(--space-4)", background: "transparent",
  border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)",
  fontSize: 12, cursor: "pointer", color: "var(--color-muted-foreground)",
};

const SUBMIT_STYLE: React.CSSProperties = {
  padding: "var(--space-2) var(--space-4)", background: "var(--color-primary)",
  color: "#fff", border: "none", borderRadius: "var(--radius-md)",
  fontSize: 12, fontWeight: 600, cursor: "pointer",
};

function Field({
  label, name, defaultValue, required, placeholder, type = "text",
}: {
  label: string; name: string; defaultValue?: string; required?: boolean; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label style={{ fontSize: 11, fontWeight: 600, color: "var(--color-muted-foreground)", display: "block", marginBottom: "var(--space-2)" }}>
        {label}
      </label>
      <input
        name={name}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        type={type}
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

"use client";

import { useState, useTransition } from "react";
import { CircleDollarSign } from "lucide-react";
import { addPayment } from "../actions";
import { PAYMENT_STATUS_MAP } from "../../financeiro/status";
import ModalShell from "@/components/ModalShell";

const METHODS = ["pix", "cartao", "boleto", "ted"];

export default function AddPaymentModal({ bookingId }: { bookingId: string }) {
  const [open, setOpen]   = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await addPayment(bookingId, fd);
        setOpen(false);
      } catch (err: any) {
        setError(err.message);
      }
    });
  }

  return (
    <>
      <button onClick={() => setOpen(true)} style={TRIGGER_STYLE}>
        <CircleDollarSign size={12} />
        Registrar pagamento
      </button>

      {open && (
        <ModalShell title="Registrar pagamento" onClose={() => setOpen(false)}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
              <Field label="Valor (R$) *" name="amount" type="number" required />
              <Field label="Parcelas" name="installments" type="number" defaultValue="1" />
            </div>

            <div>
              <label style={LABEL_STYLE}>Método</label>
              <select name="method" style={SELECT_STYLE}>
                {METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
              <div>
                <label style={LABEL_STYLE}>Status</label>
                <select name="status" defaultValue="pendente" style={SELECT_STYLE}>
                  {Object.entries(PAYMENT_STATUS_MAP).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
              <Field label="Vencimento" name="due_date" type="date" />
            </div>

            {error && <p style={{ fontSize: 12, color: "var(--color-destructive)" }}>{error}</p>}

            <div className="flex items-center justify-end" style={{ gap: "var(--space-3)", marginTop: "var(--space-2)" }}>
              <button type="button" onClick={() => setOpen(false)} style={CANCEL_STYLE}>Cancelar</button>
              <button type="submit" disabled={isPending} style={{ ...SUBMIT_STYLE, opacity: isPending ? 0.6 : 1 }}>
                {isPending ? "Salvando..." : "Registrar"}
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

const LABEL_STYLE: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: "var(--color-muted-foreground)", display: "block", marginBottom: "var(--space-2)",
};

const SELECT_STYLE: React.CSSProperties = {
  width: "100%", padding: "var(--space-2) var(--space-3)",
  background: "var(--color-background)", border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)", fontSize: 12, color: "var(--color-foreground)",
};

function Field({
  label, name, defaultValue, required, type = "text",
}: {
  label: string; name: string; defaultValue?: string; required?: boolean; type?: string;
}) {
  return (
    <div>
      <label style={LABEL_STYLE}>{label}</label>
      <input
        name={name}
        required={required}
        defaultValue={defaultValue}
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

"use client";

import { useState, useTransition } from "react";
import { X, MapPinned } from "lucide-react";
import { createItinerary } from "./actions";

type Lead = { id: string; destination: string | null; contacts: { full_name: string } | null };

export default function NovoRoteiroModal({ leads }: { leads: Lead[] }) {
  const [open, setOpen]   = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await createItinerary(fd);
      } catch (err: any) {
        // redirect() lança um erro especial do Next — deixa passar
        if (err?.digest?.startsWith?.("NEXT_REDIRECT")) throw err;
        setError(err.message);
      }
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center"
        style={{
          gap: "var(--space-2)",
          padding: "var(--space-2) var(--space-4)",
          background: "var(--color-primary)",
          color: "#fff",
          border: "none",
          borderRadius: "var(--radius-md)",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        <MapPinned size={13} />
        Novo roteiro
      </button>

      {open && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 50,
            background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "var(--space-6)",
          }}
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div style={{
            width: "100%", maxWidth: 440,
            background: "var(--color-surface)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--color-border)",
            padding: "var(--space-6)",
          }}>
            <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-6)" }}>
              <h2 style={{ fontSize: "var(--text-body)", fontWeight: 700 }}>Novo roteiro</h2>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted-foreground)" }}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "var(--color-muted-foreground)", display: "block", marginBottom: "var(--space-2)" }}>
                  Lead *
                </label>
                <select
                  name="lead_id"
                  required
                  style={{
                    width: "100%",
                    padding: "var(--space-2) var(--space-3)",
                    background: "var(--color-background)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    fontSize: 12,
                    color: "var(--color-foreground)",
                  }}
                >
                  <option value="">Selecione...</option>
                  {leads.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.contacts?.full_name ?? "—"}{l.destination ? ` · ${l.destination}` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <Field label="Destino *" name="destination" required placeholder="Lisboa, Portugal" />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
                <Field label="Duração (dias) *" name="duration_days" type="number" required placeholder="7" />
                <Field label="Estilo" name="travel_style" placeholder="cultural, aventura..." />
              </div>

              {error && (
                <p style={{ fontSize: 12, color: "var(--color-destructive)" }}>{error}</p>
              )}

              <div className="flex items-center justify-end" style={{ gap: "var(--space-3)", marginTop: "var(--space-2)" }}>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
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
                  {isPending ? "Criando..." : "Criar e editar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function Field({
  label, name, required, placeholder, type = "text",
}: {
  label: string; name: string; required?: boolean; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label style={{ fontSize: 11, fontWeight: 600, color: "var(--color-muted-foreground)", display: "block", marginBottom: "var(--space-2)" }}>
        {label}
      </label>
      <input
        name={name}
        required={required}
        type={type}
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

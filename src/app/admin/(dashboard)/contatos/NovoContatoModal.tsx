"use client";

import { useState, useTransition } from "react";
import { X, UserPlus } from "lucide-react";
import { createContact } from "./actions";

const SOURCES = [
  { key: "whatsapp",  label: "WhatsApp" },
  { key: "instagram", label: "Instagram" },
  { key: "site",      label: "Site" },
  { key: "indicacao", label: "Indicação" },
  { key: "google",    label: "Google" },
  { key: "facebook",  label: "Facebook" },
  { key: "outro",     label: "Outro" },
];

export default function NovoContatoModal() {
  const [open, setOpen]   = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await createContact(fd);
        setOpen(false);
      } catch (err: any) {
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
        <UserPlus size={13} />
        Novo contato
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
              <h2 style={{ fontSize: "var(--text-body)", fontWeight: 700 }}>Novo contato</h2>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted-foreground)" }}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <Field label="Nome completo *" name="full_name" required placeholder="João Silva" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
                <Field label="Telefone" name="phone" placeholder="+55 11 99999-9999" />
                <Field label="Email" name="email" type="email" placeholder="joao@email.com" />
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "var(--color-muted-foreground)", display: "block", marginBottom: "var(--space-2)" }}>
                  Origem
                </label>
                <select
                  name="source"
                  defaultValue="whatsapp"
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
                  {SOURCES.map(({ key, label }) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              {error && (
                <p style={{ fontSize: 12, color: "var(--color-destructive, #ef4444)" }}>{error}</p>
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
                  {isPending ? "Salvando..." : "Salvar"}
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

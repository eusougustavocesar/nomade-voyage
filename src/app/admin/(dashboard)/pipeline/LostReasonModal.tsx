"use client";

import { useState } from "react";
import ModalShell from "@/components/ModalShell";

export default function LostReasonModal({
  onCancel,
  onConfirm,
  isPending,
  error,
}: {
  onCancel: () => void;
  onConfirm: (reason: string) => void;
  isPending: boolean;
  error: string | null;
}) {
  const [reason, setReason] = useState("");

  return (
    <ModalShell title="Marcar como perdido" onClose={onCancel}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, color: "var(--color-muted-foreground)", display: "block", marginBottom: "var(--space-2)" }}>
            Motivo *
          </label>
          <textarea
            required
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            placeholder="Ex: sem orçamento, escolheu outra agência, sumiu..."
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
            type="button"
            disabled={isPending || !reason.trim()}
            onClick={() => onConfirm(reason.trim())}
            style={{
              padding: "var(--space-2) var(--space-4)",
              background: "var(--color-destructive)",
              color: "#fff",
              border: "none",
              borderRadius: "var(--radius-md)",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              opacity: isPending || !reason.trim() ? 0.6 : 1,
            }}
          >
            {isPending ? "Salvando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

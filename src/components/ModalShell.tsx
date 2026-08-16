"use client";

import { X } from "lucide-react";

export default function ModalShell({
  title,
  onClose,
  children,
  maxWidth = 440,
  scrollable = false,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: number;
  scrollable?: boolean;
}) {
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
        width: "100%", maxWidth,
        ...(scrollable ? { maxHeight: "90vh", overflowY: "auto" as const } : {}),
        background: "var(--color-surface)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--color-border)",
        padding: "var(--space-6)",
      }}>
        <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-6)" }}>
          <h2 style={{ fontSize: "var(--text-body)", fontWeight: 700 }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted-foreground)" }}>
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

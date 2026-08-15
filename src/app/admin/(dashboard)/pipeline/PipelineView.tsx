"use client";

import { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import PipelineBoard, { type Lead } from "./PipelineBoard";
import PipelineTable from "./PipelineTable";
import LeadDetailModal from "./LeadDetailModal";

export default function PipelineView({ leads: initial }: { leads: Lead[] }) {
  const [leads, setLeads] = useState(initial);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [view, setView] = useState<"kanban" | "tabela">("kanban");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="flex items-center" style={{ gap: "var(--space-2)", marginBottom: "var(--space-4)" }}>
        {[
          { key: "kanban" as const, label: "Kanban", icon: LayoutGrid },
          { key: "tabela" as const, label: "Tabela", icon: List },
        ].map(({ key, label, icon: Icon }) => {
          const active = view === key;
          return (
            <button
              key={key}
              onClick={() => setView(key)}
              className="flex items-center"
              style={{
                gap: "var(--space-1)",
                padding: "4px 10px",
                borderRadius: "var(--radius-full)",
                border: `1px solid ${active ? "var(--color-primary)" : "var(--color-border)"}`,
                background: active ? "var(--color-primary)" : "transparent",
                color: active ? "#fff" : "var(--color-muted-foreground)",
                fontSize: 11,
                fontWeight: active ? 600 : 400,
                cursor: "pointer",
                transition: "all 120ms",
              }}
            >
              <Icon size={11} />
              {label}
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        {view === "kanban" ? (
          <PipelineBoard leads={leads} setLeads={setLeads} onOpenLead={setSelectedLead} />
        ) : (
          <PipelineTable leads={leads} onOpenLead={setSelectedLead} />
        )}
      </div>

      {selectedLead && (
        <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
      )}
    </div>
  );
}

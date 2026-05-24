"use client";

import { useState } from "react";
import { packages, filterPackages } from "@/data/packages";
import type { Destination, DurationRange } from "@/data/packages";
import PackageCard from "./PackageCard";

const DESTINATIONS: { label: string; value: Destination | "Todos" }[] = [
  { label: "Todos", value: "Todos" },
  { label: "Lisboa", value: "Lisboa" },
  { label: "Madrid", value: "Madrid" },
  { label: "Dublin", value: "Dublin" },
  { label: "Multi-destino", value: "Multi-destino" },
];

const DURATIONS: { label: string; value: DurationRange | "todos" }[] = [
  { label: "Qualquer duração", value: "todos" },
  { label: "Até 7 dias", value: "ate-7" },
  { label: "8 a 12 dias", value: "8-12" },
  { label: "13 dias ou mais", value: "13-20" },
];

export default function PackageCatalog() {
  const [destination, setDestination] = useState<Destination | "Todos">("Todos");
  const [duration, setDuration] = useState<DurationRange | "todos">("todos");

  const filtered = filterPackages({ destination, duration });

  return (
    <div>
      {/* ── Filtros ── */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--gap-xs)",
          marginBottom: "var(--gap-xl)",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)", fontWeight: 500, marginRight: 4 }}>
            Destino:
          </span>
          {DESTINATIONS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setDestination(value)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-caption)",
                fontWeight: 500,
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                border: "1.5px solid",
                cursor: "pointer",
                transition: "all 120ms ease-out",
                borderColor: destination === value ? "var(--color-primary)" : "var(--color-border)",
                background: destination === value ? "var(--color-primary)" : "transparent",
                color: destination === value ? "#fff" : "var(--color-muted-foreground)",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)", fontWeight: 500, marginRight: 4 }}>
            Duração:
          </span>
          {DURATIONS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setDuration(value)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-caption)",
                fontWeight: 500,
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                border: "1.5px solid",
                cursor: "pointer",
                transition: "all 120ms ease-out",
                borderColor: duration === value ? "var(--color-primary)" : "var(--color-border)",
                background: duration === value ? "var(--color-primary)" : "transparent",
                color: duration === value ? "#fff" : "var(--color-muted-foreground)",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="text-center" style={{ padding: "var(--space-20) 0" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-md)", color: "var(--color-muted-foreground)" }}>
            Nenhum pacote encontrado com esses filtros.
          </p>
          <button
            onClick={() => { setDestination("Todos"); setDuration("todos"); }}
            style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-primary-light)", marginTop: "var(--space-4)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: "var(--gap-md)" }}>
          {filtered.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      )}

      <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-muted-foreground)", textAlign: "center", marginTop: "var(--gap-lg)" }}>
        {filtered.length} pacote{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""} · Todos são personalizáveis
      </p>
    </div>
  );
}

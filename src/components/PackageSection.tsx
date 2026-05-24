"use client";

import { useState } from "react";
import Image from "next/image";
import { filterPackages } from "@/data/packages";
import type { Destination, DurationRange } from "@/data/packages";
import PackageCard from "./PackageCard";

const DESTINATIONS: { label: string; value: Destination | "Todos"; photo: string; country: string }[] = [
  { label: "Todos", value: "Todos", photo: "/hero-window.jpg", country: "Europa" },
  { label: "Lisboa", value: "Lisboa", photo: "/dest-lisboa.jpg", country: "Portugal" },
  { label: "Madrid", value: "Madrid", photo: "/dest-madrid.jpg", country: "Espanha" },
  { label: "Dublin", value: "Dublin", photo: "/dest-dublin.jpg", country: "Irlanda" },
];

const DURATIONS: { label: string; value: DurationRange | "todos" }[] = [
  { label: "Qualquer duração", value: "todos" },
  { label: "Até 7 dias", value: "ate-7" },
  { label: "8 a 12 dias", value: "8-12" },
  { label: "13 dias ou mais", value: "13-20" },
];

export default function PackageSection() {
  const [destination, setDestination] = useState<Destination | "Todos">("Todos");
  const [duration, setDuration] = useState<DurationRange | "todos">("todos");

  const filtered = filterPackages({ destination, duration });

  return (
    <div>
      {/* ── Seleção de destino via cards visuais ── */}
      <div
        className="grid grid-cols-2 md:grid-cols-4"
        style={{ gap: "var(--gap-xs)", marginBottom: "var(--gap-lg)" }}
      >
        {DESTINATIONS.map(({ label, value, photo, country }) => {
          const active = destination === value;
          return (
            <button
              key={value}
              onClick={() => setDestination(value)}
              style={{
                position: "relative",
                height: 160,
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: active ? "2.5px solid var(--color-primary-light)" : "2.5px solid transparent",
                cursor: "pointer",
                padding: 0,
                transition: "border-color 150ms ease-out, transform 150ms ease-out",
                transform: active ? "scale(1.02)" : "scale(1)",
              }}
            >
              <Image
                src={photo}
                alt={label}
                fill
                quality={70}
                sizes="(max-width: 768px) 50vw, 25vw"
                style={{ objectFit: "cover", transition: "transform 400ms ease-out", transform: active ? "scale(1.06)" : "scale(1)" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: active
                    ? "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.20) 100%)"
                    : "linear-gradient(to top, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.10) 100%)",
                  transition: "background 150ms",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "14px 16px",
                }}
              >
                <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "rgba(255,255,255,0.60)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>
                  {country}
                </span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-h4)", color: "white", lineHeight: 1.1 }}>
                  {label}
                </span>
                {active && (
                  <span style={{ marginTop: 6, display: "inline-block", width: 24, height: 2, background: "var(--color-primary-light)", borderRadius: 2 }} />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Filtro de duração ── */}
      <div className="flex flex-wrap items-center" style={{ gap: 8, marginBottom: "var(--gap-xl)" }}>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)", fontWeight: 500 }}>
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
              padding: "5px 14px",
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

      {/* ── Grid de pacotes ── */}
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

      <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)", textAlign: "center", marginTop: "var(--gap-lg)" }}>
        {filtered.length} pacote{filtered.length !== 1 ? "s" : ""} · todos personalizáveis para o seu perfil e datas
      </p>
    </div>
  );
}

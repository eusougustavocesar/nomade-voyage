"use client";

import { useState, useRef } from "react";
import { Search, X, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { filterPackages, searchPackages, EUROPEAN_DESTINATIONS } from "@/data/packages";
import type { Destination, DurationRange, TravelPackage } from "@/data/packages";

type SortOption = "popular" | "duracao-asc" | "duracao-desc";

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Mais populares",   value: "popular" },
  { label: "Menor duração",    value: "duracao-asc" },
  { label: "Maior duração",    value: "duracao-desc" },
];

function sortPackages(list: TravelPackage[], sort: SortOption): TravelPackage[] {
  if (sort === "duracao-asc")  return [...list].sort((a, b) => a.duration - b.duration);
  if (sort === "duracao-desc") return [...list].sort((a, b) => b.duration - a.duration);
  return [...list].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
}
import PackageCard from "./PackageCard";
import PackageConfigurator from "./PackageConfigurator";

const DESTINATIONS: { label: string; value: Destination | "Todos" }[] = [
  { label: "Todos",          value: "Todos" },
  { label: "Lisboa",         value: "Lisboa" },
  { label: "Madrid",         value: "Madrid" },
  { label: "Dublin",         value: "Dublin" },
  { label: "Multi-destino",  value: "Multi-destino" },
];

const DURATIONS: { label: string; value: DurationRange | "todos" }[] = [
  { label: "Qualquer duração", value: "todos" },
  { label: "Até 7 dias",       value: "ate-7" },
  { label: "8 a 12 dias",      value: "8-12" },
  { label: "13 dias ou mais",  value: "13-20" },
];

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export default function PackageCatalog() {
  const [destination, setDestination] = useState<Destination | "Todos">("Todos");
  const [duration, setDuration]       = useState<DurationRange | "todos">("todos");
  const [sort, setSort]               = useState<SortOption>("popular");
  const [query, setQuery]             = useState("");
  const [submitted, setSubmitted]     = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions =
    query.length > 1
      ? EUROPEAN_DESTINATIONS.filter((d) => normalize(d).includes(normalize(query))).slice(0, 6)
      : [];

  const usingSearch = submitted.length > 0;
  const raw = usingSearch
    ? searchPackages(submitted)
    : filterPackages({ destination, duration });
  const results = sortPackages(raw, sort);

  function selectSuggestion(dest: string) {
    setQuery(dest);
    setSubmitted(dest);
    setShowSuggestions(false);
    inputRef.current?.blur();
  }

  function handleSearch() {
    if (query.trim()) {
      setSubmitted(query.trim());
      setDestination("Todos");
      setDuration("todos");
      setShowSuggestions(false);
    }
  }

  function clearSearch() {
    setQuery("");
    setSubmitted("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  }

  function clearAll() {
    setQuery("");
    setSubmitted("");
    setDestination("Todos");
    setDuration("todos");
    setSort("popular");
    setShowSuggestions(false);
  }

  const pillStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-caption)",
    fontWeight: 500,
    padding: "6px 16px",
    borderRadius: "var(--radius-full)",
    border: "1.5px solid",
    cursor: "pointer",
    transition: "all 120ms ease-out",
    whiteSpace: "nowrap",
    borderColor: active ? "var(--color-primary)" : "var(--color-border)",
    background: active ? "var(--color-primary)" : "transparent",
    color: active ? "var(--color-on-primary)" : "var(--color-muted-foreground)",
  });

  return (
    <div>
      {/* ── Search bar ── */}
      <div style={{ maxWidth: 640, margin: "0 auto", marginBottom: "var(--gap-lg)", position: "relative" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search
              size={16}
              color="var(--color-muted-foreground)"
              style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSubmitted(""); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); if (e.key === "Escape") clearSearch(); }}
              placeholder="Buscar por destino, país ou cidade..."
              style={{
                width: "100%",
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-body-sm)",
                padding: "13px 40px 13px 42px",
                borderRadius: "var(--radius-lg)",
                border: "1.5px solid var(--color-border)",
                background: "var(--color-surface)",
                color: "var(--color-foreground)",
                outline: "none",
              }}
            />
            {query && (
              <button
                onClick={clearSearch}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", display: "flex" }}
              >
                <X size={14} color="var(--color-muted-foreground)" />
              </button>
            )}
          </div>
          <button onClick={handleSearch} className="btn-primary" style={{ flexShrink: 0, padding: "13px 22px", fontSize: "var(--text-caption)" }}>
            Buscar
          </button>
        </div>

        {/* Autocomplete */}
        {showSuggestions && suggestions.length > 0 && (
          <div style={{
            position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
            background: "var(--color-surface)", border: "1.5px solid var(--color-border)",
            borderRadius: "var(--radius-lg)", boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
            zIndex: 50, overflow: "hidden",
          }}>
            {suggestions.map((dest) => (
              <button
                key={dest}
                onMouseDown={() => selectSuggestion(dest)}
                style={{
                  width: "100%", textAlign: "left", padding: "10px 16px",
                  fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)",
                  color: "var(--color-foreground)", background: "transparent",
                  border: "none", borderBottom: "1px solid var(--color-border)", cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-muted)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {dest}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Filters (hidden when searching) ── */}
      {!usingSearch && (
        <div style={{ marginBottom: "var(--gap-lg)" }}>
          <div className="flex flex-wrap items-center" style={{ gap: "var(--gap-xs)", marginBottom: "var(--space-4)" }}>
            <div className="flex items-center" style={{ gap: 6, color: "var(--color-muted-foreground)" }}>
              <SlidersHorizontal size={14} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", fontWeight: 500 }}>Destino:</span>
            </div>
            {DESTINATIONS.map(({ label, value }) => (
              <button key={value} onClick={() => setDestination(value)} style={pillStyle(destination === value)}>
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center" style={{ gap: "var(--gap-xs)" }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", fontWeight: 500, color: "var(--color-muted-foreground)", minWidth: 62 }}>Duração:</span>
            {DURATIONS.map(({ label, value }) => (
              <button key={value} onClick={() => setDuration(value)} style={pillStyle(duration === value)}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Results summary + sort ── */}
      <div className="flex flex-wrap items-center justify-between" style={{ marginBottom: "var(--gap-md)", gap: 8 }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)" }}>
          {usingSearch
            ? `${results.length} resultado${results.length !== 1 ? "s" : ""} para "${submitted}"`
            : `${results.length} pacote${results.length !== 1 ? "s" : ""} · todos personalizáveis`}
        </p>
        <div className="flex items-center" style={{ gap: 8 }}>
          {(usingSearch || destination !== "Todos" || duration !== "todos") && (
            <button
              onClick={clearAll}
              style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-primary-light)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
            >
              Limpar filtros
            </button>
          )}
          <div className="flex items-center" style={{ gap: 6, padding: "5px 10px", borderRadius: "var(--radius-md)", border: "1.5px solid var(--color-border)", background: "transparent" }}>
            <ArrowUpDown size={12} color="var(--color-muted-foreground)" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)", background: "transparent", border: "none", outline: "none", cursor: "pointer" }}
            >
              {SORT_OPTIONS.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Grid or configurator ── */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: "var(--gap-md)" }}>
          {results.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      ) : usingSearch ? (
        <PackageConfigurator destination={submitted} />
      ) : (
        <div className="text-center" style={{ padding: "var(--gap-xl) 0" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-md)", color: "var(--color-muted-foreground)", marginBottom: "var(--space-4)" }}>
            Nenhum pacote encontrado com esses filtros.
          </p>
          <button onClick={clearAll} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-primary-light)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
            Ver todos os pacotes
          </button>
        </div>
      )}
    </div>
  );
}

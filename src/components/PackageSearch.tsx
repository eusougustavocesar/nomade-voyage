"use client";

import { useState, useRef } from "react";
import { Search, X } from "lucide-react";
import { searchPackages, EUROPEAN_DESTINATIONS } from "@/data/packages";
import PackageCard from "./PackageCard";
import PackageConfigurator from "./PackageConfigurator";

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export default function PackageSearch() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [submitted, setSubmitted] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions =
    query.length > 1
      ? EUROPEAN_DESTINATIONS.filter((d) =>
          normalize(d).includes(normalize(query))
        ).slice(0, 6)
      : [];

  const results = submitted ? searchPackages(submitted) : [];

  function selectSuggestion(dest: string) {
    setQuery(dest);
    setSubmitted(dest);
    setShowSuggestions(false);
    inputRef.current?.blur();
  }

  function handleSearch() {
    if (query.trim()) {
      setSubmitted(query.trim());
      setShowSuggestions(false);
    }
  }

  function clear() {
    setQuery("");
    setSubmitted("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  }

  return (
    <div>
      {/* ── Barra de busca ── */}
      <div style={{ maxWidth: 560, margin: "0 auto", marginBottom: "var(--gap-xl)", position: "relative" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search
              size={17}
              color="var(--color-muted-foreground)"
              style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSubmitted("");
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
                if (e.key === "Escape") clear();
              }}
              placeholder="Para onde você quer ir? ex: Paris, Roma..."
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
                onClick={clear}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", display: "flex" }}
              >
                <X size={15} color="var(--color-muted-foreground)" />
              </button>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="btn-primary"
            style={{ flexShrink: 0, padding: "13px 22px" }}
          >
            Buscar
          </button>
        </div>

        {/* Autocomplete */}
        {showSuggestions && suggestions.length > 0 && (
          <div style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "var(--color-surface)",
            border: "1.5px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
            zIndex: 50,
            overflow: "hidden",
          }}>
            {suggestions.map((dest) => (
              <button
                key={dest}
                onMouseDown={() => selectSuggestion(dest)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "10px 16px",
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-body-sm)",
                  color: "var(--color-foreground)",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid var(--color-border)",
                  cursor: "pointer",
                  transition: "background 80ms",
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

      {/* ── Resultados ── */}
      {submitted && results.length > 0 && (
        <div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)", textAlign: "center", marginBottom: "var(--gap-md)" }}>
            {results.length} pacote{results.length !== 1 ? "s" : ""} encontrado{results.length !== 1 ? "s" : ""} para &ldquo;{submitted}&rdquo;
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: "var(--gap-md)" }}>
            {results.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
        </div>
      )}

      {/* ── Configurador (sem resultado) ── */}
      {submitted && results.length === 0 && (
        <PackageConfigurator destination={submitted} />
      )}
    </div>
  );
}

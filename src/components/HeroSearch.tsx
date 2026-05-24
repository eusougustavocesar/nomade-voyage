"use client";

import { useState, useRef } from "react";
import { Search } from "lucide-react";
import { EUROPEAN_DESTINATIONS } from "@/data/packages";

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export default function HeroSearch() {
  const [query, setQuery]               = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions =
    query.length > 1
      ? EUROPEAN_DESTINATIONS.filter((d) => normalize(d).includes(normalize(query))).slice(0, 5)
      : [];

  function go(dest: string) {
    window.location.href = `/pacotes?q=${encodeURIComponent(dest)}`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) go(query.trim());
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ position: "relative", width: "100%", maxWidth: 480 }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search
            size={16}
            color="rgba(0,0,0,0.35)"
            style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            placeholder="Para onde quer ir? Lisboa, Paris, Roma…"
            style={{
              width: "100%",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body-sm)",
              padding: "14px 16px 14px 42px",
              borderRadius: "var(--radius-lg)",
              border: "none",
              background: "rgba(255,255,255,0.96)",
              color: "#111",
              outline: "none",
              boxShadow: "0 2px 16px rgba(0,0,0,0.18)",
            }}
          />
        </div>
        <button
          type="submit"
          className="btn-primary"
          style={{ flexShrink: 0, padding: "14px 22px", fontSize: "var(--text-body-sm)", borderRadius: "var(--radius-lg)", boxShadow: "0 2px 16px rgba(0,0,0,0.18)" }}
        >
          Buscar
        </button>
      </div>

      {/* Autocomplete */}
      {showSuggestions && suggestions.length > 0 && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 6px)",
          left: 0,
          right: 64,
          background: "white",
          borderRadius: "var(--radius-lg)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          overflow: "hidden",
          zIndex: 100,
        }}>
          {suggestions.map((dest) => (
            <button
              key={dest}
              type="button"
              onMouseDown={() => go(dest)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "11px 16px",
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-body-sm)",
                color: "#111",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid #f0f0f0",
                cursor: "pointer",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f8f8f8")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              {dest}
            </button>
          ))}
        </div>
      )}
    </form>
  );
}

"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        borderRadius: "var(--radius-full)",
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        cursor: "pointer",
        flexShrink: 0,
        transition: "background 200ms, border-color 200ms",
      }}
      onMouseEnter={e => { e.currentTarget.style.background = "var(--color-muted)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "var(--color-surface)"; }}
    >
      {theme === "dark"
        ? <Sun  size={16} color="var(--color-primary)" />
        : <Moon size={16} color="var(--color-primary)" />
      }
    </button>
  );
}

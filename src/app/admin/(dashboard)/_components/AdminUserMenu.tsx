"use client";

import { useState, useEffect, useRef } from "react";
import { LogOut, ChevronDown } from "lucide-react";
import { signOut } from "../_actions/auth";

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function Avatar({ name }: { name: string }) {
  return (
    <div style={{
      width: "var(--admin-icon-box)",
      height: "var(--admin-icon-box)",
      borderRadius: "var(--radius-full)",
      background: "var(--color-primary)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      fontSize: "var(--admin-label-fs)",
      fontWeight: 700,
      color: "var(--color-on-primary)",
      letterSpacing: "0.03em",
    }}>
      {initials(name)}
    </div>
  );
}

export default function AdminUserMenu({ name, email }: { name: string; email: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2)",
          padding: "var(--space-1) var(--space-2)",
          borderRadius: "var(--radius-md)",
          border: "none",
          background: open ? "var(--color-muted)" : "transparent",
          cursor: "pointer",
          transition: "background 100ms",
        }}
        onMouseEnter={(e) => { if (!open) e.currentTarget.style.background = "var(--color-muted)"; }}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.background = "transparent"; }}
      >
        <Avatar name={name} />
        <div style={{ textAlign: "left" }}>
          <p style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-foreground)", lineHeight: 1, maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {name}
          </p>
          <p style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)", marginTop: "var(--space-1)", lineHeight: 1, maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {email}
          </p>
        </div>
        <ChevronDown
          size={12}
          color="var(--color-muted-foreground)"
          style={{ transition: "transform 150ms", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}
        />
      </button>

      {open && (
        <div style={{
          position: "absolute",
          right: 0,
          top: "calc(100% + var(--space-2))",
          minWidth: 220,
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          zIndex: 50,
          overflow: "hidden",
          padding: "var(--space-1)",
        }}>
          {/* Identity header */}
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", padding: "var(--space-2) var(--space-3)" }}>
            <Avatar name={name} />
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-foreground)", lineHeight: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {name}
              </p>
              <p style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)", marginTop: "var(--space-1)", lineHeight: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {email}
              </p>
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--color-border)", margin: "0 var(--space-1) var(--space-1)" }} />

          <form action={signOut}>
            <button
              type="submit"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
                padding: "var(--space-2) var(--space-3)",
                borderRadius: "var(--radius-md)",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "var(--text-caption)",
                color: "var(--color-destructive)",
                transition: "background 100ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-destructive-bg)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <LogOut size={13} style={{ flexShrink: 0 }} />
              Sair
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

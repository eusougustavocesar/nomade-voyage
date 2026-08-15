"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition, useCallback } from "react";
import { Search } from "lucide-react";

const SOURCES: { key: string; label: string }[] = [
  { key: "",           label: "Todos" },
  { key: "whatsapp",  label: "WhatsApp" },
  { key: "instagram", label: "Instagram" },
  { key: "site",      label: "Site" },
  { key: "indicacao", label: "Indicação" },
  { key: "google",    label: "Google" },
  { key: "facebook",  label: "Facebook" },
  { key: "outro",     label: "Outro" },
];

export default function ContactsFilters() {
  const router      = useRouter();
  const pathname    = usePathname();
  const params      = useSearchParams();
  const [, startTransition] = useTransition();

  const q      = params.get("q") ?? "";
  const source = params.get("source") ?? "";

  const push = useCallback((key: string, value: string) => {
    const sp = new URLSearchParams(params.toString());
    if (value) sp.set(key, value);
    else sp.delete(key);
    startTransition(() => router.replace(`${pathname}?${sp.toString()}`));
  }, [params, pathname, router]);

  return (
    <div className="flex items-center" style={{ gap: "var(--space-3)", flexWrap: "wrap" }}>
      {/* Search */}
      <div className="flex items-center" style={{
        gap: "var(--space-2)",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        padding: "var(--space-2) var(--space-3)",
        width: 240,
      }}>
        <Search size={13} color="var(--color-muted-foreground)" />
        <input
          defaultValue={q}
          placeholder="Buscar por nome, email ou telefone..."
          onChange={(e) => push("q", e.target.value)}
          style={{
            border: "none",
            background: "transparent",
            outline: "none",
            fontSize: 12,
            color: "var(--color-foreground)",
            width: "100%",
          }}
        />
      </div>

      {/* Source filters */}
      <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
        {SOURCES.map(({ key, label }) => {
          const active = source === key;
          return (
            <button
              key={key}
              onClick={() => push("source", key)}
              style={{
                padding: "4px 10px",
                borderRadius: "var(--radius-full)",
                border: `1px solid ${active ? "var(--color-primary)" : "var(--color-border)"}`,
                background: active ? "var(--color-primary)" : "transparent",
                color: active ? "var(--color-primary-foreground, #fff)" : "var(--color-muted-foreground)",
                fontSize: 11,
                fontWeight: active ? 600 : 400,
                cursor: "pointer",
                transition: "all 120ms",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

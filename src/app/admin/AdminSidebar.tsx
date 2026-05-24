"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Logo from "@/components/Logo";
import {
  LayoutDashboard, Users, Kanban, CalendarCheck,
  Package, FileText, LogOut, Settings,
} from "lucide-react";

const NAV = [
  { label: "Dashboard",  href: "/admin",          icon: LayoutDashboard },
  { label: "Pipeline",   href: "/admin/pipeline",  icon: Kanban },
  { label: "Contatos",   href: "/admin/contatos",  icon: Users },
  { label: "Reservas",   href: "/admin/reservas",  icon: CalendarCheck },
  { label: "Pacotes",    href: "/admin/pacotes",   icon: Package },
  { label: "Blog",       href: "/admin/blog",      icon: FileText },
  { label: "Config.",    href: "/admin/config",    icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router   = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside style={{
      width: 220,
      flexShrink: 0,
      background: "var(--color-surface)",
      borderRight: "1px solid var(--color-border)",
      display: "flex",
      flexDirection: "column",
      height: "100svh",
      position: "sticky",
      top: 0,
    }}>
      {/* Logo */}
      <div className="flex items-center" style={{ gap: "var(--space-3)", padding: "var(--space-6) var(--space-4)", borderBottom: "1px solid var(--color-border)" }}>
        <Logo size={28} />
        <div>
          <p style={{ fontSize: "var(--text-caption)", fontWeight: 700, color: "var(--color-foreground)", lineHeight: 1.2 }}>
            Nômade Voyage
          </p>
          <p style={{ fontSize: 11, color: "var(--color-muted-foreground)" }}>Admin</p>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "var(--space-4) var(--space-2)", display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center"
              style={{
                gap: "var(--space-3)",
                padding: "var(--space-2) var(--space-3)",
                borderRadius: "var(--radius-md)",
                textDecoration: "none",
                fontSize: "var(--text-caption)",
                fontWeight: active ? 600 : 400,
                color: active ? "var(--color-primary)" : "var(--color-muted-foreground)",
                background: active ? "var(--color-muted)" : "transparent",
                transition: "background 120ms, color 120ms",
              }}
            >
              <Icon size={15} strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "var(--space-4)", borderTop: "1px solid var(--color-border)" }}>
        <button
          onClick={handleLogout}
          className="flex items-center"
          style={{
            width: "100%", gap: "var(--space-3)",
            padding: "var(--space-2) var(--space-3)",
            borderRadius: "var(--radius-md)", border: "none",
            background: "transparent", cursor: "pointer",
            fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)",
          }}
        >
          <LogOut size={15} />
          Sair
        </button>
      </div>
    </aside>
  );
}

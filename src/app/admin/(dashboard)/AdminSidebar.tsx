"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Logo from "@/components/Logo";
import {
  LayoutDashboard, Users, Kanban, CalendarCheck,
  Package, FileText, Settings, LogOut,
} from "lucide-react";

const NAV = [
  { label: "Dashboard", href: "/admin",          icon: LayoutDashboard },
  { label: "Pipeline",  href: "/admin/pipeline", icon: Kanban },
  { label: "Contatos",  href: "/admin/contatos", icon: Users },
  { label: "Reservas",  href: "/admin/reservas", icon: CalendarCheck },
  { label: "Pacotes",   href: "/admin/pacotes",  icon: Package },
  { label: "Blog",      href: "/admin/blog",     icon: FileText },
  { label: "Config.",   href: "/admin/config",   icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router   = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside style={{
      width: "var(--admin-sidebar-w)",
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      height: "100%",           /* herda do pai flex que tem height: 100svh */
      background: "var(--color-surface)",
      borderRight: "1px solid var(--color-border)",
    }}>

      {/* Logo — altura exata do topbar para alinhar a borda */}
      <div style={{
        height: "var(--admin-topbar-h)",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "0 var(--space-4)",
        borderBottom: "1px solid var(--color-border)",
      }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <Logo size={28} showWordmark={false} />
          <div>
            <p style={{ fontSize: "var(--text-caption)", fontWeight: 700, color: "var(--color-foreground)", lineHeight: 1.2 }}>
              Nômade Voyage
            </p>
            <p style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>
              Admin
            </p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "var(--space-3) var(--space-2)", display: "flex", flexDirection: "column", gap: "var(--space-1)", overflowY: "auto" }}>
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link key={href} href={href} style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
              padding: "var(--space-2) var(--space-3)",
              borderRadius: "var(--radius-md)",
              textDecoration: "none",
              fontSize: "var(--admin-nav-fs)",
              fontWeight: active ? 600 : 400,
              color: active ? "var(--color-primary)" : "var(--color-muted-foreground)",
              background: active ? "var(--color-muted)" : "transparent",
              transition: "background 100ms, color 100ms",
            }}>
              <Icon size={14} strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "var(--space-3) var(--space-2)", borderTop: "1px solid var(--color-border)", flexShrink: 0 }}>
        <button onClick={handleLogout} style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
          width: "100%",
          padding: "var(--space-2) var(--space-3)",
          borderRadius: "var(--radius-md)",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: "var(--admin-nav-fs)",
          color: "var(--color-muted-foreground)",
        }}>
          <LogOut size={14} />
          Sair
        </button>
      </div>
    </aside>
  );
}

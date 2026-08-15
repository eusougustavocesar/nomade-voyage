"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Logo from "@/components/Logo";
import {
  LayoutDashboard, Users, Kanban, CalendarCheck,
  Package, FileText, Settings, LogOut, ChevronsLeft,
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

const COLLAPSE_KEY = "nv-admin-sidebar-collapsed";
const WIDTH_OPEN = "var(--admin-sidebar-w)";
const WIDTH_COLLAPSED = "64px";

function NavRow({ href, label, active, collapsed, children }: {
  href: string; label: string; active: boolean; collapsed: boolean; children: React.ReactNode;
}) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "var(--space-2) var(--space-3)",
        borderRadius: "var(--radius-md)",
        textDecoration: "none",
        fontSize: "var(--admin-nav-fs)",
        fontWeight: active ? 600 : 400,
        color: active ? "var(--color-primary)" : "var(--color-muted-foreground)",
        background: active ? "var(--color-muted)" : hover ? "var(--color-muted)" : "transparent",
        transition: "background 150ms, color 150ms",
      }}
    >
      {children}
      <span style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        maxWidth: collapsed ? 0 : 160,
        opacity: collapsed ? 0 : 1,
        transition: "max-width 200ms, opacity 150ms",
      }}>
        {label}
      </span>
    </Link>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router   = useRouter();
  const supabase = createClient();

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(localStorage.getItem(COLLAPSE_KEY) === "true");
  }, []);

  function toggleCollapsed() {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem(COLLAPSE_KEY, String(next));
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside style={{
      width: collapsed ? WIDTH_COLLAPSED : WIDTH_OPEN,
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      height: "100%",           /* herda do pai flex que tem height: 100svh */
      background: "var(--color-surface)",
      borderRight: "1px solid var(--color-border)",
      transition: "width 200ms",
      overflow: "hidden",
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
          <div style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            maxWidth: collapsed ? 0 : 160,
            opacity: collapsed ? 0 : 1,
            transition: "max-width 200ms, opacity 150ms",
          }}>
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
            <NavRow key={href} href={href} label={label} active={active} collapsed={collapsed}>
              <Icon size={14} strokeWidth={active ? 2.5 : 2} style={{ flexShrink: 0 }} />
            </NavRow>
          );
        })}
      </nav>

      {/* Collapse toggle + Logout */}
      <div style={{ padding: "var(--space-3) var(--space-2)", borderTop: "1px solid var(--color-border)", flexShrink: 0, display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <button
          onClick={toggleCollapsed}
          title={collapsed ? "Expandir menu" : "Recolher menu"}
          style={{
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
            transition: "background 150ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-muted)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <ChevronsLeft size={14} style={{ flexShrink: 0, transition: "transform 200ms", transform: collapsed ? "rotate(180deg)" : "rotate(0deg)" }} />
          <span style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            maxWidth: collapsed ? 0 : 160,
            opacity: collapsed ? 0 : 1,
            transition: "max-width 200ms, opacity 150ms",
          }}>
            Recolher
          </span>
        </button>

        <button
          onClick={handleLogout}
          title={collapsed ? "Sair" : undefined}
          style={{
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
            transition: "background 150ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-destructive-bg)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <LogOut size={14} style={{ flexShrink: 0 }} />
          <span style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            maxWidth: collapsed ? 0 : 160,
            opacity: collapsed ? 0 : 1,
            transition: "max-width 200ms, opacity 150ms",
          }}>
            Sair
          </span>
        </button>
      </div>
    </aside>
  );
}

import { createClient } from "@/lib/supabase/server";
import { LayoutDashboard, LogIn, User } from "lucide-react";

export default async function NavAuthButton() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <a
        href="/login"
        style={{
          display: "flex", alignItems: "center", gap: 6,
          fontSize: "var(--text-micro)",
          fontWeight: 500,
          color: "var(--color-muted-foreground)",
          textDecoration: "none",
          padding: "6px 12px",
          borderRadius: "var(--radius-full)",
          border: "1px solid var(--color-border)",
          transition: "color 150ms, border-color 150ms",
        }}
      >
        <LogIn size={13} />
        Entrar
      </a>
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const isStaff = profile?.role === "admin" || profile?.role === "agent";

  if (isStaff) {
    return (
      <a
        href="/admin"
        style={{
          display: "flex", alignItems: "center", gap: 6,
          fontSize: "var(--text-micro)",
          fontWeight: 600,
          color: "var(--color-primary)",
          textDecoration: "none",
          padding: "6px 12px",
          borderRadius: "var(--radius-full)",
          border: "1px solid var(--color-primary)",
          transition: "background 150ms",
        }}
      >
        <LayoutDashboard size={13} />
        Admin
      </a>
    );
  }

  return (
    <a
      href="/minha-conta"
      style={{
        display: "flex", alignItems: "center", gap: 6,
        fontSize: "var(--text-micro)",
        fontWeight: 500,
        color: "var(--color-foreground)",
        textDecoration: "none",
        padding: "6px 12px",
        borderRadius: "var(--radius-full)",
        border: "1px solid var(--color-border)",
      }}
    >
      <User size={13} />
      Minha conta
    </a>
  );
}

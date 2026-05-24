import { createClient } from "@/lib/supabase/server";
import { LayoutDashboard, LogIn, User } from "lucide-react";

const btnBase: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: 6,
  fontSize: "var(--text-micro)",
  fontWeight: 500,
  textDecoration: "none",
  padding: "6px 12px",
  borderRadius: "var(--radius-full)",
  border: "1px solid var(--color-border)",
  transition: "color 150ms, border-color 150ms",
  color: "var(--color-muted-foreground)",
};

function EntrarBtn() {
  return (
    <a href="/login" style={btnBase}>
      <LogIn size={13} />
      Entrar
    </a>
  );
}

export default async function NavAuthButton() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return <EntrarBtn />;

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const isStaff = profile?.role === "admin" || profile?.role === "agent";

    if (isStaff) {
      return (
        <a href="/admin" style={{ ...btnBase, fontWeight: 600, color: "var(--color-primary)", borderColor: "var(--color-primary)" }}>
          <LayoutDashboard size={13} />
          Admin
        </a>
      );
    }

    return (
      <a href="/minha-conta" style={{ ...btnBase, color: "var(--color-foreground)" }}>
        <User size={13} />
        Minha conta
      </a>
    );
  } catch {
    return <EntrarBtn />;
  }
}

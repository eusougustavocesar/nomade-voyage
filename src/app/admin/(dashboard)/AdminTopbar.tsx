import { createClient } from "@/lib/supabase/server";
import AdminUserMenu from "./_components/AdminUserMenu";

export default async function AdminTopbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from("profiles").select("full_name, email").eq("id", user.id).single()
    : { data: null };

  const name  = profile?.full_name ?? user?.email?.split("@")[0] ?? "Admin";
  const email = profile?.email ?? user?.email ?? "";

  return (
    <header style={{
      height: "var(--admin-topbar-h)",
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 var(--space-8)",
      background: "var(--color-surface)",
      borderBottom: "1px solid var(--color-border)",
    }}>
      <AdminUserMenu name={name} email={email} />
    </header>
  );
}

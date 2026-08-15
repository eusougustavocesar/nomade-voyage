import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar  from "./AdminTopbar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Seguro agora: (dashboard) é um route group que não inclui /admin/login,
  // então esse guard não pode mais redirecionar pra si mesmo.
  if (!user) redirect("/admin/login");

  return (
    <div style={{
      display: "flex",
      height: "100svh",
      overflow: "hidden",
      background: "var(--color-background)",
      padding: "var(--space-2)",
    }}>
      {/* Card flutuante — sidebar + topbar + main ficam dentro, cantos arredondados cortam tudo */}
      <div style={{
        display: "flex",
        flex: 1,
        minWidth: 0,
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        overflow: "hidden",
      }}>
        {/* Sidebar */}
        <AdminSidebar />

        {/* Right column: topbar + scrollable main */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <AdminTopbar />
          <main style={{ flex: 1, overflowY: "auto" }}>
            <div style={{ maxWidth: "var(--admin-content-max)", margin: "0 auto", padding: "var(--space-8)" }}>
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

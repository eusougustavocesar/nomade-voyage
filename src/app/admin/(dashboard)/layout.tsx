import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar  from "./AdminTopbar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div style={{
      display: "flex",
      height: "100svh",
      overflow: "hidden",
      background: "var(--color-background)",
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
  );
}

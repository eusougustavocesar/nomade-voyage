import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { MapPin } from "lucide-react";
import PageHeader   from "../_components/PageHeader";
import SectionCard  from "../_components/SectionCard";
import NovoRoteiroModal from "./NovoRoteiroModal";

export const metadata = { title: "Roteiros — Admin" };

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("pt-BR", { day: "numeric", month: "short" });
}

export default async function RoteirosPage() {
  const supabase = await createClient();

  const [{ data: itineraries }, { data: leads }] = await Promise.all([
    supabase
      .from("quote_itineraries")
      .select("id, destination, duration_days, created_at, quotes(status, leads(contacts(full_name)))")
      .order("created_at", { ascending: false }),
    supabase
      .from("leads")
      .select("id, destination, contacts(full_name)")
      .not("stage", "in", "(perdido,concluido)")
      .order("created_at", { ascending: false }),
  ]);

  return (
    <div>
      <PageHeader
        title="Roteiros"
        sub={`${itineraries?.length ?? 0} roteiro${(itineraries?.length ?? 0) !== 1 ? "s" : ""}`}
        action={<NovoRoteiroModal leads={(leads ?? []) as any} />}
      />

      <SectionCard style={{ padding: 0, overflow: "hidden" }}>
        {!itineraries?.length ? (
          <p style={{ padding: "var(--space-16) var(--space-8)", textAlign: "center", color: "var(--color-muted-foreground)", fontSize: "var(--text-caption)" }}>
            Nenhum roteiro criado ainda.
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                {["Cliente", "Destino", "Duração", "Criado"].map((h) => (
                  <th key={h} className="admin-label" style={{ padding: "var(--space-3) var(--space-4)", textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {itineraries.map((it: any, i: number) => (
                <tr key={it.id} className="admin-table-row" style={{ borderTop: i > 0 ? "1px solid var(--color-border)" : "none" }}>
                  <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                    <Link href={`/admin/roteiros/${it.id}`} style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-foreground)", textDecoration: "none" }}>
                      {it.quotes?.leads?.contacts?.full_name ?? "—"}
                    </Link>
                  </td>
                  <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "var(--space-1)", fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>
                      <MapPin size={10} />
                      {it.destination}
                    </span>
                  </td>
                  <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                    <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>{it.duration_days} dias</span>
                  </td>
                  <td style={{ padding: "var(--space-3) var(--space-4)" }}>
                    <span style={{ fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)" }}>{fmtDate(it.created_at)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </SectionCard>
    </div>
  );
}

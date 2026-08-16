import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import PageHeader  from "../../_components/PageHeader";
import SectionCard from "../../_components/SectionCard";
import RoteiroEditor from "./RoteiroEditor";

export const metadata = { title: "Editar Roteiro — Admin" };

export default async function RoteiroDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: itinerary } = await supabase
    .from("quote_itineraries")
    .select("id, share_token, destination, duration_days, travel_style, days, quotes(leads(contacts(full_name)))")
    .eq("id", id)
    .single();

  if (!itinerary) notFound();

  const contactName = (itinerary as any).quotes?.leads?.contacts?.full_name ?? "—";

  return (
    <div>
      <Link
        href="/admin/roteiros"
        style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-1)", fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)", textDecoration: "none", marginBottom: "var(--space-4)" }}
      >
        <ArrowLeft size={12} />
        Roteiros
      </Link>

      <PageHeader title={contactName} sub={`${itinerary.destination} · ${itinerary.duration_days} dias`} />

      <SectionCard style={{ marginBottom: "var(--gap-sm)" }}>
        <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
          <MapPin size={12} color="var(--color-primary-light)" />
          <span style={{ fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)" }}>
            {itinerary.destination}{itinerary.travel_style ? ` · ${itinerary.travel_style}` : ""}
          </span>
        </div>
      </SectionCard>

      <RoteiroEditor
        itineraryId={itinerary.id}
        shareToken={itinerary.share_token}
        initialDays={(itinerary.days as any) ?? []}
      />
    </div>
  );
}

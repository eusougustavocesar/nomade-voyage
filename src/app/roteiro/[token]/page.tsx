import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { MapPin, Calendar, DollarSign } from "lucide-react";
import Logo from "@/components/Logo";
import ItineraryTimeline from "@/components/ItineraryTimeline";
import PrintButton from "./PrintButton";
import { fmtCurrency, fmtDate as fmtDateBase } from "@/lib/format";

export async function generateMetadata({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const supabase = await createClient();
  const { data } = await supabase.rpc("get_public_itinerary", { p_token: token });
  const itinerary = data as any;
  if (!itinerary) return {};
  return { title: `Roteiro — ${itinerary.destination} — Nômade Voyage` };
}

function fmt(v: number | null) {
  return fmtCurrency(v, null);
}

function fmtDate(d: string | null) {
  if (!d) return null;
  return fmtDateBase(d, "long");
}

export default async function RoteiroPublicoPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = await createClient();

  const { data } = await supabase.rpc("get_public_itinerary", { p_token: token });
  const itinerary = data as {
    destination: string;
    duration_days: number;
    travel_style: string | null;
    days: { day: number; title: string; description: string; photo_url?: string }[];
    quote_total: number | null;
    valid_until: string | null;
    quote_status: string;
    traveler_name: string;
  } | null;

  if (!itinerary) notFound();

  const waLink = `https://wa.me/?text=${encodeURIComponent(`Olá! Aqui está o roteiro personalizado pra ${itinerary.destination}.`)}`;

  return (
    <div style={{ background: "var(--color-background)", minHeight: "100svh" }}>
      <div className="container" style={{ maxWidth: 720, padding: "var(--space-8) var(--container-px)" }}>
        <div className="flex items-center justify-between no-print" style={{ marginBottom: "var(--gap-lg)" }}>
          <Logo size={32} />
          <PrintButton waLink={waLink} />
        </div>

        <div style={{ marginBottom: "var(--gap-lg)" }}>
          <p style={{ fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)", marginBottom: "var(--space-1)" }}>
            Roteiro personalizado para {itinerary.traveler_name}
          </p>
          <h1 style={{ fontSize: "var(--text-display)", marginBottom: "var(--space-3)" }}>{itinerary.destination}</h1>
          <div className="flex flex-wrap items-center" style={{ gap: "var(--space-4)" }}>
            <span className="flex items-center" style={{ gap: "var(--space-1)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)" }}>
              <Calendar size={13} />
              {itinerary.duration_days} dias
            </span>
            {itinerary.travel_style && (
              <span className="flex items-center" style={{ gap: "var(--space-1)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)" }}>
                <MapPin size={13} />
                {itinerary.travel_style}
              </span>
            )}
            {fmt(itinerary.quote_total) && (
              <span className="flex items-center" style={{ gap: "var(--space-1)", fontSize: "var(--text-caption)", color: "var(--color-primary)", fontWeight: 600 }}>
                <DollarSign size={13} />
                {fmt(itinerary.quote_total)}
                {itinerary.valid_until && ` · válido até ${fmtDate(itinerary.valid_until)}`}
              </span>
            )}
          </div>
        </div>

        {itinerary.days.length === 0 ? (
          <p style={{ color: "var(--color-muted-foreground)", fontSize: "var(--text-caption)" }}>
            Roteiro em preparação — volte em breve.
          </p>
        ) : (
          <ItineraryTimeline days={itinerary.days} />
        )}
      </div>
    </div>
  );
}

export type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  photo_url?: string;
};

export default function ItineraryTimeline({ days }: { days: ItineraryDay[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-md)" }}>
      {days.map(({ day, title, description, photo_url }) => (
        <div key={day} style={{ display: "flex", gap: "var(--gap-md)" }}>
          <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: 36, height: 36, borderRadius: "var(--radius-full)", background: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-micro)", color: "white" }}>{day}</span>
            </div>
            {day < days.length && <div style={{ width: 1, flex: 1, background: "var(--color-border)", minHeight: 24 }} />}
          </div>
          <div style={{ paddingBottom: "var(--space-6)", width: "100%" }}>
            <h3 style={{ fontSize: "var(--text-h4)", fontWeight: 600, marginBottom: "var(--space-2)" }}>{title}</h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body)", color: "var(--color-muted-foreground)", lineHeight: 1.65, marginBottom: photo_url ? "var(--space-3)" : 0 }}>
              {description}
            </p>
            {photo_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo_url}
                alt={title}
                style={{ width: "100%", maxWidth: 480, borderRadius: "var(--radius-lg)", display: "block" }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

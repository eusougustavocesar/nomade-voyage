import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Check, Users, Star } from "lucide-react";
import type { TravelPackage } from "@/data/packages";

const BADGE_STYLES: Record<string, React.CSSProperties> = {
  "Mais pedido":            { background: "#FFF7ED", color: "#EA580C" },
  "Mais procurado":         { background: "#FFF7ED", color: "#EA580C" },
  "Últimas vagas":          { background: "#FEF2F2", color: "#DC2626" },
  "Novo":                   { background: "#F0FDF4", color: "#16A34A" },
  "Favorito de casais":     { background: "#FDF4FF", color: "#7C3AED" },
  "Melhor custo-benefício": { background: "#F0FDF4", color: "#16A34A" },
};

export default function PackageCard({ pkg }: { pkg: TravelPackage }) {
  const badgeStyle = pkg.badge ? BADGE_STYLES[pkg.badge] ?? {} : {};

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* ── Photo ── */}
      <div className="group" style={{ position: "relative", height: 220, flexShrink: 0 }}>
        <Image
          src={pkg.photo}
          alt={pkg.name}
          fill
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="transition-transform duration-500 ease-out group-hover:scale-105"
          style={{ objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.50) 0%, transparent 55%)" }} />

        {/* Badge */}
        {pkg.badge && (
          <span style={{
            position: "absolute", top: 12, left: 12,
            fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", fontWeight: 700,
            padding: "4px 10px", borderRadius: "var(--radius-full)",
            ...badgeStyle,
          }}>
            {pkg.badge}
          </span>
        )}

        {/* Rating */}
        <div style={{ position: "absolute", top: 12, right: 12, display: "flex", alignItems: "center", gap: 4, background: "rgba(0,0,0,0.50)", backdropFilter: "blur(8px)", padding: "4px 8px", borderRadius: "var(--radius-full)" }}>
          <Star size={10} fill="white" color="white" />
          <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", fontWeight: 700, color: "white" }}>4.9</span>
        </div>

        {/* Countries bottom */}
        <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {pkg.countries.map((c) => (
            <span key={c} style={{
              fontFamily: "var(--font-body)", fontSize: "var(--text-micro)",
              color: "rgba(255,255,255,0.90)", background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(8px)", padding: "3px 10px",
              borderRadius: "var(--radius-full)", border: "1px solid rgba(255,255,255,0.15)",
            }}>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", flex: 1, gap: "var(--space-3)" }}>

        {/* Profile + name */}
        <div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-accent)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "var(--space-1)" }}>
            {pkg.profile}
          </p>
          <h3 style={{ fontSize: "var(--text-h4)", fontWeight: 700, color: "var(--color-foreground)", lineHeight: 1.2, marginBottom: "var(--space-1)" }}>
            {pkg.name}
          </h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)", lineHeight: 1.5 }}>
            {pkg.tagline}
          </p>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap" style={{ gap: "var(--gap-xs)" }}>
          <div className="flex items-center" style={{ gap: 4 }}>
            <Clock size={12} color="var(--color-muted-foreground)" />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)" }}>
              {pkg.duration} dias
            </span>
          </div>
          <div className="flex items-center" style={{ gap: 4 }}>
            <MapPin size={12} color="var(--color-muted-foreground)" />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)" }}>
              {pkg.cities.slice(0, 3).join(", ")}{pkg.cities.length > 3 ? ` +${pkg.cities.length - 3}` : ""}
            </span>
          </div>
          {pkg.maxGroup && (
            <div className="flex items-center" style={{ gap: 4 }}>
              <Users size={12} color="var(--color-muted-foreground)" />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)" }}>
                Até {pkg.maxGroup} pessoas
              </span>
            </div>
          )}
        </div>

        {/* Top 3 includes */}
        <ul style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {pkg.includes.slice(0, 3).map((item) => (
            <li key={item} className="flex items-center" style={{ gap: 7 }}>
              <Check size={11} color="var(--color-primary-light)" strokeWidth={2.5} style={{ flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)" }}>
                {item}
              </span>
            </li>
          ))}
          {pkg.includes.length > 3 && (
            <li style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)", paddingLeft: 18 }}>
              +{pkg.includes.length - 3} incluídos
            </li>
          )}
        </ul>

        {/* Footer: price + CTA */}
        <div style={{ marginTop: "auto", paddingTop: "var(--space-4)", borderTop: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)", marginBottom: 2 }}>
              A partir de
            </p>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-body-sm)", color: "var(--color-primary)" }}>
              {pkg.priceFrom ?? "Consulte"}
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)" }}>
              por pessoa
            </p>
          </div>
          <Link
            href={`/pacotes/${pkg.slug}`}
            style={{
              fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "var(--text-micro)",
              color: "white", background: "var(--color-primary)",
              textDecoration: "none", padding: "8px 14px",
              borderRadius: "var(--radius-md)", whiteSpace: "nowrap",
              transition: "opacity 150ms",
            }}
          >
            Ver roteiro →
          </Link>
        </div>
      </div>
    </div>
  );
}

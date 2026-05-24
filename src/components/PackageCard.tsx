import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Check } from "lucide-react";
import type { TravelPackage } from "@/data/packages";

interface PackageCardProps {
  pkg: TravelPackage;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const badgeColors: Record<string, string> = {
    "Mais pedido":  "background:#FFF7ED; color:var(--color-accent)",
    "Últimas vagas": "background:#FEF2F2; color:#DC2626",
    "Novo":         "background:#F0FDF4; color:#16A34A",
  };

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div className="group" style={{ position: "relative", height: 240, flexShrink: 0 }}>
        <Image
          src={pkg.photo}
          alt={pkg.name}
          fill
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="transition-transform duration-500 ease-out group-hover:scale-105"
          style={{ objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)" }} />
        {pkg.badge && (
          <span style={{ position: "absolute", top: 14, left: 14, fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", fontWeight: 600, padding: "4px 10px", borderRadius: "var(--radius-full)", ...(Object.fromEntries(badgeColors[pkg.badge].split(";").map(s => { const [k, v] = s.split(":"); return [k.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v?.trim()]; }).filter(([k, v]) => k && v))) }}>
            {pkg.badge}
          </span>
        )}
        <div style={{ position: "absolute", bottom: 14, left: 14, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {pkg.countries.map((c) => (
            <span key={c} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "rgba(255,255,255,0.85)", background: "rgba(0,0,0,0.40)", backdropFilter: "blur(8px)", padding: "3px 10px", borderRadius: "var(--radius-full)", border: "1px solid rgba(255,255,255,0.15)" }}>
              {c}
            </span>
          ))}
        </div>
      </div>

      <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", flex: 1, gap: "var(--space-4)" }}>
        <div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-accent)", fontWeight: 500, marginBottom: "var(--space-1)" }}>
            {pkg.profile}
          </p>
          <h3 style={{ fontSize: "var(--text-h4)", fontWeight: 700, color: "var(--color-primary)", marginBottom: "var(--space-2)" }}>
            {pkg.name}
          </h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-muted-foreground)" }}>
            {pkg.tagline}
          </p>
        </div>

        <div className="flex items-center" style={{ gap: "var(--gap-sm)" }}>
          <div className="flex items-center" style={{ gap: 5 }}>
            <Clock size={13} color="var(--color-muted-foreground)" />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)" }}>
              {pkg.duration} dias
            </span>
          </div>
          <div className="flex items-center" style={{ gap: 5 }}>
            <MapPin size={13} color="var(--color-muted-foreground)" />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)" }}>
              {pkg.cities.join(", ")}
            </span>
          </div>
        </div>

        <ul style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {pkg.includes.slice(0, 3).map((item) => (
            <li key={item} className="flex items-center" style={{ gap: 8 }}>
              <Check size={12} color="var(--color-primary-light)" strokeWidth={2.5} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)" }}>
                {item}
              </span>
            </li>
          ))}
          {pkg.includes.length > 3 && (
            <li style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "var(--color-muted-foreground)", paddingLeft: 20 }}>
              +{pkg.includes.length - 3} itens incluídos
            </li>
          )}
        </ul>

        <div style={{ marginTop: "auto", paddingTop: "var(--space-4)", borderTop: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)" }}>
              Preço sob consulta
            </p>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-body-sm)", color: "var(--color-primary)" }}>
              Consulte disponibilidade
            </p>
          </div>
          <Link
            href={`/pacotes/${pkg.slug}`}
            style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "var(--text-caption)", color: "var(--color-primary-light)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}
          >
            Ver roteiro
            <span style={{ fontSize: 14 }}>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

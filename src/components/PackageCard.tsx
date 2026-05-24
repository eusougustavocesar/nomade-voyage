import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Plane, BedDouble, Car, Shield, Map, MessageCircle, Train, Ship, type LucideIcon } from "lucide-react";
import type { TravelPackage } from "@/data/packages";

const BADGE_STYLES: Record<string, React.CSSProperties> = {
  "Mais pedido":            { background: "var(--color-accent-bg)",      color: "var(--color-accent)" },
  "Mais procurado":         { background: "var(--color-accent-bg)",      color: "var(--color-accent)" },
  "Últimas vagas":          { background: "var(--color-destructive-bg)", color: "var(--color-destructive)" },
  "Novo":                   { background: "var(--color-success-bg)",     color: "var(--color-success)" },
  "Favorito de casais":     { background: "var(--color-purple-bg)",      color: "var(--color-purple)" },
  "Melhor custo-benefício": { background: "var(--color-success-bg)",     color: "var(--color-success)" },
};

type Pill = { label: string; Icon: LucideIcon };

const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function toPill(text: string): Pill {
  const t = norm(text);
  if (/passagem|voos?/.test(t))            return { label: "Voo",      Icon: Plane };
  if (/hoteis?|hotel|pousada/.test(t))     return { label: "Hotel",    Icon: BedDouble };
  if (/transfer/.test(t))                  return { label: "Transfer", Icon: Car };
  if (/trens?|train/.test(t))              return { label: "Trem",     Icon: Train };
  if (/ferry|ferries|barco/.test(t))       return { label: "Ferry",    Icon: Ship };
  if (/seguro/.test(t))                    return { label: "Seguro",   Icon: Shield };
  if (/roteiro/.test(t))                   return { label: "Roteiro",  Icon: Map };
  if (/suporte|whatsapp/.test(t))          return { label: "Suporte",  Icon: MessageCircle };
  return { label: "Incluso", Icon: Map };
}

function buildPills(includes: string[]): Pill[] {
  const pills: Pill[] = [];
  for (const inc of includes) {
    if (pills.length >= 3) break;
    const pill = toPill(inc);
    if (!pills.some((p) => p.label === pill.label)) pills.push(pill);
  }
  return pills;
}

export default function PackageCard({ pkg }: { pkg: TravelPackage }) {
  const badgeStyle = pkg.badge ? BADGE_STYLES[pkg.badge] ?? {} : {};
  const pills = buildPills(pkg.includes);

  return (
    <Link
      href={`/pacotes/${pkg.slug}`}
      className="card group"
      style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", textDecoration: "none" }}
    >
      {/* ── Imagem ── */}
      <div style={{ position: "relative", height: 260, flexShrink: 0 }}>
        <Image
          src={pkg.photo}
          alt={pkg.name}
          fill
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="transition-transform duration-500 ease-out group-hover:scale-105"
          style={{ objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)" }} />

        {pkg.badge && (
          <span style={{
            position: "absolute", top: 12, left: 12,
            fontSize: "var(--text-micro)", fontWeight: 700,
            padding: "4px 10px", borderRadius: "var(--radius-full)",
            ...badgeStyle,
          }}>
            {pkg.badge}
          </span>
        )}

        <div style={{
          position: "absolute", top: 12, right: 12,
          display: "flex", alignItems: "center", gap: 4,
          background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)",
          padding: "4px 8px", borderRadius: "var(--radius-full)",
        }}>
          <Star size={10} fill="white" color="white" />
          <span style={{ fontSize: "var(--text-micro)", fontWeight: 700, color: "white" }}>4.9</span>
        </div>
      </div>

      {/* ── Corpo ── */}
      <div style={{ padding: "var(--space-6)", display: "flex", flexDirection: "column", flex: 1, gap: "var(--space-3)" }}>

        {/* Destino */}
        <div className="flex items-center" style={{ gap: 4 }}>
          <MapPin size={11} color="var(--color-primary-light)" strokeWidth={2.5} />
          <span style={{ fontSize: "var(--text-micro)", fontWeight: 600, color: "var(--color-primary-light)", letterSpacing: "0.03em" }}>
            {pkg.countries.join(" · ")} · {pkg.duration} dias
          </span>
        </div>

        {/* Nome */}
        <h3 style={{ fontSize: "var(--text-h4)", color: "var(--color-foreground)", lineHeight: 1.2 }}>
          {pkg.name}
        </h3>

        {/* Pills */}
        <div className="flex flex-wrap" style={{ gap: 6 }}>
          {pills.map(({ label, Icon }) => (
            <span
              key={label}
              className="flex items-center"
              style={{
                gap: 5,
                fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)",
                background: "var(--color-muted)", borderRadius: "var(--radius-full)",
                padding: "3px 10px",
              }}
            >
              <Icon size={11} strokeWidth={2} />
              {label}
            </span>
          ))}
        </div>

        {/* Preço */}
        <div
          className="flex items-center justify-between"
          style={{ marginTop: "auto", paddingTop: "var(--space-4)", borderTop: "1px solid var(--color-border)" }}
        >
          <div>
            <span style={{ fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)" }}>A partir de </span>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-body-sm)", color: "var(--color-primary)" }}>
              {pkg.priceFrom ?? "Consulte"}
            </span>
            <span style={{ fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)" }}> p.p</span>
          </div>
          <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-primary-light)" }}>
            Ver roteiro →
          </span>
        </div>
      </div>
    </Link>
  );
}

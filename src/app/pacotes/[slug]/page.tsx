import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPackage, packages } from "@/data/packages";
import Navbar from "@/components/Navbar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Logo from "@/components/Logo";
import { Check, X, MapPin, Clock, Users, MessageCircle, ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return {};
  return {
    title: `${pkg.name} — Nômade Voyage`,
    description: pkg.tagline,
  };
}

const WA_BASE = "https://wa.me/351962221594?text=";

export default async function PackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  const waText = encodeURIComponent(
    `Olá! Tenho interesse no pacote ${pkg.name} (${pkg.duration} dias). Pode me passar mais informações?`
  );

  return (
    <>
      <Navbar />
      <FloatingWhatsApp />

      {/* ── Hero ── */}
      <section style={{ position: "relative", height: "60vh", minHeight: 400, overflow: "hidden" }}>
        <Image
          src={pkg.photo}
          alt={pkg.name}
          fill
          priority
          quality={90}
          style={{ objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.70) 100%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "var(--gap-xl)", paddingTop: "calc(var(--nav-height) + var(--gap-md))" }}>
          <Link href="/#pacotes" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.70)", fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", textDecoration: "none", marginBottom: "var(--space-6)" }}>
            <ArrowLeft size={14} />
            Voltar aos pacotes
          </Link>
          <div className="flex flex-wrap" style={{ gap: 8, marginBottom: "var(--space-4)" }}>
            {pkg.countries.map((c) => (
              <span key={c} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "rgba(255,255,255,0.80)", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", padding: "4px 12px", borderRadius: "var(--radius-full)", border: "1px solid rgba(255,255,255,0.20)" }}>
                {c}
              </span>
            ))}
          </div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-display)", color: "white", lineHeight: 1.05, marginBottom: "var(--space-3)" }}>
            {pkg.name}
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-lg)", color: "rgba(255,255,255,0.80)" }}>
            {pkg.tagline}
          </p>
        </div>
      </section>

      {/* ── Info strip ── */}
      <div style={{ background: "var(--color-primary)", padding: "var(--space-6) 0" }}>
        <div className="container">
          <div className="flex flex-wrap justify-center" style={{ gap: "var(--gap-lg)" }}>
            {[
              { icon: Clock, label: `${pkg.duration} dias` },
              { icon: MapPin, label: pkg.cities.join(" · ") },
              { icon: Users, label: pkg.profile },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center" style={{ gap: 8 }}>
                <Icon size={16} color="rgba(255,255,255,0.70)" />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "white" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Conteúdo ── */}
      <section style={{ background: "var(--color-background)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: "var(--gap-xl)" }}>

            {/* ── Itinerário ── */}
            <div style={{ gridColumn: "span 2" }}>
              <h2 style={{ fontSize: "var(--text-h2)", marginBottom: "var(--gap-lg)" }}>Roteiro dia a dia</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-md)" }}>
                {pkg.itinerary.map(({ day, title, description, accommodation, meals }) => (
                  <div key={day} style={{ display: "flex", gap: "var(--gap-md)" }}>
                    <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{ width: 36, height: 36, borderRadius: "var(--radius-full)", background: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-micro)", color: "white" }}>{day}</span>
                      </div>
                      {day < pkg.itinerary.length && <div style={{ width: 1, flex: 1, background: "var(--color-border)", minHeight: 24 }} />}
                    </div>
                    <div style={{ paddingBottom: "var(--space-6)" }}>
                      <h3 style={{ fontSize: "var(--text-h4)", fontWeight: 600, marginBottom: "var(--space-2)" }}>{title}</h3>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body)", color: "var(--color-muted-foreground)", lineHeight: 1.65, marginBottom: "var(--space-3)" }}>
                        {description}
                      </p>
                      {(accommodation || meals?.length) && (
                        <div className="flex flex-wrap" style={{ gap: 8 }}>
                          {accommodation && (
                            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-primary-light)", background: "var(--color-muted)", padding: "3px 10px", borderRadius: "var(--radius-full)" }}>
                              🏨 {accommodation}
                            </span>
                          )}
                          {meals?.map((m) => (
                            <span key={m} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)", background: "var(--color-muted)", padding: "3px 10px", borderRadius: "var(--radius-full)" }}>
                              {m}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--gap-md)" }}>
              {/* CTA */}
              <div className="card" style={{ position: "sticky", top: "calc(var(--nav-height) + 16px)" }}>
                <h3 style={{ fontSize: "var(--text-h4)", marginBottom: "var(--space-2)" }}>Gostou do roteiro?</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-muted-foreground)", lineHeight: 1.65, marginBottom: "var(--space-6)" }}>
                  Tudo é personalizável — datas, hotel, número de pessoas e extras. A primeira conversa é gratuita.
                </p>
                <a
                  href={`${WA_BASE}${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <MessageCircle size={18} />
                  Quero este roteiro
                </a>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-micro)", color: "var(--color-muted-foreground)", textAlign: "center", marginTop: "var(--space-3)" }}>
                  Sem compromisso · Resposta em até 24h
                </p>
              </div>

              {/* Inclui */}
              <div className="card">
                <h3 style={{ fontSize: "var(--text-h4)", marginBottom: "var(--space-6)" }}>O que está incluído</h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start" style={{ gap: 10 }}>
                      <Check size={14} color="var(--color-primary-light)" strokeWidth={2.5} style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-muted-foreground)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
                {pkg.notIncludes.length > 0 && (
                  <>
                    <div style={{ borderTop: "1px solid var(--color-border)", margin: "var(--space-6) 0" }} />
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "var(--space-4)" }}>
                      Não inclui
                    </p>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                      {pkg.notIncludes.map((item) => (
                        <li key={item} className="flex items-start" style={{ gap: 10 }}>
                          <X size={14} color="#94A3B8" strokeWidth={2} style={{ marginTop: 2, flexShrink: 0 }} />
                          <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-muted-foreground)" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer mínimo ── */}
      <footer style={{ background: "var(--color-footer)", padding: "var(--gap-lg) 0" }}>
        <div className="container text-center">
          <Logo size={24} theme="dark" />
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-caption)", color: "rgba(255,255,255,0.35)", marginTop: "var(--space-3)" }}>
            © 2026 Nômade Voyage
          </p>
        </div>
      </footer>
    </>
  );
}

import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const svgBase64 = readFileSync(join(process.cwd(), "public/logo-icon.svg")).toString("base64");
  const logoSrc   = `data:image/svg+xml;base64,${svgBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0C4A6E 0%, #0EA5E9 60%, #0C4A6E 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -120, right: -120, width: 500, height: 500, borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 360, height: 360, borderRadius: "50%", background: "rgba(255,255,255,0.04)", display: "flex" }} />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 80px",
            height: "100%",
          }}
        >
          {/* Top: icon + wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* Logo icon */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={64} height={64} alt="Nômade Voyage" />
            <span style={{ fontSize: 32, fontWeight: 700, color: "white", letterSpacing: "-0.5px" }}>
              Nômade Voyage
            </span>
          </div>

          {/* Center: headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                display: "flex",
                background: "rgba(234,88,12,0.9)",
                color: "white",
                fontSize: 14,
                fontWeight: 600,
                padding: "6px 16px",
                borderRadius: 999,
                width: "fit-content",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Para quem quer pertencer ao mundo
            </div>
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: "white",
                lineHeight: 1.05,
                letterSpacing: "-1px",
                maxWidth: 800,
              }}
            >
              A agência para quem quer morar, explorar e viajar fora.
            </div>
            <div
              style={{
                fontSize: 24,
                color: "rgba(255,255,255,0.78)",
                lineHeight: 1.5,
                maxWidth: 680,
              }}
            >
              Visto D7, passagens, seguro e suporte completo — do primeiro contato ao novo endereço.
            </div>
          </div>

          {/* Bottom: trust strip */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {["+200 brasileiros atendidos", "4 destinos âncora", "Primeira consulta gratuita"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#0EA5E9", display: "flex" }} />
                <span style={{ fontSize: 18, color: "rgba(255,255,255,0.70)", fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}

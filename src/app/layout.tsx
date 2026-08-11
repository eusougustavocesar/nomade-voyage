import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Nômade Voyage — Viagens pra Europa no WhatsApp",
  description:
    "Passagem, hotel, seguro e roteiro para a Europa. Grupo pequeno, conversa no WhatsApp, sem formulário longo.",
  openGraph: {
    title: "Nômade Voyage — Viagens pra Europa no WhatsApp",
    description: "Roteiros pra Lisboa, multi-destino e mais. Montados com você no WhatsApp.",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nômade Voyage",
    description: "Viagem pra Europa montada no WhatsApp. Grupo pequeno, atendimento humano.",
  },
};

// Inline script evita flash de tema errado antes da hidratação
const themeScript = `(function(){try{var t=localStorage.getItem('nv-theme')||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

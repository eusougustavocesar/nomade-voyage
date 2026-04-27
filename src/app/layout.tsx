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
  title: "Nômade Voyage — Sua agência para morar, explorar e viajar fora",
  description:
    "A agência para quem quer pertencer ao mundo. Passagens, seguro viagem, vistos e suporte completo para brasileiros que querem morar ou viajar para o exterior.",
  openGraph: {
    title: "Nômade Voyage — Sua agência para morar, explorar e viajar fora",
    description: "Passagens, seguro, visto D7 e suporte completo para brasileiros que querem dar o próximo passo.",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nômade Voyage",
    description: "A agência para quem quer pertencer ao mundo.",
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

import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://berkantsoytas.dev"),
  title: {
    default: "Berkant Soytaş — Software Developer & Architect",
    template: "%s — Berkant Soytaş",
  },
  description:
    "Portfolio, blog & knowledge base of Berkant Soytaş — backend developer building reliable, scalable, and high-performance systems with Node.js, TypeScript, Go, and Rust.",
  openGraph: {
    title: "Berkant Soytaş — Software Developer & Architect",
    description:
      "Software developer building reliable, scalable, and high-performance systems with Node.js, TypeScript, Go, and Rust.",
    url: "https://berkantsoytas.dev",
    siteName: "Berkant Soytaş",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Berkant Soytaş — Software Developer & Architect",
    description:
      "Software developer building reliable, scalable, and high-performance systems with Node.js, TypeScript, Go, and Rust.",
  },
  alternates: {
    canonical: "https://berkantsoytas.dev",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-surface text-foreground font-sans">
        <I18nProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AssistantWidget } from "@/components/AssistantWidget";
import { getSiteSettings } from "@/lib/content";

const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-grotesk", display: "swap" });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex", display: "swap" });
// One weight only: mono is used for small labels, and every extra file delays first paint.
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-plexmono", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dbjphysiq.com";

export const viewport: Viewport = { themeColor: "#050d1a" };

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  const title = `${s.siteTitle} | ${s.tagline}`;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s | ${s.siteTitle}` },
    description: s.seoDescription,
    // No site-wide canonical: each page declares its own (a canonical here
    // would be inherited by every page and point them all at the homepage).
    icons: { icon: "/icon.svg" },
    // The social image comes from app/opengraph-image.tsx.
    openGraph: { siteName: s.siteTitle, type: "website", locale: "en_US", title, description: s.seoDescription },
    twitter: { card: "summary_large_image", title: s.siteTitle, description: s.seoDescription },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <html lang="en-US" className={`${grotesk.variable} ${plex.variable} ${plexMono.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-ink">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer settings={settings} />
        {process.env.ANTHROPIC_API_KEY ? <AssistantWidget /> : null}
      </body>
    </html>
  );
}

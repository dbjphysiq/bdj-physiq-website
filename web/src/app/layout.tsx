import type { Metadata } from "next";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AssistantWidget } from "@/components/AssistantWidget";
import { getSiteSettings } from "@/lib/content";

const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-grotesk", display: "swap" });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bdjphysiq.com";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  const title = `${s.siteTitle} | ${s.tagline}`;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s | ${s.siteTitle}` },
    description: s.seoDescription,
    alternates: { canonical: "/" },
    icons: { icon: "/icon.svg" },
    openGraph: { siteName: s.siteTitle, type: "website", locale: "en_GB", url: "/", title, description: s.seoDescription },
    twitter: { card: "summary", title: s.siteTitle, description: s.seoDescription },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <html lang="en-GB" className={`${grotesk.variable} ${plex.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">
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

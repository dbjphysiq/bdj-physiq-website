import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSiteSettings } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bdjphysiq.com";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    metadataBase: new URL(siteUrl),
    title: { default: `${s.siteTitle} — ${s.tagline}`, template: `%s | ${s.siteTitle}` },
    description: s.seoDescription,
    alternates: { canonical: "/" },
    icons: { icon: "/icon.svg" },
    openGraph: {
      siteName: s.siteTitle,
      type: "website",
      locale: "en_GB",
      url: "/",
      title: `${s.siteTitle} — ${s.tagline}`,
      description: s.seoDescription,
    },
    twitter: { card: "summary", title: s.siteTitle, description: s.seoDescription },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <html lang="en-GB">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}

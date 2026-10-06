import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/lib/content";
import { Container } from "./Container";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-line bg-paper text-slate">
      <Container className="grid gap-12 py-16 md:grid-cols-[2fr_1fr_1.4fr]">
        <div>
          <Link href="/" aria-label="BDJ PhysIQ home" className="inline-flex items-center gap-2.5">
            <Image src="/brand-mark.svg" alt="" width={32} height={32} className="h-8 w-8" />
            <span className="font-display text-lg font-semibold text-ink">BDJ PhysIQ</span>
          </Link>
          <p className="mt-4 max-w-xs leading-7">{settings.tagline}.</p>
          <p className="mt-1 font-display text-ink">{settings.motto}</p>
        </div>
        <nav aria-label="Footer" className="text-[15px]">
          <p className="font-medium text-ink">Company</p>
          <ul className="mt-4 space-y-3">
            <li><Link href="/services" className="hover:text-ink">Services</Link></li>
            <li><Link href="/about" className="hover:text-ink">About and method</Link></li>
            <li><Link href="/insights" className="hover:text-ink">Insights</Link></li>
            <li><Link href="/contact" className="hover:text-ink">Contact</Link></li>
          </ul>
        </nav>
        <div className="text-[15px]">
          <p className="font-medium text-ink">Contact</p>
          <ul className="mt-4 space-y-3">
            <li><a href={`mailto:${settings.contactEmail}`} className="hover:text-ink">{settings.contactEmail}</a></li>
            {settings.contactPhone && <li><a href={`tel:${settings.contactPhone.replace(/\s/g, "")}`} className="hover:text-ink">{settings.contactPhone}</a></li>}
            {settings.location && <li>{settings.location}</li>}
            <li>English and French, within one hour of CET</li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-line">
        <Container className="py-6 text-sm text-muted">
          © {new Date().getFullYear()} {settings.legalLine}
        </Container>
      </div>
    </footer>
  );
}

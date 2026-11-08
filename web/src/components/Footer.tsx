import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/lib/content";
import { FAMILIES, FLAGSHIP, HOURS_LINE } from "@/lib/site";
import { Container } from "./Container";

const SERVICE_LINKS = [
  { label: "Calibrated surrogate models", href: FLAGSHIP.path },
  ...FAMILIES.map((f) => ({ label: f.title, href: `/services#${f.key}` })),
  { label: "Compliance programmes", href: "/services#packaged" },
];

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="on-dark relative isolate overflow-hidden border-t border-white/10 bg-night-2 text-mist">
      <div aria-hidden className="bg-grid-night absolute inset-0 -z-10 [mask-image:linear-gradient(to_top,black,transparent)]" />
      <Container className="grid gap-12 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr_1.3fr]">
        <div>
          <Link href="/" aria-label="DBJ PhysIQ home" className="inline-flex items-center gap-2.5">
            <Image src="/brand-mark-inverse.svg" alt="" width={32} height={32} className="h-8 w-8" />
            <span className="font-display text-lg font-semibold text-white">DBJ PhysIQ</span>
          </Link>
          <p className="mt-5 max-w-xs leading-7">{settings.tagline}.</p>
          <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.16em] text-amber">{settings.motto}</p>
        </div>

        <nav aria-label="Footer: company" className="text-[15px]">
          <p className="text-[17px] font-semibold text-white">Company</p>
          <ul className="mt-5 space-y-3">
            <li><Link href="/about" className="hover:text-white">About and method</Link></li>
            <li><Link href="/about#founder" className="hover:text-white">Founder</Link></li>
            <li><Link href="/insights" className="hover:text-white">Insights</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </nav>

        <nav aria-label="Footer: services" className="text-[15px]">
          <p className="text-[17px] font-semibold text-white">Services</p>
          <ul className="mt-5 space-y-3">
            {SERVICE_LINKS.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-white">{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="text-[15px]">
          <p className="text-[17px] font-semibold text-white">Contact</p>
          <ul className="mt-5 space-y-3">
            <li><a href={`mailto:${settings.contactEmail}`} className="break-all hover:text-white">{settings.contactEmail}</a></li>
            {settings.contactPhone && <li><a href={`tel:${settings.contactPhone.replace(/\s/g, "")}`} className="hover:text-white">{settings.contactPhone}</a></li>}
            {settings.location && <li>{settings.location}</li>}
            <li className="text-mist/80">{HOURS_LINE}</li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-6 text-sm text-mist/70">
          Copyright ©{new Date().getFullYear()} {settings.legalLine}
        </Container>
      </div>
    </footer>
  );
}

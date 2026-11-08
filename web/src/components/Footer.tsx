import Image from "next/image";
import Link from "next/link";
import type { Service, SiteSettings } from "@/lib/content";
import { HOURS_LINE } from "@/lib/site";
import { Container } from "./Container";

export function Footer({ settings, services = [] }: { settings: SiteSettings; services?: Service[] }) {
  const core = services.filter((s) => s.category === "core").slice(0, 6);
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
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-white">Company</p>
          <ul className="mt-5 space-y-3">
            <li><Link href="/about" className="hover:text-white">About and method</Link></li>
            <li><Link href="/about#founder" className="hover:text-white">Founder</Link></li>
            <li><Link href="/insights" className="hover:text-white">Insights</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </nav>

        {core.length > 0 && (
          <nav aria-label="Footer: services" className="text-[15px]">
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-white">Services</p>
            <ul className="mt-5 space-y-3">
              {core.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-white">{s.title}</Link></li>
              ))}
            </ul>
          </nav>
        )}

        <div className="text-[15px]">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-white">Contact</p>
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
          © {new Date().getFullYear()} {settings.legalLine}
        </Container>
      </div>
    </footer>
  );
}

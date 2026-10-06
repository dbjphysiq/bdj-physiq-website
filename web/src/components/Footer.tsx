import Link from "next/link";
import type { SiteSettings } from "@/lib/content";
import { Container } from "./Container";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-ink text-slate-300">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">BDJ <span className="text-amber">Phys</span>IQ</p>
          <p className="mt-2 text-sm">{settings.tagline}</p>
          <p className="mt-1 text-sm italic text-slate-400">{settings.motto}</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Explore</p>
          <ul className="mt-3 space-y-2">
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/about" className="hover:text-white">About and method</Link></li>
            <li><Link href="/insights" className="hover:text-white">Insights</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Contact</p>
          <ul className="mt-3 space-y-2">
            <li><a href={`mailto:${settings.contactEmail}`} className="hover:text-white">{settings.contactEmail}</a></li>
            {settings.contactPhone && <li><a href={`tel:${settings.contactPhone.replace(/\s/g, "")}`} className="hover:text-white">{settings.contactPhone}</a></li>}
            {settings.location && <li>{settings.location}</li>}
            <li>English and French · within one hour of CET</li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-5 text-xs text-slate-400">
          © {new Date().getFullYear()} {settings.legalLine}
        </Container>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Container } from "./Container";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 text-white backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span aria-hidden className="grid h-8 w-8 place-items-center rounded-lg bg-signal text-sm">IQ</span>
          <span>BDJ <span className="text-amber">Phys</span>IQ</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-sm md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-slate-200 hover:text-white">{n.label}</Link>
          ))}
          <Link href="/contact" className="rounded-lg bg-signal px-4 py-2 font-semibold hover:bg-signal-dark">Book a call</Link>
        </nav>
        {/* Mobile menu without JavaScript */}
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-md border border-white/30 px-3 py-1.5 text-sm">Menu</summary>
          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white p-2 text-ink shadow-lg">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-paper">{n.label}</Link>
            ))}
          </div>
        </details>
      </Container>
    </header>
  );
}

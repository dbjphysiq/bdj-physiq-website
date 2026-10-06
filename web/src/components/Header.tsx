import Image from "next/image";
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
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label="BDJ PhysIQ home" className="flex items-center gap-2.5">
          <Image src="/brand-mark.svg" alt="" width={36} height={36} priority className="h-8 w-8" />
          <span className="font-display text-[17px] font-semibold tracking-tight text-ink">BDJ PhysIQ</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-8 text-[15px] md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-slate hover:text-ink">{n.label}</Link>
          ))}
          <Link href="/contact" className="rounded-full bg-ink px-4 py-2 font-medium text-white hover:bg-ink-2">Book a scoping call</Link>
        </nav>
        {/* Mobile menu without JavaScript */}
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-line px-4 py-1.5 text-sm text-ink">Menu</summary>
          <div className="absolute right-0 mt-2 w-52 rounded-xl border border-line bg-white p-2 shadow-lg">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="block rounded-lg px-3 py-2.5 text-[15px] text-ink hover:bg-paper">{n.label}</Link>
            ))}
          </div>
        </details>
      </Container>
    </header>
  );
}

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
    <header className="on-dark sticky top-0 z-40 border-b border-white/10 bg-night/95 text-white">
      <Container className="flex h-[68px] items-center justify-between">
        <Link href="/" aria-label="DBJ PhysIQ home" className="flex items-center gap-2.5">
          <Image src="/brand-mark-inverse.svg" alt="" width={36} height={36} priority className="h-8 w-8" />
          <span className="font-display text-[17px] font-semibold tracking-tight text-white">DBJ PhysIQ</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-9 text-[15px] md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-mist transition-colors hover:text-white">{n.label}</Link>
          ))}
          <Link href="/contact" className="rounded-full bg-amber px-5 py-2.5 font-medium text-ink transition-colors hover:bg-amber-soft">
            Book a scoping call
          </Link>
        </nav>
        {/* Mobile menu without JavaScript */}
        <details className="group relative md:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-white/20 px-4 py-1.5 text-sm text-white [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Menu</span>
            <span className="hidden group-open:inline">Close</span>
          </summary>
          <div className="absolute right-0 mt-3 w-60 rounded-2xl border border-white/10 bg-night-2 p-2 shadow-2xl shadow-black/50">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="block rounded-xl px-3.5 py-3 text-[15px] text-mist hover:bg-white/5 hover:text-white">{n.label}</Link>
            ))}
            <Link href="/contact" className="mt-1 block rounded-xl bg-amber px-3.5 py-3 text-center text-[15px] font-medium text-ink">
              Book a scoping call
            </Link>
          </div>
        </details>
      </Container>
    </header>
  );
}

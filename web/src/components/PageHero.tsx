import Link from "next/link";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { WaveField } from "./WaveField";

/** Dark page header shared by every inner page. The wave field is a still frame here. */
export function PageHero({
  eyebrow, title, intro, breadcrumb, children,
}: {
  eyebrow?: string; title: string; intro?: string;
  breadcrumb?: React.ReactNode; children?: React.ReactNode;
}) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-night text-mist">
      <div aria-hidden className="bg-hero-glow absolute inset-0 -z-20" />
      <div aria-hidden className="bg-grid-night absolute inset-0 -z-20 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
      <WaveField animated={false} intensity={0.5} spacing={20} className="mask-field-right absolute inset-0 -z-10 h-full w-full" />
      <Container className="pb-16 pt-14 sm:pb-24 sm:pt-20">
        {breadcrumb}
        {eyebrow && <Eyebrow tone="dark" className={breadcrumb ? "mt-10" : ""}>{eyebrow}</Eyebrow>}
        <h1 className="mt-5 max-w-4xl text-[2.5rem] font-semibold leading-[1.06] tracking-tight text-white sm:text-[3.5rem]">
          {title}
        </h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-8 text-mist sm:text-xl sm:leading-9">{intro}</p>}
        {children && <div className="mt-10">{children}</div>}
      </Container>
    </section>
  );
}

/** Breadcrumb styled for the dark page header. */
export function DarkBreadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[12px] uppercase tracking-[0.12em] text-mist/70">
      {items.map((item, i) => (
        <span key={item.label}>
          {i > 0 && <span aria-hidden className="mx-2.5 text-mist/40">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-white">{item.label}</Link>
          ) : (
            <span aria-current="page" className="text-white">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

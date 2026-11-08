import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { getServices } from "@/lib/content";
import { FAMILIES, HOW_WE_WORK, PACKAGED } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services",
  description:
    "Nine services in three families, engineering, data and institutions, plus fixed-scope programmes for the 2026 to 2028 compliance deadlines.",
};

export default async function ServicesPage() {
  const services = await getServices();
  const packaged = services.filter((s) => s.family === "packaged");
  const nav = [...FAMILIES.map((f) => ({ key: f.key, title: f.title })), { key: PACKAGED.key, title: "Compliance programmes" }];

  return (
    <>
      <PageHero
        title="Services"
        intro="Nine services in three families. Every one of them ends the same way: you keep the code, the documentation and the ability to run it without us."
      >
        <Button href="/contact" variant="accent" arrow>Talk to us</Button>
      </PageHero>

      <nav aria-label="Service families" className="sticky top-[69px] z-30 border-b border-line bg-white/95 backdrop-blur">
        <Container className="flex gap-2 overflow-x-auto py-3 text-[15px]">
          {nav.map((n) => (
            <Link key={n.key} href={`#${n.key}`}
              className="shrink-0 rounded-full border border-line px-4 py-1.5 text-slate transition-colors hover:border-ink/30 hover:text-ink">
              {n.title}
            </Link>
          ))}
        </Container>
      </nav>

      {FAMILIES.map((f, i) => {
        const items = services.filter((s) => s.family === f.key);
        if (!items.length) return null;
        return (
          <Section key={f.key} id={f.key} tone={i % 2 ? "paper" : "white"} border={false} title={f.title} intro={f.intro}
            className="scroll-mt-32">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {items.map((s) => <ServiceCard key={s.slug} service={s} bullets="features" />)}
            </div>
          </Section>
        );
      })}

      {packaged.length > 0 && (
        <Section id={PACKAGED.key} tone="paper" border={false} title={PACKAGED.title} intro={PACKAGED.intro} className="scroll-mt-32">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {packaged.map((s) => <ServiceCard key={s.slug} service={s} bullets="none" />)}
          </div>
        </Section>
      )}

      <Section id="how-we-work" border={false} title="How we work" className="scroll-mt-32">
        <ol className="grid max-w-4xl gap-px overflow-hidden rounded-2xl border border-line bg-line">
          {HOW_WE_WORK.map((item, i) => {
            const last = i === HOW_WE_WORK.length - 1;
            return (
              <li key={item}
                className={`grid grid-cols-[40px_1fr] gap-4 p-6 text-lg leading-8 ${last ? "bg-night text-white" : "bg-white"}`}>
                <span className={`font-mono text-[13px] leading-8 ${last ? "text-amber" : "text-signal"}`}>{String(i + 1).padStart(2, "0")}</span>
                <span className={last ? "font-medium" : ""}>{item}</span>
              </li>
            );
          })}
        </ol>
        <div className="mt-12">
          <Button href="/contact" arrow>Book a 30-minute scoping call</Button>
        </div>
      </Section>
    </>
  );
}

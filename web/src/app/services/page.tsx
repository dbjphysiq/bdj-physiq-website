import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { getServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: "Industrial AI, data engineering, analytics, AI solutions, AI governance and training, plus four new services for the 2026 to 2028 deadlines.",
};

export default async function ServicesPage() {
  const services = await getServices();
  const groups = [
    { key: "core", title: "Core services", intro: "Every engagement follows the same four steps: discover, build, test and hand over. Your data stays in your systems, and a named person stays in charge of every model." },
    { key: "accelerator", title: "PhysIQ accelerators", intro: "Reusable kits that shorten every project. They are in development and refined on client work." },
    { key: "innovation", title: "New services", intro: "Open to early partners now. We shape each service with its first clients." },
  ] as const;

  return (
    <>
      <section className="bg-white">
        <Container className="pb-16 pt-16 sm:pt-24">
          <h1 className="max-w-3xl text-[2.6rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl">Services that take AI from pilot to production</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 sm:text-xl sm:leading-9">Choose the service that matches your problem, or start with a fixed-price pilot.</p>
          <div className="mt-10"><Button href="/contact">Book a 30-minute scoping call</Button></div>
        </Container>
      </section>
      {groups.map((g, i) => {
        const items = services.filter((s) => s.category === g.key);
        if (!items.length) return null;
        return (
          <Section key={g.key} tone={i % 2 ? "white" : "paper"} title={g.title} intro={g.intro}>
            <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((s) => <ServiceCard key={s.slug} service={s} />)}
            </div>
          </Section>
        );
      })}
    </>
  );
}

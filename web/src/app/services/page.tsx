import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/Button";
import { getServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: "Industrial AI, data engineering, analytics, AI solutions, AI governance and training — plus four new services for the 2026–2028 deadlines.",
};

export default async function ServicesPage() {
  const services = await getServices();
  const groups = [
    { key: "core", title: "Core services", intro: "Every engagement follows the same four steps: Discover → Build → Test → Hand over. Your data stays in your systems, and a person stays in charge of every model." },
    { key: "accelerator", title: "PhysIQ accelerators", intro: "Reusable kits that shorten every project. In development." },
    { key: "innovation", title: "NEW — Innovation track", intro: "Open to early partners now. We shape each service with its first clients." },
  ] as const;

  return (
    <>
      <section className="bg-ink py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Services that move AI from pilot to production</h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">Choose the service that matches your problem, or start with a fixed-price pilot.</p>
          <div className="mt-8"><Button href="/contact">Book a 30-minute scoping call</Button></div>
        </div>
      </section>
      {groups.map((g, i) => {
        const items = services.filter((s) => s.category === g.key);
        if (!items.length) return null;
        return (
          <Section key={g.key} tone={i % 2 ? "paper" : "white"} title={g.title} intro={g.intro}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((s) => <ServiceCard key={s.slug} service={s} />)}
            </div>
          </Section>
        );
      })}
    </>
  );
}

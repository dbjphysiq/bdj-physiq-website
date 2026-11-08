import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { getServices } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
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
      <PageHero title="Services that take AI from pilot to production"
        intro="Choose the service that matches your problem, or start with a fixed-price pilot.">
        <Button href="/contact" variant="accent" arrow>Book a 30-minute scoping call</Button>
      </PageHero>
      {groups.map((g, i) => {
        const items = services.filter((s) => s.category === g.key);
        if (!items.length) return null;
        return (
          <Section key={g.key} tone={i % 2 ? "paper" : "white"} border={false} title={g.title} intro={g.intro}>
            <div className={`grid gap-5 sm:grid-cols-2 ${g.key === "innovation" ? "" : "lg:grid-cols-3"}`}>
              {items.map((s, j) => <ServiceCard key={s.slug} service={s} index={g.key === "core" ? j : undefined} />)}
            </div>
          </Section>
        );
      })}
    </>
  );
}

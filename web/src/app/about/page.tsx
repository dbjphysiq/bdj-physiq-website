import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { getAbout } from "@/lib/content";
import { urlFor } from "@/sanity/image";

export const metadata: Metadata = { title: "About and method", description: "Mission, method and founder of BDJ PhysIQ Technologies." };

function Columns({ items }: { items?: { title: string; text: string }[] }) {
  return (
    <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {items?.map((i) => (
        <div key={i.title} className="border-t border-ink/15 pt-5">
          <h3 className="text-xl font-semibold">{i.title}</h3>
          <p className="mt-3 leading-7">{i.text}</p>
        </div>
      ))}
    </div>
  );
}

export default async function AboutPage() {
  const a = await getAbout();
  return (
    <>
      <section className="bg-white">
        <Container className="pb-20 pt-16 sm:pt-24">
          <h1 className="max-w-4xl text-[2.6rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl">{a.heading}</h1>
          <div className="mt-12 grid max-w-5xl gap-10 border-t border-line pt-10 md:grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold">Mission</h2>
              <p className="mt-3 text-lg leading-8">{a.mission}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Vision</h2>
              <p className="mt-3 text-lg leading-8">{a.vision}</p>
            </div>
          </div>
        </Container>
      </section>
      <Section tone="paper" title="How we earn trust"><Columns items={a.approach} /></Section>
      <Section id="method" title="Our method, on every project" intro="Four steps, in this order, whatever the size of the engagement.">
        <ol className="grid gap-x-10 gap-y-12 md:grid-cols-4">
          {a.method?.map((m, i) => (
            <li key={m.title} className="border-t-2 border-ink pt-5">
              <p className="font-display text-sm font-semibold text-signal">Step {i + 1}</p>
              <h3 className="mt-1 text-xl font-semibold">{m.title}</h3>
              <p className="mt-3 leading-7">{m.text}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section tone="paper" title="What we stand for"><Columns items={a.values} /></Section>
      <Section id="founder" title={a.founderName}>
        <div className="grid gap-12 md:grid-cols-[280px_1fr]">
          {a.founderPhoto?.asset && (
            <Image src={urlFor(a.founderPhoto).width(600).height(600).url()} alt={a.founderPhoto.alt ?? a.founderName}
              width={600} height={600} className="rounded-2xl object-cover" />
          )}
          <div className={a.founderPhoto?.asset ? "" : "md:col-span-2"}>
            <p className="font-medium text-ink">{a.founderRole}</p>
            <p className="mt-3 max-w-[68ch] text-lg leading-8">{a.founderBio}</p>
            <ul className="mt-8 max-w-[72ch] divide-y divide-line border-y border-line">
              {a.founderCredentials?.map((c) => <li key={c} className="py-3 leading-7">{c}</li>)}
            </ul>
            {a.publicationUrl && <div className="mt-8"><Button href={a.publicationUrl} variant="secondary">Read the JASA paper</Button></div>}
          </div>
        </div>
      </Section>
      <Section tone="paper" title="Where we are going">
        <Columns items={a.outlook} />
        <div className="mt-14 flex flex-wrap gap-3"><Button href="/contact">Work with us</Button><Button href="/services/physiq-academy" variant="secondary">Join the Academy</Button></div>
      </Section>
    </>
  );
}

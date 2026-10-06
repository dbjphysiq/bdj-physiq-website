import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { getAbout } from "@/lib/content";
import { urlFor } from "@/sanity/image";

export const metadata: Metadata = { title: "About and method", description: "Mission, method and founder of BDJ PhysIQ Technologies." };

function Grid({ items }: { items?: { title: string; text: string }[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items?.map((i) => (
        <div key={i.title} className="rounded-2xl border border-line bg-white p-6">
          <h3 className="font-semibold text-ink">{i.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{i.text}</p>
        </div>
      ))}
    </div>
  );
}

export default async function AboutPage() {
  const a = await getAbout();
  return (
    <>
      <section className="bg-ink py-16 text-white sm:py-20">
        <Container>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{a.heading}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-200"><span className="font-semibold text-amber">Mission. </span>{a.mission}</p>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300"><span className="font-semibold text-white">Vision. </span>{a.vision}</p>
        </Container>
      </section>
      <Section eyebrow="Technical rigour" title="How we earn trust"><Grid items={a.approach} /></Section>
      <Section id="method" tone="paper" eyebrow="Measure. Model. Deliver." title="Our method, on every project">
        <ol className="grid gap-6 md:grid-cols-4">
          {a.method?.map((m, i) => (
            <li key={m.title} className="rounded-2xl bg-white p-6">
              <p className="text-3xl font-bold text-signal">{i + 1}</p>
              <h3 className="mt-2 font-semibold text-ink">{m.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{m.text}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section eyebrow="Values" title="What we stand for"><Grid items={a.values} /></Section>
      <Section id="founder" tone="paper" eyebrow="Founder" title={a.founderName}>
        <div className="grid gap-10 md:grid-cols-3">
          {a.founderPhoto?.asset && (
            <Image src={urlFor(a.founderPhoto).width(600).height(600).url()} alt={a.founderPhoto.alt ?? a.founderName}
              width={600} height={600} className="rounded-2xl object-cover" />
          )}
          <div className={a.founderPhoto ? "md:col-span-2" : "md:col-span-3"}>
            <p className="font-semibold text-ink">{a.founderRole}</p>
            <p className="mt-2 text-lg leading-8 text-slate-700">{a.founderBio}</p>
            <ul className="mt-6 space-y-2 text-slate-700">{a.founderCredentials?.map((c) => <li key={c}>• {c}</li>)}</ul>
            {a.publicationUrl && <div className="mt-6"><Button href={a.publicationUrl} variant="light">Read the JASA paper</Button></div>}
          </div>
        </div>
      </Section>
      <Section eyebrow="Future outlook" title="Where we are going">
        <Grid items={a.outlook} />
        <div className="mt-10 flex flex-wrap gap-3"><Button href="/contact">Work with us</Button><Button href="/services/physiq-academy" variant="light">Join the Academy</Button></div>
      </Section>
    </>
  );
}

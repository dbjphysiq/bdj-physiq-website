import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { FounderPortrait } from "@/components/FounderPortrait";
import { PageHero } from "@/components/PageHero";
import { getAbout } from "@/lib/content";
import { PAPER } from "@/lib/site";

export const metadata: Metadata = { title: "About and method", description: "Mission, method and founder of DBJ PhysIQ Technologies." };

function Columns({ items }: { items?: { title: string; text: string }[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items?.map((i) => (
        <div key={i.title} className="rounded-2xl border border-line bg-white p-7">
          <h3 className="text-xl font-semibold tracking-tight">{i.title}</h3>
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
      <PageHero eyebrow="About and method" title={a.heading} />

      <Section border={false}>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="border-t-2 border-ink pt-6">
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-signal">Mission</p>
            <p className="mt-4 text-xl leading-9 text-ink">{a.mission}</p>
          </div>
          <div className="border-t-2 border-amber pt-6">
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#7a5300]">Vision</p>
            <p className="mt-4 text-xl leading-9 text-ink">{a.vision}</p>
          </div>
        </div>
      </Section>

      <Section tone="paper" eyebrow="Trust" title="How we earn trust"><Columns items={a.approach} /></Section>

      <Section id="method" eyebrow="Method" title="Our method, on every project" intro="Four steps, in this order, whatever the size of the engagement." grid>
        <ol className="relative grid gap-10 md:grid-cols-4 md:gap-8">
          <span aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-px bg-gradient-to-r from-signal/60 via-signal/30 to-amber/60 md:block" />
          {a.method?.map((m, i, all) => (
            <li key={m.title} className="relative">
              <span aria-hidden className={`relative z-10 block h-[15px] w-[15px] rounded-full border-[3px] border-white ${i === all.length - 1 ? "bg-amber" : "bg-signal"} shadow-[0_0_0_1px_rgb(11_37_69/0.15)]`} />
              <p className="mt-6 font-mono text-[12px] font-medium tracking-[0.14em] text-muted">STEP {String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{m.title}</h3>
              <p className="mt-3 leading-7">{m.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper" eyebrow="Values" title="What we stand for"><Columns items={a.values} /></Section>

      <Section id="founder" border={false}>
        <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-16">
          <FounderPortrait photo={a.founderPhoto} name={a.founderName} className="max-w-sm lg:max-w-none" />
          <div className="lg:pt-2">
            <Eyebrow>Founder</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-[2.4rem] sm:leading-[1.12]">{a.founderName}</h2>
            {a.founderRole && <p className="mt-2 text-lg text-muted">{a.founderRole}</p>}
            {a.founderBio && <p className="mt-6 max-w-[64ch] text-lg leading-8">{a.founderBio}</p>}
            <ul className="mt-8 max-w-[72ch] divide-y divide-line border-y border-line">
              {a.founderCredentials?.map((c) => (
                <li key={c} className="grid grid-cols-[14px_1fr] gap-3 py-3.5 leading-7">
                  <span aria-hidden className="mt-[0.8rem] h-[2px] w-3 rounded-full bg-signal" />{c}
                </li>
              ))}
            </ul>
            {a.publicationUrl && (
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href={a.publicationUrl} variant="secondary">Read the JASA paper</Button>
                <span className="font-mono text-[12px] text-muted">DOI {PAPER.doi}</span>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section tone="paper" eyebrow="Outlook" title="Where we are going">
        <Columns items={a.outlook} />
        <div className="mt-14 flex flex-wrap gap-3">
          <Button href="/contact" arrow>Work with us</Button>
          <Button href="/services/physiq-academy" variant="secondary">Join the Academy</Button>
        </div>
      </Section>
    </>
  );
}

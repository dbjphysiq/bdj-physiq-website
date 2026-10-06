import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { UncertaintyChart } from "@/components/UncertaintyChart";
import { getAbout, getServices, getSiteSettings } from "@/lib/content";

export default async function HomePage() {
  const [s, services, about] = await Promise.all([getSiteSettings(), getServices(), getAbout()]);
  const core = services.filter((x) => x.category === "core");
  const accelerator = services.find((x) => x.category === "accelerator");
  const innovation = services.filter((x) => x.category === "innovation");

  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <Container className="grid items-center gap-14 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h1 className="text-[2.6rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl">{s.heroHeadline}</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 sm:text-xl sm:leading-9">{s.heroSubheadline}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={s.primaryCta.href}>{s.primaryCta.label}</Button>
              {s.secondaryCta && <Button href={s.secondaryCta.href} variant="secondary">{s.secondaryCta.label}</Button>}
            </div>
            {s.trustLine && (
              <ul className="mt-12 grid max-w-xl grid-cols-2 gap-x-8 gap-y-3 border-t border-line pt-6 text-[15px] text-muted">
                {s.trustLine.map((t) => <li key={t}>{t}</li>)}
              </ul>
            )}
          </div>
          <figure className="m-0">
            <UncertaintyChart />
            <figcaption className="mt-4 text-[15px] leading-6 text-muted">
              Every forecast we deliver carries its uncertainty range. It narrows as measured data arrives.
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* Audience paths */}
      <div className="border-t border-line bg-paper">
        <Container className="flex flex-wrap items-baseline gap-x-8 gap-y-3 py-6 text-[15px]">
          <span className="text-muted">Start with</span>
          {[
            ["Your plant or factory", "/services/industrial-ai-process-modelling"],
            ["Your data migration", "/services/data-engineering-migration"],
            ["Your ministry, programme or fund", "/services/ai-governance-advisory"],
            ["Training for your team", "/services/physiq-academy"],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="font-medium text-ink underline decoration-line decoration-2 underline-offset-[6px] hover:decoration-signal">
              {label}
            </Link>
          ))}
        </Container>
      </div>

      {/* Value proposition */}
      <Section title={s.valueHeading} intro={s.valueBody} border={false}>
        <div className="grid gap-10 md:grid-cols-3">
          {s.valuePillars?.map((p) => (
            <div key={p.title} className="border-t-2 border-ink pt-5">
              <h3 className="text-2xl font-semibold">{p.title}</h3>
              <p className="mt-3 leading-7">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Core services */}
      <Section tone="paper" title="What we do" intro="Six services, one standard: every result is tested, documented and handed over to your team.">
        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {core.map((svc) => <ServiceCard key={svc.slug} service={svc} />)}
        </div>
        {accelerator && (
          <p className="mt-16 max-w-3xl border-t border-line pt-6 leading-7">
            <Link href={`/services/${accelerator.slug}`} className="font-medium text-ink underline decoration-line decoration-2 underline-offset-[6px] hover:decoration-signal">{accelerator.title}</Link>
            <span>. {accelerator.tagline} {accelerator.cardBullets?.[0]} are in development.</span>
          </p>
        )}
      </Section>

      {/* Innovation track */}
      {innovation.length > 0 && (
        <Section title="New services for the 2026 to 2028 deadlines"
          intro="New rules and new technology are changing what industry and institutions must prove. These services are open to early partners, and we shape each one with the first organisations that join.">
          <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2">
            {innovation.map((svc) => <ServiceCard key={svc.slug} service={svc} />)}
          </div>
        </Section>
      )}

      {/* Why now */}
      {s.stats && s.stats.length > 0 && (
        <Section tone="paper" title="Why this matters now">
          <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {s.stats.map((st) => (
              <div key={st.value} className="border-t border-ink/15 pt-5">
                <dt className="font-display text-4xl font-semibold tracking-tight text-ink">{st.value}</dt>
                <dd className="mt-3 leading-7">{st.caption}</dd>
                {st.sourceLabel && (
                  <dd className="mt-3 text-sm text-muted">
                    Source: {st.sourceUrl ? <a href={st.sourceUrl} className="underline underline-offset-2 hover:text-ink" rel="noopener" target="_blank">{st.sourceLabel}</a> : st.sourceLabel}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </Section>
      )}

      {/* Credibility */}
      <Section title="What you can check today"
        intro="We are a new company, so we show no client logos we have not earned. These are the facts behind our work, and each one can be verified.">
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
          <div className="border-t border-ink/15 pt-6">
            <h3 className="text-xl font-semibold">{about.founderName}</h3>
            <p className="mt-1 text-muted">{about.founderRole}</p>
            <ul className="mt-4 space-y-2 leading-7">
              {about.founderCredentials?.slice(0, 4).map((c) => <li key={c}>{c}</li>)}
            </ul>
            <Link href="/about#founder" className="mt-5 inline-block font-medium text-signal hover:text-signal-dark">Full profile</Link>
          </div>
          <div className="grid gap-12">
            <div className="border-t border-ink/15 pt-6">
              <h3 className="text-xl font-semibold">Peer-reviewed research</h3>
              <p className="mt-3 leading-7">Physics-informed models, calibrated uncertainty and design optimisation, published in the Journal of the Acoustical Society of America (2026). We bring the same toolkit to your process.</p>
              {about.publicationUrl && <a href={about.publicationUrl} target="_blank" rel="noopener" className="mt-4 inline-block font-medium text-signal hover:text-signal-dark">Read the paper</a>}
            </div>
            <div className="border-t border-ink/15 pt-6">
              <h3 className="text-xl font-semibold">Fixed-price pilots</h3>
              <p className="mt-3 leading-7">4 to 8 weeks, from €15,000 to €40,000, with a written scope, agreed success measures and a go or no-go decision at the end.</p>
            </div>
            <div className="border-t border-ink/15 pt-6">
              <h3 className="text-xl font-semibold">Your data stays in your systems</h3>
              <p className="mt-3 leading-7">We work inside your environment under your access controls. Every model has a named owner and full documentation. Our security controls follow ISO/IEC 27001, with certification planned for FY2029.</p>
            </div>
          </div>
        </div>
        <p className="mt-14 max-w-2xl text-muted">Results from our first pilots will appear here, with client permission and the method used to measure them.</p>
      </Section>

      {/* Final call to action */}
      <section className="bg-ink text-white">
        <Container className="grid items-end gap-10 py-20 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-[2.5rem] sm:leading-[1.15]">{s.ctaHeading}</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#c9d4e3]">{s.ctaBody}</p>
          </div>
          <div className="lg:justify-self-end"><Button href="/contact" variant="inverse">{s.primaryCta.label}</Button></div>
        </Container>
      </section>
    </>
  );
}

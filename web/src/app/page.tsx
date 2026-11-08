import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { FounderPortrait } from "@/components/FounderPortrait";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { UncertaintyChart } from "@/components/UncertaintyChart";
import { WaveField } from "@/components/WaveField";
import { getAbout, getServices, getSiteSettings } from "@/lib/content";
import { AFFILIATIONS, PAPER, PILOT } from "@/lib/site";

const START_WITH = [
  ["Your plant or factory", "/services/industrial-ai-process-modelling"],
  ["Your data migration", "/services/data-engineering-migration"],
  ["Your agency, programme or fund", "/services/ai-governance-advisory"],
  ["Training for your team", "/services/physiq-academy"],
] as const;

export default async function HomePage() {
  const [s, services, about] = await Promise.all([getSiteSettings(), getServices(), getAbout()]);
  const core = services.filter((x) => x.category === "core");
  const accelerator = services.find((x) => x.category === "accelerator");
  const innovation = services.filter((x) => x.category === "innovation");

  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="on-dark relative isolate overflow-hidden bg-night text-mist">
        <div aria-hidden className="bg-hero-glow absolute inset-0 -z-20" />
        <div aria-hidden className="bg-grid-night absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_75%)]" />
        <WaveField spacing={15} intensity={0.9} className="mask-field-hero absolute inset-0 -z-10 h-full w-full" />

        <Container className="grid items-center gap-14 pb-16 pt-16 sm:pt-24 lg:grid-cols-[1.12fr_1fr] lg:gap-16 lg:pb-24 lg:pt-28">
          {/* No entrance animation here: this block holds the LCP element (the headline). */}
          <div>
            <h1 className="text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[4rem]">
              {s.heroHeadline}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-mist sm:text-xl sm:leading-9">{s.heroSubheadline}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={s.primaryCta.href} variant="accent" arrow>{s.primaryCta.label}</Button>
              {s.secondaryCta && <Button href={s.secondaryCta.href} variant="ghost">{s.secondaryCta.label}</Button>}
            </div>
            {s.trustLine && (
              <ul className="mt-12 grid max-w-xl grid-cols-1 gap-x-10 gap-y-3 border-t border-white/10 pt-6 text-[15px] text-mist/90 sm:grid-cols-[max-content_max-content]">
                {s.trustLine.map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />{t}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <figure className="relative m-0 animate-fade [animation-delay:250ms]">
            {/* Blur filters are costly to paint on phones, where this card sits below the fold. */}
            <div aria-hidden className="absolute -inset-6 -z-10 hidden rounded-[2rem] bg-signal/10 blur-3xl lg:block" />
            {/* Mostly opaque so the wave field never shows through the chart, even where backdrop blur is unsupported. */}
            <div className="rounded-2xl border border-white/10 bg-night-2/90 p-5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] sm:p-7 lg:backdrop-blur-md">
              <div className="mb-5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-mist/70">
                <span className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber" />
                  Process forecast
                </span>
                <span>Illustration</span>
              </div>
              <UncertaintyChart />
            </div>
            <figcaption className="mt-5 max-w-md text-[15px] leading-6 text-mist/80">
              Every forecast we deliver carries its uncertainty range. It narrows as measured data arrives.
            </figcaption>
          </figure>
        </Container>

        {/* Audience paths */}
        <div className="border-t border-white/10 bg-night/40">
          <Container className="flex flex-wrap items-center gap-x-3 gap-y-3 py-5 text-[15px]">
            <span className="mr-2 text-base font-semibold text-white">Start with</span>
            {START_WITH.map(([label, href]) => (
              <Link key={href} href={href}
                className="rounded-full border border-white/15 px-4 py-1.5 text-mist transition-colors hover:border-amber/60 hover:text-white">
                {label}
              </Link>
            ))}
          </Container>
        </div>
      </section>

      {/* ───────────── Founder's affiliations (not clients) ───────────── */}
      <section aria-labelledby="affiliations-label" className="border-b border-line bg-white">
        <Container className="grid gap-8 py-10 lg:grid-cols-[240px_1fr] lg:items-center">
          <h2 id="affiliations-label" className="font-display text-xl font-semibold leading-7 tracking-tight text-ink">
            The founder&apos;s training and research
          </h2>
          <ul className="grid grid-cols-2 gap-y-6 md:grid-cols-4">
            {AFFILIATIONS.map((a) => (
              <li key={a.name} className="border-l border-line pl-5">
                <p className="font-display text-lg font-semibold tracking-tight text-ink">{a.name}</p>
                <p className="mt-1 text-[13.5px] leading-5 text-muted">{a.detail}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───────────── Value and method ───────────── */}
      <Section eyebrow="Our method" title={s.valueHeading} intro={s.valueBody} border={false} grid>
        <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          <span aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-px bg-gradient-to-r from-signal/60 via-signal/30 to-amber/60 md:block" />
          {s.valuePillars?.map((p, i) => (
            <li key={p.title} className="relative">
              <span aria-hidden className={`relative z-10 block h-[15px] w-[15px] rounded-full border-[3px] border-white ${i === 2 ? "bg-amber" : "bg-signal"} shadow-[0_0_0_1px_rgb(11_37_69/0.15)]`} />
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-3 max-w-sm leading-7">{p.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ───────────── Core services ───────────── */}
      <Section tone="paper" eyebrow="Services" title="What we do"
        intro="Six services, one standard: every result is tested, documented and handed over to your team.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {core.map((svc, i) => <ServiceCard key={svc.slug} service={svc} index={i} />)}
        </div>
        {accelerator && (
          <p className="mt-12 max-w-3xl leading-7">
            <Link href={`/services/${accelerator.slug}`} className="font-medium text-ink underline decoration-line decoration-2 underline-offset-[6px] hover:decoration-signal">{accelerator.title}</Link>
            <span>. {accelerator.tagline} {accelerator.cardBullets?.[0]} are in development.</span>
          </p>
        )}
      </Section>

      {/* ───────────── Research ───────────── */}
      <section className="on-dark relative isolate overflow-hidden bg-night py-20 text-mist sm:py-28">
        <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_60%_70%_at_85%_50%,rgb(42_120_214/0.2),transparent_70%)]" />
        <WaveField intensity={0.7} spacing={20}
          sources={[{ x: 0.86, y: 0.5, k: 0.05, w: 1.3, p: 0 }, { x: 0.7, y: 0.15, k: 0.057, w: 1.6, p: 2.2 }]}
          className="mask-field-soft absolute inset-0 -z-10 h-full w-full" />
        <Container className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <h2 className="max-w-xl text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Peer-reviewed research
            </h2>
            <p className="mt-4 max-w-xl font-display text-xl font-medium leading-snug tracking-tight text-white/85 sm:text-[1.6rem]">
              The physics we publish, applied to your process.
            </p>
            <p className="mt-6 max-w-xl text-lg leading-8">
              Physics-informed models, calibrated uncertainty and design optimisation, peer-reviewed in the {PAPER.venue}.
              We bring the same toolkit, and the same standard of evidence, to industrial forecasting.
            </p>
          </div>
          <figure className="m-0 rounded-2xl border border-white/10 bg-night-2/90 p-7 backdrop-blur-md sm:p-8">
            <blockquote className="font-display text-xl font-medium leading-snug text-white sm:text-2xl">
              {PAPER.title}
            </blockquote>
            <figcaption className="mt-5 border-t border-white/10 pt-5 text-[15px] leading-6">
              <p>{PAPER.citation}</p>
              <a href={`https://doi.org/${PAPER.doi}`} target="_blank" rel="noopener"
                className="mt-3 inline-flex items-center gap-2 font-medium text-sky hover:text-white">
                Read the paper <span aria-hidden>↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <span className="ml-3 font-mono text-[12px] text-mist/60">DOI {PAPER.doi}</span>
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* ───────────── Fixed-price pilot ───────────── */}
      <Section eyebrow="Fixed-price pilot" title="Start with one pilot, priced before it begins."
        intro="A pilot answers one question about your process, on your own data, before you commit to anything larger." border={false}>
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Duration", PILOT.weeks, null],
            ["Fixed price", PILOT.eur, PILOT.usd],
            ["Scope", "Written scope and success measures, agreed at the start", null],
            ["Decision", "A clear go or no-go decision at the end", null],
          ].map(([label, value, note]) => (
            <div key={label} className="bg-white p-7">
              <dt className="font-display text-xl font-semibold tracking-tight text-ink">{label}</dt>
              <dd className="mt-2.5 text-[17px] leading-7">{value}</dd>
              {note && <dd className="mt-1.5 text-[15px] text-muted">{note}</dd>}
            </div>
          ))}
        </dl>
        <div className="mt-14 grid gap-10 lg:grid-cols-[280px_1fr]">
          <h3 className="text-xl font-semibold tracking-tight">What you receive</h3>
          <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {[
              "A data audit: the gaps that matter, and how to close them",
              "A model that respects the physics of your process and states how certain each forecast is",
              "Integration into your systems, and training for the people who will use it",
              "Full documentation, readable by your engineers and your auditors",
            ].map((item) => (
              <li key={item} className="grid grid-cols-[20px_1fr] gap-3 leading-7">
                <svg aria-hidden viewBox="0 0 20 20" className="mt-1 h-5 w-5 text-signal"><path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ───────────── Innovation track ───────────── */}
      {innovation.length > 0 && (
        <Section tone="paper" eyebrow="Open to early partners" title="New services for the 2026 to 2028 deadlines"
          intro="New rules and new technology are changing what industry and institutions must prove. We shape each of these services with the first organisations that join.">
          <div className="grid gap-5 sm:grid-cols-2">
            {innovation.map((svc) => <ServiceCard key={svc.slug} service={svc} />)}
          </div>
        </Section>
      )}

      {/* ───────────── Why now ───────────── */}
      {s.stats && s.stats.length > 0 && (
        <Section eyebrow="Why this matters now" title="The cost of getting it wrong is rising." border={false}>
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {s.stats.map((st) => (
              <div key={st.value} className="flex flex-col bg-white p-7">
                <dt className="font-display text-[2.6rem] font-semibold leading-none tracking-tight text-ink">{st.value}</dt>
                <dd className="mt-4 leading-7">{st.caption}</dd>
                {st.sourceLabel && (
                  <dd className="mt-auto pt-5 text-[13.5px] text-muted">
                    Source:{" "}
                    {st.sourceUrl
                      ? <a href={st.sourceUrl} className="underline underline-offset-2 hover:text-ink" rel="noopener" target="_blank">{st.sourceLabel}</a>
                      : st.sourceLabel}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </Section>
      )}

      {/* ───────────── Working with international clients ───────────── */}
      <Section tone="paper" eyebrow="Working with international clients" title="Built for clients in the US and Europe."
        intro="We work remotely and inside your systems, with the structure your procurement team expects.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Overlapping hours", "We work on West Africa Time (UTC+1). Our afternoons overlap US Eastern mornings, and we share the European working day. English and French."],
            ["A registered company", "Contracts and invoices come from DBJ PhysIQ Technologies SARL, a company registered under OHADA business law."],
            ["Your data stays with you", "We work in your environment, under your access controls. Our security controls follow ISO/IEC 27001, with certification planned for FY2029."],
            ["Documented hand-over", "Every model has a named owner and full documentation, so your own team can run it after we hand it over."],
          ].map(([title, text], i) => (
            <div key={title} className="rounded-2xl border border-line bg-white p-7">
              <p className="font-mono text-[12px] tracking-[0.14em] text-signal">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 text-[15.5px] leading-7">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ───────────── Founder ───────────── */}
      <Section border={false}>
        <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-16">
          <FounderPortrait photo={about.founderPhoto} name={about.founderName} className="max-w-sm lg:max-w-none" />
          <div className="lg:pt-2">
            <h2 className="text-[2.25rem] font-semibold leading-[1.1] tracking-tight sm:text-5xl">{about.founderName}</h2>
            {about.founderRole && <p className="mt-4 font-display text-xl font-medium tracking-tight text-ink/80 sm:text-[1.6rem]">{about.founderRole}</p>}
            {about.founderBio && <p className="mt-6 max-w-[62ch] text-lg leading-8">{about.founderBio}</p>}
            <ul className="mt-8 max-w-[68ch] divide-y divide-line border-y border-line">
              {about.founderCredentials?.slice(0, 5).map((c) => (
                <li key={c} className="grid grid-cols-[14px_1fr] gap-3 py-3.5 leading-7">
                  <span aria-hidden className="mt-[0.8rem] h-[2px] w-3 rounded-full bg-signal" />{c}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-[62ch] rounded-xl border-l-2 border-amber bg-paper px-5 py-4 leading-7 text-ink">
              We are a new company, so we show no client logos we have not earned. Every credential on this page can be checked.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/about#founder" variant="secondary" arrow>Full profile</Button>
              {about.publicationUrl && <Button href={about.publicationUrl} variant="secondary">Read the JASA paper</Button>}
            </div>
          </div>
        </div>
      </Section>

      {/* ───────────── Closing call to action ───────────── */}
      <section className="on-dark relative isolate overflow-hidden bg-night text-mist">
        <div aria-hidden className="bg-hero-glow absolute inset-0 -z-20" />
        <WaveField intensity={0.55} spacing={22} animated={false}
          sources={[{ x: 0.9, y: 0.5, k: 0.05, w: 1.4, p: 0.6 }, { x: 0.15, y: 1.1, k: 0.045, w: 1.2, p: 2 }]}
          className="mask-field-soft absolute inset-0 -z-10 h-full w-full" />
        <Container className="grid items-end gap-10 py-20 sm:py-28 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">{s.ctaHeading}</h2>
            <p className="mt-6 max-w-xl text-lg leading-8">{s.ctaBody}</p>
          </div>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <Button href="/contact" variant="accent" arrow>{s.primaryCta.label}</Button>
            <a href={`mailto:${s.contactEmail}`} className="text-[15px] text-mist/80 underline-offset-4 hover:text-white hover:underline">
              or email {s.contactEmail}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}

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
      {/* ---------- Hero ---------- */}
      <section className="bg-ink text-white">
        <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber">{s.motto}</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{s.heroHeadline}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">{s.heroSubheadline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={s.primaryCta.href}>{s.primaryCta.label}</Button>
              {s.secondaryCta && <Button href={s.secondaryCta.href} variant="secondary">{s.secondaryCta.label}</Button>}
            </div>
            {s.trustLine && (
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">
                {s.trustLine.map((t) => (
                  <li key={t} className="flex items-center gap-2"><span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber" />{t}</li>
                ))}
              </ul>
            )}
          </div>
          <UncertaintyChart />
        </Container>
      </section>

      {/* ---------- Audience router ---------- */}
      <div className="border-b border-line bg-paper">
        <Container className="flex flex-wrap items-center gap-3 py-5 text-sm">
          <span className="font-semibold text-ink">I&apos;m here for…</span>
          {[
            ["Our plant or factory", "/services/industrial-ai-process-modelling"],
            ["Our data migration", "/services/data-engineering-migration"],
            ["Our ministry, programme or fund", "/services/ai-governance-advisory"],
            ["Training for my team", "/services/physiq-academy"],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="rounded-full border border-ink/15 bg-white px-4 py-1.5 text-ink hover:border-signal hover:text-signal">
              {label}
            </Link>
          ))}
        </Container>
      </div>

      {/* ---------- Value proposition ---------- */}
      <Section eyebrow="Why projects stall" title={s.valueHeading} intro={s.valueBody}>
        <div className="grid gap-6 md:grid-cols-3">
          {s.valuePillars?.map((p, i) => (
            <div key={p.title} className="rounded-2xl border border-line p-6">
              <p className="text-sm font-semibold text-signal">0{i + 1}</p>
              <h3 className="mt-2 text-xl font-semibold text-ink">{p.title}.</h3>
              <p className="mt-2 leading-7 text-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- Core services ---------- */}
      <Section tone="paper" eyebrow="What we do" title="Six ways we help, one standard of proof">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {core.map((svc) => <ServiceCard key={svc.slug} service={svc} />)}
        </div>
        {accelerator && (
          <Link href={`/services/${accelerator.slug}`} className="mt-6 flex flex-col justify-between gap-2 rounded-2xl bg-ink-2 p-6 text-white sm:flex-row sm:items-center">
            <span><span className="font-semibold">{accelerator.title}</span> <span className="text-slate-300">— {accelerator.tagline} {accelerator.cardBullets?.[0]}</span></span>
            <span className="text-sm font-semibold text-amber">See the accelerators →</span>
          </Link>
        )}
      </Section>

      {/* ---------- Innovation track ---------- */}
      {innovation.length > 0 && (
        <Section eyebrow="NEW — Innovation track" title="Four services built for the 2026–2028 deadlines"
          intro="New rules and new technology are changing what industry and institutions must prove. These services are open to early partners now; we shape them with the first organisations that join.">
          <div className="grid gap-6 sm:grid-cols-2">
            {innovation.map((svc) => <ServiceCard key={svc.slug} service={svc} />)}
          </div>
        </Section>
      )}

      {/* ---------- Why now: metric strip ---------- */}
      {s.stats && s.stats.length > 0 && (
        <Section tone="ink" eyebrow="Why now" title="The numbers behind the problem">
          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {s.stats.map((st) => (
              <div key={st.value} className="border-l-2 border-amber pl-4">
                <dt className="text-3xl font-bold text-white">{st.value}</dt>
                <dd className="mt-2 text-sm leading-6 text-slate-300">{st.caption}</dd>
                {st.sourceLabel && (
                  <dd className="mt-2 text-xs text-slate-400">
                    Source: {st.sourceUrl ? <a href={st.sourceUrl} className="underline hover:text-white" rel="noopener" target="_blank">{st.sourceLabel}</a> : st.sourceLabel}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </Section>
      )}

      {/* ---------- Proof you can check ---------- */}
      <Section eyebrow="Credibility" title="Proof you can check"
        intro="We are a new company. We will not show logos we have not earned. Here is what you can verify today.">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-line p-6 lg:row-span-2">
            <p className="text-sm font-semibold text-signal">Founder</p>
            <h3 className="mt-1 text-xl font-semibold text-ink">{about.founderName}</h3>
            <p className="text-sm text-muted">{about.founderRole}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {about.founderCredentials?.slice(0, 5).map((c) => <li key={c}>• {c}</li>)}
            </ul>
            <Link href="/about#founder" className="mt-4 inline-block text-sm font-semibold text-signal hover:underline">Read the full profile →</Link>
          </div>
          <div className="rounded-2xl border border-line p-6">
            <p className="text-sm font-semibold text-signal">Published science</p>
            <h3 className="mt-1 font-semibold text-ink">Peer-reviewed · JASA 2026</h3>
            <p className="mt-2 text-sm leading-6 text-muted">Physics-informed models, calibrated uncertainty and design optimisation — the toolkit we bring to your process.</p>
            {about.publicationUrl && <a href={about.publicationUrl} target="_blank" rel="noopener" className="mt-3 inline-block text-sm font-semibold text-signal hover:underline">Read the paper →</a>}
          </div>
          <div className="rounded-2xl border border-line p-6">
            <p className="text-sm font-semibold text-signal">Transparent terms</p>
            <h3 className="mt-1 font-semibold text-ink">4–8 weeks · fixed price · €15k–40k</h3>
            <p className="mt-2 text-sm leading-6 text-muted">Pilots have a written scope, agreed success measures and a go/no-go decision at the end.</p>
          </div>
          <div className="rounded-2xl border border-line p-6 lg:col-span-2">
            <p className="text-sm font-semibold text-signal">Your data stays yours</p>
            <h3 className="mt-1 font-semibold text-ink">Client data stays in your systems</h3>
            <p className="mt-2 text-sm leading-6 text-muted">We work inside your environment under your access controls. Every model has a named human owner and is documented by default. Security controls aligned with ISO/IEC 27001, with certification targeted for FY2029.</p>
          </div>
        </div>
        <p className="mt-8 rounded-xl border border-dashed border-ink/25 p-5 text-sm text-muted">
          Our first pilot results will appear here, with client permission and the method we used to measure them.
        </p>
      </Section>

      {/* ---------- Final CTA ---------- */}
      <section className="bg-signal text-white">
        <Container className="flex flex-col items-start justify-between gap-6 py-14 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold">{s.ctaHeading}</h2>
            <p className="mt-3 text-lg text-blue-50">{s.ctaBody}</p>
          </div>
          <Link href="/contact" className="rounded-lg bg-white px-6 py-3 font-semibold text-ink hover:bg-blue-50">{s.primaryCta.label}</Link>
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { DarkBreadcrumb, PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { getService } from "@/lib/content";
import { CONTACT_CTA, FLAGSHIP, PAPER } from "@/lib/site";

export const metadata: Metadata = {
  title: "Calibrated surrogate models",
  description:
    "Surrogate models with distribution-free error bounds, from split conformal prediction. A two-week calibration study, then integration into your design loop.",
  alternates: { canonical: FLAGSHIP.path },
};

const PAPER_URL = `https://doi.org/${PAPER.doi}`;
// Add the public reproduction-code link here once the GitHub repository is published.

const PHASES = [
  {
    name: "Phase one",
    title: "Calibration study",
    duration: "Two weeks",
    text: "We take your existing surrogate and a held-out set, produce calibrated intervals, and report empirical coverage against the nominal level. If the coverage does not hold, we stop there, and you have learned something worth knowing about your model.",
  },
  {
    name: "Phase two",
    title: "Into the design loop",
    duration: "Four to eight weeks",
    text: "Surrogate retraining where it helps, Bayesian optimization over the design space with tolerance constraints, and the intervals wired into the workflow your engineers already use. Code, environment specification and documentation handed over.",
  },
];

function PaperLink({ className = "" }: { className?: string }) {
  return (
    <a href={PAPER_URL} target="_blank" rel="noopener"
      className={`inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-[15px] font-medium text-white transition-colors hover:border-white/60 ${className}`}>
      Read the paper <span aria-hidden>↗</span><span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export default async function CalibratedSurrogatesPage() {
  const service = await getService(FLAGSHIP.slug);

  return (
    <>
      <PageHero
        breadcrumb={<DarkBreadcrumb items={[{ label: "Services", href: "/services" }, { label: "Calibrated surrogate models" }]} />}
        title="Surrogate models with error bounds you can defend"
        intro="Your team trained a surrogate on simulation output. It runs in milliseconds instead of hours. It still has not replaced the solver in your design loop, because it returns a single number with no defensible bound on how wrong that number might be, and nobody signs off a design on that."
      >
        {/* The paper link sits in the header so it is above the fold on phones. */}
        <div className="flex flex-wrap items-center gap-3">
          <Button href="/contact" variant="accent" arrow>{CONTACT_CTA}</Button>
          <PaperLink />
        </div>
        <p className="mt-5 font-mono text-[12px] text-mist/60">{PAPER.citation} · DOI {PAPER.doi}</p>
      </PageHero>

      <Section border={false} title="We fix exactly that.">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div className="max-w-[66ch] space-y-6 text-lg leading-8">
            <h3 className="text-2xl font-semibold tracking-tight text-ink">What we do</h3>
            <p>
              We wrap your surrogate in split conformal prediction. The result is a prediction interval with a
              distribution-free coverage guarantee: at 90 percent confidence, the true value falls inside the
              interval at least 90 percent of the time on average. The guarantee assumes nothing about the model
              being correct, and nothing about the errors being Gaussian.
            </p>
            <p>
              It does rest on one condition: new designs must be exchangeable with the calibration data, which in
              practice means drawn from the same distribution. We test that condition on your data and tell you
              where it breaks, for example when a design moves outside the range you calibrated on.
            </p>
            <p className="rounded-xl border-l-2 border-amber bg-paper px-5 py-4 text-ink">
              What you get is a fast model whose output an engineer can defend in a design review and an auditor
              can inspect afterwards.
            </p>
          </div>
          {service?.features && service.features.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-ink">What the service includes</h3>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {service.features.map((f) => (
                  <li key={f} className="grid grid-cols-[22px_1fr] gap-3 py-4 leading-7">
                    <svg aria-hidden viewBox="0 0 20 20" className="mt-1 h-5 w-5 text-signal"><path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Section>

      <Section tone="paper" border={false} title="How it runs">
        <ol className="grid gap-5 md:grid-cols-2">
          {PHASES.map((p, i) => (
            <li key={p.name} className="flex flex-col rounded-2xl border border-line bg-white p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[12px] tracking-[0.14em] text-signal">{p.name.toUpperCase()}</span>
                <span className={`rounded-full px-3 py-0.5 text-sm font-medium ${i === 0 ? "bg-signal/10 text-signal-dark" : "bg-amber/15 text-[#7a5300]"}`}>{p.duration}</span>
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-4 text-[17px] leading-8">{p.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <section className="on-dark relative isolate overflow-hidden bg-night py-20 text-mist sm:py-28">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_85%_50%,rgb(42_120_214/0.2),transparent_70%)]" />
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <h2 className="max-w-xl text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Check the method before you hire us
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8">
              We published this method on an engineering inverse-design problem in the {PAPER.venue}, together
              with a complete reproduction script. Read the paper, then decide whether to call.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PaperLink />
              <Button href="/contact" variant="accent" arrow>{CONTACT_CTA}</Button>
            </div>
          </div>
          <figure className="m-0 rounded-2xl border border-white/10 bg-night-2/90 p-7 sm:p-8">
            <blockquote className="font-display text-xl font-medium leading-snug text-white sm:text-2xl">{PAPER.title}</blockquote>
            <figcaption className="mt-5 border-t border-white/10 pt-5 text-[15px] leading-6">
              {PAPER.citation}
              <span className="mt-1 block font-mono text-[12px] text-mist/60">DOI {PAPER.doi}</span>
            </figcaption>
          </figure>
        </Container>
      </section>
    </>
  );
}

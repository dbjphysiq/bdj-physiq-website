import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { DarkBreadcrumb, PageHero } from "@/components/PageHero";
import { getService, getServices } from "@/lib/content";
import { PILOT } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// Pre-render every known service at build time. New services published in
// Sanity later are rendered on first visit (dynamicParams defaults to true).
export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = await getService(slug);
  return s ? { title: s.title, description: s.tagline } : {};
}

function List({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <section className="border-t border-line pt-8">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <ul className="mt-6 space-y-4">
        {items.map((i) => (
          <li key={i} className="grid grid-cols-[22px_1fr] gap-3 text-lg leading-8">
            <svg aria-hidden viewBox="0 0 20 20" className="mt-1.5 h-5 w-5 text-signal"><path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {i}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = await getService(slug);
  if (!s) notFound();

  const badge =
    s.category === "innovation" ? "New service" : s.category === "accelerator" ? "In development" : "Core service";

  return (
    <>
      <PageHero
        breadcrumb={<DarkBreadcrumb items={[{ label: "Services", href: "/services" }, { label: s.title }]} />}
        meta={badge}
        title={s.title}
        intro={s.tagline}
      >
        {(s.whyNow || s.statusNote) && (
          <div className="max-w-2xl space-y-4">
            {s.whyNow && (
              <p className="border-l-2 border-amber pl-4 leading-7 text-white/90">
                <span className="font-medium text-amber">Why now. </span>{s.whyNow}
              </p>
            )}
            {s.statusNote && <p className="leading-7 text-mist/80">{s.statusNote}</p>}
          </div>
        )}
      </PageHero>

      <Container className="grid gap-16 py-16 sm:py-20 lg:grid-cols-[1fr_340px]">
        <div className="space-y-14">
          <section className="border-t border-line pt-8">
            <h2 className="text-2xl font-semibold tracking-tight">The problem we solve</h2>
            <p className="mt-6 max-w-[68ch] text-lg leading-8">{s.problem}</p>
          </section>
          <List title="Features and deliverables" items={s.features} />
          <List title="Benefits and business impact" items={s.benefits} />
        </div>
        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          {s.audience && (
            <div className="rounded-2xl border border-line p-7">
              <h2 className="text-xl font-semibold tracking-tight">Who it is for</h2>
              <p className="mt-3 leading-7">{s.audience}</p>
            </div>
          )}
          <div className="on-dark relative overflow-hidden rounded-2xl bg-night p-7 text-mist">
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgb(42_120_214/0.35),transparent_60%)]" />
            <div className="relative">
              <p className="font-display text-xl font-semibold text-white">Start with one decision</p>
              <p className="mt-2 leading-7">A 30-minute call, with no obligation. Pilots run {PILOT.weeks} at a fixed price.</p>
              <div className="mt-6"><Button href="/contact" variant="accent" arrow>{s.ctaLabel ?? "Book a scoping call"}</Button></div>
            </div>
          </div>
          {s.sources && s.sources.length > 0 && (
            <div className="text-sm text-muted">
              <h2 className="text-lg font-semibold tracking-tight text-ink">Sources</h2>
              <ul className="mt-3 space-y-1.5">
                {s.sources.map((src) => (
                  <li key={src.url}><a href={src.url} target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-ink">{src.label}</a></li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </Container>
    </>
  );
}

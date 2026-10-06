import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { getService, getServices } from "@/lib/content";

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
          <li key={i} className="grid grid-cols-[14px_1fr] gap-3 text-lg leading-8">
            <span aria-hidden className="mt-[0.8rem] h-[2px] w-3 bg-signal" />{i}
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

  return (
    <>
      <section className="bg-white">
        <Container className="pb-16 pt-12 sm:pt-16">
          <nav aria-label="Breadcrumb" className="text-[15px] text-muted">
            <Link href="/services" className="hover:text-ink">Services</Link>
            <span aria-hidden className="mx-2">/</span>
            <span className="text-ink">{s.title}</span>
          </nav>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {s.category === "innovation" && <span className="rounded-full bg-amber/15 px-3 py-1 text-sm font-medium text-[#7a5300]">New service</span>}
            {s.category === "accelerator" && <span className="rounded-full bg-paper px-3 py-1 text-sm font-medium text-muted">In development</span>}
          </div>
          <h1 className="mt-4 max-w-3xl text-[2.6rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl">{s.title}</h1>
          <p className="mt-6 max-w-2xl text-xl leading-9">{s.tagline}</p>
          {s.whyNow && <p className="mt-6 max-w-2xl border-l-2 border-amber pl-4 leading-7 text-ink"><span className="font-medium">Why now. </span>{s.whyNow}</p>}
          {s.statusNote && <p className="mt-6 max-w-2xl leading-7 text-muted">{s.statusNote}</p>}
        </Container>
      </section>

      <Container className="grid gap-16 pb-24 lg:grid-cols-[1fr_320px]">
        <div className="space-y-14">
          <section className="border-t border-line pt-8">
            <h2 className="text-2xl font-semibold tracking-tight">The problem we solve</h2>
            <p className="mt-6 max-w-[68ch] text-lg leading-8">{s.problem}</p>
          </section>
          <List title="Features and deliverables" items={s.features} />
          <List title="Benefits and business impact" items={s.benefits} />
        </div>
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          {s.audience && (
            <div className="border-t border-line pt-8">
              <h2 className="text-lg font-semibold">Who it is for</h2>
              <p className="mt-3 leading-7">{s.audience}</p>
            </div>
          )}
          <div className="rounded-2xl bg-ink p-7 text-white">
            <p className="font-display text-lg font-semibold">Start with one decision</p>
            <p className="mt-2 leading-7 text-[#c9d4e3]">A 30-minute call, with no obligation.</p>
            <div className="mt-6"><Button href="/contact" variant="inverse">{s.ctaLabel ?? "Book a scoping call"}</Button></div>
          </div>
          {s.sources && s.sources.length > 0 && (
            <div className="text-sm text-muted">
              <p className="font-medium text-ink">Sources</p>
              <ul className="mt-2 space-y-1.5">
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

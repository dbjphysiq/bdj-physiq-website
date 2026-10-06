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
    <div>
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((i) => (
          <li key={i} className="flex gap-3 leading-7 text-slate-700">
            <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-signal" />{i}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = await getService(slug);
  if (!s) notFound();

  return (
    <>
      <section className="bg-ink py-16 text-white sm:py-20">
        <Container>
          <Link href="/services" className="block w-fit text-sm text-slate-300 hover:text-white">← All services</Link>
          {s.category === "innovation" && <p className="mt-6 inline-flex rounded-full bg-amber px-3 py-1 text-xs font-bold text-ink">NEW — Innovation track</p>}
          {s.category === "accelerator" && <p className="mt-6 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-bold">In development</p>}
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{s.title}</h1>
          <p className="mt-5 max-w-2xl text-xl text-slate-300">{s.tagline}</p>
          {s.whyNow && <p className="mt-6 max-w-2xl border-l-2 border-amber pl-4 text-slate-200"><span className="font-semibold text-amber">Why now: </span>{s.whyNow}</p>}
          {s.statusNote && <p className="mt-6 max-w-2xl text-slate-300">{s.statusNote}</p>}
        </Container>
      </section>

      <Container className="grid gap-12 py-16 lg:grid-cols-3">
        <div className="space-y-12 lg:col-span-2">
          <div>
            <h2 className="text-xl font-semibold text-ink">The problem we solve</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">{s.problem}</p>
          </div>
          <List title="Features and deliverables" items={s.features} />
          <List title="Benefits and business impact" items={s.benefits} />
        </div>
        <aside className="space-y-6">
          {s.audience && (
            <div className="rounded-2xl bg-paper p-6">
              <h2 className="font-semibold text-ink">Who it is for</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">{s.audience}</p>
            </div>
          )}
          <div className="rounded-2xl bg-ink p-6 text-white">
            <p className="font-semibold">Start with one decision</p>
            <p className="mt-2 text-sm text-slate-300">30 minutes, no slides, no obligation.</p>
            <div className="mt-4"><Button href="/contact">{s.ctaLabel ?? "Book a scoping call"}</Button></div>
          </div>
          {s.sources && s.sources.length > 0 && (
            <div className="text-xs text-muted">
              <p className="font-semibold">Sources</p>
              <ul className="mt-2 space-y-1">
                {s.sources.map((src) => (
                  <li key={src.url}><a href={src.url} target="_blank" rel="noopener" className="underline hover:text-ink">{src.label}</a></li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </Container>
    </>
  );
}

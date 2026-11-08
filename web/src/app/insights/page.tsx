import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = { title: "Insights", description: "Notes on physics-informed AI, data engineering and responsible AI." };

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function InsightsPage() {
  const posts = await getPosts();
  return (
    <>
      <PageHero eyebrow="Field notes" title="Insights"
        intro="Notes from our work on physics-informed AI, data engineering and responsible AI." />
      <Container className="py-16 sm:py-20">
        <ul className="border-t border-line">
          {posts.map((p) => (
            <li key={p.slug} className="border-b border-line">
              <Link href={`/insights/${p.slug}`} className="group grid gap-3 py-10 md:grid-cols-[220px_1fr_auto] md:items-start md:gap-10">
                {p.publishedAt
                  ? <time dateTime={p.publishedAt} className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted md:pt-2">{fmt(p.publishedAt)}</time>
                  : <span />}
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-signal sm:text-[1.7rem]">{p.title}</h2>
                  {p.excerpt && <p className="mt-3 max-w-2xl leading-7">{p.excerpt}</p>}
                </div>
                <span aria-hidden className="hidden text-2xl text-muted transition-all group-hover:translate-x-1 group-hover:text-signal md:block">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}

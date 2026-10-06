import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = { title: "Insights", description: "Notes on physics-informed AI, data engineering and responsible AI." };

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function InsightsPage() {
  const posts = await getPosts();
  return (
    <Container className="pb-24 pt-16 sm:pt-24">
      <h1 className="text-[2.6rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl">Insights</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8">Notes from our work on physics-informed AI, data engineering and responsible AI.</p>
      <ul className="mt-14 border-t border-line">
        {posts.map((p) => (
          <li key={p.slug} className="border-b border-line">
            <Link href={`/insights/${p.slug}`} className="group grid gap-2 py-8 md:grid-cols-[200px_1fr] md:gap-10">
              {p.publishedAt && <time dateTime={p.publishedAt} className="text-[15px] text-muted">{fmt(p.publishedAt)}</time>}
              <div>
                <h2 className="text-2xl font-semibold tracking-tight group-hover:text-signal">{p.title}</h2>
                {p.excerpt && <p className="mt-3 max-w-2xl leading-7">{p.excerpt}</p>}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}

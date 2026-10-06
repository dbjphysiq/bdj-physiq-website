import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = { title: "Insights", description: "Notes on physics-informed AI, data engineering and responsible AI." };

export default async function InsightsPage() {
  const posts = await getPosts();
  return (
    <Container className="py-16 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-signal">PhysIQ Notes</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink">Insights</h1>
      <ul className="mt-10 divide-y divide-line">
        {posts.map((p) => (
          <li key={p.slug} className="py-6">
            <Link href={`/insights/${p.slug}`} className="group block">
              {p.publishedAt && <p className="text-sm text-muted">{new Date(p.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>}
              <h2 className="mt-1 text-2xl font-semibold text-ink group-hover:text-signal">{p.title}</h2>
              {p.excerpt && <p className="mt-2 max-w-3xl text-muted">{p.excerpt}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}

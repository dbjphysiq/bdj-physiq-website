import type { MetadataRoute } from "next";
import { getPosts, getServices } from "@/lib/content";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bdjphysiq.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts] = await Promise.all([getServices(), getPosts()]);
  return [
    ...["", "/services", "/about", "/insights", "/contact"].map((p) => ({ url: `${base}${p}` })),
    ...services.map((s) => ({ url: `${base}/services/${s.slug}` })),
    ...posts.map((p) => ({ url: `${base}/insights/${p.slug}`, lastModified: p.publishedAt })),
  ];
}

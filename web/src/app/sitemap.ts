import type { MetadataRoute } from "next";
import { getPosts, getServices } from "@/lib/content";
import { FLAGSHIP, serviceHref } from "@/lib/site";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dbjphysiq.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts] = await Promise.all([getServices(), getPosts()]);
  return [
    ...["", "/services", FLAGSHIP.path, "/about", "/insights", "/contact"].map((p) => ({ url: `${base}${p}` })),
    ...services.filter((s) => s.slug !== FLAGSHIP.slug).map((s) => ({ url: `${base}${serviceHref(s.slug)}` })),
    ...posts.map((p) => ({ url: `${base}/insights/${p.slug}`, lastModified: p.publishedAt })),
  ];
}

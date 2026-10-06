import "server-only";
import type { PortableTextBlock } from "next-sanity";
import seed from "@/content/seed-content.json";
import { sanityFetch } from "@/sanity/fetch";
import { isSanityConfigured } from "@/sanity/env";
import {
  ABOUT_QUERY,
  POST_QUERY,
  POSTS_QUERY,
  SERVICE_QUERY,
  SERVICES_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/queries";

// ---------- Types (mirror the Sanity schemas in /studio/schemaTypes) ----------
export type Link = { label: string; href: string };
export type TitleText = { title: string; text: string };
export type Stat = { value: string; caption: string; sourceLabel?: string; sourceUrl?: string };
export type Source = { label: string; url: string };
export type SanityImage = {
  asset?: { _ref: string; _type?: string };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type SiteSettings = {
  siteTitle: string;
  tagline: string;
  motto: string;
  heroHeadline: string;
  heroSubheadline: string;
  primaryCta: Link;
  secondaryCta?: Link;
  trustLine?: string[];
  valueHeading: string;
  valueBody: string;
  valuePillars?: TitleText[];
  stats?: Stat[];
  ctaHeading: string;
  ctaBody: string;
  contactEmail: string;
  contactPhone?: string;
  location?: string;
  legalLine?: string;
  seoDescription?: string;
};

export type ServiceCategory = "core" | "accelerator" | "innovation";
export type Service = {
  title: string;
  slug: string;
  category: ServiceCategory;
  order: number;
  tagline: string;
  whyNow?: string;
  statusNote?: string;
  cardBullets?: string[];
  problem: string;
  features?: string[];
  benefits?: string[];
  audience?: string;
  ctaLabel?: string;
  sources?: Source[];
};

export type AboutPage = {
  heading: string;
  mission: string;
  vision: string;
  approach?: TitleText[];
  method?: TitleText[];
  values?: TitleText[];
  founderName: string;
  founderRole?: string;
  founderBio?: string;
  founderCredentials?: string[];
  publicationUrl?: string;
  founderPhoto?: SanityImage | null;
  outlook?: TitleText[];
};

export type PostSummary = { title: string; slug: string; excerpt?: string; publishedAt?: string };
export type Post = PostSummary & {
  // Sanity returns Portable Text; the offline fallback uses plain paragraphs.
  body?: PortableTextBlock[] | string[];
  mainImage?: SanityImage | null;
};

// ---------- Cache tags ----------
// The webhook sends [_type, _type + ":" + slug]; these must match.
export const tags = {
  settings: "siteSettings",
  about: "aboutPage",
  services: "service",
  service: (slug: string) => `service:${slug}`,
  posts: "post",
  post: (slug: string) => `post:${slug}`,
};

// ---------- Data access (Sanity first, seed content as fallback) ----------
const fallback = seed as unknown as {
  siteSettings: SiteSettings;
  aboutPage: AboutPage;
  services: Service[];
  posts: Post[];
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY, tags: [tags.settings] });
  return data ?? fallback.siteSettings;
}

export async function getAbout(): Promise<AboutPage> {
  const data = await sanityFetch<AboutPage>({ query: ABOUT_QUERY, tags: [tags.about] });
  return data ?? fallback.aboutPage;
}

export async function getServices(): Promise<Service[]> {
  const data = await sanityFetch<Service[]>({ query: SERVICES_QUERY, tags: [tags.services] });
  return data && data.length ? data : fallback.services;
}

export async function getService(slug: string): Promise<Service | null> {
  const data = await sanityFetch<Service>({
    query: SERVICE_QUERY,
    params: { slug },
    tags: [tags.services, tags.service(slug)],
  });
  if (data) return data;
  // Once Sanity is connected, a slug that is not in Sanity is a 404
  // (unless the dataset has no services yet).
  if (isSanityConfigured && (await getServices()) !== fallback.services) return null;
  return fallback.services.find((s) => s.slug === slug) ?? null;
}

export async function getPosts(): Promise<PostSummary[]> {
  const data = await sanityFetch<PostSummary[]>({ query: POSTS_QUERY, tags: [tags.posts] });
  return data && data.length ? data : fallback.posts;
}

export async function getPost(slug: string): Promise<Post | null> {
  const data = await sanityFetch<Post>({
    query: POST_QUERY,
    params: { slug },
    tags: [tags.posts, tags.post(slug)],
  });
  if (data) return data;
  if (isSanityConfigured && (await getPosts()) !== fallback.posts) return null;
  return fallback.posts.find((p) => p.slug === slug) ?? null;
}

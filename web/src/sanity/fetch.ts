import type { QueryParams } from "next-sanity";
import { client } from "./client";
import { isSanityConfigured } from "./env";

/**
 * Cached, tag-aware fetch.
 *
 * - `cache: "force-cache"` stores the response in the Next.js Data Cache.
 * - `next.tags` labels it (e.g. "service", "service:data-engineering-migration").
 * - `revalidate: false` means: keep it until a tag is revalidated.
 *
 * When an editor publishes in Sanity, the webhook calls /api/revalidate with
 * the document's tags, Next.js expires every cached response and page that
 * used them, and the next visitor gets freshly rendered HTML without a redeploy.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags: string[];
}): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    return await client.fetch<T>(query, params, {
      cache: "force-cache",
      next: { revalidate: false, tags },
    });
  } catch (error) {
    console.error("[sanity] fetch failed, using fallback content", error);
    return null;
  }
}

import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * On-demand revalidation endpoint for Sanity webhooks.
 *
 * Sanity sends a POST request here every time a document is created,
 * updated (published) or deleted. The webhook's GROQ projection is:
 *
 *   { "tags": [_type, _type + ":" + slug.current] }
 *
 * e.g. { "tags": ["service", "service:data-engineering-migration"] }
 *
 * We verify the request signature with SANITY_REVALIDATE_SECRET, then
 * expire every cached fetch (and every page) that used those tags. The next
 * visitor receives a freshly rendered page. No code deployment is needed.
 */

type WebhookPayload = { tags?: (string | null)[]; _type?: string };

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      return new NextResponse("SANITY_REVALIDATE_SECRET is not set", { status: 500 });
    }

    // Third argument `true` waits briefly so Sanity's API has the new
    // version before we re-fetch it (eventual consistency).
    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret, true);

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    // Keep only real strings: singletons have no slug, so the second tag is null.
    const tagList = (body?.tags ?? [body?._type]).filter(
      (t): t is string => typeof t === "string" && t.length > 0 && !t.endsWith(":"),
    );

    if (tagList.length === 0) {
      return new NextResponse("No tags in payload", { status: 400 });
    }

    // `{ expire: 0 }`: expire immediately so the next request renders fresh
    // content (recommended by Next.js for webhooks / Route Handlers).
    for (const tag of tagList) revalidateTag(tag, { expire: 0 });

    return NextResponse.json({ revalidated: true, tags: tagList, now: Date.now() });
  } catch (err) {
    console.error("[revalidate]", err);
    return new NextResponse((err as Error).message, { status: 500 });
  }
}

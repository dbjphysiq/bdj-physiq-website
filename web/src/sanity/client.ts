import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, isSanityConfigured } from "./env";

export const client = createClient({
  projectId: isSanityConfigured ? projectId : "placeholder",
  dataset,
  apiVersion,
  // Responses are cached by Next.js and only refreshed when the webhook
  // revalidates a tag, so we read from the live API (always fresh) rather
  // than the CDN. The number of API calls stays very low.
  useCdn: false,
  perspective: "published",
});

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-09-01";

/**
 * The site still builds and runs without Sanity (it falls back to the
 * content in src/content/seed-content.json). Once the project ID is set,
 * every page reads from Sanity instead.
 */
export const isSanityConfigured =
  projectId.length > 0 && projectId !== "your-project-id";

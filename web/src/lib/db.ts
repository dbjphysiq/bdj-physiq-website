import "server-only";
import { neon } from "@neondatabase/serverless";

/** Returns a SQL tagged-template client, or null when DATABASE_URL is not set. */
export function getDb() {
  const url = process.env.DATABASE_URL;
  return url ? neon(url) : null;
}

import "server-only";
import { createHash } from "node:crypto";
import { getDb } from "@/lib/db";

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "unknown").trim();
}

/** One-way hash so raw IP addresses are never stored. */
export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? "bdj-physiq";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

const memory = new Map<string, number[]>();

/** True if the caller is within the limit. Uses the database when available, memory otherwise. */
export async function allow(kind: string, ipHash: string, max: number, windowMinutes: number): Promise<boolean> {
  const db = getDb();
  if (db) {
    try {
      const rows = (await db`
        select count(*)::int as n from rate_events
        where kind = ${kind} and ip_hash = ${ipHash}
          and created_at > now() - make_interval(mins => ${windowMinutes})`) as { n: number }[];
      if ((rows[0]?.n ?? 0) >= max) return false;
      await db`insert into rate_events (kind, ip_hash) values (${kind}, ${ipHash})`;
      return true;
    } catch {
      /* fall through to the in-memory limiter */
    }
  }
  const key = `${kind}:${ipHash}`;
  const now = Date.now();
  const recent = (memory.get(key) ?? []).filter((t) => now - t < windowMinutes * 60_000);
  if (recent.length >= max) return false;
  recent.push(now);
  memory.set(key, recent);
  return true;
}

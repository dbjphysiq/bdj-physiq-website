import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { allow, clientIp, hashIp } from "@/lib/guard";
import { buildSystemPrompt, HANDOFF_TOKEN } from "@/lib/assistant-prompt";

export const runtime = "nodejs";
export const maxDuration = 30;

type Msg = { role: "user" | "assistant"; content: string };
type Body = { messages?: unknown; conversationId?: unknown };

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5-20251001";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function parseMessages(input: unknown): Msg[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > 14) return null;
  const out: Msg[] = [];
  for (const m of input) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, 1200);
    if (!text) return null;
    out.push({ role, content: text });
  }
  return out[out.length - 1].role === "user" ? out : null;
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "The assistant is not available." }, { status: 503 });

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const messages = parseMessages(body.messages);
  if (!messages) return NextResponse.json({ error: "Invalid messages." }, { status: 400 });

  const ipHash = hashIp(clientIp(req));
  // Per visitor: 20 messages per hour. Whole site: 400 per day, which caps the monthly bill.
  if (!(await allow("assistant", ipHash, 20, 60))) {
    return NextResponse.json({ error: "You have reached the message limit. Please use the contact form." }, { status: 429 });
  }
  if (!(await allow("assistant-global", "all", Number(process.env.ASSISTANT_DAILY_LIMIT ?? 400), 1440))) {
    return NextResponse.json({ error: "The assistant is busy today. Please use the contact form." }, { status: 429 });
  }

  let reply = "";
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": apiKey, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: MODEL, max_tokens: 500, system: await buildSystemPrompt(), messages }),
      signal: AbortSignal.timeout(25_000),
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const json = (await res.json()) as { content?: { type: string; text?: string }[] };
    reply = (json.content ?? []).filter((b) => b.type === "text").map((b) => b.text ?? "").join("").trim();
    if (!reply) throw new Error("empty reply");
  } catch {
    return NextResponse.json({ error: "The assistant could not answer. Please use the contact form." }, { status: 502 });
  }

  const handoff = reply.includes(HANDOFF_TOKEN);
  reply = reply.replaceAll(HANDOFF_TOKEN, "").trim();

  // Log the conversation (best effort).
  let conversationId = typeof body.conversationId === "string" && UUID.test(body.conversationId) ? body.conversationId : null;
  const db = getDb();
  if (db) {
    try {
      if (!conversationId) {
        const rows = (await db`insert into conversations (ip_hash) values (${ipHash}) returning id`) as { id: string }[];
        conversationId = rows[0]?.id ?? null;
      }
      if (conversationId) {
        await db`insert into messages (conversation_id, role, content) values (${conversationId}, 'user', ${messages[messages.length - 1].content})`;
        await db`insert into messages (conversation_id, role, content) values (${conversationId}, 'assistant', ${reply})`;
        if (handoff) await db`update conversations set handoff = true where id = ${conversationId}`;
      }
    } catch {
      /* logging must never break the reply */
    }
  }

  return NextResponse.json({ reply, handoff, conversationId });
}

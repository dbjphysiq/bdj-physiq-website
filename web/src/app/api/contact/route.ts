import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { allow, clientIp, hashIp } from "@/lib/guard";

export const runtime = "nodejs";

type Body = { name?: unknown; email?: unknown; organisation?: unknown; language?: unknown; message?: unknown; website?: unknown };

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function notify(lead: { name: string; email: string; organisation: string; message: string }) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!key || !to) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL ?? "BDJ PhysIQ <onboarding@resend.dev>",
        to: [to],
        reply_to: lead.email,
        subject: `New enquiry from ${lead.name}${lead.organisation ? ` (${lead.organisation})` : ""}`,
        text: `${lead.message}\n\nFrom: ${lead.name} <${lead.email}>`,
      }),
    });
  } catch {
    /* the lead is already saved; a failed notification must not fail the request */
  }
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (str(body.website, 100)) return NextResponse.json({ ok: true });

  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const organisation = str(body.organisation, 160);
  const language = str(body.language, 20);
  const message = str(body.message, 4000);

  if (!name || !EMAIL.test(email) || message.length < 10) {
    return NextResponse.json({ error: "Please enter your name, a valid email and a message of at least 10 characters." }, { status: 400 });
  }

  const ipHash = hashIp(clientIp(req));
  if (!(await allow("contact", ipHash, 5, 60))) {
    return NextResponse.json({ error: "Too many messages. Please try again later or email us directly." }, { status: 429 });
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: "The form is not available right now. Please email us directly." }, { status: 503 });
  }
  try {
    await db`insert into leads (name, email, organisation, language, message, ip_hash)
             values (${name}, ${email}, ${organisation || null}, ${language || null}, ${message}, ${ipHash})`;
  } catch {
    return NextResponse.json({ error: "We could not save your message. Please email us directly." }, { status: 500 });
  }
  await notify({ name, email, organisation, message });
  return NextResponse.json({ ok: true });
}

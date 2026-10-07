"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content: "Hello. I am the DBJ PhysIQ AI assistant. Ask me about our services, pilots or training. Bonjour, je réponds aussi en français.",
};

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [handoff, setHandoff] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ block: "end" }); }, [msgs, open, busy]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    const next = [...msgs, { role: "user" as const, content: text }];
    setMsgs(next);
    setInput("");
    setError("");
    setBusy(true);
    try {
      // The greeting is not sent to the model.
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(1).slice(-12), conversationId }),
      });
      const json = (await res.json()) as { reply?: string; handoff?: boolean; conversationId?: string; error?: string };
      if (!res.ok || !json.reply) throw new Error(json.error ?? "Something went wrong.");
      setMsgs([...next, { role: "assistant", content: json.reply }]);
      if (json.handoff) setHandoff(true);
      if (json.conversationId) setConversationId(json.conversationId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
      {open && (
        <section aria-label="AI assistant" className="mb-3 flex h-[min(32rem,calc(100vh-7rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-xl">
          <header className="flex items-center justify-between bg-ink px-4 py-3 text-white">
            <div>
              <p className="text-[15px] font-semibold">Ask DBJ PhysIQ</p>
              <p className="text-xs text-[#c9d4e3]">AI assistant. Answers may contain errors.</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close assistant" className="rounded p-1 text-xl leading-none hover:bg-white/10">×</button>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-[15px] leading-6">
            {msgs.map((m, i) => (
              <p key={i} className={m.role === "user" ? "ml-8 rounded-2xl rounded-br-sm bg-ink px-3 py-2 text-white" : "mr-8 rounded-2xl rounded-bl-sm bg-paper px-3 py-2 text-ink"}>
                {m.content}
              </p>
            ))}
            {busy && <p className="mr-8 rounded-2xl bg-paper px-3 py-2 text-muted">Thinking...</p>}
            {handoff && (
              <p className="rounded-xl border border-line px-3 py-2 text-ink">
                For a quote or a conversation with the team, <Link href="/contact" className="font-medium text-signal underline">use the contact form</Link>.
              </p>
            )}
            {error && <p role="alert" className="text-red-700">{error} <Link href="/contact" className="underline">Contact form</Link></p>}
            <div ref={endRef} />
          </div>
          <form onSubmit={send} className="flex gap-2 border-t border-line p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} maxLength={1000} placeholder="Type your question" aria-label="Your message"
              className="min-w-0 flex-1 rounded-full border border-line px-4 py-2 text-[15px] outline-none focus:border-signal" />
            <button type="submit" disabled={busy || !input.trim()} className="rounded-full bg-ink px-4 py-2 text-[15px] font-medium text-white hover:bg-ink-2 disabled:opacity-50">Send</button>
          </form>
        </section>
      )}
      <button onClick={() => setOpen((v) => !v)} aria-expanded={open}
        className="ml-auto flex items-center rounded-full bg-ink px-5 py-3 text-[15px] font-medium text-white shadow-lg transition-colors hover:bg-ink-2">
        {open ? "Close" : "Ask us"}
      </button>
    </div>
  );
}

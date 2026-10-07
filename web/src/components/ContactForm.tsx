"use client";

import { useState } from "react";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "done" } | { kind: "error"; message: string };

const field =
  "mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 text-[16px] text-ink outline-none transition-colors focus:border-signal focus:ring-2 focus:ring-signal/20";

export function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ kind: "sending" });
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setState({ kind: "done" });
    } catch (err) {
      setState({ kind: "error", message: err instanceof Error ? err.message : `Please email us at ${fallbackEmail}.` });
    }
  }

  if (state.kind === "done") {
    return (
      <div role="status" className="rounded-xl border border-line bg-paper p-6">
        <h2 className="text-xl font-semibold">Thank you. We have your message.</h2>
        <p className="mt-2 leading-7">We reply within two working days, in English or French.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-[15px] font-medium text-ink">Name
          <input name="name" required maxLength={120} autoComplete="name" className={field} />
        </label>
        <label className="block text-[15px] font-medium text-ink">Work email
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-[15px] font-medium text-ink">Organisation
          <input name="organisation" maxLength={160} autoComplete="organization" className={field} />
        </label>
        <label className="block text-[15px] font-medium text-ink">Preferred language
          <select name="language" defaultValue="English" className={field}>
            <option>English</option>
            <option>Français</option>
          </select>
        </label>
      </div>
      <label className="block text-[15px] font-medium text-ink">The decision or process you want to improve
        <textarea name="message" required minLength={10} maxLength={4000} rows={6} className={field} />
      </label>
      {/* Honeypot: hidden from people, filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {state.kind === "error" && <p role="alert" className="text-[15px] text-red-700">{state.message}</p>}
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state.kind === "sending"}
          className="inline-flex rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-ink-2 disabled:opacity-60">
          {state.kind === "sending" ? "Sending..." : "Send message"}
        </button>
        <span className="text-sm text-muted">We use your details only to reply to you.</span>
      </div>
    </form>
  );
}

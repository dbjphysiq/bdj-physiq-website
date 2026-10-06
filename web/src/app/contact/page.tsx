import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Contact", description: "Book a 30-minute scoping call with BDJ PhysIQ Technologies." };

export default async function ContactPage() {
  const s = await getSiteSettings();
  const subject = encodeURIComponent("Scoping call request — BDJ PhysIQ");
  const body = encodeURIComponent(
    "Organisation:\nRole:\nThe decision or process you want to improve:\nPreferred language (English/French):\nPreferred times (CET):\n",
  );
  return (
    <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-2">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-signal">Contact</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink">{s.ctaHeading}</h1>
        <p className="mt-5 text-lg leading-8 text-muted">{s.ctaBody}</p>
        <a href={`mailto:${s.contactEmail}?subject=${subject}&body=${body}`}
          className="mt-8 inline-flex rounded-lg bg-signal px-6 py-3 font-semibold text-white hover:bg-signal-dark">
          {s.primaryCta.label}
        </a>
        <p className="mt-4 text-sm text-muted">We reply in English or French. Tell us what you want to decide; we&apos;ll tell you whether your data can support it.</p>
      </div>
      <dl className="grid content-start gap-6 rounded-2xl bg-paper p-8">
        <div><dt className="text-sm font-semibold text-ink">Email</dt><dd><a className="text-signal hover:underline" href={`mailto:${s.contactEmail}`}>{s.contactEmail}</a></dd></div>
        {s.contactPhone && <div><dt className="text-sm font-semibold text-ink">Phone / WhatsApp</dt><dd><a className="text-signal hover:underline" href={`tel:${s.contactPhone.replace(/\s/g, "")}`}>{s.contactPhone}</a></dd></div>}
        {s.location && <div><dt className="text-sm font-semibold text-ink">Office</dt><dd className="text-slate-700">{s.location}</dd></div>}
        <div><dt className="text-sm font-semibold text-ink">Working hours</dt><dd className="text-slate-700">Within one hour of Central European Time</dd></div>
      </dl>
    </Container>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Contact", description: "Book a 30-minute scoping call with BDJ PhysIQ Technologies." };

export default async function ContactPage() {
  const s = await getSiteSettings();
  const subject = encodeURIComponent("Scoping call request: BDJ PhysIQ");
  const body = encodeURIComponent(
    "Organisation:\nRole:\nThe decision or process you want to improve:\nPreferred language (English/French):\nPreferred times (CET):\n",
  );
  return (
    <Container className="grid gap-16 pb-24 pt-16 sm:pt-24 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <h1 className="text-[2.6rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl">{s.ctaHeading}</h1>
        <p className="mt-6 max-w-xl text-lg leading-8">{s.ctaBody}</p>
        <a href={`mailto:${s.contactEmail}?subject=${subject}&body=${body}`}
          className="mt-10 inline-flex rounded-full bg-ink px-6 py-3 font-medium text-white hover:bg-ink-2">
          {s.primaryCta.label}
        </a>
        <p className="mt-4 text-sm text-muted">We reply in English or French. Tell us the decision you want to make, and we will tell you whether your data can support it.</p>
      </div>
      <dl className="grid content-start gap-6 border-t border-line pt-8">
        <div><dt className="text-[15px] font-medium text-ink">Email</dt><dd><a className="text-signal hover:underline" href={`mailto:${s.contactEmail}`}>{s.contactEmail}</a></dd></div>
        {s.contactPhone && <div><dt className="text-[15px] font-medium text-ink">Phone and WhatsApp</dt><dd><a className="text-signal hover:underline" href={`tel:${s.contactPhone.replace(/\s/g, "")}`}>{s.contactPhone}</a></dd></div>}
        {s.location && <div><dt className="text-[15px] font-medium text-ink">Office</dt><dd className="text-slate">{s.location}</dd></div>}
        <div><dt className="text-[15px] font-medium text-ink">Working hours</dt><dd className="text-slate">Within one hour of Central European Time</dd></div>
      </dl>
    </Container>
  );
}

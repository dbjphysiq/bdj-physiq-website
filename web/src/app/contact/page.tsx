import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Contact", description: "Book a 30-minute scoping call with DBJ PhysIQ Technologies." };

export default async function ContactPage() {
  const s = await getSiteSettings();
  const subject = encodeURIComponent("Scoping call request: DBJ PhysIQ");
  const body = encodeURIComponent(
    "Organisation:\nRole:\nThe decision or process you want to improve:\nPreferred language (English/French):\nPreferred times (with your time zone):\n",
  );
  return (
    <>
      <PageHero title={s.ctaHeading} intro={s.ctaBody} />
      <Container className="grid gap-16 py-16 sm:py-20 lg:grid-cols-[1.25fr_1fr]">
        <div>
          {process.env.DATABASE_URL ? (
            <ContactForm fallbackEmail={s.contactEmail} />
          ) : (
            <a href={`mailto:${s.contactEmail}?subject=${subject}&body=${body}`}
              className="inline-flex rounded-full bg-ink px-6 py-3.5 font-medium text-white hover:bg-ink-2">
              {s.primaryCta.label}
            </a>
          )}
          <p className="mt-8 max-w-xl text-[15px] leading-7 text-muted">
            Prefer email?{" "}
            <a className="text-signal underline underline-offset-4 hover:text-signal-dark" href={`mailto:${s.contactEmail}?subject=${subject}&body=${body}`}>Write to us directly</a>.
            {" "}We reply in English or French. Tell us the decision you want to make, and we will tell you whether your data can support it.
          </p>
          <div className="mt-12 border-t border-line pt-10">
            <h2 className="text-3xl font-semibold tracking-tight">What happens next</h2>
            <ol className="mt-6 space-y-7">
              {[
                ["Send one paragraph", "Tell us the decision or process you want to improve, in English or French."],
                ["We reply within two working days", "We arrange a 30-minute call at a time that suits your time zone."],
                ["A clear answer on the call", "Whether your data can support the decision, what a pilot would cost, and how we would measure success. There is no obligation."],
              ].map(([title, text], i) => (
                <li key={title} className="grid grid-cols-[44px_1fr] gap-4">
                  <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-full border border-line font-mono text-[13px] text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-lg font-semibold tracking-tight text-ink">{title}</p>
                    <p className="mt-1.5 leading-7">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <dl className="grid content-start gap-px overflow-hidden rounded-2xl border border-line bg-line">
          <div className="bg-white p-6">
            <dt className="text-lg font-semibold text-ink">Email</dt>
            <dd className="mt-2"><a className="break-all text-base font-medium text-signal hover:underline" href={`mailto:${s.contactEmail}`}>{s.contactEmail}</a></dd>
          </div>
          {s.contactPhone && (
            <div className="bg-white p-6">
              <dt className="text-lg font-semibold text-ink">Phone and WhatsApp</dt>
              <dd className="mt-2"><a className="text-base font-medium text-signal hover:underline" href={`tel:${s.contactPhone.replace(/\s/g, "")}`}>{s.contactPhone}</a></dd>
            </div>
          )}
          {s.location && (
            <div className="bg-white p-6">
              <dt className="text-lg font-semibold text-ink">Office</dt>
              <dd className="mt-2 text-base text-ink">{s.location}</dd>
            </div>
          )}
          <div className="bg-white p-6">
            <dt className="text-lg font-semibold text-ink">Working hours</dt>
            <dd className="mt-2 leading-7">
              West Africa Time (UTC+1, no daylight saving). Our afternoons overlap US Eastern mornings, and we share the European working day.
            </dd>
          </div>
        </dl>
      </Container>
    </>
  );
}

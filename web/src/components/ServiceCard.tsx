import Link from "next/link";
import type { Service } from "@/lib/content";

export function ServiceCard({ service }: { service: Service }) {
  const isNew = service.category === "innovation";
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-signal hover:shadow-md"
    >
      {isNew && (
        <span className="mb-3 inline-flex w-fit rounded-full bg-amber/15 px-3 py-1 text-xs font-semibold text-[#8a5e00]">
          NEW — Innovation track
        </span>
      )}
      {service.category === "accelerator" && (
        <span className="mb-3 inline-flex w-fit rounded-full bg-signal/10 px-3 py-1 text-xs font-semibold text-signal-dark">In development</span>
      )}
      <h3 className="text-lg font-semibold text-ink">{service.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{service.tagline}</p>
      {service.whyNow && (
        <p className="mt-3 rounded-lg bg-paper px-3 py-2 text-xs leading-5 text-slate-700">
          <span className="font-semibold">Why now: </span>{service.whyNow}
        </p>
      )}
      {service.cardBullets && service.cardBullets.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          {service.cardBullets.map((b) => (
            <li key={b} className="flex gap-2"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />{b}</li>
          ))}
        </ul>
      )}
      <span className="mt-auto pt-5 text-sm font-semibold text-signal group-hover:underline">Explore →</span>
    </Link>
  );
}

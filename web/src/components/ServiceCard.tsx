import Link from "next/link";
import type { Service } from "@/lib/content";

export function ServiceCard({ service }: { service: Service }) {
  const isNew = service.category === "innovation";
  return (
    <article className="flex h-full flex-col border-t border-ink/15 pt-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight">
          <Link href={`/services/${service.slug}`} className="hover:text-signal">{service.title}</Link>
        </h3>
        {isNew && <span className="shrink-0 rounded-full bg-amber/15 px-2.5 py-0.5 text-xs font-medium text-[#7a5300]">New</span>}
        {service.category === "accelerator" && <span className="shrink-0 rounded-full bg-paper px-2.5 py-0.5 text-xs font-medium text-muted">In development</span>}
      </div>
      <p className="mt-3 leading-7">{service.tagline}</p>
      {service.whyNow && <p className="mt-3 text-[15px] leading-6 text-muted">{service.whyNow}</p>}
      {service.cardBullets && service.cardBullets.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-[15px] text-muted">
          {service.cardBullets.map((b) => <li key={b}>{b}</li>)}
        </ul>
      )}
      <Link href={`/services/${service.slug}`} className="mt-auto pt-6 text-[15px] font-medium text-signal hover:text-signal-dark" aria-label={`Read more about ${service.title}`}>
        Read more
      </Link>
    </article>
  );
}

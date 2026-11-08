import Link from "next/link";
import type { Service } from "@/lib/content";

export function ServiceCard({ service, index }: { service: Service; index?: number }) {
  const isNew = service.category === "innovation";
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-all duration-300 focus-within:ring-2 focus-within:ring-signal/40 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_24px_48px_-28px_rgb(11_37_69/0.35)]">
      <div className="flex items-start justify-between gap-4">
        {typeof index === "number" ? (
          <span className="font-mono text-[12px] font-medium tracking-[0.12em] text-muted">{String(index + 1).padStart(2, "0")}</span>
        ) : <span />}
        {isNew && <span className="shrink-0 rounded-full bg-amber/15 px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-[#7a5300]">New</span>}
        {service.category === "accelerator" && <span className="shrink-0 rounded-full bg-paper px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-muted">In development</span>}
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight">
        {/* The whole card is clickable through this link's ::after overlay. */}
        <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0 after:rounded-2xl after:content-['']">
          {service.title}
        </Link>
      </h3>
      <p className="mt-3 leading-7">{service.tagline}</p>
      {service.whyNow && <p className="mt-3 text-[15px] leading-6 text-muted">{service.whyNow}</p>}
      {service.cardBullets && service.cardBullets.length > 0 && (
        <ul className="mt-5 space-y-2 border-t border-line pt-5 text-[15px] text-muted">
          {service.cardBullets.map((b) => (
            <li key={b} className="grid grid-cols-[10px_1fr] gap-2.5">
              <span aria-hidden className="mt-[0.6rem] h-px w-2.5 bg-signal" />{b}
            </li>
          ))}
        </ul>
      )}
      <span aria-hidden className="mt-auto flex items-center gap-1.5 pt-6 text-[15px] font-medium text-signal transition-colors group-hover:text-signal-dark">
        Read more <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
      </span>
    </article>
  );
}

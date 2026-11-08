import Link from "next/link";
import type { Service } from "@/lib/content";
import { FLAGSHIP, serviceHref } from "@/lib/site";

type Props = {
  service: Service;
  /** "features" lists every deliverable (Services page); "card" lists the short card bullets. */
  bullets?: "features" | "card" | "none";
};

export function ServiceCard({ service, bullets = "card" }: Props) {
  const flagship = service.slug === FLAGSHIP.slug;
  const items = bullets === "features" ? service.features : bullets === "card" ? service.cardBullets : undefined;
  return (
    <article
      className={`group relative flex h-full flex-col rounded-2xl border bg-white p-7 transition-all duration-300 focus-within:ring-2 focus-within:ring-signal/40 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-28px_rgb(11_37_69/0.35)] ${
        flagship ? "border-ink/40 shadow-[inset_0_3px_0_0_var(--color-amber)]" : "border-line hover:border-ink/25"
      }`}
    >
      {flagship && (
        <span className="mb-4 self-start rounded-full bg-amber/15 px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-[#7a5300]">
          Flagship
        </span>
      )}
      <h3 className="text-xl font-semibold tracking-tight">
        {/* The whole card is clickable through this link's ::after overlay. */}
        <Link href={serviceHref(service.slug)} className="after:absolute after:inset-0 after:rounded-2xl after:content-['']">
          {service.title}
        </Link>
      </h3>
      <p className="mt-3 leading-7">{service.summary ?? service.tagline}</p>
      {items && items.length > 0 && (
        <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-[15px] leading-6 text-slate">
          {items.map((b) => (
            <li key={b} className="grid grid-cols-[10px_1fr] gap-2.5">
              <span aria-hidden className="mt-[0.7rem] h-px w-2.5 bg-signal" />{b}
            </li>
          ))}
        </ul>
      )}
      <span aria-hidden className="mt-auto flex items-center gap-1.5 pt-6 text-[15px] font-medium text-signal transition-colors group-hover:text-signal-dark">
        {flagship ? "Read the full method" : "Read more"}{" "}
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
      </span>
    </article>
  );
}

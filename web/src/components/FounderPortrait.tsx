import Image from "next/image";
import type { SanityImage } from "@/lib/content";
import { FOUNDER_PHOTO_SRC } from "@/lib/site";
import { urlFor } from "@/sanity/image";

/**
 * Founder portrait in a 4:5 frame. Uses the Sanity photo if one is set,
 * then the file named in FOUNDER_PHOTO_SRC, and otherwise a monogram card
 * that reads as a deliberate design element rather than a missing image.
 */
export function FounderPortrait({
  photo, name, priority = false, className = "",
}: {
  photo?: SanityImage | null; name: string; priority?: boolean; className?: string;
}) {
  const src = photo?.asset
    ? urlFor(photo).width(900).height(1125).fit("crop").url()
    : FOUNDER_PHOTO_SRC;

  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-ink ${className}`}>
        <Image
          src={src}
          alt={photo?.alt ?? `Portrait of ${name}`}
          width={900}
          height={1125}
          sizes="(min-width: 1024px) 400px, 90vw"
          priority={priority}
          className="aspect-[4/5] h-auto w-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10" />
      </div>
    );
  }

  return (
    <div className={`relative aspect-[4/5] overflow-hidden rounded-2xl bg-night ${className}`} role="img" aria-label={`${name}, DBJ PhysIQ brand mark`}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "repeating-radial-gradient(circle at 78% 22%, rgb(139 185 242 / 0.22) 0 1px, transparent 1px 22px), radial-gradient(circle at 78% 22%, rgb(42 120 214 / 0.35), transparent 60%)",
        }}
      />
      <div aria-hidden className="absolute right-[22%] top-[22%] h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-amber shadow-[0_0_24px_4px_rgb(237_161_0/0.5)]" />
      <div className="absolute inset-x-7 bottom-7">
        <Image src="/brand-mark-inverse.svg" alt="" width={72} height={72} className="h-16 w-16" />
        <p aria-hidden className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-mist/80">{name}</p>
      </div>
    </div>
  );
}

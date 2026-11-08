import Link from "next/link";

type Variant = "primary" | "secondary" | "inverse" | "accent" | "ghost";
type Props = { href: string; children: React.ReactNode; variant?: Variant; arrow?: boolean };

const styles: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-ink-2",
  secondary: "border border-line bg-white text-ink hover:border-ink",
  inverse: "bg-white text-ink hover:bg-paper",
  // Amber with ink text: the main call to action on dark sections (contrast 7.1:1, WCAG AAA).
  accent: "bg-amber text-ink hover:bg-amber-soft shadow-[0_8px_30px_-8px_rgb(237_161_0/0.55)]",
  ghost: "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
};

export function Button({ href, children, variant = "primary", arrow = false }: Props) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium transition-all duration-200 ${styles[variant]}`;
  const content = (
    <>
      {children}
      {arrow && (
        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
      )}
    </>
  );
  return external ? (
    <a href={href} className={cls}>{content}</a>
  ) : (
    <Link href={href} className={cls}>{content}</Link>
  );
}

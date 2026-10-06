import Link from "next/link";

type Props = { href: string; children: React.ReactNode; variant?: "primary" | "secondary" | "light" };

export function Button({ href, children, variant = "primary" }: Props) {
  const styles = {
    primary: "bg-signal text-white hover:bg-signal-dark",
    secondary: "border border-white/40 text-white hover:bg-white/10",
    light: "border border-ink/20 text-ink hover:bg-ink/5",
  }[variant];
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const cls = `inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition ${styles}`;
  return external ? (
    <a href={href} className={cls}>{children}</a>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}

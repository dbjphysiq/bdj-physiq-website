import Link from "next/link";

type Props = { href: string; children: React.ReactNode; variant?: "primary" | "secondary" | "inverse" };

export function Button({ href, children, variant = "primary" }: Props) {
  const styles = {
    primary: "bg-ink text-white hover:bg-ink-2",
    secondary: "border border-line bg-white text-ink hover:border-ink",
    inverse: "bg-white text-ink hover:bg-paper",
  }[variant];
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const cls = `inline-flex items-center justify-center rounded-full px-5 py-3 text-[15px] font-medium transition-colors ${styles}`;
  return external ? (
    <a href={href} className={cls}>{children}</a>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}

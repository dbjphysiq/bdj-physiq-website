/** Small monospace label above a heading. */
export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const color = tone === "dark" ? "text-amber" : "text-signal";
  return (
    <p className={`flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.16em] ${color} ${className}`}>
      <span aria-hidden className="h-px w-6 bg-current opacity-70" />
      {children}
    </p>
  );
}

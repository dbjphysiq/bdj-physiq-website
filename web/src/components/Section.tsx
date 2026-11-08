import { Container } from "./Container";

type Tone = "white" | "paper" | "night";

/**
 * A page section with a clear three-step type hierarchy, largest first:
 *
 *   label  (h2, large)      e.g. "Trust"
 *   title  (subtitle, medium) e.g. "How we earn trust"
 *   intro  (body)
 *
 * Every heading is bigger than the text directly beneath it. With no label,
 * the title becomes the h2.
 */
export function Section({
  id, eyebrow, title, intro, children, tone = "white", border = true, grid = false, className = "",
}: {
  id?: string;
  /** Short section name, shown as the large heading. */
  eyebrow?: string;
  /** Descriptive line: a subtitle under the label, or the heading when there is no label. */
  title?: string;
  intro?: string;
  children?: React.ReactNode; tone?: Tone; border?: boolean; grid?: boolean; className?: string;
}) {
  const dark = tone === "night";
  const bg = { white: "bg-white", paper: "bg-paper", night: "bg-night text-mist on-dark" }[tone];
  const rule = dark ? "" : border ? "border-t border-line" : "";
  const texture = grid ? (dark ? "bg-grid-night" : "bg-grid-fine") : "";
  const heading = eyebrow ?? title;
  const subtitle = eyebrow ? title : undefined;

  return (
    <section id={id} className={`relative isolate ${bg} ${rule} py-20 sm:py-28 ${className}`}>
      {texture && <div aria-hidden className={`absolute inset-0 -z-10 ${texture} [mask-image:linear-gradient(to_bottom,black,transparent_85%)]`} />}
      <Container>
        {heading && (
          <h2 className={`max-w-3xl text-[2.25rem] font-semibold leading-[1.1] tracking-tight sm:text-5xl ${dark ? "text-white" : ""}`}>
            {heading}
          </h2>
        )}
        {subtitle && (
          <p className={`mt-4 max-w-3xl font-display text-xl font-medium leading-snug tracking-tight sm:text-[1.6rem] ${dark ? "text-white/85" : "text-ink/80"}`}>
            {subtitle}
          </p>
        )}
        {intro && <p className={`mt-5 max-w-2xl text-lg leading-8 ${dark ? "text-mist" : ""}`}>{intro}</p>}
        {children && <div className={heading || intro ? "mt-14" : ""}>{children}</div>}
      </Container>
    </section>
  );
}

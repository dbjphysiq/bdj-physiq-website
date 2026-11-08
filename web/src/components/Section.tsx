import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";

type Tone = "white" | "paper" | "night";

export function Section({
  id, eyebrow, title, intro, children, tone = "white", border = true, grid = false, className = "",
}: {
  id?: string; eyebrow?: string; title?: string; intro?: string;
  children?: React.ReactNode; tone?: Tone; border?: boolean; grid?: boolean; className?: string;
}) {
  const bg = { white: "bg-white", paper: "bg-paper", night: "bg-night text-mist on-dark" }[tone];
  const rule = tone === "night" ? "" : border ? "border-t border-line" : "";
  const texture = grid ? (tone === "night" ? "bg-grid-night" : "bg-grid-fine") : "";
  return (
    <section id={id} className={`relative isolate ${bg} ${rule} py-20 sm:py-28 ${className}`}>
      {texture && <div aria-hidden className={`absolute inset-0 -z-10 ${texture} [mask-image:linear-gradient(to_bottom,black,transparent_85%)]`} />}
      <Container>
        {eyebrow && <Eyebrow tone={tone === "night" ? "dark" : "light"}>{eyebrow}</Eyebrow>}
        {title && (
          <h2 className={`${eyebrow ? "mt-5" : ""} max-w-3xl text-3xl font-semibold tracking-tight sm:text-[2.6rem] sm:leading-[1.12] ${tone === "night" ? "text-white" : ""}`}>
            {title}
          </h2>
        )}
        {intro && <p className={`mt-5 max-w-2xl text-lg leading-8 ${tone === "night" ? "text-mist" : ""}`}>{intro}</p>}
        {children && <div className={title || intro ? "mt-14" : ""}>{children}</div>}
      </Container>
    </section>
  );
}

import { Container } from "./Container";

export function Section({
  id, eyebrow, title, intro, children, tone = "white",
}: {
  id?: string; eyebrow?: string; title?: string; intro?: string;
  children?: React.ReactNode; tone?: "white" | "paper" | "ink";
}) {
  const bg = { white: "bg-white", paper: "bg-paper", ink: "bg-ink text-white" }[tone];
  return (
    <section id={id} className={`${bg} py-16 sm:py-20`}>
      <Container>
        {eyebrow && <p className={`mb-3 text-sm font-semibold uppercase tracking-wider ${tone === "ink" ? "text-amber" : "text-signal"}`}>{eyebrow}</p>}
        {title && <h2 className={`max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl ${tone === "ink" ? "text-white" : "text-ink"}`}>{title}</h2>}
        {intro && <p className={`mt-4 max-w-3xl text-lg leading-8 ${tone === "ink" ? "text-slate-300" : "text-muted"}`}>{intro}</p>}
        {children && <div className={title || intro ? "mt-10" : ""}>{children}</div>}
      </Container>
    </section>
  );
}

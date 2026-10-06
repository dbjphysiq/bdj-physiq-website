import { Container } from "./Container";

export function Section({
  id, title, intro, children, tone = "white", border = true,
}: {
  id?: string; title?: string; intro?: string;
  children?: React.ReactNode; tone?: "white" | "paper"; border?: boolean;
}) {
  const bg = tone === "paper" ? "bg-paper" : "bg-white";
  return (
    <section id={id} className={`${bg} ${border ? "border-t border-line" : ""} py-20 sm:py-24`}>
      <Container>
        {title && <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-[2.5rem] sm:leading-[1.15]">{title}</h2>}
        {intro && <p className="mt-5 max-w-2xl text-lg leading-8">{intro}</p>}
        {children && <div className={title || intro ? "mt-14" : ""}>{children}</div>}
      </Container>
    </section>
  );
}

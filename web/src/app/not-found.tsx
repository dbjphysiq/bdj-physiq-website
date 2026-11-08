import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title="This page is outside our model's range."
      intro="The address may have changed, or the page may never have existed.">
      <div className="flex flex-wrap gap-3">
        <Button href="/" variant="accent" arrow>Back to the homepage</Button>
        <Button href="/services" variant="ghost">See our services</Button>
      </div>
    </PageHero>
  );
}

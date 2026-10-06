import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="font-display text-lg font-semibold text-signal">404</p>
      <h1 className="mt-2 text-3xl font-semibold">This page is outside our model&apos;s range.</h1>
      <div className="mt-8"><Button href="/">Back to the homepage</Button></div>
    </Container>
  );
}

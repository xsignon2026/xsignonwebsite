import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = { title: "Style guide", robots: { index: false, follow: false } };

function Samples() {
  return (
    <Container className="space-y-6">
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <p className="max-w-2xl">
        Body text. Press Tab to move through the controls below and check that the focus ring is
        clearly visible. <a href="#top">This is a text link.</a>
      </p>
      <div className="flex flex-wrap gap-4">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button disabled>Disabled</Button>
        <ButtonLink href="#top">Button link</ButtonLink>
      </div>
    </Container>
  );
}

// S-10: every primitive on a light and a dark band.
export default function StyleguidePage() {
  return (
    <main id="top">
      <Section band="light">
        <Samples />
      </Section>
      <Section band="dark">
        <Samples />
      </Section>
    </main>
  );
}

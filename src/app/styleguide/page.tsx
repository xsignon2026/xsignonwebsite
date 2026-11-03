import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LinkArrow } from "@/components/ui/LinkArrow";

export const metadata: Metadata = { title: "Style guide", robots: { index: false, follow: false } };

function Samples({ dark = false }: { dark?: boolean }) {
  return (
    <Container className="space-y-6">
      <p className="text-eyebrow font-bold uppercase tracking-[0.2em]">
        {dark ? "Dark band" : "Light band"}
      </p>
      <h1>Display heading</h1>
      <h2>Section heading</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <p className="max-w-[62ch]">
        Body text, 17px / 1.55. Press Tab to move through the controls below and check that the
        focus ring is clearly visible on this band.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <Button>Book a strategy call</Button>
        {dark ? (
          <>
            <Button variant="white">White button</Button>
            <Button variant="contact">Contact Us</Button>
          </>
        ) : (
          <Button variant="outline">View more</Button>
        )}
        <Button disabled>Disabled</Button>
        <ButtonLink href="#top">Button link</ButtonLink>
        <LinkArrow href="#top" onDark={dark}>
          Link with arrow
        </LinkArrow>
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
        <Samples dark />
      </Section>
    </main>
  );
}

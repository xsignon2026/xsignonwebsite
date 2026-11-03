import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function Home() {
  return (
    <main>
      <Section band="dark">
        <Container>
          <h1>XSignOn</h1>
          <p className="mt-4 max-w-[520px] text-hero-sub">
            Site foundation is in place. Pages are built in the next phase.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/styleguide">Style guide</ButtonLink>
            <ButtonLink href="/tokens" variant="white">
              Tokens
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </main>
  );
}

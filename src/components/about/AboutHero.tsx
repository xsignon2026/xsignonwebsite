import { BeamsCanvas } from "@/components/motion/BeamsCanvas";

// The About hero: centred text only, on the navy grid with the slow beams. No button; the logo already leads home.
export function AboutHero({
  content,
}: {
  content: { eyebrow: string; title: string; description: string };
}) {
  return (
    <section className="ab-hero" id="aboutHero" data-nav="dark">
      <BeamsCanvas id="aboutBeams" className="about-beams" />
      <div className="wrap ab-hero-grid">
        <div className="ab-hero-copy">
          <p className="hero-eyebrow">{content.eyebrow}</p>
          <h1 className="ab-title">{content.title}</h1>
          <p className="ab-sub">{content.description}</p>
        </div>
      </div>
    </section>
  );
}

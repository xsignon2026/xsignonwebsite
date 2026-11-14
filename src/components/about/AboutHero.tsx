import { HeroArtLayers } from "@/components/home/HeroVariants";
import { BeamsCanvas } from "@/components/motion/BeamsCanvas";

// The About hero: text only, on the navy grid with the slow beams. No button; the logo already leads home.
export function AboutHero() {
  return (
    <section className="ab-hero" id="aboutHero" data-nav="dark">
      <BeamsCanvas id="aboutBeams" className="about-beams" />
      <div className="wrap ab-hero-grid">
        <div className="ab-hero-copy">
          <p className="hero-eyebrow">About XSignOn</p>
          <h1 className="ab-title">
            Security built around identity, governance, and what comes next.
          </h1>
          <p className="ab-sub">
            XSignOn develops cybersecurity products and security approaches that help organizations
            strengthen access, govern emerging technology, and prepare for evolving digital risk.
          </p>
        </div>
        <div className="ab-hero-art" aria-hidden="true">
          <HeroArtLayers />
        </div>
      </div>
    </section>
  );
}

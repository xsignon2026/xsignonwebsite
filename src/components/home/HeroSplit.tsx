import Link from "next/link";
import { HeroBeams } from "./HeroBeams";
import { HeroSlider } from "./HeroSlider";
import { MarqueeStrip } from "./MarqueeStrip";
import type { HomeHero } from "@/types/home";

interface HeroSplitProps {
  hero: HomeHero;
  standards?: string[];
}

// T-091: Hero split section with dynamic canvas beams, product slider, and marquee.
// Source: xsignon-home-beams.html (lines 1708-1835).
export function HeroSplit({ hero, standards }: HeroSplitProps) {
  return (
    <>
      <section className="hero-split" data-nav="dark">
        <HeroBeams />
        <div className="wrap mx-auto max-w-[1280px] px-6">
          <div className="hero-grid">
            <div className="hero-copy">
              <h1 className="h-display">
                Identity and access{" "}
                <span className="h1-acc">
                  built on{" "}
                  <span className="sel-box">
                    <i className="sh tl" aria-hidden="true" />
                    <i className="sh tr" aria-hidden="true" />
                    <i className="sh bl" aria-hidden="true" />
                    <i className="sh br" aria-hidden="true" />
                    <i className="sh tm" aria-hidden="true" />
                    <i className="sh bm" aria-hidden="true" />
                    trust
                  </span>
                  .
                </span>
              </h1>
              <p className="hero-sub">{hero.subline}</p>
              <div className="hero-actions">
                <Link
                  className="btn btn-navy"
                  href={hero.primaryButton.href}
                >
                  {hero.primaryButton.text}{" "}
                  <span className="arr-up" aria-hidden="true">
                    ↗
                  </span>
                </Link>
                <Link
                  className="link-arrow"
                  href={hero.secondaryButton.href}
                >
                  {hero.secondaryButton.text}{" "}
                  <span className="arr" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </div>
            <HeroSlider slides={hero.slides} />
          </div>
        </div>
      </section>
      <MarqueeStrip standards={standards} />
    </>
  );
}

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
        <div className="hero-lines" aria-hidden="true">
          <svg
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            stroke="#9db9f5"
            strokeWidth="1.5"
          >
            <g>
              <ellipse cx="1300" cy="140" rx="130" ry="86" />
              <ellipse cx="1300" cy="140" rx="215" ry="140" />
              <ellipse cx="1300" cy="140" rx="300" ry="196" />
              <ellipse cx="1300" cy="140" rx="385" ry="252" />
              <ellipse cx="1300" cy="140" rx="470" ry="308" />
            </g>
            <g>
              <ellipse cx="140" cy="790" rx="120" ry="80" />
              <ellipse cx="140" cy="790" rx="200" ry="132" />
              <ellipse cx="140" cy="790" rx="280" ry="184" />
              <ellipse cx="140" cy="790" rx="360" ry="236" />
            </g>
            <circle cx="760" cy="430" r="180" />
            <circle cx="760" cy="430" r="262" />
          </svg>
          <svg
            className="hl-b"
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            stroke="#9db9f5"
            strokeWidth="1"
          >
            <path d="M0 150 H1600 M0 300 H1600 M0 450 H1600 M0 600 H1600 M0 750 H1600 M200 0 V900 M400 0 V900 M600 0 V900 M800 0 V900 M1000 0 V900 M1200 0 V900 M1400 0 V900" />
            <circle cx="330" cy="180" r="120" />
            <circle cx="330" cy="180" r="188" />
            <circle cx="1420" cy="720" r="110" />
            <circle cx="1420" cy="720" r="176" />
          </svg>
        </div>
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

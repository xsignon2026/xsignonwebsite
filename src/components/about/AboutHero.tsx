"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { BeamsCanvas } from "@/components/motion/BeamsCanvas";

// The About hero (prototype view-about). The two title words rise in one after the other once the page
// is ready; the class "in" starts that. Under "reduce motion" the words show at once (see prototype.css).
export function AboutHero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => ref.current?.classList.add("in"));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="about-hero" id="aboutHero" data-nav="dark" ref={ref}>
      <BeamsCanvas id="aboutBeams" className="about-beams" />
      <div className="wrap">
        <Link className="back-pill on-dark" href="/">
          <span className="arr" aria-hidden="true">
            &#8592;
          </span>
          Back to home
        </Link>
        <h1 className="h-display ah-title" aria-label="About XSignOn">
          <span className="w" style={{ "--i": 0 } as React.CSSProperties} aria-hidden="true">
            About
          </span>{" "}
          <span className="w" style={{ "--i": 1 } as React.CSSProperties} aria-hidden="true">
            XSignOn
          </span>
        </h1>
        <p className="about-sub">Sign-in people can trust. Governance an auditor can check.</p>
      </div>
    </section>
  );
}

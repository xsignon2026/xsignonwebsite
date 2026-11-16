"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// "Standards and frameworks": a plain carousel of text cards, one per standard. It moves on by itself
// every few seconds, stops while a visitor points at it or uses the arrows, and does not move at all for
// visitors who ask for reduced motion. These are standards the products are built to; they are not
// customers or integrations.

const ITEMS = [
  {
    name: "FIDO2",
    kind: "Passwordless sign-in",
    text: "Phishing-resistant authentication with hardware keys.",
  },
  {
    name: "NIST AI-RMF",
    kind: "AI risk management",
    text: "Map and measure AI risk, and keep evidence current.",
  },
  {
    name: "NIST 800-207",
    kind: "Zero trust architecture",
    text: "Never trust, always verify, for every request.",
  },
  {
    name: "NIST PQC",
    kind: "Post-quantum cryptography",
    text: "Move to quantum-resistant methods on a clear plan.",
  },
] as const;

const INTERVAL_MS = 4500;

export function Standards() {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const goTo = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, []);

  // Keep the dots in step with where the visitor has scrolled to.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      const here = el.scrollLeft + el.offsetLeft;
      let best = 0;
      cards.forEach((c, i) => {
        if (Math.abs(c.offsetLeft - here) < Math.abs(cards[best].offsetLeft - here)) best = i;
      });
      setIndex(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      const el = track.current;
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      goTo(atEnd ? 0 : Math.min(ITEMS.length - 1, index + 1));
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, reduced, index, goTo]);

  const step = (dir: 1 | -1) => {
    setPaused(true);
    goTo(Math.max(0, Math.min(ITEMS.length - 1, index + dir)));
  };

  return (
    <section className="block sc-sec" id="standards" data-nav="light" aria-labelledby="stdTitle">
      <div className="wrap">
        <div className="sec-row rv">
          <h2 className="h2" id="stdTitle">
            Standards and frameworks
          </h2>
          <p className="sc-note">
            What our products are built to. These are standards, not customers or integrations.
          </p>
        </div>
        <div
          className="sc-wrap rv"
          role="region"
          aria-roledescription="carousel"
          aria-label="Standards and frameworks"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <ul className="sc-track" ref={track}>
            {ITEMS.map((item, i) => (
              <li
                key={item.name}
                className="sc-card"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${ITEMS.length}: ${item.name}`}
              >
                <span className="sc-kind">{item.kind}</span>
                <strong>{item.name}</strong>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
          <div className="sc-ctrl">
            <div className="sc-dots">
              {ITEMS.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  className="sc-dot"
                  aria-label={`Show ${item.name}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => {
                    setPaused(true);
                    goTo(i);
                  }}
                />
              ))}
            </div>
            <div className="sc-arrows">
              <button
                type="button"
                className="sc-arrow"
                aria-label="Previous standard"
                onClick={() => step(-1)}
              >
                &#8592;
              </button>
              <button
                type="button"
                className="sc-arrow"
                aria-label="Next standard"
                onClick={() => step(1)}
              >
                &#8594;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

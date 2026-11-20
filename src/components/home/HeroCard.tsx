"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HeroArt } from "@/components/home/HeroArt";
import { AmsWheel } from "@/components/prototype/AmsWheel";
import { HeroDomainScan } from "@/components/home/HeroDomainScan";
import type { HeroSlideContent } from "@/types/home-content";

// The home hero card: the glass-slab picture on top, then a one-liner and a button for the current slide.
// It moves to the next slide every few seconds and stops while a visitor points at it, uses it with the
// keyboard, or has asked for reduced motion. All the footers stay on the page, stacked in one space (the
// inactive ones are invisible), so the card is always as tall as the tallest footer and a domain check that
// is running is not lost when the card moves on.

const INTERVAL_MS = 7000;

export function HeroCard({ slides: heroSlides }: { slides: HeroSlideContent[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const total = heroSlides.length;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reduced || total < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % total);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, reduced, total]);

  const slide = heroSlides[index];

  return (
    <div
      className="hc"
      role="region"
      aria-roledescription="carousel"
      aria-label="Latest from XSignOn"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hc-stage" key={slide.id}>
        {slide.art === "wheel" ? (
          <AmsWheel />
        ) : (
          <HeroArt
            variant={slide.variant}
            text={{ tag: slide.tag, heading: slide.heading, sub: slide.sub }}
          />
        )}
      </div>
      <div className="hc-foot">
        <div className="hc-slides">
          {heroSlides.map((s, i) => (
            <div
              key={s.id}
              className="hc-slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}`}
              data-active={i === index || undefined}
            >
              {s.action.type === "scan" ? (
                <HeroDomainScan />
              ) : (
                <>
                  {s.line && <p className="hc-line">{s.line}</p>}
                  <Link className="link-arrow" href={s.action.href}>
                    {s.action.label}{" "}
                    <span className="arr" aria-hidden="true">
                      &#8594;
                    </span>
                  </Link>
                </>
              )}
            </div>
          ))}
        </div>
        {total > 1 && (
          <div className="hc-dots">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className="hc-dot"
                aria-label={`Show slide ${i + 1} of ${total}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { EcosystemItemContent } from "@/types/home-content";

// The XSignOn Security Ecosystem, in the same style as the solution illustrations: four glowing icon tiles
// on one flow line, each with a short description. A small light travels along the line and lights each tile in
// turn. Visitors who ask for reduced motion see everything lit and at rest. The text is real text, so it
// reads for screen readers too.

type IconName = EcosystemItemContent["icon"];

const CYCLE = 8; // seconds for the light to cross the line

function Icon({ name }: { name: IconName }) {
  switch (name) {
    case "grid":
      return (
        <>
          <rect x="-11" y="-11" width="9" height="9" rx="1.5" />
          <rect x="2" y="-11" width="9" height="9" rx="1.5" />
          <rect x="-11" y="2" width="9" height="9" rx="1.5" />
          <rect x="2" y="2" width="9" height="9" rx="1.5" />
        </>
      );
    case "database":
      return (
        <>
          <ellipse cx="0" cy="-8" rx="11" ry="4" />
          <path d="M-11 -8v16c0 2.2 5 4 11 4s11-1.8 11-4V-8M-11 0c0 2.2 5 4 11 4s11-1.8 11-4" />
        </>
      );
    case "key":
      return (
        <>
          <circle cx="-6" cy="0" r="6" />
          <path d="M0 0H13M9 0v6" />
        </>
      );
    default:
      return (
        <>
          <circle cx="0" cy="0" r="2.5" />
          <ellipse cx="0" cy="0" rx="13" ry="5" />
          <ellipse cx="0" cy="0" rx="13" ry="5" transform="rotate(60)" />
          <ellipse cx="0" cy="0" rx="13" ry="5" transform="rotate(120)" />
        </>
      );
  }
}

export function SecurityEcosystem({
  entries,
  label = "XSignOn Security Ecosystem: four capabilities clients receive through XSignOn",
}: {
  /** Content from the CMS: the four items. */
  entries: ReadonlyArray<EcosystemItemContent>;
  label?: string;
}) {
  const card = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = card.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (hits) => {
        if (hits.some((hit) => hit.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    // If the section is already on screen when the page's scripts start (for example after a jump to it),
    // show it straight away instead of waiting for the observer.
    const frame = window.requestAnimationFrame(() => {
      const box = el.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) {
        setInView(true);
        observer.disconnect();
      }
    });
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="se-flow rv"
      ref={card}
      data-in={inView || undefined}
      style={{ "--cycle": `${CYCLE}s` } as CSSProperties}
      role="group"
      aria-label={label}
    >
      <span className="se-flow-line" aria-hidden="true" />
      <span className="se-flow-light" aria-hidden="true" />
      <ol className="se-flow-list">
        {entries.map((item, i) => (
          <li
            key={item.title}
            style={{ "--d": `${(i / entries.length) * CYCLE + 0.4}s` } as CSSProperties}
          >
            <span className="se-flow-tile">
              <svg viewBox="-16 -16 32 32" aria-hidden="true">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <Icon name={item.icon} />
                </g>
              </svg>
            </span>
            <span className="se-flow-n">{String(i + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.lines.join(" ")}</p>
            <span className="se-flow-via">{item.via.join(" · ")}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { GlassItem } from "@/components/common/glass";

// A row of glass blocks on a dark card, used for the Standards section on Home and "Why XSignOn" on About.
// The blocks drop into place when the card scrolls into view, then a highlight moves from block to block
// (the lit block lifts and its caption brightens). Pointing at a block holds the highlight. Reduced motion
// shows everything at rest.

const INTERVAL_MS = 2200;
const W = 62;
const H = 36;
const D = 54;

export function GlassCubes({
  items,
  flow = false,
}: {
  items: ReadonlyArray<GlassItem>;
  flow?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    // If the card is already on screen when the page's scripts start, show it straight away.
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

  useEffect(() => {
    if (held || reduced || !inView) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % items.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [held, reduced, inView, items.length]);

  return (
    <div
      className={`std-card rv${flow ? " std-flow" : ""}`}
      ref={root}
      data-in={inView || undefined}
    >
      <ul className="std-row" style={{ "--n": items.length } as React.CSSProperties}>
        {items.map((item, i) => {
          const on = reduced || active === i;
          return (
            <li
              key={item.title}
              className="std-item"
              data-on={on}
              style={{ "--d": `${i * 140}ms` } as React.CSSProperties}
              onPointerEnter={() => {
                setActive(i);
                setHeld(true);
              }}
              onPointerLeave={() => setHeld(false)}
            >
              <svg viewBox="-80 -50 160 150" className="std-cube" aria-hidden="true">
                <ellipse cx="14" cy="86" rx="62" ry="14" fill={item.right} opacity="0.25" />
                <g className="std-lift">
                  <polygon
                    points={`${-W},0 0,${H} 0,${H + D} ${-W},${D}`}
                    fill={item.left}
                    fillOpacity="0.9"
                    stroke="#fff"
                    strokeOpacity="0.4"
                  />
                  <polygon
                    points={`${W},0 0,${H} 0,${H + D} ${W},${D}`}
                    fill={item.right}
                    fillOpacity="0.9"
                    stroke="#fff"
                    strokeOpacity="0.4"
                  />
                  <polygon
                    points={`0,${-H} ${W},0 0,${H} ${-W},0`}
                    fill={item.top}
                    fillOpacity="0.9"
                    stroke="#fff"
                    strokeOpacity="0.4"
                  />
                  <polygon points={`0,${-H} ${W},0 0,${H}`} fill="#fff" opacity="0.2" />
                  <text
                    transform="matrix(0.866 0.5 -0.866 0.5 0 0)"
                    x="0"
                    y="3"
                    textAnchor="middle"
                    className="std-cube-t"
                  >
                    {item.label}
                  </text>
                </g>
              </svg>
              <div className="std-cap">
                <strong>{item.title}</strong>
                <span className="std-kind">{item.kind}</span>
                <p>{item.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

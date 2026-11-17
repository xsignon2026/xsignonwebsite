"use client";

import { useEffect, useRef, useState } from "react";
import { PerspectiveGrid } from "@/components/motion/PerspectiveGrid";
import { howWeWork } from "@/data/about";

// "How we work": three steps. On wide screens the stage stays in place while the visitor scrolls, and the
// step changes as they go (prototype js/01.js, "journeys"). On narrow screens, or with "reduce motion",
// all three steps are shown one under the other and nothing is pinned.
const STEP_VIEWPORTS = 0.46;

export function AboutHow() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const mode = () => setPinned(window.innerWidth >= 900 && !reduced.matches);
    const scroll = () => {
      if (!el.classList.contains("pin-on")) return;
      const rect = el.getBoundingClientRect();
      if (rect.height === 0) return;
      const step = window.innerHeight * STEP_VIEWPORTS;
      const index = Math.floor(-rect.top / step);
      setActive(Math.max(0, Math.min(howWeWork.steps.length - 1, index)));
    };
    const both = () => {
      mode();
      scroll();
    };

    mode();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", both);
    reduced.addEventListener("change", both);
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", both);
      reduced.removeEventListener("change", both);
    };
  }, []);

  const goTo = (index: number) => {
    const el = root.current;
    if (!el) return;
    if (!pinned) {
      setActive(index);
      return;
    }
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + index * window.innerHeight * STEP_VIEWPORTS + 4,
      behavior: "smooth",
    });
  };

  return (
    <div className="how-box has-persp">
      <PerspectiveGrid className="bg-persp" horizon={0.5} alpha={1.5} />
      <div className={`journey${pinned ? " pin-on" : ""}`} id="journeyHow" ref={root}>
        <div className="j-stage">
          <div className="j-rail">
            {howWeWork.steps.map((step, i) => (
              <button
                key={step.rail}
                type="button"
                className={active === i ? "act" : undefined}
                aria-pressed={active === i}
                onClick={() => goTo(i)}
              >
                {step.rail}
              </button>
            ))}
          </div>
          <div className="j-panels tall">
            {howWeWork.steps.map((step, i) => (
              <article className={`j-panel${active === i ? " act" : ""}`} key={step.title}>
                <h4 className="h4">{step.title}</h4>
                <p>{step.text}</p>
                <p className="you-get">{step.get}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="j-scroll" aria-hidden="true">
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  );
}

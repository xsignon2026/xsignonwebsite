"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { whyXSignOn } from "@/data/about";

// "Why XSignOn": four ideas around a centre mark. One is shown at a time and they rotate every five
// seconds while the hub is on screen (prototype js/07.js). The Pause button is in the prototype too;
// rotation also stops under "reduce motion", and the four ideas can always be picked by hand.
const INTERVAL = 5000;

const CONNECTORS = [
  "M240 63 C330 63, 340 150, 400 210",
  "M560 63 C470 63, 460 150, 400 210",
  "M240 357 C330 357, 340 270, 400 210",
  "M560 357 C470 357, 460 270, 400 210",
];

export function WhyXSignOnHub() {
  const hub = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [swapping, setSwapping] = useState(false);
  const [pulse, setPulse] = useState<number | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    const observer = new IntersectionObserver((e) => setVisible(e[0].isIntersecting), {
      threshold: 0.2,
    });
    if (hub.current) observer.observe(hub.current);
    return () => {
      query.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);

  const select = useCallback(
    (index: number) => {
      if (!reduced) {
        setSwapping(true);
        setPulse(index);
        window.setTimeout(() => setSwapping(false), 180);
      }
      setCurrent(index);
    },
    [reduced],
  );

  // The timer restarts whenever the shown idea changes, so a click gives a full five seconds.
  useEffect(() => {
    if (paused || !visible || reduced) return;
    const timer = window.setTimeout(() => select((current + 1) % whyXSignOn.length), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [current, paused, visible, reduced, select]);

  const item = whyXSignOn[current];
  const running = !paused && visible && !reduced;

  return (
    <div className="whyx rv" id="whyHub" ref={hub}>
      <div className="wx-stage" role="tablist" aria-label="Why XSignOn">
        <svg
          className="wx-lines"
          viewBox="0 0 800 420"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {CONNECTORS.map((d, i) => (
            <path key={`c${i}`} className={`wx-conn${current === i ? " on" : ""}`} d={d} />
          ))}
          {CONNECTORS.map((d, i) => (
            <path
              key={`p${i}`}
              className={`wx-pulse${pulse === i ? " go" : ""}`}
              pathLength={100}
              d={d}
              onAnimationEnd={() => setPulse(null)}
            />
          ))}
        </svg>
        {whyXSignOn.map((idea, i) => (
          <button
            key={idea.n}
            className={`wx-node n${i + 1}`}
            type="button"
            role="tab"
            aria-selected={current === i}
            onClick={() => select(i)}
          >
            <span className="wnum">{idea.n}</span>
            <span className="wtxt">{idea.title}</span>
          </button>
        ))}
        <div className="hubx-centre wx-centre" aria-hidden="true">
          <span className="hx-ring r1" />
          <span className="hx-ring r2" />
          <span className="hx-ring r3" />
          <div className="hubx-core">
            <Image
              className="mk-dark"
              src="/images/about/img-c4e2d2b6.png"
              alt=""
              width={150}
              height={160}
            />
            <Image
              className="mk-light"
              src="/images/about/img-eb58cada.png"
              alt=""
              width={150}
              height={160}
            />
          </div>
        </div>
      </div>
      <div className={`wx-detail${swapping ? " swap" : ""}`} aria-live="polite">
        <p className="wd-n" id="wxN">
          {item.n}
        </p>
        <h3 id="wxT">{item.title}</h3>
        <p id="wxP">{item.text}</p>
      </div>
      <div className="hubx-foot wx-foot">
        <div className="hubx-timer" aria-hidden="true">
          <i
            key={current}
            className={running ? "run" : undefined}
            style={running ? { animationDuration: `${INTERVAL}ms` } : undefined}
          />
        </div>
        <button
          className="hubx-pause"
          id="wxPause"
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? "Play" : "Pause"}
        </button>
      </div>
    </div>
  );
}

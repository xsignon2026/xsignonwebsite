"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";

interface PillarData {
  num: string;
  title: string;
  desc: string;
  href: string;
}

const PILLARS: PillarData[] = [
  {
    num: "01",
    title: "Human oversight by design",
    desc: "Review, approval and override are built into the flow of work, with a named person accountable at every step that matters.",
    href: "/solutions/ai-and-digital-governance",
  },
  {
    num: "02",
    title: "Autonomy within authority",
    desc: "Agents act freely inside the tier they have earned, and the boundary is always visible to the people who set it.",
    href: "/solutions/ai-and-digital-governance",
  },
  {
    num: "03",
    title: "Evidence everywhere",
    desc: "Every decision carries its signals, sources and reasoning, ready for reviewers today and auditors tomorrow.",
    href: "/solutions/identity-governance",
  },
  {
    num: "04",
    title: "Governance on the inside",
    desc: "Policy lives inside the product, applied as work happens, rather than in documents checked after the fact.",
    href: "/enterprise",
  },
];

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function WhyXSignOnHub(): React.JSX.Element {
  const [active, setActive] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot,
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused || isReducedMotion) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % PILLARS.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, isReducedMotion]);

  const current = PILLARS[active];

  return (
    <div className="whyx rv" id="whyHub">
      <div className="wx-stage" role="tablist" aria-label="Why XSignOn core principles">
        <svg
          className="wx-lines"
          viewBox="0 0 800 420"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className={`wx-conn ${active === 0 ? "on" : ""}`}
            d="M240 63 C330 63, 340 150, 400 210"
          />
          <path
            className={`wx-conn ${active === 1 ? "on" : ""}`}
            d="M560 63 C470 63, 460 150, 400 210"
          />
          <path
            className={`wx-conn ${active === 2 ? "on" : ""}`}
            d="M240 357 C330 357, 340 270, 400 210"
          />
          <path
            className={`wx-conn ${active === 3 ? "on" : ""}`}
            d="M560 357 C470 357, 460 270, 400 210"
          />
        </svg>

        {PILLARS.map((p, idx) => {
          const isSelected = active === idx;
          const nodeClasses = ["n1", "n2", "n3", "n4"][idx];

          return (
            <button
              key={p.num}
              className={`wx-node ${nodeClasses}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => {
                setActive(idx);
                setIsPaused(true);
              }}
            >
              <span className="wnum">{p.num}</span>
              <span className="wtxt">{p.title}</span>
            </button>
          );
        })}

        <div className="hubx-centre wx-centre" aria-hidden="true">
          <span className="hx-ring r1" />
          <span className="hx-ring r2" />
          <span className="hx-ring r3" />
          <div
            className="hubx-core"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "var(--acc-ink, #4f46e5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: 800,
              fontSize: "16px",
            }}
          >
            X
          </div>
        </div>
      </div>

      <div className="wx-detail" aria-live="polite">
        <p className="wd-n">{current.num}</p>
        <h3 id="wxT">{current.title}</h3>
        <p id="wxP">{current.desc}</p>
      </div>

      {/* Static Fallback Links for Keyboard & Screen Reader Users (T-126 Invariant) */}
      <div
        className="static-pillars"
        style={{
          marginTop: "40px",
          paddingTop: "24px",
          borderTop: "1px solid var(--line)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {PILLARS.map((p) => (
            <Link
              key={p.num}
              href={p.href}
              className="rel-row"
              style={{ display: "block", textDecoration: "none" }}
            >
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                  color: "var(--acc-ink, #4f46e5)",
                  marginBottom: "4px",
                }}
              >
                Pillar {p.num}
              </div>
              <div
                style={{
                  fontWeight: 600,
                  color: "var(--txt)",
                  fontSize: "14px",
                  marginBottom: "4px",
                }}
              >
                {p.title}
              </div>
              <div style={{ fontSize: "13px", color: "var(--gray)", lineHeight: 1.5 }}>
                {p.desc}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

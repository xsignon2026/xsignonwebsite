"use client";

import { useEffect, useId, useState } from "react";

// The Partner ecosystem diagram: one disc, five spokes. A spotlight moves down the spokes (about 1.5
// seconds each): the lit spoke has dark text, a coloured line and node, and a tinted cylinder; the others
// are quiet. It stops when the visitor points at or focuses a spoke, and it does not move at all for
// visitors who have asked for reduced motion (every spoke is then shown in full). On phones the same five
// items are a plain list.

type IconName = "grid" | "database" | "key" | "atom" | "link";

const SPOKES: ReadonlyArray<{
  n: string;
  title: string;
  lines: [string, string];
  color: string;
  icon: IconName;
  x: number; // node x
  y: number; // row
}> = [
  {
    n: "01",
    title: "Micro-segmentation",
    lines: ["Segmentation policies, zone and flow", "maps, containment events."],
    color: "#b3aed0",
    icon: "grid",
    x: 233,
    y: 112,
  },
  {
    n: "02",
    title: "Data + AI security",
    lines: ["Discovery findings, classification", "results, AI data access."],
    color: "#8f89b8",
    icon: "database",
    x: 312,
    y: 197,
  },
  {
    n: "03",
    title: "Hardware biometrics",
    lines: ["FIDO2 biometric keys, enrolment", "and hardware supply."],
    color: "#6f67a8",
    icon: "key",
    x: 332,
    y: 282,
  },
  {
    n: "04",
    title: "Quantum-safe",
    lines: ["Cryptographic inventory and", "post-quantum methods."],
    color: "#3b3668",
    icon: "atom",
    x: 312,
    y: 367,
  },
  {
    n: "05",
    title: "Your existing tools",
    lines: ["Works alongside the tools your", "teams already use."],
    color: "#c6001d",
    icon: "link",
    x: 233,
    y: 452,
  },
];

const INTERVAL_MS = 1500;

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
    case "atom":
      return (
        <>
          <circle cx="0" cy="0" r="2.5" />
          <ellipse cx="0" cy="0" rx="13" ry="5" />
          <ellipse cx="0" cy="0" rx="13" ry="5" transform="rotate(60)" />
          <ellipse cx="0" cy="0" rx="13" ry="5" transform="rotate(120)" />
        </>
      );
    default:
      return (
        <>
          <circle cx="-7" cy="0" r="7" />
          <circle cx="7" cy="0" r="7" />
        </>
      );
  }
}

export function PartnerEcosystem() {
  const uid = useId().replace(/:/g, "");
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
    if (held || reduced) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % SPOKES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [held, reduced]);

  const hold = (index: number) => {
    setActive(index);
    setHeld(true);
  };

  return (
    <div className="pe-card rv">
      <svg
        className="pe-svg"
        viewBox="-110 0 850 540"
        role="group"
        aria-label="Partner ecosystem: five areas that work alongside your tools"
      >
        <defs>
          <linearGradient id={`${uid}e`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d9d4eb" />
            <stop offset="0.45" stopColor="#8f89b8" />
            <stop offset="0.8" stopColor="#3b3668" />
            <stop offset="1" stopColor="#c6001d" />
          </linearGradient>
          <linearGradient id={`${uid}d`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#e6e2f3" />
          </linearGradient>
          <linearGradient id={`${uid}a`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b3aed0" />
            <stop offset="0.5" stopColor="#3b3668" />
            <stop offset="1" stopColor="#c6001d" />
          </linearGradient>
          <linearGradient id={`${uid}c`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#f6f4fb" />
            <stop offset="1" stopColor="#e8e4f4" />
          </linearGradient>
        </defs>

        <path
          d="M42 196 A172 172 0 0 0 42 370"
          fill="none"
          stroke="#c9c3e3"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="0.1 9"
        />
        <ellipse cx="115" cy="440" rx="95" ry="20" fill="#1a1240" opacity="0.09" />
        <circle cx="120" cy="300" r="116" fill={`url(#${uid}e)`} />
        <circle cx="126" cy="292" r="111" fill="#1a1240" opacity="0.22" />
        <circle cx="130" cy="284" r="108" fill={`url(#${uid}d)`} />
        <text x="130" y="276" textAnchor="middle" className="pe-title">
          Partner
        </text>
        <text x="130" y="302" textAnchor="middle" className="pe-title">
          ecosystem
        </text>
        <circle cx="110" cy="332" r="4" fill="#b3aed0" />
        <circle cx="130" cy="332" r="4" fill="#6f67a8" />
        <circle cx="150" cy="332" r="4" fill="#c6001d" />
        <path
          d="M227 112 A190 190 0 0 1 227 452"
          fill="none"
          stroke={`url(#${uid}a)`}
          strokeWidth="2"
        />

        {SPOKES.map((s, i) => {
          const on = reduced || active === i;
          const ty = s.y - 36;
          return (
            <g
              key={s.n}
              className="pe-sp"
              data-on={on}
              style={{ "--c": s.color } as React.CSSProperties}
              onPointerEnter={() => hold(i)}
              onPointerLeave={() => setHeld(false)}
            >
              <path className="pe-ln" d={`M${s.x + 6} ${s.y} H610`} fill="none" strokeWidth="1.5" />
              <circle className="pe-nd" cx={s.x} cy={s.y} r="10" fill="#fff" strokeWidth="1.5" />
              <circle className="pe-dot" cx={s.x} cy={s.y} r="4" />
              <text x={s.x + 23} y={ty} className="pe-num">
                {s.n}
              </text>
              <text x={s.x + 45} y={ty} className="pe-name">
                {s.title}
              </text>
              <text x={s.x + 23} y={ty + 16} className="pe-desc">
                {s.lines[0]}
              </text>
              <text x={s.x + 23} y={ty + 30} className="pe-desc">
                {s.lines[1]}
              </text>
              <line
                x1="618"
                y1={s.y - 2}
                x2="672"
                y2={s.y - 32}
                stroke="#cfc9e6"
                strokeWidth="60"
                strokeLinecap="round"
                transform="translate(5 8)"
              />
              <line
                x1="618"
                y1={s.y - 2}
                x2="672"
                y2={s.y - 32}
                stroke={`url(#${uid}c)`}
                strokeWidth="58"
                strokeLinecap="round"
              />
              <ellipse className="pe-neck" cx="616" cy={s.y} rx="20" ry="17" />
              <circle
                className="pe-cap"
                cx="674"
                cy={s.y - 34}
                r="35"
                fill={`url(#${uid}d)`}
                strokeWidth="2"
              />
              <g
                className="pe-ic"
                transform={`translate(674 ${s.y - 34})`}
                fill="none"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <Icon name={s.icon} />
              </g>
            </g>
          );
        })}
      </svg>

      <ol className="pe-list">
        {SPOKES.map((s) => (
          <li key={s.n} style={{ "--c": s.color } as React.CSSProperties}>
            <span className="pe-list-num">{s.n}</span>
            <span>
              <strong>{s.title}</strong>
              <span>{s.lines.join(" ")}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

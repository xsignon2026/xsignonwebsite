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
  lines: string[];
  color: string;
  icon: IconName;
}> = [
  {
    n: "01",
    title: "Micro-segmentation",
    lines: ["Segmentation policies, zone and flow", "maps, containment events."],
    color: "#b3aed0",
    icon: "grid",
  },
  {
    n: "02",
    title: "Data + AI security",
    lines: ["Discovery findings, classification", "results, AI data access."],
    color: "#8f89b8",
    icon: "database",
  },
  {
    n: "03",
    title: "Hardware biometrics",
    lines: ["FIDO2 biometric keys, enrolment", "and hardware supply."],
    color: "#6f67a8",
    icon: "key",
  },
  {
    n: "04",
    title: "Quantum-safe",
    lines: ["Cryptographic inventory and", "post-quantum methods."],
    color: "#3b3668",
    icon: "atom",
  },
  {
    n: "05",
    title: "Your existing tools",
    lines: ["Works alongside the tools your", "teams already use."],
    color: "#c6001d",
    icon: "link",
  },
];

// Layout of the wide, short diagram (units of the SVG view box).
const ROW = 52;
const TOP = 40;
const NODE_X = [205, 240, 255, 240, 205];

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
        viewBox="0 0 740 288"
        role="group"
        aria-label="Partner ecosystem: five areas that work alongside your tools"
      >
        <defs>
          <linearGradient id={`${uid}e`} x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0" stopColor="#b3aed0" />
            <stop offset="0.45" stopColor="#6f67a8" />
            <stop offset="0.8" stopColor="#3b3668" />
            <stop offset="1" stopColor="#c6001d" />
          </linearGradient>
          <linearGradient id={`${uid}w`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#eeedf2" />
            <stop offset="1" stopColor="#b9b7c4" />
          </linearGradient>
          <linearGradient id={`${uid}d`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#f0eef6" />
          </linearGradient>
          <linearGradient id={`${uid}a`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b3aed0" />
            <stop offset="0.5" stopColor="#3b3668" />
            <stop offset="1" stopColor="#c6001d" />
          </linearGradient>
          <linearGradient id={`${uid}c`} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#f8f9fb" />
            <stop offset="1" stopColor="#dde0e8" />
          </linearGradient>
          <filter
            id={`${uid}s`}
            filterUnits="userSpaceOnUse"
            x="-100"
            y="-100"
            width="900"
            height="500"
          >
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <filter
            id={`${uid}b`}
            filterUnits="userSpaceOnUse"
            x="-100"
            y="-100"
            width="900"
            height="500"
          >
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        <g transform="translate(-30 -103) scale(0.74)">
          <path
            d="M268 172 A168 168 0 1 0 292 470"
            fill="none"
            stroke={`url(#${uid}a)`}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="0.1 15"
          />
          <ellipse
            cx="200"
            cy="500"
            rx="150"
            ry="22"
            fill="#1a1240"
            opacity="0.1"
            filter={`url(#${uid}s)`}
          />
          <circle cx="196" cy="347" r="148" fill={`url(#${uid}e)`} />
          <circle cx="196" cy="330" r="131" fill={`url(#${uid}w)`} />
          <circle cx="196" cy="305" r="131" fill={`url(#${uid}d)`} />
          <text x="196" y="298" textAnchor="middle" className="pe-title">
            Partner
          </text>
          <text x="196" y="328" textAnchor="middle" className="pe-title">
            ecosystem
          </text>
          <circle cx="166" cy="358" r="4.5" fill="#b3aed0" />
          <circle cx="196" cy="358" r="4.5" fill="#6f67a8" />
          <circle cx="226" cy="358" r="4.5" fill="#c6001d" />
        </g>

        <path
          d="M205 40 C228 56 238 74 240 92 C242 112 255 124 255 144 C255 166 252 180 240 196 C232 214 220 232 205 248"
          fill="none"
          stroke={`url(#${uid}a)`}
          strokeWidth="1.4"
        />

        {SPOKES.map((s, i) => {
          const on = reduced || active === i;
          const ny = TOP + ROW * i;
          const nx = NODE_X[i];
          const tx = nx + 18;
          const cx = nx + 400;
          const cy = ny - 4;
          const bx = cx - 10;
          const by = cy + 14;
          return (
            <g
              key={s.n}
              className="pe-sp"
              data-on={on}
              style={{ "--c": s.color } as React.CSSProperties}
              onPointerEnter={() => hold(i)}
              onPointerLeave={() => setHeld(false)}
            >
              <path
                className="pe-ln"
                d={`M${nx + 8} ${ny - 4} H${bx - 52} C${bx - 36} ${ny - 4} ${bx - 32} ${by + 4} ${bx - 20} ${by + 9}`}
                fill="none"
                strokeWidth="1.2"
              />
              <circle className="pe-nd" cx={nx} cy={ny} r="8" fill="#fff" strokeWidth="1.6" />
              <circle className="pe-dot" cx={nx} cy={ny} r="3.4" />
              <text x={tx} y={ny - 9} className="pe-num">
                {s.n}
              </text>
              <text x={tx + 17} y={ny - 9} className="pe-name">
                {s.title}
              </text>
              {s.lines.map((line, k) => (
                <text key={line} x={tx} y={ny + 9 + k * 11} className="pe-desc">
                  {line}
                </text>
              ))}

              <line
                x1={bx - 6}
                y1={by + 11}
                x2={cx - 6}
                y2={cy + 11}
                stroke="#1a1240"
                strokeOpacity="0.12"
                strokeWidth="40"
                strokeLinecap="round"
                filter={`url(#${uid}s)`}
              />
              <ellipse className="pe-base" cx={bx - 2} cy={by + 17} rx="18" ry="7" />
              <ellipse
                className="pe-glow"
                cx={bx - 2}
                cy={by + 18}
                rx="18"
                ry="6"
                fill="var(--c)"
                filter={`url(#${uid}b)`}
              />
              <line
                x1={bx}
                y1={by}
                x2={cx}
                y2={cy}
                stroke={`url(#${uid}c)`}
                strokeWidth="40"
                strokeLinecap="round"
              />
              <circle className="pe-cap" cx={cx} cy={cy} r="20" fill="#fff" strokeWidth="1" />
              <g
                className="pe-ic"
                transform={`translate(${cx} ${cy}) scale(0.5)`}
                fill="none"
                strokeWidth="2"
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
        {SPOKES.map((s, i) => (
          <li key={s.n} data-on={active === i} style={{ "--c": s.color } as React.CSSProperties}>
            <button
              type="button"
              aria-pressed={held && active === i}
              onClick={() => (held && active === i ? setHeld(false) : hold(i))}
            >
              <span className="pe-list-num">{s.n}</span>
              <span>
                <strong>{s.title}</strong>
                <span>{s.lines.join(" ")}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

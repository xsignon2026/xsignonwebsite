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
  node: [number, number];
  text: [number, number, number]; // title x, title baseline y, description x
  cap: [number, number]; // cylinder top face centre
  base: [number, number]; // cylinder bottom centre
}> = [
  {
    n: "01",
    title: "Micro-segmentation",
    lines: ["Segmentation policies,", "zone and flow maps,", "containment events."],
    color: "#b3aed0",
    icon: "grid",
    node: [260, 190],
    text: [262, 111, 276],
    cap: [498, 65],
    base: [474, 108],
  },
  {
    n: "02",
    title: "Data + AI security",
    lines: ["Discovery findings,", "classification results,", "AI data access."],
    color: "#8f89b8",
    icon: "database",
    node: [324, 242],
    text: [350, 195, 365],
    cap: [593, 148],
    base: [562, 190],
  },
  {
    n: "03",
    title: "Hardware biometrics",
    lines: ["FIDO2 biometric keys,", "enrolment and hardware", "supply."],
    color: "#6f67a8",
    icon: "key",
    node: [357, 314],
    text: [380, 282, 397],
    cap: [650, 252],
    base: [620, 294],
  },
  {
    n: "04",
    title: "Quantum-safe",
    lines: ["Cryptographic inventory", "and post-quantum", "methods."],
    color: "#3b3668",
    icon: "atom",
    node: [356, 390],
    text: [401, 375, 411],
    cap: [694, 378],
    base: [664, 420],
  },
  {
    n: "05",
    title: "Your existing tools",
    lines: ["Works alongside the tools", "your teams already use."],
    color: "#c6001d",
    icon: "link",
    node: [326, 457],
    text: [387, 466, 395],
    cap: [690, 504],
    base: [660, 546],
  },
];

const DETAIL: ReadonlyArray<{
  from: string[];
  to: string[];
  via: string[];
  lead: string;
  text: string;
}> = [
  {
    from: ["Segmentation policies", "Zone and flow maps", "Containment events"],
    to: ["One posture view", "Owners and findings", "Audit-ready evidence"],
    via: ["PostureOne"],
    lead: "Micro-Segmentation and Containment.",
    text: "Segmentation partners whose platforms PostureOne brings into one posture view.",
  },
  {
    from: ["Data discovery findings", "Classification results", "AI data access"],
    to: ["PostureOne evidence", "EvalOne evidence", "Reviewer-ready reports"],
    via: ["PostureOne", "EvalOne"],
    lead: "Data + AI Security and DSPM.",
    text: "Data security partners whose findings flow into PostureOne and EvalOne evidence.",
  },
  {
    from: ["FIDO2 biometric keys", "Key enrolment", "Hardware supply"],
    to: ["The AUTH key range", "Governed sign-in", "Support from XSignOn"],
    via: ["Passwordless Keys", "XSense"],
    lead: "Hardware Biometric Passwordless Authentication.",
    text: "The hardware behind the AUTH key range, delivered and supported by XSignOn.",
  },
  {
    from: ["Cryptographic inventory", "Post-quantum methods", "Certificate and key use"],
    to: ["Migration plan", "Evidence per system", "Clear owners"],
    via: ["Quantum-Safe Security"],
    lead: "Quantum-Safe Encryption and Cryptography.",
    text: "Cryptography partners supporting the move to post-quantum methods.",
  },
  {
    from: ["Your security tools", "Your identity systems", "Your data platforms"],
    to: ["One posture view", "Evidence per system", "Clear owners"],
    via: ["PostureOne"],
    lead: "Works with what you already use.",
    text: "XSignOn sits alongside the tools your teams already run, so nothing has to be replaced.",
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
        viewBox="0 8 806 618"
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
            x="-200"
            y="-200"
            width="1400"
            height="1100"
          >
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <filter
            id={`${uid}b`}
            filterUnits="userSpaceOnUse"
            x="-200"
            y="-200"
            width="1400"
            height="1100"
          >
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        <path
          d="M268 172 A168 168 0 1 0 292 470"
          fill="none"
          stroke={`url(#${uid}a)`}
          strokeWidth="3.5"
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

        <path
          d="M260 190 C300 205 322 222 324 242 C326 270 356 290 357 314 C358 345 360 368 356 390 C352 420 340 440 326 457"
          fill="none"
          stroke={`url(#${uid}a)`}
          strokeWidth="1.6"
        />

        {SPOKES.map((s, i) => {
          const on = reduced || active === i;
          const [nx, ny] = s.node;
          const [tx, ty, dx] = s.text;
          const [cx, cy] = s.cap;
          const [bx, by] = s.base;
          const ly = ty + 10;
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
                d={`M${nx + 2} ${ny - 11} C${nx + 6} ${ny - 40} ${tx - 6} ${ly + 8} ${tx + 8} ${ly} H${bx - 80} C${bx - 56} ${ly} ${bx - 52} ${by + 16} ${bx - 38} ${by + 22}`}
                fill="none"
                strokeWidth="1.5"
              />
              <circle className="pe-nd" cx={nx} cy={ny} r="11" fill="#fff" strokeWidth="2" />
              <circle className="pe-dot" cx={nx} cy={ny} r="5" />
              <text x={tx} y={ty} className="pe-num">
                {s.n}
              </text>
              <text x={tx + 22} y={ty} className="pe-name">
                {s.title}
              </text>
              {s.lines.map((line, k) => (
                <text key={line} x={dx} y={ty + 21 + k * 13.5} className="pe-desc">
                  {line}
                </text>
              ))}

              <line
                x1={bx - 12}
                y1={by + 22}
                x2={cx - 12}
                y2={cy + 22}
                stroke="#1a1240"
                strokeOpacity="0.12"
                strokeWidth="96"
                strokeLinecap="round"
                filter={`url(#${uid}s)`}
              />
              <ellipse className="pe-base" cx={bx - 4} cy={by + 34} rx="44" ry="15" />
              <ellipse
                className="pe-glow"
                cx={bx - 4}
                cy={by + 36}
                rx="44"
                ry="14"
                fill="var(--c)"
                filter={`url(#${uid}b)`}
              />
              <line
                x1={bx}
                y1={by}
                x2={cx}
                y2={cy}
                stroke={`url(#${uid}c)`}
                strokeWidth="96"
                strokeLinecap="round"
              />
              <circle className="pe-cap" cx={cx} cy={cy} r="48" fill="#fff" strokeWidth="1.5" />
              <g
                className="pe-ic"
                transform={`translate(${cx} ${cy})`}
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

      <div className="pe-detail" key={active}>
        <div className="pe-box">
          <div className="pe-eyebrow">From partners</div>
          <ul>
            {DETAIL[active].from.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div className="pe-via">
          <span className="pe-via-line" />
          <span className="pe-pill">Findings</span>
          <span className="pe-via-line" />
          <span className="pe-pill pe-pill-prod">{DETAIL[active].via.join(" + ")}</span>
          <span className="pe-via-line" />
          <span className="pe-pill">Evidence</span>
          <span className="pe-via-line" />
        </div>
        <div className="pe-box">
          <div className="pe-eyebrow">Lands in XSignOn</div>
          <ul>
            {DETAIL[active].to.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <p className="pe-lead">
          <strong>{DETAIL[active].lead}</strong> {DETAIL[active].text}
        </p>
      </div>

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

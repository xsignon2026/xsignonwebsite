"use client";

import { useEffect, useRef, useState } from "react";

// The XSignOn Security Ecosystem: four raised blocks, each with an icon, joined by numbered callouts.
// The blocks drop into place when the section scrolls into view, then a highlight moves from block to
// block (the lit block rises and its callout turns dark). Pointing at a block holds the highlight.
// Visitors who ask for reduced motion see everything at rest. On phones the same four items are a list.

type IconName = "grid" | "database" | "key" | "atom";

export type EcoItem = {
  n: string;
  title: string;
  lines: [string, string];
  icon: IconName;
  top: string;
  left: string;
  right: string;
  color: string;
};

export const ITEMS: ReadonlyArray<EcoItem> = [
  {
    n: "01",
    title: "Contain threats faster",
    lines: ["Zone and flow maps and containment", "events, in one posture view."],
    icon: "grid",
    top: "#b3aed0",
    left: "#8f89b8",
    right: "#6f67a8",
    color: "#8f89b8",
  },
  {
    n: "02",
    title: "Protect data and AI",
    lines: ["Discovery findings, classification", "results and AI data access."],
    icon: "database",
    top: "#6f67a8",
    left: "#554d90",
    right: "#3b3668",
    color: "#6f67a8",
  },
  {
    n: "03",
    title: "Sign in without passwords",
    lines: ["FIDO2 biometric keys, enrolment", "and hardware, governed end to end."],
    icon: "key",
    top: "#3b3668",
    left: "#2c2757",
    right: "#1f1b45",
    color: "#3b3668",
  },
  {
    n: "04",
    title: "Prepare for quantum risk",
    lines: ["A cryptographic inventory and a path", "to post-quantum methods."],
    icon: "atom",
    top: "#d4163a",
    left: "#a60019",
    right: "#7a0012",
    color: "#c6001d",
  },
];

// The blocks are drawn at a base size and scaled up by K. The centre of each block's top face (left, top,
// right, front) is computed from the base layout, in view-box units.
const K = 1.3;
const BASE: ReadonlyArray<[number, number]> = [
  [364, 188],
  [430, 150],
  [496, 188],
  [430, 226],
];
const CENTRES: ReadonlyArray<[number, number]> = BASE.map(([x, y]) => [
  430 + (x - 430) * K,
  190 + (y - 190) * K,
]);
const HW = 62 * K;
const HH = 36 * K;
const DEPTH = 60 * K;
// Each block has its own height (base units), which adds depth to the group. The ground level stays the same.
const HEIGHTS = [78, 96, 56, 68];
const topOf = (i: number) => CENTRES[i][1] - (HEIGHTS[i] * K - DEPTH);
export type EcoDetail = { from: string[]; via: string[]; to: string[] };

export const DETAIL: ReadonlyArray<EcoDetail> = [
  {
    from: ["Segmentation policies", "Zone and flow maps", "Containment events"],
    via: ["PostureOne"],
    to: ["One posture view", "Owners and findings", "Audit-ready evidence"],
  },
  {
    from: ["Data discovery findings", "Classification results", "AI data access"],
    via: ["PostureOne", "EvalOne"],
    to: ["PostureOne evidence", "EvalOne evidence", "Reviewer-ready reports"],
  },
  {
    from: ["FIDO2 biometric keys", "Key enrolment", "Hardware supply"],
    via: ["Passwordless Keys", "XSense"],
    to: ["The AUTH key range", "Governed sign-in", "Support from XSignOn"],
  },
  {
    from: ["Cryptographic inventory", "Post-quantum methods", "Certificate and key use"],
    via: ["Quantum-Safe Security"],
    to: ["Migration plan", "Evidence per system", "Clear owners"],
  },
];

const INTERVAL_MS = 2200;
// The phone view shows just the blocks; this is the part of the drawing that holds them.
const MX = 245;
const MW = 430;
const MIN_Y = topOf(1) - HH - 22;
const MAX_Y = CENTRES[3][1] + HH + DEPTH + 44;

// Decorative "tech" layer behind the blocks: hexagon outlines and circuit traces ending in node dots.
const hexPath = (x: number, y: number, r: number) =>
  Array.from({ length: 6 }, (_, k) => {
    const a = (Math.PI / 3) * k + Math.PI / 6;
    return `${k === 0 ? "M" : "L"}${(x + r * Math.cos(a)).toFixed(1)} ${(y + r * Math.sin(a)).toFixed(1)}`;
  }).join("") + "Z";
const HEXES: ReadonlyArray<[number, number, number]> = [
  [30, 30, 40],
  [930, 500, 44],
];
const TRACES: ReadonlyArray<{ d: string; dot: [number, number] }> = [];

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

// Where each callout sits, and the short line that joins it to its block.
const LEFT_X = CENTRES[0][0] - HW;
const RIGHT_X = CENTRES[2][0] + HW;
const TOP_Y = topOf(1) - HH;
const BOTTOM_Y = CENTRES[3][1] + HH + DEPTH;
const LABELS = [
  {
    x: 16,
    y: topOf(0) - 14,
    anchor: "start",
    leader: `M${LEFT_X - 16} ${topOf(0)}H${LEFT_X - 4}`,
  },
  {
    x: CENTRES[1][0] + 96,
    y: TOP_Y - 50,
    anchor: "start",
    leader: `M${CENTRES[1][0] + 88} ${TOP_Y - 42}H${CENTRES[1][0] + 40}L${CENTRES[1][0] + 8} ${TOP_Y - 2}`,
  },
  {
    x: RIGHT_X + 46,
    y: topOf(2) - 14,
    anchor: "start",
    leader: `M${RIGHT_X + 40} ${topOf(2)}H${RIGHT_X + 4}`,
  },
  {
    x: 430,
    y: BOTTOM_Y + 48,
    anchor: "middle",
    leader: `M430 ${BOTTOM_Y + 4}V${BOTTOM_Y + 28}`,
  },
] as const;

export function SecurityEcosystem({
  items = ITEMS,
  detail = DETAIL,
  viaLabel = "Delivered through",
  label = "XSignOn Security Ecosystem: four capabilities clients receive through XSignOn",
}: {
  items?: ReadonlyArray<EcoItem>;
  detail?: ReadonlyArray<EcoDetail>;
  viaLabel?: string;
  label?: string;
}) {
  const card = useRef<HTMLDivElement>(null);
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
    const el = card.current;
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

  useEffect(() => {
    if (held || reduced || !inView) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % items.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [held, reduced, inView, items.length]);

  const hold = (index: number) => {
    setActive(index);
    setHeld(true);
  };

  // Draw the blocks from back to front so the front block overlaps the others.
  const order = [1, 0, 2, 3];

  const shadows = (
    <g>
      {CENTRES.map(([cx, cy], i) => (
        <polygon
          key={i}
          fill={items[i].color}
          opacity="0.18"
          points={`${cx},${cy + HH + DEPTH - 6} ${cx + HW},${cy + DEPTH - 6} ${cx + HW + 120},${cy + DEPTH + 54} ${cx + 120},${cy + HH + DEPTH + 54}`}
        />
      ))}
    </g>
  );
  const blocks = (interactive: boolean) =>
    order.map((i) => {
      const item = items[i];
      const cx = CENTRES[i][0];
      const h = HEIGHTS[i] * K;
      const cy = topOf(i);
      const on = reduced || active === i;
      return (
        <g
          key={item.n}
          className="se-drop"
          style={{ "--d": `${i * 140}ms` } as React.CSSProperties}
        >
          <g
            className="se-cube"
            data-on={reduced ? undefined : on}
            onPointerEnter={interactive ? () => hold(i) : undefined}
            onPointerLeave={interactive ? () => setHeld(false) : undefined}
          >
            <polygon
              points={`${cx - HW},${cy} ${cx},${cy + HH} ${cx},${cy + HH + h} ${cx - HW},${cy + h}`}
              fill={item.left}
              fillOpacity="0.88"
              stroke="#fff"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
            <polygon
              points={`${cx + HW},${cy} ${cx},${cy + HH} ${cx},${cy + HH + h} ${cx + HW},${cy + h}`}
              fill={item.right}
              fillOpacity="0.88"
              stroke="#fff"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
            <polygon
              points={`${cx},${cy - HH} ${cx + HW},${cy} ${cx},${cy + HH} ${cx - HW},${cy}`}
              fill={item.top}
              fillOpacity="0.88"
              stroke="#fff"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
            <polygon
              points={`${cx},${cy - HH} ${cx + HW},${cy} ${cx},${cy + HH}`}
              fill="#fff"
              opacity="0.2"
            />
            <polygon
              className="se-hi"
              points={`${cx},${cy - HH} ${cx + HW},${cy} ${cx},${cy + HH} ${cx - HW},${cy}`}
              fill="#fff"
            />
            <g
              transform={`translate(${cx} ${cy}) matrix(0.866 0.5 -0.866 0.5 0 0) scale(1.6)`}
              fill="none"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <Icon name={item.icon} />
            </g>
          </g>
        </g>
      );
    });

  return (
    <div className="se-card rv" ref={card} data-in={inView || undefined}>
      <svg className="se-svg" viewBox="-10 -48 970 548" role="group" aria-label={label}>
        <g className="se-tech" aria-hidden="true">
          {HEXES.map(([x, y, r]) => (
            <path key={`${x}-${y}`} d={hexPath(x, y, r)} fill="none" strokeWidth="1" />
          ))}
          {TRACES.map((t) => (
            <g key={t.d}>
              <path className="se-trace" d={t.d} fill="none" strokeWidth="1.2" />
              <circle className="se-node" cx={t.dot[0]} cy={t.dot[1]} r="3.5" />
            </g>
          ))}
        </g>
        {shadows}

        {LABELS.map((label, i) => {
          const item = items[i];
          const on = reduced || active === i;
          return (
            <g
              key={item.n}
              className="se-callout"
              data-on={on}
              style={{ "--c": item.color } as React.CSSProperties}
            >
              <path className="se-leader" d={label.leader} fill="none" strokeWidth="1.5" />
              <text x={label.x} y={label.y} textAnchor={label.anchor}>
                <tspan className="se-num">{item.n}</tspan>
                <tspan className="se-name" dx="9">
                  {item.title}
                </tspan>
              </text>
              {item.lines.map((line, k) => (
                <text
                  key={line}
                  x={label.x}
                  y={label.y + 21 + k * 15}
                  textAnchor={label.anchor}
                  className="se-desc"
                >
                  {line}
                </text>
              ))}
              <text x={label.x} y={label.y + 58} textAnchor={label.anchor} className="se-via-t">
                <tspan className="se-via-k">{viaLabel} </tspan>
                <tspan className="se-via-b">{detail[i].via.join(" · ")}</tspan>
              </text>
            </g>
          );
        })}

        {blocks(true)}
      </svg>

      <div className="se-mobile">
        <svg
          className="se-svg-m"
          viewBox={`${MX} ${MIN_Y} ${MW} ${MAX_Y - MIN_Y}`}
          role="img"
          aria-label="Four raised blocks: contain threats, protect data and AI, sign in without passwords, prepare for quantum risk"
        >
          <g className="se-tech" aria-hidden="true">
            {HEXES.map(([x, y, r]) => (
              <path key={`${x}-${y}`} d={hexPath(x, y, r)} fill="none" strokeWidth="1" />
            ))}
            {TRACES.map((t) => (
              <g key={t.d}>
                <path className="se-trace" d={t.d} fill="none" strokeWidth="1.2" />
                <circle className="se-node" cx={t.dot[0]} cy={t.dot[1]} r="3.5" />
              </g>
            ))}
          </g>
          {shadows}
          {blocks(false)}
        </svg>
        {reduced ? (
          <ul className="se-static">
            {items.map((item) => (
              <li key={item.n}>
                <strong>
                  {item.n} {item.title}
                </strong>
                <span>{item.lines.join(" ")}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="se-now"
            key={active}
            style={{ "--c": items[active].color } as React.CSSProperties}
          >
            <span className="se-now-num">{items[active].n}</span>
            <strong>{items[active].title}</strong>
            <p>{items[active].lines.join(" ")}</p>
            <div className="se-now-pills">
              {detail[active].via.map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
            <div className="se-dots" aria-hidden="true">
              {items.map((item, i) => (
                <span key={item.n} data-on={i === active} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

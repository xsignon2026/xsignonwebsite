import type { CSSProperties } from "react";

// The AMS key life cycle wheel. Six areas around the ring light up in turn, and a signal runs from the AMS hub to
// each of the four AUTH keys. It is drawn as SVG and moved with CSS, and it stands still for visitors who
// prefer reduced motion. The key photos are the ones from the current xsignon.com.

const CX = 340;
const CY = 260;
const R_IN = 165;
const R_OUT = 235;

const AREAS: [string, number][] = [
  ["Lifecycle management", -75],
  ["Org. AD/AAD integration", -15],
  ["Audit log reports", 45],
  ["PIN policy", 105],
  ["Controlled enrolment", 165],
  ["Key assignment", 225],
];

const KEYS = [
  {
    name: "AUTH Bio",
    src: "/images/products-old/auth-bio.webp",
    w: 486,
    h: 1100,
    x: 340,
    y: 152,
    ly: 206,
    dx: 0,
    dy: -92,
    delay: 0.2,
  },
  {
    name: "AUTH Bio Desktop",
    src: "/images/products-old/auth-bio-desktop.webp",
    w: 800,
    h: 431,
    x: 438,
    y: 262,
    ly: 300,
    dx: 98,
    dy: 2,
    delay: 1.2,
  },
  {
    name: "AUTH Bio Touch",
    src: "/images/products-old/auth-bio-touch.webp",
    w: 445,
    h: 1100,
    x: 340,
    y: 350,
    ly: 404,
    dx: 0,
    dy: 90,
    delay: 2.2,
  },
  {
    name: "AUTH Bio Pro",
    src: "/images/products-old/auth-bio-pro.webp",
    w: 495,
    h: 1100,
    x: 236,
    y: 262,
    ly: 316,
    dx: -104,
    dy: 2,
    delay: 3.2,
  },
];

const point = (r: number, angle: number): [number, number] => {
  const t = (angle * Math.PI) / 180;
  return [CX + r * Math.cos(t), CY + r * Math.sin(t)];
};

const sector = (a0: number, a1: number) => {
  const [x0, y0] = point(R_OUT, a0);
  const [x1, y1] = point(R_OUT, a1);
  const [x2, y2] = point(R_IN, a1);
  const [x3, y3] = point(R_IN, a0);
  return `M${x0} ${y0}A${R_OUT} ${R_OUT} 0 0 1 ${x1} ${y1}L${x2} ${y2}A${R_IN} ${R_IN} 0 0 0 ${x3} ${y3}Z`;
};

// The text follows the ring: left to right along the top, and flipped along the bottom so it stays upright.
const textArc = (centre: number) => {
  const bottom = Math.sin((centre * Math.PI) / 180) > 0;
  const r = bottom ? 207 : 195;
  const [from, to] = bottom
    ? [point(r, centre + 26), point(r, centre - 26)]
    : [point(r, centre - 26), point(r, centre + 26)];
  return `M${from[0]} ${from[1]}A${r} ${r} 0 0 ${bottom ? 0 : 1} ${to[0]} ${to[1]}`;
};

const imageHeight = (w: number, h: number) => (w > h ? 54 : 76);

export function AmsWheel() {
  return (
    <section className="page-sec ph-gallery-sec">
      <div className="wrap">
        <figure className="aw rv">
          <svg viewBox="0 0 680 520" role="img" aria-labelledby="aw-title aw-desc">
            <title id="aw-title">The AMS key life cycle wheel</title>
            <desc id="aw-desc">
              AMS at the centre manages the AUTH Bio, AUTH Bio Pro, AUTH Bio Desktop and AUTH Bio
              Touch keys. Around the ring: lifecycle management, directory integration, audit log
              reports, PIN policy, controlled enrolment and key assignment.
            </desc>
            {AREAS.map(([label, centre], i) => (
              <g key={label}>
                <path d={sector(centre - 29, centre + 29)} fill="#3b3668" />
                <path
                  className="aw-seg"
                  style={{ "--i": i } as CSSProperties}
                  d={sector(centre - 29, centre + 29)}
                  fill="#a60019"
                />
                <path id={`aw-arc-${i}`} d={textArc(centre)} fill="none" />
                <text className="aw-ring-text">
                  <textPath href={`#aw-arc-${i}`} startOffset="50%" textAnchor="middle">
                    {label}
                  </textPath>
                </text>
              </g>
            ))}
            <circle cx={CX} cy={CY} r="160" fill="#f4f3fa" stroke="#d9d4eb" />
            <line x1="227" y1="147" x2="453" y2="373" stroke="#ffffff" strokeWidth="14" />
            <line x1="453" y1="147" x2="227" y2="373" stroke="#ffffff" strokeWidth="14" />
            <circle
              className="aw-orbit"
              cx={CX}
              cy={CY}
              r="92"
              fill="none"
              stroke="#8f89b8"
              strokeWidth="1.5"
              strokeDasharray="2 7"
            />
            {KEYS.map((key) => {
              const h = imageHeight(key.w, key.h);
              const w = (key.w / key.h) * h;
              return (
                <g key={key.name}>
                  <circle
                    className="aw-halo"
                    style={{ "--d": `${key.delay}s` } as CSSProperties}
                    cx={key.x}
                    cy={key.y}
                    r={Math.max(w, h) / 2 + 8}
                    fill="none"
                    stroke="#c6001d"
                    strokeWidth="2"
                  />
                  <image
                    href={key.src}
                    x={key.x - w / 2}
                    y={key.y - h / 2}
                    width={w}
                    height={h}
                    aria-hidden="true"
                  />
                  <text className="aw-key-text" x={key.x} y={key.ly} textAnchor="middle">
                    {key.name}
                  </text>
                </g>
              );
            })}
            {KEYS.map((key) => (
              <circle
                key={key.name}
                className="aw-dot"
                style={
                  {
                    "--d": `${key.delay - 0.2}s`,
                    "--dx": `${key.dx}px`,
                    "--dy": `${key.dy}px`,
                  } as CSSProperties
                }
                cx={CX}
                cy={CY}
                r="5"
                fill="#c6001d"
              />
            ))}
            <circle cx={CX} cy={CY} r="40" fill="#ffffff" stroke="#d9d4eb" strokeWidth="2" />
            <text className="aw-hub" x={CX} y={CY + 7} textAnchor="middle">
              AMS
            </text>
          </svg>
          <figcaption>AMS covers the key life cycle across the AUTH key models</figcaption>
        </figure>
      </div>
    </section>
  );
}

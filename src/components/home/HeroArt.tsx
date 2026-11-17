// The hero picture (desktop only): a stack of glass slabs on a dotted platform. A glowing panel carries the
// headline idea, with a small toggle card, a chart card and floating sheets around it. Everything drifts
// slowly up and down; the toggle slides and the chart line draws itself. Visitors who ask for reduced
// motion see it still. Purely decorative, so it is hidden from screen readers.

const CX = 300;
const CY = 168;
export type P3 = [number, number, number];

// Project a point from the floor plan (x to the lower right, y to the lower left, z up) onto the picture.
export const iso = ([x, y, z]: P3): [number, number] => [
  CX + (x - y) * 0.866,
  CY + (x + y) * 0.5 - z,
];
export const pts = (list: P3[]) =>
  list
    .map((p) =>
      iso(p)
        .map((n) => n.toFixed(1))
        .join(","),
    )
    .join(" ");

// The plane of a slab's top face, for placing text and drawings on it.
export const plane = (x: number, y: number, z: number) => {
  const [tx, ty] = iso([x, y, z]);
  return `matrix(0.866 0.5 -0.866 0.5 ${tx.toFixed(1)} ${ty.toFixed(1)})`;
};

export function Slab({
  x,
  y,
  z,
  w,
  d,
  h,
  top,
  left,
  right,
  opacity = 1,
}: {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
  top: string;
  left: string;
  right: string;
  opacity?: number;
}) {
  const t = z + h;
  return (
    <g opacity={opacity} strokeLinejoin="round">
      <polygon
        points={pts([
          [x, y + d, z],
          [x + w, y + d, z],
          [x + w, y + d, t],
          [x, y + d, t],
        ])}
        fill={left}
        stroke="#fff"
        strokeOpacity="0.14"
      />
      <polygon
        points={pts([
          [x + w, y, z],
          [x + w, y + d, z],
          [x + w, y + d, t],
          [x + w, y, t],
        ])}
        fill={right}
        stroke="#fff"
        strokeOpacity="0.14"
      />
      <polygon
        points={pts([
          [x, y, t],
          [x + w, y, t],
          [x + w, y + d, t],
          [x, y + d, t],
        ])}
        fill={top}
        stroke="#fff"
        strokeOpacity="0.22"
      />
    </g>
  );
}

export function HeroArt() {
  return (
    <svg className="ha-svg" viewBox="70 96 470 330" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ha-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a2360" />
          <stop offset="0.55" stopColor="#6f67a8" />
          <stop offset="1" stopColor="#c6001d" />
        </linearGradient>
        <linearGradient id="ha-sheet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b3aed0" />
          <stop offset="0.6" stopColor="#6f67a8" />
          <stop offset="1" stopColor="#3b3668" />
        </linearGradient>
        <linearGradient id="ha-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8f89b8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#1a1450" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id="ha-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c9c6ff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#c9c6ff" stopOpacity="0" />
        </radialGradient>
        <filter id="ha-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      <ellipse
        cx="300"
        cy="340"
        rx="250"
        ry="70"
        fill="#6f67a8"
        opacity="0.22"
        filter="url(#ha-blur)"
      />

      {/* platform with a dotted outline */}
      <Slab
        x={-30}
        y={-20}
        z={0}
        w={310}
        d={250}
        h={14}
        top="#17114a"
        left="#0f0a38"
        right="#0b0730"
      />
      <polygon
        points={pts([
          [-14, -4, 14],
          [264, -4, 14],
          [264, 218, 14],
          [-14, 218, 14],
        ])}
        fill="none"
        stroke="#c9c6e6"
        strokeOpacity="0.55"
        strokeWidth="1.2"
        strokeDasharray="1.5 6"
        strokeLinecap="round"
      />

      {/* floating thin sheets, upper left */}
      <g className="ha-f3">
        <Slab
          x={-70}
          y={20}
          z={118}
          w={86}
          d={64}
          h={3}
          top="#3b3668"
          left="#26204f"
          right="#1c1740"
          opacity={0.7}
        />
        <Slab
          x={-70}
          y={20}
          z={104}
          w={86}
          d={64}
          h={3}
          top="#3b3668"
          left="#26204f"
          right="#1c1740"
          opacity={0.55}
        />
        <Slab
          x={-70}
          y={20}
          z={90}
          w={86}
          d={64}
          h={3}
          top="#3b3668"
          left="#26204f"
          right="#1c1740"
          opacity={0.4}
        />
        <g transform={plane(-52, 34, 121)}>
          <rect
            x="0"
            y="0"
            width="30"
            height="16"
            rx="8"
            fill="#1c1740"
            stroke="#8f89b8"
            strokeWidth="1"
          />
          <circle className="ha-knob" cx="8" cy="8" r="5" fill="#fff" />
        </g>
      </g>

      {/* the main glowing panel */}
      <g className="ha-f1">
        <Slab
          x={30}
          y={14}
          z={14}
          w={196}
          d={156}
          h={52}
          top="url(#ha-top)"
          left="#1b1450"
          right="#120c3a"
        />
        <g transform={plane(30, 14, 66)}>
          <ellipse cx="150" cy="120" rx="70" ry="42" fill="url(#ha-glow)" filter="url(#ha-blur)" />
          <text x="16" y="30" fill="#e4e1f5" fontSize="13" opacity="0.8">
            Governed access
          </text>
          <text x="16" y="64" fill="#fff" fontSize="25" fontWeight="700">
            Every identity,
          </text>
          <text x="16" y="92" fill="#fff" fontSize="25" fontWeight="700">
            under control
          </text>
          <text x="16" y="114" fill="#e4e1f5" fontSize="12" opacity="0.85">
            People, devices and AI agents
          </text>
          <text x="16" y="129" fill="#e4e1f5" fontSize="12" opacity="0.85">
            with a named owner.
          </text>
        </g>
        <g transform={plane(30, 14, 66)}>
          <rect x="150" y="8" width="30" height="16" rx="8" fill="#1c1740" opacity="0.85" />
          <circle className="ha-knob2" cx="172" cy="16" r="5" fill="#fff" />
        </g>
      </g>

      {/* lower left: glowing sheet over a glass block */}
      <g className="ha-f2">
        <Slab
          x={-6}
          y={150}
          z={14}
          w={116}
          d={74}
          h={30}
          top="url(#ha-glass)"
          left="url(#ha-glass)"
          right="url(#ha-glass)"
          opacity={0.85}
        />
        <Slab
          x={-2}
          y={154}
          z={44}
          w={108}
          d={66}
          h={4}
          top="url(#ha-sheet)"
          left="#3b3668"
          right="#2c2757"
        />
        <g transform={plane(-2, 154, 48)}>
          <ellipse
            cx="42"
            cy="26"
            rx="34"
            ry="20"
            fill="#ff6b7e"
            opacity="0.55"
            filter="url(#ha-blur)"
          />
          <path
            d="M14 46 q18 -28 36 -10 t44 -8"
            fill="none"
            stroke="#fff"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.85"
          />
        </g>
      </g>

      {/* lower right: glass block with a chart card */}
      <g className="ha-f4">
        <Slab
          x={186}
          y={126}
          z={14}
          w={92}
          d={64}
          h={36}
          top="url(#ha-glass)"
          left="url(#ha-glass)"
          right="url(#ha-glass)"
          opacity={0.85}
        />
        <Slab
          x={192}
          y={132}
          z={50}
          w={80}
          d={52}
          h={5}
          top="#1c1648"
          left="#26204f"
          right="#150f40"
        />
        <g transform={plane(192, 132, 55)}>
          <text x="8" y="14" fill="#c9c6e6" fontSize="8.5">
            Evidence attached
          </text>
          <rect x="8" y="22" width="64" height="24" rx="3" fill="#6f67a8" opacity="0.55" />
          <path
            className="ha-line"
            d="M12 40 L26 34 L38 38 L52 28 L68 30"
            fill="none"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
          />
          <circle cx="52" cy="28" r="2.6" fill="#ff6b7e" />
        </g>
      </g>

      {/* connector lines with glowing nodes */}
      <g fill="none" stroke="#c9c6e6" strokeOpacity="0.5" strokeWidth="1">
        <polyline
          points={pts([
            [-20, 60, 100],
            [-20, 60, 30],
          ])}
        />
        <polyline
          points={pts([
            [100, 190, 50],
            [150, 190, 50],
            [186, 160, 50],
          ])}
        />
      </g>
      {[
        [-20, 60, 30],
        [100, 190, 50],
        [186, 160, 50],
      ].map((p) => {
        const [x, y] = iso(p as P3);
        return <circle key={p.join()} className="ha-node" cx={x} cy={y} r="3.2" fill="#ff6b7e" />;
      })}
    </svg>
  );
}

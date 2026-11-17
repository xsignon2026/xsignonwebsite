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

// Three looks for the same scene, so the slides of the hero card are related but not copies of each other.
// Variant 0 is the original picture. Colours stay within the site palette (navy, violet, lilac, red).
export type HeroVariant = 0 | 1 | 2;

const THEMES = [
  {
    top: ["#2a2360", "#6f67a8", "#c6001d"],
    glow: "#c9c6ff",
    ink: "#fff",
    inkSoft: "#e4e1f5",
    main: { d: 156, h: 52 },
    sheets: [118, 104, 90],
    glass: { h: 30 },
    kind: "chart",
  },
  {
    top: ["#3b0a24", "#a60019", "#ff6b7e"],
    glow: "#ff9aa8",
    ink: "#fff",
    inkSoft: "#e4e1f5",
    main: { d: 150, h: 34 },
    sheets: [128, 114, 100, 86],
    glass: { h: 10 },
    kind: "bars",
  },
  {
    top: ["#cfcbe6", "#f4f3fa", "#ffffff"],
    glow: "#ffffff",
    ink: "#1a1240",
    inkSoft: "#3a3560",
    main: { d: 150, h: 60 },
    sheets: [118, 104, 90],
    glass: { h: 24 },
    kind: "chart",
  },
] as const;

export type HeroArtText = {
  tag: string;
  heading: readonly string[];
  sub: readonly string[];
};

const DEFAULT_TEXT: HeroArtText = {
  tag: "Governed access",
  heading: ["Every identity,", "under control"],
  sub: ["People, devices and AI agents", "with a named owner."],
};

export function HeroArt({
  variant = 0,
  text = DEFAULT_TEXT,
}: {
  variant?: HeroVariant;
  text?: HeroArtText;
}) {
  const t = THEMES[variant];
  const id = `ha${variant}`;
  const mainTop = 14 + t.main.h;
  const three = text.heading.length >= 3;
  const size = three ? 21 : 25;
  const step = three ? 24 : 28;
  const subY = 64 + (text.heading.length - 1) * step + 24;
  return (
    <svg className="ha-svg" viewBox="40 52 520 374" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-top`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={t.top[0]} />
          <stop offset="0.55" stopColor={t.top[1]} />
          <stop offset="1" stopColor={t.top[2]} />
        </linearGradient>
        <linearGradient id={`${id}-sheet`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b3aed0" />
          <stop offset="0.6" stopColor="#6f67a8" />
          <stop offset="1" stopColor="#3b3668" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8f89b8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#1a1450" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={t.glow} stopOpacity="0.55" />
          <stop offset="1" stopColor={t.glow} stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-blur`} x="-30%" y="-30%" width="160%" height="160%">
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
        filter={`url(#${id}-blur)`}
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
        {t.sheets.map((z, i) => (
          <Slab
            key={z}
            x={-70}
            y={20}
            z={z}
            w={86}
            d={64}
            h={3}
            top="#3b3668"
            left="#26204f"
            right="#1c1740"
            opacity={Math.max(0.3, 0.7 - i * 0.15)}
          />
        ))}
        <g transform={plane(-52, 34, t.sheets[0] + 3)}>
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
          d={t.main.d}
          h={t.main.h}
          top={`url(#${id}-top)`}
          left="#1b1450"
          right="#120c3a"
        />
        <g transform={plane(30, 14, mainTop)}>
          <ellipse
            cx="150"
            cy="120"
            rx="70"
            ry="42"
            fill={`url(#${id}-glow)`}
            filter={`url(#${id}-blur)`}
          />
          <text x="16" y="30" fill={t.inkSoft} fontSize="13" opacity="0.9">
            {text.tag}
          </text>
          {text.heading.map((line, i) => (
            <text
              key={line}
              x="16"
              y={58 + i * step + (three ? 0 : 6)}
              fill={t.ink}
              fontSize={size}
              fontWeight="700"
            >
              {line}
            </text>
          ))}
          {text.sub.map((line, i) => (
            <text key={line} x="16" y={subY + i * 15} fill={t.inkSoft} fontSize="12" opacity="0.9">
              {line}
            </text>
          ))}
        </g>
        <g transform={plane(30, 14, mainTop)}>
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
          h={t.glass.h}
          top={`url(#${id}-glass)`}
          left={`url(#${id}-glass)`}
          right={`url(#${id}-glass)`}
          opacity={0.85}
        />
        <Slab
          x={-2}
          y={154}
          z={14 + t.glass.h + 14}
          w={108}
          d={66}
          h={4}
          top={`url(#${id}-sheet)`}
          left="#3b3668"
          right="#2c2757"
        />
        <g transform={plane(-2, 154, 14 + t.glass.h + 18)}>
          <ellipse
            cx="42"
            cy="26"
            rx="34"
            ry="20"
            fill="#ff6b7e"
            opacity="0.55"
            filter={`url(#${id}-blur)`}
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

      {/* lower right: a chart card (0), a cube (1) or stacked bars (2) */}
      <g className="ha-f4">
        {t.kind === "chart" && (
          <>
            <Slab
              x={186}
              y={126}
              z={14}
              w={92}
              d={64}
              h={36}
              top={`url(#${id}-glass)`}
              left={`url(#${id}-glass)`}
              right={`url(#${id}-glass)`}
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
          </>
        )}

        {t.kind === "bars" && (
          <>
            <Slab
              x={186}
              y={126}
              z={14}
              w={92}
              d={64}
              h={14}
              top="#26204f"
              left="#1c1740"
              right="#150f40"
            />
            <Slab
              x={190}
              y={130}
              z={30}
              w={84}
              d={56}
              h={14}
              top="#3b3668"
              left="#26204f"
              right="#1c1740"
            />
            <Slab
              x={194}
              y={134}
              z={46}
              w={76}
              d={48}
              h={6}
              top="#6f67a8"
              left="#3b3668"
              right="#2c2757"
            />
            <g transform={plane(194, 134, 52)}>
              <rect x="8" y="26" width="9" height="14" rx="1.5" fill="#fff" opacity="0.85" />
              <rect x="24" y="18" width="9" height="22" rx="1.5" fill="#ff6b7e" />
              <rect x="40" y="22" width="9" height="18" rx="1.5" fill="#fff" opacity="0.85" />
              <rect x="56" y="12" width="9" height="28" rx="1.5" fill="#fff" opacity="0.85" />
            </g>
          </>
        )}
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

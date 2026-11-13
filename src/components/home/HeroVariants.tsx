import { iso, plane, pts, Slab, type P3 } from "@/components/home/HeroArt";

// Three more hero pictures, built from the same glass slabs as the first one, for the team to choose from.

const hex = (cx: number, cy: number, r: number) =>
  Array.from({ length: 6 }, (_, k) => {
    const a = (Math.PI / 3) * k;
    return `${k === 0 ? "M" : "L"}${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join("") + "Z";

function Platform() {
  return (
    <>
      <ellipse cx="300" cy="340" rx="250" ry="70" fill="#6f67a8" opacity="0.22" />
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
    </>
  );
}

function Nodes({ list }: { list: P3[] }) {
  return (
    <>
      {list.map((p) => {
        const [x, y] = iso(p);
        return <circle key={p.join()} className="ha-node" cx={x} cy={y} r="3.2" fill="#ff6b7e" />;
      })}
    </>
  );
}

const GLASS = ["#8f89b8", "#554d90", "#3b3668"] as const;

// B: four glass towers of different heights, like a bar chart standing on the platform.
export function HeroArtTowers() {
  const towers: ReadonlyArray<[number, number, number, readonly [string, string, string]]> = [
    [10, 10, 64, ["#6f67a8", "#3b3668", "#2c2757"]],
    [120, 10, 124, ["#d4163a", "#a60019", "#7a0012"]],
    [10, 120, 40, ["#b3aed0", "#8f89b8", "#6f67a8"]],
    [120, 120, 92, GLASS],
  ];
  return (
    <svg className="ha-svg" viewBox="70 96 470 330" aria-hidden="true" focusable="false">
      <Platform />
      {towers.map(([x, y, h, c], i) => (
        <g key={i} className={`ha-f${(i % 4) + 1}`}>
          <Slab
            x={x}
            y={y}
            z={14}
            w={84}
            d={84}
            h={h}
            top={c[0]}
            left={c[1]}
            right={c[2]}
            opacity={0.92}
          />
          <g transform={plane(x, y, 14 + h)}>
            <circle
              cx="42"
              cy="42"
              r="9"
              fill="none"
              stroke="#fff"
              strokeWidth="1.6"
              opacity="0.9"
            />
            <circle cx="42" cy="42" r="2.6" fill="#fff" />
          </g>
        </g>
      ))}
      <polyline
        points={pts([
          [52, 52, 92],
          [162, 52, 142],
          [162, 162, 110],
          [52, 162, 58],
        ])}
        fill="none"
        stroke="#fff"
        strokeOpacity="0.45"
        strokeDasharray="2 6"
        strokeLinecap="round"
      />
      <Nodes
        list={[
          [52, 52, 92],
          [162, 52, 142],
          [162, 162, 110],
          [52, 162, 58],
        ]}
      />
    </svg>
  );
}

// C: four floating layers (identity, data, access, evidence) joined by a column of glowing nodes.
export function HeroArtLayers() {
  const layers: ReadonlyArray<[string, number, readonly [string, string, string]]> = [
    ["Identity", 170, ["#b3aed0", "#8f89b8", "#6f67a8"]],
    ["Data", 118, ["#8f89b8", "#6f67a8", "#554d90"]],
    ["Access", 66, ["#6f67a8", "#554d90", "#3b3668"]],
    ["Evidence", 14, ["#d4163a", "#a60019", "#7a0012"]],
  ];
  return (
    <svg className="ha-svg" viewBox="70 96 470 330" aria-hidden="true" focusable="false">
      <ellipse cx="300" cy="372" rx="190" ry="44" fill="#6f67a8" opacity="0.22" />
      <g transform="translate(0 100)">
        <polyline
          points={pts([
            [150, 130, 22],
            [150, 130, 178],
          ])}
          fill="none"
          stroke="#fff"
          strokeOpacity="0.5"
          strokeDasharray="2 6"
          strokeLinecap="round"
        />
        {[...layers].reverse().map(([label, z, c], i) => (
          <g key={label} className={`ha-f${i + 1}`}>
            <Slab
              x={20}
              y={20}
              z={z}
              w={150}
              d={120}
              h={8}
              top={c[0]}
              left={c[1]}
              right={c[2]}
              opacity={0.9}
            />
            <g transform={plane(20, 20, z + 8)}>
              <text x="10" y="108" fill="#fff" fontSize="14" fontWeight="700" opacity="0.92">
                {label}
              </text>
            </g>
          </g>
        ))}
        <Nodes list={layers.map(([, z]) => [150, 130, z + 8] as P3)} />
      </g>
    </svg>
  );
}

// D: one large glowing cube at the centre of a hexagon, with small cubes and a ring around it and circuit lines.
export function HeroArtCore() {
  const [cx, cy] = iso([110, 90, 70]);
  return (
    <svg className="ha-svg" viewBox="70 96 470 330" aria-hidden="true" focusable="false">
      <Platform />
      <path
        d={hex(cx, cy + 6, 160)}
        fill="none"
        stroke="#8f89b8"
        strokeOpacity="0.55"
        strokeWidth="1.2"
      />
      <path
        d={hex(cx, cy + 6, 120)}
        fill="none"
        stroke="#8f89b8"
        strokeOpacity="0.3"
        strokeWidth="1"
      />
      <ellipse
        cx={iso([110, 90, 14])[0]}
        cy={iso([110, 90, 14])[1]}
        rx="175"
        ry="82"
        fill="none"
        stroke="#c9c6e6"
        strokeOpacity="0.5"
        strokeDasharray="2 7"
        strokeLinecap="round"
      />
      <g className="ha-f1">
        <Slab
          x={60}
          y={40}
          z={14}
          w={100}
          d={100}
          h={96}
          top="#8f89b8"
          left="#554d90"
          right="#2c2757"
        />
        <g transform={plane(60, 40, 110)}>
          <path
            d="M50 22l26 10v22c0 16-11 25-26 33-15-8-26-17-26-33V32z"
            fill="none"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M40 54l8 8 14-16"
            fill="none"
            stroke="#ff6b7e"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <g className="ha-f2">
        <Slab
          x={-10}
          y={70}
          z={30}
          w={34}
          d={34}
          h={34}
          top="#b3aed0"
          left="#8f89b8"
          right="#6f67a8"
          opacity={0.92}
        />
      </g>
      <g className="ha-f3">
        <Slab
          x={206}
          y={30}
          z={30}
          w={34}
          d={34}
          h={34}
          top="#d4163a"
          left="#a60019"
          right="#7a0012"
          opacity={0.92}
        />
      </g>
      <g className="ha-f4">
        <Slab
          x={100}
          y={190}
          z={30}
          w={34}
          d={34}
          h={34}
          top="#6f67a8"
          left="#554d90"
          right="#3b3668"
          opacity={0.92}
        />
      </g>
      <g fill="none" stroke="#c9c6e6" strokeOpacity="0.5">
        <polyline
          points={pts([
            [24, 87, 60],
            [60, 87, 60],
            [60, 90, 70],
          ])}
        />
        <polyline
          points={pts([
            [206, 47, 60],
            [170, 47, 60],
            [160, 60, 70],
          ])}
        />
        <polyline
          points={pts([
            [117, 190, 60],
            [117, 150, 60],
          ])}
        />
      </g>
      <Nodes
        list={[
          [24, 87, 60],
          [206, 47, 60],
          [117, 190, 60],
        ]}
      />
    </svg>
  );
}

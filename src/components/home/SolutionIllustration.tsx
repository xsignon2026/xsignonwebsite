"use client";

import { useEffect, useState } from "react";

// The four small animated illustrations for the Solutions section: bold cubes, cuboids and spheres in the
// XSignOn colours. They move on their own; visitors who ask for reduced motion see them still.

type ArtName = "identity" | "ai" | "key" | "atom";

const LABELS: Record<ArtName, string> = {
  identity: "Identity governance: people, devices and AI agents circling one governed core",
  ai: "AI and digital governance: an AI system stepping up through inventory, frameworks and evidence",
  key: "Passwordless security: an authenticator that scans a user and a key",
  atom: "Quantum-safe security: a row of systems migrating one after another",
};

type Palette = { t: string; l: string; r: string };
const LILAC: Palette = { t: "#b3aed0", l: "#8f89b8", r: "#6f67a8" };
const VIOLET: Palette = { t: "#6f67a8", l: "#554d90", r: "#3b3668" };
const NAVY: Palette = { t: "#3b3668", l: "#2c2757", r: "#1f1b45" };
const RED: Palette = { t: "#d4163a", l: "#a60019", r: "#7a0012" };

// A cube or cuboid seen from above at an angle; (x, y) is the centre of its top face.
function Cube({
  x,
  y,
  w = 22,
  d = 22,
  c,
}: {
  x: number;
  y: number;
  w?: number;
  d?: number;
  c: Palette;
}) {
  const h = w * 0.58;
  return (
    <g strokeWidth="2.5" strokeLinejoin="round">
      <polygon
        points={`${x - w},${y} ${x},${y + h} ${x},${y + h + d} ${x - w},${y + d}`}
        fill={c.l}
        stroke={c.l}
      />
      <polygon
        points={`${x + w},${y} ${x},${y + h} ${x},${y + h + d} ${x + w},${y + d}`}
        fill={c.r}
        stroke={c.r}
      />
      <polygon
        points={`${x},${y - h} ${x + w},${y} ${x},${y + h} ${x - w},${y}`}
        fill={c.t}
        stroke={c.t}
      />
    </g>
  );
}

function Sphere({ cx, cy, r, c }: { cx: number; cy: number; r: number; c: string }) {
  return (
    <g>
      <ellipse
        cx={cx + r * 0.3}
        cy={cy + r * 1.1}
        rx={r * 1.05}
        ry={r * 0.3}
        fill="#1a1240"
        opacity="0.12"
      />
      <circle cx={cx} cy={cy} r={r} fill={c} />
      <circle cx={cx - r * 0.32} cy={cy - r * 0.34} r={r * 0.36} fill="#fff" opacity="0.28" />
    </g>
  );
}

const ORBIT = "M50 88a80 34 0 1 0 160 0a80 34 0 1 0 -160 0";
const ORBIT_SMALL = "M46 112a84 30 0 1 0 168 0a84 30 0 1 0 -168 0";

// Identity governance: people, devices and AI agents (cubes) circle one governed core (the sphere).
function IdentityArt({ move }: { move: boolean }) {
  const cubes: ReadonlyArray<[Palette, string]> = [
    [LILAC, "0s"],
    [VIOLET, "-5s"],
    [RED, "-10s"],
  ];
  return (
    <>
      <ellipse cx="130" cy="140" rx="84" ry="13" fill="#1a1240" opacity="0.07" />
      <ellipse
        cx="130"
        cy="88"
        rx="80"
        ry="34"
        fill="none"
        stroke="#b3aed0"
        strokeWidth="1.5"
        strokeDasharray="3 5"
      />
      <Sphere cx={130} cy={84} r={25} c="#3b3668" />
      <g opacity="0.9">
        <rect x="12" y="12" width="64" height="18" rx="9" fill="#fff" stroke="#d9d4eb" />
        <text x="44" y="24.5" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#3b3668">
          Named owner
        </text>
        {move && (
          <animate
            attributeName="opacity"
            values="0.35;1;1;0.35"
            keyTimes="0;0.2;0.7;1"
            dur="5s"
            repeatCount="indefinite"
          />
        )}
      </g>
      {move ? (
        cubes.map(([c, begin]) => (
          <g key={begin}>
            <animateMotion dur="15s" repeatCount="indefinite" begin={begin} path={ORBIT} />
            <Cube x={0} y={-8} w={11} d={11} c={c} />
          </g>
        ))
      ) : (
        <>
          <Cube x={50} y={80} w={11} d={11} c={LILAC} />
          <Cube x={210} y={80} w={11} d={11} c={VIOLET} />
          <Cube x={130} y={118} w={11} d={11} c={RED} />
        </>
      )}
    </>
  );
}

// AI and digital governance: three steps (inventory, frameworks, evidence) with an AI sphere hopping up them.
function AiArt({ move }: { move: boolean }) {
  const steps: ReadonlyArray<[number, number, Palette, string]> = [
    [70, 24, LILAC, "0s"],
    [130, 42, VIOLET, "-1.3s"],
    [190, 60, NAVY, "-2.6s"],
  ];
  return (
    <>
      <ellipse cx="130" cy="140" rx="96" ry="13" fill="#1a1240" opacity="0.07" />
      {steps.map(([x, d, c, begin]) => (
        <g key={x}>
          {move && (
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0;0 -5;0 0"
              dur="4s"
              begin={begin}
              repeatCount="indefinite"
            />
          )}
          <Cube x={x} y={114 - d} w={26} d={d} c={c} />
        </g>
      ))}
      <g>
        {move ? (
          <>
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              path="M70 0Q100 -42 130 -22Q160 -60 190 -40"
            />
            <Sphere cx={0} cy={84} r={11} c="#c6001d" />
          </>
        ) : (
          <Sphere cx={70} cy={84} r={11} c="#c6001d" />
        )}
      </g>
      <path
        d="M180 36l5 5 10-11"
        fill="none"
        stroke="#c6001d"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={move ? 0 : 1}
      >
        {move && (
          <animate
            attributeName="opacity"
            values="0;0;1;1;0"
            keyTimes="0;0.55;0.7;0.92;1"
            dur="6s"
            repeatCount="indefinite"
          />
        )}
      </path>
    </>
  );
}

// Passwordless security: an authenticator cube scans (rings) while a user sphere circles it, and a small key cube pulses.
function KeyArt({ move }: { move: boolean }) {
  return (
    <>
      <ellipse cx="130" cy="140" rx="86" ry="13" fill="#1a1240" opacity="0.07" />
      <Cube x={130} y={82} w={40} d={32} c={VIOLET} />
      {[0, 0.8, 1.6].map((begin) => (
        <ellipse
          key={begin}
          cx="130"
          cy="82"
          rx="22"
          ry="12.5"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          opacity={move ? 0 : 0.6}
        >
          {move && (
            <>
              <animate
                attributeName="rx"
                values="6;28"
                dur="2.4s"
                begin={`${begin}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="ry"
                values="3.5;16"
                dur="2.4s"
                begin={`${begin}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.9;0"
                dur="2.4s"
                begin={`${begin}s`}
                repeatCount="indefinite"
              />
            </>
          )}
        </ellipse>
      ))}
      <g>
        {move && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0;0 -6;0 0"
            dur="2.4s"
            repeatCount="indefinite"
          />
        )}
        <Cube x={130} y={42} w={11} d={11} c={RED} />
      </g>
      <g>
        {move ? (
          <>
            <animateMotion dur="9s" repeatCount="indefinite" path={ORBIT_SMALL} />
            <Sphere cx={0} cy={-6} r={11} c="#b3aed0" />
          </>
        ) : (
          <Sphere cx={52} cy={108} r={11} c="#b3aed0" />
        )}
      </g>
    </>
  );
}

// Quantum-safe security: a row of cubes migrates from lilac to red, one after another, while a plan sphere moves along it.
function AtomArt({ move }: { move: boolean }) {
  const xs = [52, 104, 156, 208];
  return (
    <>
      <ellipse cx="130" cy="140" rx="100" ry="13" fill="#1a1240" opacity="0.07" />
      {xs.map((x, i) => (
        <g key={x}>
          <Cube x={x} y={92} w={22} d={26} c={LILAC} />
          <g opacity={move ? 0 : i < 2 ? 1 : 0}>
            {move && (
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.12;0.8;1"
                dur="8s"
                begin={`${i * 1.2}s`}
                repeatCount="indefinite"
              />
            )}
            <Cube x={x} y={92} w={22} d={26} c={RED} />
          </g>
        </g>
      ))}
      <g>
        {move ? (
          <>
            <animateMotion dur="8s" repeatCount="indefinite" path="M52 54L208 54L52 54" />
            <Sphere cx={0} cy={0} r={11} c="#3b3668" />
          </>
        ) : (
          <Sphere cx={52} cy={54} r={11} c="#3b3668" />
        )}
      </g>
    </>
  );
}

function Art({ name, move }: { name: ArtName; move: boolean }) {
  switch (name) {
    case "identity":
      return <IdentityArt move={move} />;
    case "ai":
      return <AiArt move={move} />;
    case "key":
      return <KeyArt move={move} />;
    default:
      return <AtomArt move={move} />;
  }
}

export function SolutionIllustration({ name }: { name: ArtName }) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return (
    <svg
      viewBox="0 0 260 160"
      role="img"
      preserveAspectRatio="xMidYMid meet"
      aria-label={LABELS[name]}
    >
      <rect width="260" height="160" rx="14" fill="#ecebf7" />
      <Art name={name} move={!reduced} />
    </svg>
  );
}

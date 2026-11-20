import type { CSSProperties } from "react";
import Image from "next/image";

// A solution illustration with labels on it. A small light travels along the flow from left to right and lights
// each label as it passes, then starts again. It stands still for visitors who prefer reduced motion. The
// labels are real text, so they read for screen readers too.

export type SolutionPictureName = "identity" | "ai" | "key" | "atom";

const CYCLE = 6; // seconds for the light to cross the picture
const START = 6; // where the light starts and ends, as a percentage of the width
const END = 94;

const FILES: Record<
  SolutionPictureName,
  { file: string; alt: string; flowY: number; labels: [number, string][] }
> = {
  identity: {
    file: "identity",
    alt: "People, devices and AI agents connect to one governed identity with a named owner, then pass a policy check before reaching access",
    flowY: 47,
    labels: [
      [13, "Staff, devices, agents"],
      [38, "Named owner"],
      [60, "Policy check"],
      [86, "Access"],
    ],
  },
  ai: {
    file: "ai",
    alt: "An AI system is checked for risk against rules, gathers evidence and is approved",
    flowY: 49,
    labels: [
      [12, "AI system"],
      [32, "Risk check"],
      [64, "Evidence"],
      [88, "Approved"],
    ],
  },
  key: {
    file: "passwordless",
    alt: "A person signs in with a fingerprint key, a shield check passes and the laptop opens",
    flowY: 51,
    labels: [
      [14, "Person"],
      [34, "Fingerprint key"],
      [58, "Shield check"],
      [84, "Signed in"],
    ],
  },
  atom: {
    file: "quantum",
    alt: "Data and systems pass a scan and a quantum gate into a protected zone",
    flowY: 57,
    labels: [
      [14, "Systems and data"],
      [38, "Scan"],
      [62, "Quantum gate"],
      [86, "Protected"],
    ],
  },
};

export function SolutionPicture({
  name,
  labels = true,
  sizes = "(max-width: 899px) 100vw, 520px",
}: {
  name: SolutionPictureName;
  labels?: boolean;
  sizes?: string;
}) {
  const { file, alt, flowY, labels: chips } = FILES[name];
  return (
    <div className="sp">
      <Image
        className="sp-still"
        src={`/videos/solutions/${file}-clean.jpg`}
        alt={alt}
        width={1280}
        height={720}
        sizes={sizes}
      />
      <span
        className="sp-signal"
        aria-hidden="true"
        style={{ top: `${flowY}%`, "--cycle": `${CYCLE}s` } as CSSProperties}
      />
      {labels && (
        <ul className="sp-labels" style={{ "--cycle": `${CYCLE}s` } as CSSProperties}>
          {chips.map(([x, text]) => (
            <li
              key={text}
              style={
                {
                  left: `${x}%`,
                  "--d": `${(Math.max(0, x - START) / (END - START)) * CYCLE}s`,
                } as CSSProperties
              }
            >
              {text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

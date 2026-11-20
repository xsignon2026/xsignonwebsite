import Image from "next/image";

// The picture for one solution in "What XSignOn does": a still from the supplied animation. (The animation
// files are kept in public/videos/solutions for when they are switched back on.)

type Name = "identity" | "ai" | "key" | "atom";

const FILES: Record<Name, { file: string; label: string }> = {
  identity: {
    file: "identity",
    label:
      "Identity governance: people, devices and AI agents pass one governed identity core and a shield ring before reaching access",
  },
  ai: {
    file: "ai",
    label:
      "AI and digital governance: an AI system is checked against rules and evidence before it is approved",
  },
  key: {
    file: "passwordless",
    label:
      "Passwordless security: a user signs in with a fingerprint key, a shield and a check on the laptop",
  },
  atom: {
    file: "quantum",
    label: "Quantum-safe security: data passes a filter and a quantum gate into a protected dome",
  },
};

export function SolutionVideo({ name }: { name: Name }) {
  const { file, label } = FILES[name];
  return (
    <Image
      className="sol-video"
      src={`/videos/solutions/${file}-clean.jpg`}
      alt={label}
      width={1280}
      height={720}
      sizes="(max-width: 899px) 100vw, 520px"
    />
  );
}

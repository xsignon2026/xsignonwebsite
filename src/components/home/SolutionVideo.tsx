"use client";

import { useEffect, useRef, useState } from "react";

// The animation for one solution in "What XSignOn does": the supplied video, looped and silent. The file is
// only downloaded when the panel is on screen (and not at all for visitors who ask for reduced motion, who
// see the still first frame instead), so the four videos do not weigh on the page.

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
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const { file, label } = FILES[name];

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) void video.play().catch(() => undefined);
          else video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      className="sol-video"
      src={`/videos/solutions/${file}.mp4`}
      poster={`/videos/solutions/${file}.jpg`}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    />
  );
}

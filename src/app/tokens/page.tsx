import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = { title: "Tokens", robots: { index: false, follow: false } };

// S-08: compare this page side by side with xsignon-home-beams.html.
const groups: { name: string; tokens: string[] }[] = [
  {
    name: "Dark set",
    tokens: [
      "d1",
      "d-deep",
      "d2",
      "d-line",
      "acc-ink-d",
      "acc-tint-d",
      "on-dark-mut",
      "on-dark-sub",
      "on-dark-ctl",
    ],
  },
  {
    name: "Light set",
    tokens: [
      "paper",
      "card",
      "line",
      "ctl",
      "txt",
      "gray",
      "acc",
      "acc-hov",
      "acc-ink",
      "acc-tint",
    ],
  },
  { name: "Focus and status", tokens: ["focus", "focus-d", "ok-l", "ok-tint-l", "ok-d", "warn-d"] },
  {
    name: "Gradient ramp",
    tokens: ["ramp-white", "ramp-paper", "ramp-lilac", "ramp-mid", "ramp-deep", "ramp-night"],
  },
];

const type: { token: string; label: string; weight: number }[] = [
  { token: "display", label: "Display (h1)", weight: 800 },
  { token: "h2", label: "H2", weight: 700 },
  { token: "h3", label: "H3", weight: 700 },
  { token: "h4", label: "H4", weight: 600 },
  { token: "card-title", label: "Card title", weight: 700 },
  { token: "hero-sub", label: "Hero sub", weight: 400 },
  { token: "body", label: "Body", weight: 400 },
  { token: "carousel-desc", label: "Carousel description", weight: 400 },
  { token: "eyebrow", label: "Eyebrow", weight: 700 },
];

export default function TokensPage() {
  return (
    <main className="py-12">
      <Container className="space-y-16">
        <h1>Design tokens</h1>

        {groups.map((g) => (
          <section key={g.name}>
            <h2>{g.name}</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
              {g.tokens.map((t) => (
                <div key={t}>
                  <div
                    className="h-20 rounded-card border border-line"
                    style={{ background: `var(--${t})` }}
                  />
                  <p className="mt-2 text-sm font-medium">--{t}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section>
          <h2>Home background, version 5 (descent)</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {["products", "partners", "thinking", "cta"].map((b) => (
              <div key={b}>
                <div
                  className="h-56 rounded-card border border-line"
                  style={{ background: `var(--bg-${b})` }}
                />
                <p className="mt-2 text-sm font-medium">--bg-{b}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Type scale</h2>
          <div className="mt-6 space-y-5">
            {type.map((s) => (
              <div key={s.token}>
                <p className="text-sm text-gray">
                  {s.label}, --text-{s.token}
                </p>
                <p
                  style={{
                    fontSize: `var(--text-${s.token})`,
                    fontWeight: s.weight,
                    lineHeight: 1.2,
                  }}
                >
                  Simplifying cybersecurity
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Radii and shadows</h2>
          <div className="mt-6 flex flex-wrap gap-6">
            {["hero-card", "carousel", "hub", "dropdown"].map((s) => (
              <div
                key={s}
                className="flex h-24 w-44 items-center justify-center rounded-card bg-card text-sm"
                style={{ boxShadow: `var(--shadow-${s})` }}
              >
                {s}
              </div>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}

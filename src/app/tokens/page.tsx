import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = { title: "Tokens", robots: { index: false, follow: false } };

// S-08: compare this page side by side with the design file.
const colours = ["ink", "paper", "muted", "violet-500", "violet-600", "band-light", "band-dark"];
const sizes = ["display", "h1", "h2", "h3", "body", "small"];
const radii = ["button", "card"];

export default function TokensPage() {
  return (
    <main className="py-12">
      <Container className="space-y-16">
        <h1>Design tokens</h1>

        <section>
          <h2>Colours</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-7">
            {colours.map((c) => (
              <div key={c}>
                <div
                  className="h-20 rounded border border-black/10"
                  style={{ background: `var(--color-${c})` }}
                />
                <p className="mt-2 text-sm font-medium">--color-{c}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Type scale</h2>
          <div className="mt-6 space-y-4">
            {sizes.map((s) => (
              <p key={s} style={{ fontSize: `var(--text-${s})`, lineHeight: 1.2 }}>
                --text-{s}: The quick brown fox
              </p>
            ))}
          </div>
        </section>

        <section>
          <h2>Radii and shadow</h2>
          <div className="mt-6 flex flex-wrap gap-6">
            {radii.map((r) => (
              <div
                key={r}
                className="flex h-24 w-40 items-center justify-center bg-paper text-sm"
                style={{ borderRadius: `var(--radius-${r})`, boxShadow: "var(--shadow-card)" }}
              >
                --radius-{r}
              </div>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}

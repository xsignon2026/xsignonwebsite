import { GlassCubes } from "@/components/common/GlassCubes";
import { GLASS_COLOURS, type GlassItem } from "@/components/common/glass";

// "Standards and frameworks": four glass blocks, one per standard, in the same dark glass style as the
// Security Ecosystem. These are standards and frameworks the products are built to; they are not
// customers or integrations.

const ITEMS: ReadonlyArray<GlassItem> = [
  {
    label: "FIDO2",
    title: "FIDO2",
    kind: "Passwordless sign-in",
    text: "Phishing-resistant authentication with hardware keys.",
  },
  {
    label: "NIST AI-RMF",
    title: "NIST AI-RMF",
    kind: "AI risk management",
    text: "Map and measure AI risk, and keep evidence current.",
  },
  {
    label: "NIST 800-207",
    title: "NIST 800-207",
    kind: "Zero trust architecture",
    text: "Never trust, always verify, for every request.",
  },
  {
    label: "NIST PQC",
    title: "NIST PQC",
    kind: "Post-quantum cryptography",
    text: "Move to quantum-resistant methods on a clear plan.",
  },
].map((item, i) => ({ ...item, ...GLASS_COLOURS[i] }));

export function Standards() {
  return (
    <section className="block std-sec" id="standards" data-nav="dark" aria-labelledby="stdTitle">
      <div className="wrap">
        <div className="sec-row rv">
          <h2 className="h2" id="stdTitle">
            Standards and frameworks
          </h2>
          <p className="std-note">
            What our products are built to. These are standards, not customers or integrations.
          </p>
        </div>
        <GlassCubes items={ITEMS} />
      </div>
    </section>
  );
}

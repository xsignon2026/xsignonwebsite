import type { Metadata } from "next";
import { PartnerEcosystem } from "@/components/home/PartnerEcosystem";

// A review page that shows the three sizes of the Partner ecosystem diagram one under the other, so the
// team can choose. It is not linked from the site and search engines are told to skip it.
export const metadata: Metadata = {
  title: "Partner ecosystem sizes",
  robots: { index: false, follow: false },
};

const SIZES = [
  { key: "s", label: "Small", note: "Card 334px tall" },
  { key: "m", label: "Medium", note: "Card 388px tall" },
  { key: "l", label: "Large", note: "Card 432px tall" },
] as const;

export default function PartnerSizesPage() {
  return (
    <main id="main" style={{ background: "#f8f9fb", padding: "56px 0 72px" }}>
      <div className="wrap">
        {SIZES.map((size) => (
          <section key={size.key} style={{ marginBottom: "64px" }}>
            <h2 className="h2" style={{ marginBottom: "8px" }}>
              {size.label}
            </h2>
            <p style={{ margin: "0 0 20px", color: "#4a4670" }}>{size.note} (wide screens)</p>
            <PartnerEcosystem size={size.key} />
          </section>
        ))}
      </div>
    </main>
  );
}

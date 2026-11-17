import type { Metadata } from "next";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { SolutionsView } from "@/components/prototype/SolutionsView";

export const metadata: Metadata = {
  title: "Solutions · XSignOn",
  description:
    "Identity governance, AI governance, quantum-safe security, business process, and enterprise technology for regulated teams.",
  openGraph: {
    title: "Solutions · XSignOn",
    description:
      "Start from the problem you are solving: Identity, AI, Quantum-safe, and Enterprise Access.",
    url: "https://xsignon.com/solutions",
    type: "website",
  },
  alternates: {
    canonical: "https://xsignon.com/solutions",
  },
};

export default function SolutionsPage() {
  return (
    <>
      <SolutionsView />
      <PrototypeBehaviors root="view-solutions" features={["reveal"]} />
    </>
  );
}

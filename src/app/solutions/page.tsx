import type { Metadata } from "next";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { getAllSolutions } from "@/lib/solution";
import { getSolutionsPageContent } from "@/lib/solutions-page-content";
import { SolutionsView } from "@/components/prototype/SolutionsView";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Identity governance, AI governance, quantum-safe security, business process, and enterprise technology for regulated teams.",
  openGraph: {
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "XSignOn" }],
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

export default async function SolutionsPage() {
  const [content, solutions] = await Promise.all([getSolutionsPageContent(), getAllSolutions()]);
  return (
    <>
      <SolutionsView content={content} solutions={solutions} />
      <PrototypeBehaviors root="view-solutions" features={["reveal"]} />
    </>
  );
}

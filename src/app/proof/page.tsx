import type { Metadata } from "next";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { getProofPageContent } from "@/lib/more-pages";
import { ProofView } from "@/components/prototype/ProofView";

export const metadata: Metadata = {
  title: "Proof & Case Studies · XSignOn",
  description:
    "Verified case studies attached to the products they prove. Real-world rollouts across banking, healthcare, industrial, and IT enterprises.",
  openGraph: {
    title: "Proof & Case Studies · XSignOn",
    description:
      "Real-world deployments across banking, healthcare, industrial, and enterprise IT.",
    url: "https://xsignon.com/proof",
    type: "website",
  },
  alternates: {
    canonical: "https://xsignon.com/proof",
  },
};

export default async function ProofPage() {
  const content = await getProofPageContent();
  return (
    <>
      <ProofView content={content} />
      <PrototypeBehaviors root="view-proof" features={["reveal"]} />
    </>
  );
}

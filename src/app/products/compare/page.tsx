import type { Metadata } from "next";
import { getComparePageContent } from "@/lib/last-pages";
import { CompareView } from "@/components/prototype/CompareView";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";

export const metadata: Metadata = {
  title: "How XSignOn Compares | Zero-Trust Sign-In Comparison",
  description:
    "Compare XSignOn passwordless sign-in against password-based sign-in, one-time codes, and legacy MFA across seven key capabilities.",
  alternates: {
    canonical: "/products/compare",
  },
};

export default async function ComparePage() {
  const content = await getComparePageContent();
  return (
    <>
      <CompareView content={content} />
      <PrototypeBehaviors root="view-compare" features={["reveal"]} />
    </>
  );
}

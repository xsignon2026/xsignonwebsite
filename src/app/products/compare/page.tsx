import type { Metadata } from "next";
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

export default function ComparePage() {
  return (
    <>
      <CompareView />
      <PrototypeBehaviors root="view-compare" features={["reveal"]} />
    </>
  );
}

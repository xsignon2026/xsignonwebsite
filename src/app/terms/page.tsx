import type { Metadata } from "next";
import { TermsView } from "@/components/prototype/TermsView";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service | XSignOn",
  description:
    "XSignOn Terms of Service governing acceptable use, commercial trials, intellectual property, and liabilities.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <TermsView />
      <PrototypeBehaviors root="view-terms" features={["reveal"]} />
    </>
  );
}

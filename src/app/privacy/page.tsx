import type { Metadata } from "next";
import { PrivacyView } from "@/components/prototype/PrivacyView";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy | XSignOn",
  description:
    "XSignOn Privacy Policy outlining information collection, usage, sharing safeguards, and user rights.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PrivacyView />
      <PrototypeBehaviors root="view-privacy" features={["reveal"]} />
    </>
  );
}

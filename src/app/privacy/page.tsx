import type { Metadata } from "next";
import { LegalView } from "@/components/prototype/LegalView";
import { getLegalPage } from "@/lib/more-pages";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy | XSignOn",
  description:
    "XSignOn Privacy Policy outlining information collection, usage, sharing safeguards, and user rights.",
  path: "/privacy",
});

export default async function PrivacyPage() {
  const page = await getLegalPage("privacy");
  return (
    <>
      <LegalView page={page} />
      <PrototypeBehaviors root="view-privacy" features={["reveal"]} />
    </>
  );
}

import type { Metadata } from "next";
import { LegalView } from "@/components/prototype/LegalView";
import { getLegalPage } from "@/lib/more-pages";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service | XSignOn",
  description:
    "XSignOn Terms of Service governing acceptable use, commercial trials, intellectual property, and liabilities.",
  path: "/terms",
});

export default async function TermsPage() {
  const page = await getLegalPage("terms");
  return (
    <>
      <LegalView page={page} />
      <PrototypeBehaviors root="view-terms" features={["reveal"]} />
    </>
  );
}

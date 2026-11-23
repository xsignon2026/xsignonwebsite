import type { Metadata } from "next";
import { getIndustryPageContent } from "@/lib/last-pages";
import { IndustryView } from "@/components/prototype/IndustryView";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";

export const metadata: Metadata = {
  title: "Industry Thinking",
  description:
    "Practical thinking for security, governance, and growth across modern enterprise environments.",
};

export default async function IndustryThinkingPage() {
  const content = await getIndustryPageContent();
  return (
    <>
      <IndustryView content={content} />
      <PrototypeBehaviors root="view-industry" features={["reveal"]} />
    </>
  );
}

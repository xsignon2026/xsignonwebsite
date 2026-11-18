import type { Metadata } from "next";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { ThinkingView } from "@/components/prototype/ThinkingView";
import { getInsightsPageContent } from "@/lib/insights-page-content";

export const metadata: Metadata = {
  title: "Our thinking | XSignOn",
  description:
    "Practical perspectives on identity governance, AI security, micro-segmentation, and zero-trust engineering.",
};

export default async function ThinkingHubPage() {
  const content = await getInsightsPageContent();
  return (
    <>
      <ThinkingView content={content} />
      <PrototypeBehaviors root="view-thinking" features={["reveal"]} />
    </>
  );
}

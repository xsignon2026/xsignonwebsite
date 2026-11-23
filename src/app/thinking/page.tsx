import type { Metadata } from "next";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { ThinkingView } from "@/components/prototype/ThinkingView";
import { caseStudyPages } from "@/data/case-study-pages";
import { getCaseStudyPage } from "@/lib/case-study-page";
import { getInsightsPageContent } from "@/lib/insights-page-content";

export const metadata: Metadata = {
  title: "Our thinking",
  description:
    "Practical perspectives on identity governance, AI security, micro-segmentation, and zero-trust engineering.",
};

export default async function ThinkingHubPage() {
  const content = await getInsightsPageContent();
  const studies = await Promise.all(caseStudyPages.map((p) => getCaseStudyPage(p.slug)));
  const caseStudies = studies.filter((s) => s !== null);
  return (
    <>
      <ThinkingView content={content} caseStudies={caseStudies} />
      <PrototypeBehaviors root="view-thinking" features={["reveal"]} />
    </>
  );
}

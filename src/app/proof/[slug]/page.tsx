import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { CaseBankView } from "@/components/prototype/CaseBankView";
import { CaseElectricalView } from "@/components/prototype/CaseElectricalView";
import { CaseHealthView } from "@/components/prototype/CaseHealthView";
import { CaseItView } from "@/components/prototype/CaseItView";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { getCaseStudyBySlug } from "@/lib/caseStudy";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

// The four case studies, as designed in the approved prototype.
const VIEWS: Record<string, { View: ComponentType; id: string }> = {
  "securing-bank-access-fido2": { View: CaseBankView, id: "view-case-bank" },
  "passwordless-access-global-healthcare": { View: CaseHealthView, id: "view-case-health" },
  "biometric-fido2-air-gapped-industrial": {
    View: CaseElectricalView,
    id: "view-case-electrical",
  },
  "biometric-only-authentication-global-it": { View: CaseItView, id: "view-case-it" },
};

export function generateStaticParams() {
  return Object.keys(VIEWS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = Object.hasOwn(VIEWS, slug) ? await getCaseStudyBySlug(slug) : null;
  if (!caseStudy) return { title: "Case Study Not Found · XSignOn" };
  return {
    title: `${caseStudy.title} · Case Study · XSignOn`,
    description: caseStudy.summary,
    openGraph: {
      title: `${caseStudy.title} · XSignOn Proof`,
      description: caseStudy.summary,
      url: `https://xsignon.com/proof/${caseStudy.slug}`,
      type: "article",
    },
    alternates: { canonical: `https://xsignon.com/proof/${caseStudy.slug}` },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const entry = Object.hasOwn(VIEWS, slug) ? VIEWS[slug] : undefined;
  if (!entry) notFound();
  const { View } = entry;

  return (
    <>
      <View />
      <PrototypeBehaviors root={entry.id} features={["reveal"]} />
    </>
  );
}

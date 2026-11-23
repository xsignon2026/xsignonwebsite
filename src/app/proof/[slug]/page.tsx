import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/prototype/CaseStudyView";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { caseStudyPages } from "@/data/case-study-pages";
import { getCaseStudyPage } from "@/lib/case-study-page";
import { getCaseStudyBySlug } from "@/lib/caseStudy";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudyPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) return { title: "Case Study Not Found · XSignOn" };
  return {
    title: `${caseStudy.title} · Case Study`,
    description: caseStudy.summary,
    openGraph: {
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "XSignOn" }],
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
  const page = await getCaseStudyPage(slug);
  if (!page) notFound();

  return (
    <>
      <CaseStudyView page={page} />
      <PrototypeBehaviors root={`view-case-${page.slug}`} features={["reveal"]} />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { JsonLd } from "@/components/common/JsonLd";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { SolAiView } from "@/components/prototype/SolAiView";
import { SolEnterpriseView } from "@/components/prototype/SolEnterpriseView";
import { SolIdentityView } from "@/components/prototype/SolIdentityView";
import { SolProcessView } from "@/components/prototype/SolProcessView";
import { SolQuantumView } from "@/components/prototype/SolQuantumView";
import { getSolutionBySlug } from "@/lib/solution";
import { createBreadcrumbSchema, createServiceSchema } from "@/lib/schema-org";

interface SolutionPageProps {
  params: Promise<{ slug: string }>;
}

// The five solution pages, as designed in the approved prototype.
const VIEWS: Record<string, { View: ComponentType; id: string }> = {
  "identity-governance": { View: SolIdentityView, id: "view-sol-identity" },
  "ai-and-digital-governance": { View: SolAiView, id: "view-sol-ai" },
  "quantum-safe-security": { View: SolQuantumView, id: "view-sol-quantum" },
  "business-process": { View: SolProcessView, id: "view-sol-process" },
  "enterprise-technology": { View: SolEnterpriseView, id: "view-sol-enterprise" },
};

export function generateStaticParams() {
  return Object.keys(VIEWS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = Object.hasOwn(VIEWS, slug) ? await getSolutionBySlug(slug) : null;
  if (!solution) return { title: "Solution Not Found · XSignOn" };
  return {
    title: `${solution.title} · Solution · XSignOn`,
    description: solution.summary,
    openGraph: {
      title: `${solution.title} · XSignOn Solution`,
      description: solution.summary,
      url: `https://xsignon.com/solutions/${solution.slug}`,
      type: "website",
    },
    alternates: { canonical: `https://xsignon.com/solutions/${solution.slug}` },
  };
}

export default async function SolutionDetailPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const entry = Object.hasOwn(VIEWS, slug) ? VIEWS[slug] : undefined;
  if (!entry) notFound();
  const solution = await getSolutionBySlug(slug);
  const { View } = entry;

  return (
    <>
      {solution && (
        <JsonLd
          schema={[
            createServiceSchema(solution),
            createBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Solutions", url: "/solutions" },
              { name: solution.title, url: `/solutions/${solution.slug}` },
            ]),
          ]}
        />
      )}
      <View />
      <PrototypeBehaviors root={entry.id} features={["reveal"]} />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/common/JsonLd";
import { SolutionView } from "@/components/prototype/SolutionView";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { canonicalSolutions } from "@/data/solutions";
import { getSolutionBySlug } from "@/lib/solution";
import { createBreadcrumbSchema, createServiceSchema } from "@/lib/schema-org";

interface SolutionPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return canonicalSolutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);
  if (!solution) return { title: "Solution Not Found · XSignOn" };
  return {
    title: `${solution.title} · Solution`,
    description: solution.summary,
    openGraph: {
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "XSignOn" }],
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
  const solution = await getSolutionBySlug(slug);
  if (!solution) notFound();

  return (
    <>
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
      <SolutionView solution={solution} />
      <PrototypeBehaviors root={`view-sol-${solution.slug}`} features={["reveal"]} />
    </>
  );
}

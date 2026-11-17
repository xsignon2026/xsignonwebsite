import type { Metadata } from "next";
import { JsonLd } from "@/components/common/JsonLd";
import { CareersView } from "@/components/prototype/CareersView";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { generateJobPostingJsonLd, getActiveJobs } from "@/lib/job";
import { createBreadcrumbSchema } from "@/lib/schema-org";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Careers at XSignOn | Build Sign-in People Trust",
  description:
    "Join XSignOn in McKinney, Texas or remotely. We are building the future of enterprise passwordless identity and AI governance.",
  path: "/careers",
});

export default function CareersPage() {
  // Search engines read the open roles from this data (Google for Jobs).
  const jobSchemas = getActiveJobs().map((job) => generateJobPostingJsonLd(job));
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Careers", url: "/careers" },
  ]);

  return (
    <>
      <JsonLd schema={[...jobSchemas, breadcrumbSchema]} />
      <CareersView />
      <PrototypeBehaviors root="view-careers" features={["reveal"]} />
    </>
  );
}

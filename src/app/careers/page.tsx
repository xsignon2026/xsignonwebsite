import type { Metadata } from "next";
import { JsonLd } from "@/components/common/JsonLd";
import { CareersView } from "@/components/prototype/CareersView";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { getCareersPageContent, getOpenJobs } from "@/lib/careers";
import { generateJobPostingJsonLd } from "@/lib/job";
import { createBreadcrumbSchema } from "@/lib/schema-org";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Careers at XSignOn | Build Sign-in People Trust",
  description:
    "Join XSignOn in McKinney, Texas or remotely. We are building the future of enterprise passwordless identity and AI governance.",
  path: "/careers",
});

export default async function CareersPage() {
  const [content, jobs] = await Promise.all([getCareersPageContent(), getOpenJobs()]);
  // Search engines read the open roles from this data (Google for Jobs).
  const jobSchemas = jobs.map((job) => generateJobPostingJsonLd(job));
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Careers", url: "/careers" },
  ]);

  return (
    <>
      <JsonLd schema={[...jobSchemas, breadcrumbSchema]} />
      <CareersView content={content} jobs={jobs} />
      <PrototypeBehaviors root="view-careers" features={["reveal"]} />
    </>
  );
}

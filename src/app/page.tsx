import type { Metadata } from "next";
import { getHomePageData } from "@/lib/home";
import { HeroSplit } from "@/components/home/HeroSplit";
import { ProductCoverflow } from "@/components/home/ProductCoverflow";
import { PartnerHub } from "@/components/home/PartnerHub";
import { SolutionsJourney } from "@/components/home/SolutionsJourney";
import { ThinkingBand } from "@/components/home/ThinkingBand";
import { HomeCtaBand } from "@/components/home/HomeCtaBand";

export const metadata: Metadata = {
  title: "XSignOn · Identity and access built on trust",
  description:
    "XSignOn gives people and AI agents the right access at the right moment, with human oversight woven into every decision. One platform for posture, sign-in, evaluation and day-to-day access operations.",
  openGraph: {
    title: "XSignOn · Identity and access built on trust",
    description: "One platform for posture, sign-in, evaluation and day-to-day access operations.",
    url: "https://xsignon.com",
    siteName: "XSignOn",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XSignOn · Identity and access built on trust",
    description: "One platform for posture, sign-in, evaluation and day-to-day access operations.",
  },
  alternates: {
    canonical: "https://xsignon.com",
  },
};

export default async function HomePage() {
  const data = await getHomePageData();

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "XSignOn",
    url: "https://xsignon.com",
    description:
      "Identity and access built on trust. One platform for posture, sign-in, evaluation and access operations.",
    publisher: {
      "@type": "Organization",
      name: "XSignOn Inc.",
      url: "https://xsignon.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <div id="view-home">
        <HeroSplit hero={data.hero} standards={data.standardsMarquee} />
        <ProductCoverflow cards={data.coverflowCards} />
        <PartnerHub categories={data.partnerCategories} />
        <SolutionsJourney solutions={data.solutions} />
        <ThinkingBand thinking={data.thinking} />
        <HomeCtaBand cta={data.cta} />
      </div>
    </>
  );
}

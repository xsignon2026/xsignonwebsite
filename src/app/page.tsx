import type { Metadata } from "next";
import { IntroOverlay } from "@/components/common/IntroOverlay";
import { HomeBehaviors } from "@/components/home/HomeBehaviors";
import { HomeView } from "@/components/home/HomeView";
import { getHomeContent } from "@/lib/home-content";

export const metadata: Metadata = {
  title: { absolute: "XSignOn · Identity and access built on trust" },
  description:
    "XSignOn gives people and AI agents the right access at the right moment, with human oversight woven into every decision. One platform for posture, sign-in, evaluation and day-to-day access operations.",
  openGraph: {
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "XSignOn" }],
    title: "XSignOn · Identity and access built on trust",
    description: "One platform for posture, sign-in, evaluation and day-to-day access operations.",
    url: "https://xsignon.com",
    siteName: "XSignOn",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
    title: "XSignOn · Identity and access built on trust",
    description: "One platform for posture, sign-in, evaluation and day-to-day access operations.",
  },
  alternates: {
    canonical: "https://xsignon.com",
  },
};

export default async function HomePage() {
  const content = await getHomeContent();
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
      <IntroOverlay />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HomeView content={content} />
      <HomeBehaviors />
    </>
  );
}

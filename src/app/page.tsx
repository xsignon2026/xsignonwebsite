import type { Metadata } from "next";
import { HomeBehaviors } from "@/components/home/HomeBehaviors";
import { HomeView } from "@/components/home/HomeView";

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

export default function HomePage() {
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
      <HomeView />
      <HomeBehaviors />
    </>
  );
}

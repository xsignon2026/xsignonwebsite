import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutTeam } from "@/components/about/AboutTeam";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { ContactCta } from "@/components/common/ContactCta";
import { GlassCubes } from "@/components/common/GlassCubes";
import { GLASS_COLOURS, type GlassItem } from "@/components/common/glass";
import {
  SecurityEcosystem,
  type EcoDetail,
  type EcoItem,
} from "@/components/home/SecurityEcosystem";
import { SolutionIllustration } from "@/components/home/SolutionIllustration";
import { getAboutContent } from "@/lib/about-content";
import { getOpenJobs } from "@/lib/careers";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About XSignOn | Security Built Around Identity and Governance",
  description:
    "XSignOn develops cybersecurity products and security approaches that help organizations strengthen access, govern emerging technology, and prepare for evolving digital risk.",
  path: "/about",
});

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "XSignOn",
  url: "https://xsignon.com",
  logo: "https://xsignon.com/icon.svg",
  description:
    "Cybersecurity products for identity governance, passwordless authentication and AI evaluation.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "McKinney",
    addressRegion: "TX",
    addressCountry: "US",
  },
  sameAs: ["https://www.linkedin.com/company/xsignon"],
};

const WHY_COLOURS = [
  { top: "#b3aed0", left: "#8f89b8", right: "#6f67a8", color: "#8f89b8", icon: "grid" },
  { top: "#6f67a8", left: "#554d90", right: "#3b3668", color: "#6f67a8", icon: "key" },
  { top: "#3b3668", left: "#2c2757", right: "#1f1b45", color: "#3b3668", icon: "database" },
  { top: "#d4163a", left: "#a60019", right: "#7a0012", color: "#c6001d", icon: "atom" },
] as const;

export default async function AboutPage(): Promise<React.JSX.Element> {
  const content = await getAboutContent();
  const steps: ReadonlyArray<GlassItem> = content.how.steps.map((step, i) => ({
    label: String(i + 1).padStart(2, "0"),
    title: step.title,
    kind: step.kind,
    text: step.text,
    ...GLASS_COLOURS[i],
  }));
  const why: ReadonlyArray<EcoItem> = content.why.principles.map((p, i) => ({
    n: String(i + 1).padStart(2, "0"),
    title: p.title,
    lines: [p.lines[0] ?? "", p.lines[1] ?? ""],
    ...WHY_COLOURS[i],
  }));
  const whyDetail: ReadonlyArray<EcoDetail> = content.why.principles.map((p) => ({
    from: [],
    via: [p.via],
    to: [],
  }));
  const hasRoles = (await getOpenJobs()).length > 0;
  return (
    <div id="view-about">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <AboutHero content={content.hero} />

      <section className="ab-sec" id="who" data-nav="light">
        <div className="wrap">
          <h2 className="h2 rv">{content.who.title}</h2>
          <div className="ab-who rv">
            <div>
              <p className="ab-statement">{content.who.statement}</p>
              <div className="ab-copy">
                {content.who.paragraphs.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </div>
            <div className="ab-who-art">
              <SolutionIllustration name="identity" />
            </div>
          </div>
        </div>
      </section>

      <section className="ab-sec ab-soft" id="what" data-nav="light">
        <div className="wrap">
          <h2 className="h2 rv">{content.whatWeDo.title}</h2>
          <ul className="ab-cap rv">
            {content.whatWeDo.items.map((c) => (
              <li key={c.title}>
                <div className="ab-art">
                  <SolutionIllustration name={c.art} />
                </div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ab-sec" id="ab-how" data-nav="light">
        <div className="wrap">
          <h2 className="h2 rv">{content.how.title}</h2>
          <GlassCubes items={steps} flow />
        </div>
      </section>

      <section className="ab-sec ab-soft" id="ab-why" data-nav="light">
        <div className="wrap">
          <h2 className="h2 rv">{content.why.title}</h2>
          <SecurityEcosystem
            items={why}
            detail={whyDetail}
            viaLabel="Focus:"
            label="Why XSignOn: four principles that guide our work"
          />
        </div>
      </section>

      <AboutTeam team={content.team} />

      <section className="ab-sec ab-career" id="careers" data-nav="dark">
        <div className="wrap">
          <div className="ab-banner rv">
            <div>
              <h2 className="h2">{content.careers.title}</h2>
              <p>{content.careers.text}</p>
              {!hasRoles && <p className="ab-none">{content.careers.emptyNote}</p>}
            </div>
            <div className="ab-banner-cta">
              {hasRoles && (
                <Link className="btn btn-white" href="/careers">
                  View open roles
                </Link>
              )}
              <Link className={hasRoles ? "link-arrow" : "btn btn-white"} href="/contact">
                Contact our team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactCta />
      <PrototypeBehaviors root="view-about" features={["reveal"]} />
    </div>
  );
}

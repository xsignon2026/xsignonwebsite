import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { AboutHero } from "@/components/about/AboutHero";
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
import { getActiveJobs } from "@/lib/job";
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

const CAPABILITIES = [
  {
    title: "Identity governance",
    text: "Understand identities, access, permissions and control gaps across your environment.",
    art: "identity",
  },
  {
    title: "AI and digital governance",
    text: "Evaluate AI systems and digital risk against defined security and governance requirements.",
    art: "ai",
  },
  {
    title: "Passwordless authentication",
    text: "Reduce credential exposure with biometric, phishing-resistant sign-in.",
    art: "key",
  },
  {
    title: "Quantum-safe security",
    text: "Understand and prepare for emerging cryptographic risk.",
    art: "atom",
  },
] as const;

const STEPS: ReadonlyArray<GlassItem> = [
  {
    label: "01",
    title: "Understand the environment",
    kind: "Baseline report",
    text: "Establish the identity, technology, data and risk baseline.",
  },
  {
    label: "02",
    title: "Define the architecture",
    kind: "Architecture plan",
    text: "Identify control gaps and design the right security approach.",
  },
  {
    label: "03",
    title: "Implement the solution",
    kind: "Working controls",
    text: "Introduce products, controls and workflows without unnecessary disruption.",
  },
  {
    label: "04",
    title: "Govern continuously",
    kind: "Ongoing evidence",
    text: "Monitor change, evaluate risk and maintain evidence over time.",
  },
].map((item, i) => ({ ...item, ...GLASS_COLOURS[i] }));

const WHY: ReadonlyArray<EcoItem> = [
  {
    n: "01",
    title: "Security must work in practice",
    lines: ["A control is valuable only when it", "works in the real environment."],
    icon: "grid",
    top: "#b3aed0",
    left: "#8f89b8",
    right: "#6f67a8",
    color: "#8f89b8",
  },
  {
    n: "02",
    title: "Identity is foundational",
    lines: ["Access, governance and accountability", "begin with who or what is acting."],
    icon: "key",
    top: "#6f67a8",
    left: "#554d90",
    right: "#3b3668",
    color: "#6f67a8",
  },
  {
    n: "03",
    title: "Evidence over assumption",
    lines: ["Decisions rest on observable risk,", "controls and outcomes."],
    icon: "database",
    top: "#3b3668",
    left: "#2c2757",
    right: "#1f1b45",
    color: "#3b3668",
  },
  {
    n: "04",
    title: "Prepare without disruption",
    lines: ["Address emerging risk without", "abandoning systems that still serve you."],
    icon: "atom",
    top: "#d4163a",
    left: "#a60019",
    right: "#7a0012",
    color: "#c6001d",
  },
];

const WHY_DETAIL: ReadonlyArray<EcoDetail> = [
  { from: [], via: ["Real environments"], to: [] },
  { from: [], via: ["Who or what is acting"], to: [] },
  { from: [], via: ["Observable outcomes"], to: [] },
  { from: [], via: ["Systems still in use"], to: [] },
];

export default function AboutPage(): React.JSX.Element {
  const hasRoles = getActiveJobs().length > 0;
  return (
    <div id="view-about">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <AboutHero />

      <section className="ab-sec" id="who" data-nav="light">
        <div className="wrap">
          <h2 className="h2 rv">Who we are</h2>
          <div className="ab-who rv">
            <div>
              <p className="ab-statement">
                XSignOn is a cybersecurity and identity company developing products across security
                posture, passwordless authentication, and AI evaluation.
              </p>
              <div className="ab-copy">
                <p>
                  Our work connects identity, governance, data and emerging technology risk. We help
                  organizations understand exposure, strengthen access, and build controls that can
                  evolve with their operating environment.
                </p>
                <p>
                  We combine product development, security architecture and continuous governance
                  into one connected approach.
                </p>
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
          <h2 className="h2 rv">What we do</h2>
          <ul className="ab-cap rv">
            {CAPABILITIES.map((c) => (
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
          <h2 className="h2 rv">How we work</h2>
          <GlassCubes items={STEPS} flow />
        </div>
      </section>

      <section className="ab-sec ab-soft" id="ab-why" data-nav="light">
        <div className="wrap">
          <h2 className="h2 rv">Why XSignOn</h2>
          <SecurityEcosystem
            items={WHY}
            detail={WHY_DETAIL}
            viaLabel="Focus:"
            label="Why XSignOn: four principles that guide our work"
          />
        </div>
      </section>

      <section className="ab-sec" id="products-link" data-nav="light">
        <div className="wrap">
          <div className="ab-prod rv">
            <p>
              Our products put this approach into practice: one posture view, sign-in without
              passwords, and evidence for AI systems.
            </p>
            <div className="ab-links">
              <Link href="/products/postureone">PostureOne &rarr;</Link>
              <Link href="/products/passwordless-keys">Passwordless Authenticators &rarr;</Link>
              <Link href="/products/evalone">EvalOne &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ab-sec ab-career" id="careers" data-nav="dark">
        <div className="wrap">
          <div className="ab-banner rv">
            <div>
              <h2 className="h2">Build security for what comes next</h2>
              <p>
                We bring together people working across identity, cybersecurity, AI governance,
                product development and enterprise technology. Based in McKinney, Texas.
              </p>
              {!hasRoles && (
                <p className="ab-none">
                  There are no open positions right now. Follow XSignOn for future opportunities.
                </p>
              )}
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

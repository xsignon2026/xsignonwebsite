import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutHow } from "@/components/about/AboutHow";
import { ThinkingShowcase } from "@/components/about/ThinkingShowcase";
import { AboutWhatWeDo } from "@/components/about/AboutWhatWeDo";
import { WhyXSignOnHub } from "@/components/about/WhyXSignOnHub";
import { aboutImages, principles } from "@/data/about";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About XSignOn | Sign-in People Trust. Governance Auditors Check.",
  description:
    "XSignOn works with regulated teams to replace passwords with sign-in people can trust, and to govern access for staff, devices, and AI agents.",
  path: "/about",
});

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "XSignOn",
  url: "https://xsignon.com",
  logo: "https://xsignon.com/icon.svg",
  description: "Enterprise identity governance and passwordless authentication platform.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "McKinney",
    addressRegion: "TX",
    addressCountry: "US",
  },
  sameAs: ["https://www.linkedin.com/company/xsignon"],
};

const iconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

// The three principle icons, as drawn in the prototype.
const principleIcons = [
  <svg key="evidence" {...iconProps}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
    <path d="m9 14 2 2 4-4" />
  </svg>,
  <svg key="easy" {...iconProps}>
    <path d="M4 17c4 0 4-10 8-10s4 10 8 10" />
    <circle cx="4" cy="17" r="1.4" />
    <circle cx="20" cy="17" r="1.4" />
  </svg>,
  <svg key="owner" {...iconProps}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c0-3.6 3-6 7-6s7 2.4 7 6" />
    <path d="m15.5 4.5 1.4 1.4 2.6-2.6" />
  </svg>,
];

export default function AboutPage(): React.JSX.Element {
  return (
    <div id="view-about">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <AboutHero />

      <div>
        <section className="about-sec" id="who" data-nav="light">
          <div className="wrap">
            <div className="sec-row rv">
              <h2 className="h2">Who we are</h2>
            </div>
            <div className="about-split">
              <div className="about-text rv">
                <p className="statement">
                  XSignOn works with regulated teams to replace passwords with sign-in people can
                  trust, and to govern access for staff, devices and AI agents with evidence an
                  auditor can check.
                </p>
                <p>
                  Our name points at the moment that matters most: the sign-on. We focus our work
                  there, from the keys staff carry to the governance behind them.
                </p>
              </div>
              <figure className="about-fig rv">
                <Image
                  src={aboutImages.team.src}
                  alt="Team running a workshop with notes on a wall"
                  width={aboutImages.team.width}
                  height={aboutImages.team.height}
                  sizes="(max-width: 900px) 100vw, 520px"
                />
                <figcaption>
                  <i className="live" aria-hidden="true" />
                  Sign-in people can trust
                </figcaption>
              </figure>
            </div>
            <div className="principles">
              {principles.map((principle, i) => (
                <article className="principle rv" key={principle.title}>
                  <span className="pi">{principleIcons[i]}</span>
                  <h4>{principle.title}</h4>
                  <p>{principle.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-sec" id="what" data-nav="light">
          <div className="wrap">
            <div className="sec-row rv">
              <h2 className="h2">What we do</h2>
            </div>
            <AboutWhatWeDo />
          </div>
        </section>

        <section className="about-sec" id="how" data-nav="dark">
          <div className="wrap">
            <div className="sec-row rv">
              <h2 className="h2">How we work</h2>
            </div>
            <AboutHow />
          </div>
        </section>

        <section className="about-sec" id="why" data-nav="dark">
          <div className="wrap">
            <div className="sec-row rv">
              <div>
                <h2 className="h2">Why XSignOn</h2>
                <p className="sec-sub">Governance on the inside</p>
              </div>
            </div>
            <WhyXSignOnHub />
          </div>
        </section>

        <section className="about-sec" id="a-thinking" data-nav="light">
          <div className="wrap">
            <div className="sec-row rv">
              <div>
                <h2 className="h2">Our thinking</h2>
                <p className="sec-sub">Ideas from the team building it</p>
              </div>
              <Link className="products-all" href="/thinking">
                All articles{" "}
                <span className="arr" aria-hidden="true">
                  &#8594;
                </span>
              </Link>
            </div>
            <ThinkingShowcase />
            <div className="about-bottom">
              <Link className="back-pill on-light" href="/">
                <span className="arr" aria-hidden="true">
                  &#8592;
                </span>
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

import { Fragment } from "react";
import Link from "next/link";
import type { CaseStudyPage, CaseStudyPageSection } from "@/types/case-study-page";

function Section({ section }: { section: CaseStudyPageSection }) {
  const hasParagraphs = section.paragraphs.length > 0;
  const hasBefore = hasParagraphs || section.features.length > 0 || section.steps.length > 0;
  return (
    <section className="page-sec">
      <div className="wrap">
        <div className="sec-head rv">
          <h2 className="h2">{section.heading}</h2>
        </div>
        {hasParagraphs && (
          <div className="body-copy">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}
        {section.features.length > 0 && (
          <ul className="feat-list rv" style={hasParagraphs ? { marginTop: "28px" } : undefined}>
            {section.features.map((feature) => (
              <li key={feature.lead}>
                <span>
                  <b>{feature.lead}</b>
                  {feature.joiner} {feature.body}
                </span>
              </li>
            ))}
          </ul>
        )}
        {section.steps.length > 0 && (
          <div className={section.steps.length === 3 ? "steps-grid three" : "steps-grid"}>
            {section.steps.map((step) => (
              <div className="step-card rv" key={step.number}>
                <span className="how-num">{step.number}</span>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        )}
        {section.notes.map((note) => (
          <Fragment key={note.label + note.text}>
            <span className="status-chip rv" style={hasBefore ? { marginTop: "24px" } : undefined}>
              <b>{note.label}:</b> {note.text}
            </span>
          </Fragment>
        ))}
      </div>
    </section>
  );
}

// One case study page, from its content (the built-in text, or the editors' version from Sanity).
export function CaseStudyView({ page }: { page: CaseStudyPage }) {
  return (
    <div id={`view-case-${page.slug}`}>
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/products">Products</Link>
            <span className="sep">/</span>
            <Link href="/proof">Proof</Link>
            <span className="sep">/</span>
            <span className="cur">{page.crumb}</span>
          </nav>
          <h1 className="h-display">{page.title}</h1>
          <div className="pmeta">
            {page.tags.map((tag) => (
              <span className="ptag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
      <div data-nav="light">
        {page.sections.map((section) => (
          <Section section={section} key={section.heading} />
        ))}
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Related</h2>
            </div>
            {page.related.map((row) => (
              <Link className="rel-row rv" href={row.href} key={row.href}>
                <span className="t">{row.title}</span>
                <span className="d">{row.type}</span>
              </Link>
            ))}
          </div>
        </section>
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">{page.ctaHeadline}</h2>
              <Link className="btn btn-white" href="/contact">
                Book a strategy call{" "}
                <span className="chev" aria-hidden="true">
                  &#8250;
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

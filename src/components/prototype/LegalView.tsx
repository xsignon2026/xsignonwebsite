import { Fragment } from "react";
import Link from "next/link";
import type { LegalPage } from "@/types/legal-page";

// A legal page (Privacy, Terms), from its content (the built-in text, or the editors' version from Sanity).
export function LegalView({ page }: { page: LegalPage }) {
  return (
    <div id={`view-${page.slug}`}>
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="cur">{page.crumb}</span>
          </nav>
          <h1 className="h-display">{page.title}</h1>
          {page.showNotice !== false && page.notice && (
            <div className="pmeta">
              <span className="ptag">{page.notice}</span>
            </div>
          )}
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="legal-body">
              {page.sections.map((section) => (
                <Fragment key={section.heading}>
                  <h3 className="h3">{section.heading}</h3>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">{page.ctaHeadline}</h2>
              <Link className="btn btn-white" href={page.ctaButton.href}>
                {page.ctaButton.label}{" "}
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

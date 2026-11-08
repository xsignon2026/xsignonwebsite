import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service | XSignOn",
  description:
    "XSignOn Terms of Service governing acceptable use, commercial trials, intellectual property, and liabilities.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div id="view-terms">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="cur">Terms</span>
          </nav>
          <h1 className="h-display">Terms</h1>
          <div className="pmeta">
            <span className="ptag">Updated January 2026</span>
            <span className="ptag">Placeholder copy for legal review</span>
          </div>
        </div>
      </section>

      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="legal-body">
              <h2 className="h3">Use of the site</h2>
              <p>
                Placeholder copy for legal review. This section will set out the acceptable and prohibited uses of this website and its content.
              </p>
              <h2 className="h3">Products and services</h2>
              <p>
                Placeholder copy for legal review. This section will describe how product descriptions, trials and orders on this site relate to the agreements that govern actual use.
              </p>
              <h2 className="h3">Intellectual property</h2>
              <p>
                Placeholder copy for legal review. This section will describe ownership of site content, trademarks and product names.
              </p>
              <h2 className="h3">Limitation of liability</h2>
              <p>
                Placeholder copy for legal review. This section will describe the limits that apply to liability arising from use of the site.
              </p>
              <h2 className="h3">Contact</h2>
              <p>
                Placeholder copy for legal review. This section will name the point of contact for questions about these terms.
              </p>
            </div>
          </div>
        </section>

        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">Questions about these terms?</h2>
              <Link className="btn btn-white" href="/contact">
                Contact us <span className="chev" aria-hidden="true">&#8250;</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

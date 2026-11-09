import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy | XSignOn",
  description:
    "XSignOn Privacy Policy outlining information collection, usage, sharing safeguards, and user rights.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div id="view-privacy">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="cur">Privacy Policy</span>
          </nav>
          <h1 className="h-display">Privacy Policy</h1>
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
              <h2 className="h3">Information we collect</h2>
              <p>
                Placeholder copy for legal review. This section will describe the categories of
                information XSignOn collects from visitors, customers and trial users, and how each
                category is collected.
              </p>
              <h2 className="h3">How we use information</h2>
              <p>
                Placeholder copy for legal review. This section will describe the purposes for which
                collected information is used, including providing products, responding to enquiries
                and improving the service.
              </p>
              <h2 className="h3">Sharing and disclosure</h2>
              <p>
                Placeholder copy for legal review. This section will describe when information is
                shared with service providers, partners or authorities, and the safeguards that
                apply.
              </p>
              <h2 className="h3">Your rights</h2>
              <p>
                Placeholder copy for legal review. This section will describe the rights individuals
                have over their information, including access, correction and deletion, and how to
                exercise them.
              </p>
              <h2 className="h3">Contact</h2>
              <p>
                Placeholder copy for legal review. This section will name the point of contact for
                privacy questions and requests.
              </p>
            </div>
          </div>
        </section>

        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">Questions about your data?</h2>
              <Link className="btn btn-white" href="/contact">
                Contact us{" "}
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

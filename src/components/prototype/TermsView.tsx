import Link from "next/link";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function TermsView() {
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
            <span className="ptag">Placeholder copy for legal review</span>
          </div>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="legal-body">
              <h3 className="h3">Use of the site</h3>
              <p>
                Placeholder copy for legal review. This section will set out the acceptable and
                prohibited uses of this website and its content.
              </p>
              <h3 className="h3">Products and services</h3>
              <p>
                Placeholder copy for legal review. This section will describe how product
                descriptions, trials and orders on this site relate to the agreements that govern
                actual use.
              </p>
              <h3 className="h3">Intellectual property</h3>
              <p>
                Placeholder copy for legal review. This section will describe ownership of site
                content, trademarks and product names.
              </p>
              <h3 className="h3">Limitation of liability</h3>
              <p>
                Placeholder copy for legal review. This section will describe the limits that apply
                to liability arising from use of the site.
              </p>
              <h3 className="h3">Contact</h3>
              <p>
                Placeholder copy for legal review. This section will name the point of contact for
                questions about these terms.
              </p>
            </div>
          </div>
        </section>
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">Questions about these terms?</h2>
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

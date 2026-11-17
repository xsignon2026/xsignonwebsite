import Link from "next/link";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function CareersView() {
  return (
    <div id="view-careers">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/about">About</Link>
            <span className="sep">/</span>
            <span className="cur">Careers</span>
          </nav>
          <h1 className="h-display">Careers</h1>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Working here</h2>
            </div>
            <div className="steps-grid three">
              <div className="step-card rv">
                <h4>Evidence over assertion</h4>
                <p>
                  We work the way our products work: claims point at evidence, and owners are named.
                  It applies to posture reviews and to how we run the company.
                </p>
              </div>
              <div className="step-card rv">
                <h4>The secure way is the easy way</h4>
                <p>
                  Security work that slows teams down is unfinished design. We hold our own tools to
                  the standard we sell.
                </p>
              </div>
              <div className="step-card rv">
                <h4>Small team, real responsibility</h4>
                <p>
                  XSignOn is an early team in McKinney, Texas. The work touches products customers
                  trust for every sign-in.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Open roles</h2>
            </div>
            <div className="case-grid">
              <article className="case-card rv">
                <div className="pmeta">
                  <span
                    className="ptag"
                    style={{ borderColor: "var(--line)", color: "var(--gray)" }}
                  >
                    Hybrid · McKinney, TX
                  </span>
                </div>
                <h3 className="h3">Security Engineer</h3>
                <p>
                  Build and run the security engineering behind XSignOn products, working from the
                  McKinney office with a hybrid schedule.
                </p>
                <Link className="link-arrow" href="/contact">
                  Apply through Contact{" "}
                  <span className="arr" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </article>
              <article className="case-card rv">
                <div className="pmeta">
                  <span
                    className="ptag"
                    style={{ borderColor: "var(--line)", color: "var(--gray)" }}
                  >
                    Remote
                  </span>
                </div>
                <h3 className="h3">AI Governance Analyst</h3>
                <p>
                  Evaluate AI systems against recognized frameworks and keep customer evidence ready
                  for review, working remotely.
                </p>
                <Link className="link-arrow" href="/contact">
                  Apply through Contact{" "}
                  <span className="arr" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </article>
            </div>
            <div className="role-state rv" style={{ marginTop: "26px" }}>
              <h3 className="h3">General applications</h3>
              <p>
                For roles beyond the two listed here, send your background through Contact and
                choose &quot;Careers&quot; as the reason.
              </p>
              <Link className="btn btn-navy" href="/contact?reason=careers">
                Contact us about careers
              </Link>
            </div>
          </div>
        </section>
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">Want to build sign-in people trust?</h2>
              <Link className="btn btn-white" href="/contact">
                Get in touch{" "}
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

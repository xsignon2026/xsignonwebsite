import Link from "next/link";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function AmsView() {
  return (
    <div id="view-ams">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/products">Products</Link>
            <span className="sep">/</span>
            <span className="cur">AMS</span>
          </nav>
          <h1 className="h-display">AMS</h1>
          <div className="pmeta">
            <span className="ptag">Key management</span>
            <span className="ptag">Enrollment</span>
            <span className="ptag">Lifecycle</span>
          </div>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="body-copy">
              <p>
                <b>
                  AMS is the platform that delivers, enrolls and manages passwordless keys across
                  the organization.
                </b>{" "}
                Hardware is only half a passwordless program; the other half is getting keys into
                hands, arranging replacements with ease, and knowing at any moment which key belongs
                to whom. AMS carries that half, delivered and supported by XSignOn.
              </p>
            </div>
            <div
              className="ui-panel rv"
              aria-hidden="true"
              style={{ marginTop: "44px", maxWidth: "720px" }}
            >
              <div className="meta">Lifecycle snapshot</div>
              <div className="snap-row">
                <span>Keys enrolled</span>
                <span className="track">
                  <span className="fill g" style={{ display: "block", width: "92%" }}></span>
                </span>
                <b>92%</b>
              </div>
              <div className="snap-row">
                <span>Replacements in transit</span>
                <span className="track">
                  <span className="fill" style={{ display: "block", width: "24%" }}></span>
                </span>
                <b>24</b>
              </div>
              <div className="snap-row">
                <span>Enrollment exceptions open</span>
                <span className="track">
                  <span className="fill" style={{ display: "block", width: "12%" }}></span>
                </span>
                <b>7</b>
              </div>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">What AMS covers</h2>
            </div>
            <div className="bento">
              <article className="bcard rv">
                <h3 className="h4">Delivery and support</h3>
                <p>
                  Keys ship to staff ready to enroll, with support handled by XSignOn. Keys that
                  need replacement are handled through AMS, with clear tracking and support from
                  XSignOn.
                </p>
              </article>
              <article className="bcard rv">
                <h3 className="h4">Enrollment workflows</h3>
                <p>
                  Guided enrollment for pilots, new starters and role changes, with recovery paths
                  built around a verified key.
                </p>
              </article>
              <article className="bcard rv">
                <h3 className="h4">Lifecycle and exceptions</h3>
                <p>
                  Every key carries its state: enrolled, active, scheduled for review, replaced.
                  Exceptions stay visible until they are resolved with evidence.
                </p>
              </article>
              <article className="bcard rv">
                <h3 className="h4">Reporting for review</h3>
                <p>
                  Enrollment coverage and exception counts feed posture reporting, so key management
                  shows up in governance evidence instead of a separate spreadsheet.
                </p>
              </article>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">How it works</h2>
            </div>
            <div className="steps-grid">
              <div className="step-card rv">
                <span className="how-num">01</span>
                <h4>Plan the rollout</h4>
                <p>
                  Roles are matched to key models, and the pilot group is enrolled first so recovery
                  flows are proven before scale-up.
                </p>
              </div>
              <div className="step-card rv">
                <span className="how-num">02</span>
                <h4>Enroll staff</h4>
                <p>
                  Keys arrive ready to enroll. Staff complete guided enrollment, and exceptions are
                  handled with a human guide at every step.
                </p>
              </div>
              <div className="step-card rv">
                <span className="how-num">03</span>
                <h4>Manage the fleet</h4>
                <p>
                  Replacements, suspensions and revocations run through AMS with a full history per
                  key.
                </p>
              </div>
              <div className="step-card rv">
                <span className="how-num">04</span>
                <h4>Prove coverage</h4>
                <p>
                  Enrollment and exception data feed governance evidence, so the rollout result is
                  checkable and ready to share.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Documentation</h2>
            </div>
            <div data-tabs>
              <div className="tabs" role="tablist" aria-label="AMS documentation">
                <button className="tab-btn" role="tab" aria-selected="true" data-tab="0">
                  Product Details
                </button>
                <button className="tab-btn" role="tab" aria-selected="false" data-tab="1">
                  Users &amp; Roles
                </button>
                <button className="tab-btn" role="tab" aria-selected="false" data-tab="2">
                  Inventory
                </button>
                <button className="tab-btn" role="tab" aria-selected="false" data-tab="3">
                  Enrollment
                </button>
                <button className="tab-btn" role="tab" aria-selected="false" data-tab="4">
                  Policy Controls
                </button>
                <button className="tab-btn" role="tab" aria-selected="false" data-tab="5">
                  Audit
                </button>
                <button className="tab-btn" role="tab" aria-selected="false" data-tab="6">
                  Deployments
                </button>
              </div>
              <div className="tab-panel" data-panel="0">
                <p>
                  <b>AMS is the asset management system for AUTH keys.</b> It tracks every key from
                  delivery to retirement, with its holder, state and history in one record.
                </p>
              </div>
              <div className="tab-panel" data-panel="1" hidden>
                <p>
                  <b>Users and roles</b> define who administers the fleet: platform admins,
                  enrollment leads and support staff each get the access their role needs, with
                  named owners.
                </p>
              </div>
              <div className="tab-panel" data-panel="2" hidden>
                <p>
                  <b>Inventory</b> shows every key and its state: ordered, in transit, enrolled,
                  active, scheduled for review, or replaced.
                </p>
              </div>
              <div className="tab-panel" data-panel="3" hidden>
                <p>
                  <b>Enrollment</b> workflows guide pilots, new starters and replacements, with
                  recovery paths built around a verified key.
                </p>
              </div>
              <div className="tab-panel" data-panel="4" hidden>
                <p>
                  <b>Policy controls</b> set how keys are issued, reviewed and retired, so the fleet
                  follows one consistent policy everywhere.
                </p>
              </div>
              <div className="tab-panel" data-panel="5" hidden>
                <p>
                  <b>Audit</b> exports the full history per key and per holder, ready for reviewers
                  and governance evidence.
                </p>
              </div>
              <div className="tab-panel" data-panel="6" hidden>
                <p>
                  <b>Deployments</b> run in phases: pilot group first, then priority teams, with
                  coverage visible at every step.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Related</h2>
            </div>
            <Link className="rel-row rv" href="/products/passwordless-keys">
              <span className="t">Passwordless Keys</span>
              <span className="d">Product</span>
            </Link>
            <Link className="rel-row rv" href="/proof/securing-bank-access-fido2">
              <span className="t">Securing Bank Access With FIDO2 Biometric Keys</span>
              <span className="d">Case study</span>
            </Link>
            <Link className="rel-row rv" href="/solutions/enterprise-technology">
              <span className="t">Enterprise Technology</span>
              <span className="d">Solution</span>
            </Link>
            <Link className="rel-row rv" href="/products">
              <span className="t">Back to Our products</span>
              <span className="d">Products</span>
            </Link>
          </div>
        </section>
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">Run key management without the tickets.</h2>
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

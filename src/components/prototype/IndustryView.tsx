import Link from "next/link";
import { NewsletterSubscribe } from "@/components/thinking/NewsletterSubscribe";
import { BeamsCanvas } from "@/components/motion/BeamsCanvas";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function IndustryView() {
  return (
    <div id="view-industry" className="res-view">
      <section className="page-hero has-beams" data-nav="dark">
        <BeamsCanvas className="page-beams" />
        <div className="page-fade" aria-hidden="true"></div>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/thinking">Our thinking</Link>
            <span className="sep">/</span>
            <span className="cur">Industry Thinking</span>
          </nav>
          <h1 className="h-display">Industry Thinking</h1>
          <div className="pmeta">
            <span className="ptag">Practical thinking for security, governance, and growth</span>
          </div>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <article className="bcard rv" style={{ marginBottom: "34px" }}>
              <div className="pmeta">
                <span className="pill-cat">Featured insight</span>
              </div>
              <h3 className="h3" style={{ marginTop: "18px" }}>
                Why AI Governance Is Becoming a Security Priority
              </h3>
              <p>
                AI use is now part of everyday operations, and governance is joining the security
                agenda: inventories, owners, and evidence for every system in production.
              </p>
              <span className="status-chip" style={{ marginTop: "18px" }}>
                <b>Full text pending:</b> this piece is being prepared for publication.
              </span>
            </article>
            <div className="case-grid">
              <article className="case-card rv">
                <h3 className="h4">How to Reduce Shadow AI Risk Before It Spreads</h3>
                <p>
                  Team-adopted AI, brought into the open and into the inventory, with owners and
                  evidence.
                </p>
                <span className="status-chip">
                  <b>Full text pending:</b> this piece is being prepared for publication.
                </span>
              </article>
              <article className="case-card rv">
                <h3 className="h4">Why Passwordless Identity Matters for Mid-Market Teams</h3>
                <p>
                  Verified sign-in sized for growing teams: keys, guided enrollment, and support
                  that scales.
                </p>
                <span className="status-chip">
                  <b>Full text pending:</b> this piece is being prepared for publication.
                </span>
              </article>
              <article className="case-card rv">
                <h3 className="h4">Zero Trust Works Best When It Starts With Identity</h3>
                <p>
                  Identity-first sequencing for zero trust programs: verify the person and the agent
                  first.
                </p>
                <span className="status-chip">
                  <b>Full text pending:</b> this piece is being prepared for publication.
                </span>
              </article>
              <article className="case-card rv">
                <h3 className="h4">How Continuous Compliance Improves Audit Readiness</h3>
                <p>
                  Evidence gathered as work happens, so reviews open with the record already
                  complete.
                </p>
                <span className="status-chip">
                  <b>Full text pending:</b> this piece is being prepared for publication.
                </span>
              </article>
              <article className="case-card rv">
                <h3 className="h4">What NIST AI-RMF Means for Practical AI Oversight</h3>
                <p>
                  The framework translated into inventories, control maps and reviewer-ready
                  evidence.
                </p>
                <span className="status-chip">
                  <b>Full text pending:</b> this piece is being prepared for publication.
                </span>
              </article>
              <article className="case-card rv">
                <h3 className="h4">Access Reviews Should Not Be a Last-Minute Exercise</h3>
                <p>
                  Review cycles that run all year, with owners and deadlines carried in one flow.
                </p>
                <span className="status-chip">
                  <b>Full text pending:</b> this piece is being prepared for publication.
                </span>
              </article>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <NewsletterSubscribe sourcePage="/thinking/industry" />
          </div>
        </section>
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">Discuss what you are reading.</h2>
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

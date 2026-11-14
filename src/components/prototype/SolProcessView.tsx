import Link from "next/link";
import { BeamsCanvas } from "@/components/motion/BeamsCanvas";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function SolProcessView() {
  return (
    <div id="view-sol-process" className="res-view">
      <section className="page-hero has-beams" data-nav="dark">
        <BeamsCanvas className="page-beams" />
        <div className="page-fade" aria-hidden="true"></div>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/solutions">Solutions</Link>
            <span className="sep">/</span>
            <span className="cur">Business Process</span>
          </nav>
          <h1 className="h-display">Business Process</h1>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">What teams come to XSignOn to achieve</h2>
            </div>
            <div className="body-copy">
              <p>
                Teams want access reviews, approvals and evidence collection in one clear,
                repeatable flow. Each cycle confirms access with confidence, keeps exceptions
                current, and produces a record reviewers trust.
              </p>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">How XSignOn supports it</h2>
            </div>
            <ul className="feat-list rv">
              <li>
                <span>
                  <b>Reviews as governed cycles</b> with named approvers, deadlines and a definition
                  of done.
                </span>
              </li>
              <li>
                <span>
                  <b>Approvals that leave a trail</b>: who approved what, when, and on what
                  evidence.
                </span>
              </li>
              <li>
                <span>
                  <b>Exceptions with clear review dates</b>, so temporary access stays temporary by
                  design and every item stays visible.
                </span>
              </li>
              <li>
                <span>
                  <b>Evidence collected in the flow of work</b>, so the audit record writes itself
                  as the process runs.
                </span>
              </li>
            </ul>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Products that deliver it</h2>
            </div>
            <Link className="rel-row rv" href="/products/postureone">
              <span className="t">PostureOne</span>
              <span className="d">Product</span>
            </Link>
            <Link className="rel-row rv" href="/products/ams">
              <span className="t">AMS</span>
              <span className="d">Product</span>
            </Link>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Proof and reading</h2>
            </div>
            <Link className="rel-row rv" href="/proof/biometric-only-authentication-global-it">
              <span className="t">Biometric-Only Authentication For A Global IT Enterprise</span>
              <span className="d">Case study</span>
            </Link>
            <Link className="rel-row rv" href="/thinking/non-human-identities">
              <span className="t">
                Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynamic Security
                Model
              </span>
              <span className="d">Insight</span>
            </Link>
            <Link className="rel-row rv" href="/solutions">
              <span className="t">Back to Solutions</span>
              <span className="d">Solutions</span>
            </Link>
          </div>
        </section>
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">Turn reviews into a clear, confident process.</h2>
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

import Link from "next/link";
import { BeamsCanvas } from "@/components/motion/BeamsCanvas";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function SolIdentityView() {
  return (
    <div id="view-sol-identity" className="res-view">
      <section className="page-hero has-beams" data-nav="dark">
        <BeamsCanvas className="page-beams" />
        <div className="page-fade" aria-hidden="true"></div>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/solutions">Solutions</Link>
            <span className="sep">/</span>
            <span className="cur">Identity Governance</span>
          </nav>
          <h1 className="h-display">Identity Governance</h1>
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
                Teams want one accountable sign-in for every person and agent. Accounts grow across
                systems, and leaders want a single, clear view of who can reach what and why, with
                approvals and provenance for every access.
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
                  <b>One inventory of access</b> across staff, devices and AI agents, with a named
                  owner for every account and permission.
                </span>
              </li>
              <li>
                <span>
                  <b>Findings prioritized by impact</b>, so governance effort goes to the
                  improvements that matter first.
                </span>
              </li>
              <li>
                <span>
                  <b>Reviews that run on a cycle</b>, with approvers, expiry and evidence attached,
                  inside the platform.
                </span>
              </li>
              <li>
                <span>
                  <b>Passwordless sign-in</b> that only the account owner can complete, for every
                  staff member.
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
            <Link className="rel-row rv" href="/products/passwordless-keys">
              <span className="t">Passwordless Keys</span>
              <span className="d">Product</span>
            </Link>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Proof and reading</h2>
            </div>
            <Link className="rel-row rv" href="/proof/securing-bank-access-fido2">
              <span className="t">Securing Bank Access With FIDO2 Biometric Keys</span>
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
              <h2 className="h2">Answer &quot;who can reach what&quot; in one view.</h2>
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

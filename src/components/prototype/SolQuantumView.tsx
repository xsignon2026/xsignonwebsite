import Link from "next/link";
import { BeamsCanvas } from "@/components/motion/BeamsCanvas";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function SolQuantumView() {
  return (
    <div id="view-sol-quantum" className="res-view">
      <section className="page-hero has-beams" data-nav="dark">
        <BeamsCanvas className="page-beams" />
        <div className="page-fade" aria-hidden="true"></div>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/solutions">Solutions</Link>
            <span className="sep">/</span>
            <span className="cur">Quantum-Safe Security</span>
          </nav>
          <h1 className="h-display">Quantum-Safe Security</h1>
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
                Teams are preparing early for post-quantum methods and want a clear inventory of the
                cryptography they rely on today. With that inventory in place, planning becomes
                confident, sequenced and ready to share.
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
                  <b>Inventory of cryptographic reliance</b>: which systems, keys and protocols
                  depend on what you have today.
                </span>
              </li>
              <li>
                <span>
                  <b>Prioritized migration order</b>, starting with identity and sign-in, where
                  verified access creates the most value.
                </span>
              </li>
              <li>
                <span>
                  <b>Verified sign-in now</b>, so teams build on a strong foundation today while
                  planning for the quantum timeline.
                </span>
              </li>
              <li>
                <span>
                  <b>Evidence of readiness</b> mapped as the migration proceeds, for the reviewers
                  who will ask.
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
            <Link className="rel-row rv" href="/proof">
              <span className="t">All case studies in Proof</span>
              <span className="d">Proof</span>
            </Link>
            <Link className="rel-row rv" href="/thinking/modern-micro-segmentation">
              <span className="t">Modern Micro-Segmentation for Zero Trust Security</span>
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
              <h2 className="h2">Start with the inventory, with confidence.</h2>
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

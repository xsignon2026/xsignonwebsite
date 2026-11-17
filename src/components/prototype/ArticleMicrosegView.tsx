import Link from "next/link";
import { BeamsCanvas } from "@/components/motion/BeamsCanvas";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function ArticleMicrosegView() {
  return (
    <div id="view-article-microseg" className="res-view">
      <section className="page-hero has-beams" data-nav="dark">
        <BeamsCanvas className="page-beams" />
        <div className="page-fade" aria-hidden="true"></div>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/thinking">Our thinking</Link>
            <span className="sep">/</span>
            <span className="cur">Micro-segmentation</span>
          </nav>
          <h1 className="h-display">Modern Micro-Segmentation for Zero Trust Security</h1>
          <div className="pmeta">
            <span className="ptag">XSignOn Team</span>
            <span className="ptag">June 29, 2026</span>
          </div>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="art-body">
              <h3 className="h3">Segments shaped around identity</h3>
              <p>
                Micro-segmentation divides an estate into small, governed zones, so each workload
                and service reaches only what it genuinely needs. The modern version starts with
                identity: who and what is asking, with what assurance, before any connection is
                allowed.
              </p>
              <p>
                That ordering matters. A segment drawn around network addresses alone drifts as
                services move. A segment drawn around identities and their verified sign-in stays
                accurate, because it follows the thing that actually requests access.
              </p>
              <h3 className="h3">Start with the services people rely on</h3>
              <p>
                The practical first step is an inventory: which services exist, which identities use
                them, and which connections happen every day. With that map in place, segments are
                drawn around real work, and every boundary has an owner.
              </p>
              <p>
                Rollout follows the same pattern as any good identity program: priority services
                first, evidence as you go, and a posture view where the segments and their coverage
                stay visible.
              </p>
              <div className="pull">
                A segment drawn around identities stays accurate, because it follows the thing that
                actually requests access.
              </div>
              <h3 className="h3">Evidence is part of the design</h3>
              <p>
                Each segment produces its own record: what it contains, who owns it, and which
                connections it allows. When reviewers ask how the estate is divided and why, the
                answer is the working map itself, current and complete.
              </p>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Related</h2>
            </div>
            <Link className="rel-row rv" href="/products/postureone">
              <span className="t">PostureOne</span>
              <span className="d">Product</span>
            </Link>
            <Link className="rel-row rv" href="/solutions/identity-governance">
              <span className="t">Identity Governance</span>
              <span className="d">Solution</span>
            </Link>
            <Link className="rel-row rv" href="/thinking/identity-first-controls">
              <span className="t">Elevate Enterprise Security with Identity-First Controls</span>
              <span className="d">Insight</span>
            </Link>
            <Link className="rel-row rv" href="/thinking">
              <span className="t">Back to Our thinking</span>
              <span className="d">Our thinking</span>
            </Link>
          </div>
        </section>
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">Draw segments around identity.</h2>
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

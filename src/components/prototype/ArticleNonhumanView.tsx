import Link from "next/link";
import { BeamsCanvas } from "@/components/motion/BeamsCanvas";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function ArticleNonhumanView() {
  return (
    <div id="view-article-nonhuman" className="res-view">
      <section className="page-hero has-beams" data-nav="dark">
        <BeamsCanvas className="page-beams" />
        <div className="page-fade" aria-hidden="true"></div>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/thinking">Our thinking</Link>
            <span className="sep">/</span>
            <span className="cur">Non-human identities</span>
          </nav>
          <h1 className="h-display">
            Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynamic Security Model
          </h1>
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
              <h3 className="h3">The identities doing the work are changing</h3>
              <p>
                A growing share of sign-ins comes from non-human identities: service accounts,
                automations, integrations and AI agents acting on behalf of teams. Each one holds
                access, and each one deserves the same governance as a person&apos;s account: an
                owner, a scope, and a review cycle.
              </p>
              <p>
                The opportunity is to govern them by design from the start. Human sign-in took years
                of programs to bring under one view; non-human identities can join that view now,
                while their numbers are still easy to inventory.
              </p>
              <h3 className="h3">A dynamic model, in practice</h3>
              <p>
                A dynamic security model treats identity as a living inventory. Non-human identities
                are registered when they are created, their access is scoped to the task they
                perform, and their activity is recorded with the same evidence as any staff sign-in.
              </p>
              <p>
                Reviews then cover the whole estate: people, devices, services and agents in one
                cycle, with approvers named in advance and exceptions carrying clear dates.
              </p>
              <div className="pull">
                Every identity, human or not, gets an owner, a scope, and a review cycle. That is
                the whole model.
              </div>
              <h3 className="h3">Where to start</h3>
              <p>
                Start with the inventory: which non-human identities exist, what they can reach, and
                who is responsible for each. That single list turns agent and service access from
                background noise into governed, provable access, and it is the foundation every
                later control builds on.
              </p>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Related</h2>
            </div>
            <Link className="rel-row rv" href="/products/xsense">
              <span className="t">XSense</span>
              <span className="d">Product</span>
            </Link>
            <Link className="rel-row rv" href="/solutions/ai-and-digital-governance">
              <span className="t">AI and Digital Governance</span>
              <span className="d">Solution</span>
            </Link>
            <Link className="rel-row rv" href="/thinking/data-and-ai-security">
              <span className="t">Data + AI Security Built for Visibility, Control, and Trust</span>
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
              <h2 className="h2">Govern every identity, human or not.</h2>
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

import Link from "next/link";
import { BeamsCanvas } from "@/components/motion/BeamsCanvas";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function ArticleDataAiView() {
  return (
    <div id="view-article-data-ai" className="res-view">
      <section className="page-hero has-beams" data-nav="dark">
        <BeamsCanvas className="page-beams" />
        <div className="page-fade" aria-hidden="true"></div>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/thinking">Our thinking</Link>
            <span className="sep">/</span>
            <span className="cur">Data + AI security</span>
          </nav>
          <h1 className="h-display">Data + AI Security Built for Visibility, Control, and Trust</h1>
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
              <h3 className="h3">The questions arrive before the evidence exists</h3>
              <p>
                AI governance assessments start with questions that sound simple: which AI systems
                are in production, who owns them, what data they touch, and which frameworks they
                were assessed against. Most teams hear these questions and start a document search,
                because the answers live in procurement threads, vendor pages and someone&apos;s
                memory.
              </p>
              <p>
                That search is the finding. An assessment that begins with assembling evidence from
                scratch is already telling the reviewer that governance follows use instead of
                preceding it.
              </p>
              <h3 className="h3">What evidence answers each question</h3>
              <p>
                <b>Inventory.</b> A list of AI systems with owners and deployment locations.
                Team-led AI, the deployments adopted directly by teams, belongs on this list with
                pride of place, because a complete inventory gives the assessment its full, accurate
                scope.
              </p>
              <p>
                <b>Control mapping.</b> Each system mapped to the controls of the frameworks that
                apply to it, showing coverage clearly for every system. A map with gaps marked
                clearly is credible and ready to act on.
              </p>
              <p>
                <b>Ownership and change.</b> Who is responsible when a model changes, a vendor
                updates terms, or a new deployment appears. Evidence that a system was assessed once
                is worth less than evidence that it is assessed continuously.
              </p>
              <div className="pull">
                An assessment that begins with a document search is already a finding: governance
                leads the way, with evidence ready at every step.
              </div>
              <h3 className="h3">Start before the assessment letter arrives</h3>
              <p>
                The cheapest time to build AI governance evidence is before anyone asks for it.
                Inventory first, map controls second, and attach evidence as work completes. When
                the assessment comes, the evidence pack exports from work already done, and the
                questions become a walkthrough instead of a search.
              </p>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Related</h2>
            </div>
            <Link className="rel-row rv" href="/products/evalone">
              <span className="t">EvalOne</span>
              <span className="d">Product</span>
            </Link>
            <Link className="rel-row rv" href="/solutions/ai-and-digital-governance">
              <span className="t">AI and Digital Governance</span>
              <span className="d">Solution</span>
            </Link>
            <Link className="rel-row rv" href="/thinking/modern-micro-segmentation">
              <span className="t">Modern Micro-Segmentation for Zero Trust Security</span>
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
              <h2 className="h2">Have evidence before the letter arrives.</h2>
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

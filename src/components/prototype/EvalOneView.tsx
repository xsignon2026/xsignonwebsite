import Link from "next/link";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function EvalOneView() {
  return (
    <div id="view-evalone">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/products">Products</Link>
            <span className="sep">/</span>
            <span className="cur">EvalOne</span>
          </nav>
          <h1 className="h-display">EvalOne</h1>
          <div className="pmeta">
            <span className="ptag">AI governance</span>
            <span className="ptag">Evaluation</span>
            <span className="ptag">Evidence</span>
          </div>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="body-copy">
              <p>
                <b>EvalOne evaluates AI systems against recognized frameworks.</b> AI is moving into
                production with momentum, and reviewers value clear evidence of how AI is governed.
                EvalOne maps AI use to frameworks, tracks the gaps, and produces evidence a reviewer
                can follow with ease.
              </p>
            </div>
            <div
              className="ui-panel rv"
              aria-hidden="true"
              style={{ marginTop: "44px", maxWidth: "720px" }}
            >
              <div className="meta">Evaluation checklist</div>
              <div className="rev-item done">
                <span className="chk">&#10003;</span>
                <span>AI use inventory across teams</span>
              </div>
              <div className="rev-item done">
                <span className="chk">&#10003;</span>
                <span>Control mapping to NIST AI-RMF</span>
              </div>
              <div className="rev-item">
                <span className="chk">&#10003;</span>
                <span>Gap register with owners and deadlines</span>
              </div>
              <div className="rev-item">
                <span className="chk">&#10003;</span>
                <span>Evidence pack for reviewers</span>
              </div>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">What EvalOne covers</h2>
            </div>
            <div className="bento">
              <article className="bcard rv">
                <h3 className="h4">AI use inventory</h3>
                <p>
                  Which AI systems are in use, where they run, and who is responsible for them.
                  Every system joins the inventory with an owner, so coverage stays complete and
                  clear.
                </p>
              </article>
              <article className="bcard rv">
                <h3 className="h4">Framework control mapping</h3>
                <p>
                  AI use is mapped control by control to the frameworks your reviewers use, so
                  assessments start from a complete map instead of a blank questionnaire.
                </p>
              </article>
              <article className="bcard rv">
                <h3 className="h4">Gap register</h3>
                <p>
                  Gaps carry owners and deadlines. Progress is visible in one list, and every item
                  stays active until it closes with evidence.
                </p>
              </article>
              <article className="bcard rv">
                <h3 className="h4">Reviewer-ready evidence</h3>
                <p>
                  Evidence attaches as work completes, so an assessment exports a pack a reviewer
                  can follow with ease.
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
                <h4>Inventory AI use</h4>
                <p>
                  Systems, vendors and deployments are listed with owners, including AI adopted
                  directly by teams across the organization.
                </p>
              </div>
              <div className="step-card rv">
                <span className="how-num">02</span>
                <h4>Map the controls</h4>
                <p>
                  Each system is mapped to the controls of the frameworks that apply to it, showing
                  coverage clearly for every system.
                </p>
              </div>
              <div className="step-card rv">
                <span className="how-num">03</span>
                <h4>Close the gaps</h4>
                <p>
                  Owners work the gap register in priority order, attaching evidence as each gap
                  closes.
                </p>
              </div>
              <div className="step-card rv">
                <span className="how-num">04</span>
                <h4>Export the evidence</h4>
                <p>
                  Assessments and audits receive an evidence pack that traces each claim back to its
                  source.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Frameworks it evaluates against</h2>
            </div>
            <div className="body-copy rv" style={{ marginBottom: "30px" }}>
              <p>
                EvalOne runs a six-layer evaluation framework, and every layer is mapped to the
                recognized frameworks your reviewers use, so one evaluation produces evidence for
                all five.
              </p>
            </div>
            <div className="tbl-wrap rv">
              <table className="spec">
                <thead>
                  <tr>
                    <th scope="col">Framework</th>
                    <th scope="col">What EvalOne maps</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">NIST AI RMF</th>
                    <td data-th="What EvalOne maps">
                      Govern, map, measure and manage functions, evidenced layer by layer.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">OWASP</th>
                    <td data-th="What EvalOne maps">
                      Application and LLM security checks, with results attached to each system.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">MITRE ATLAS</th>
                    <td data-th="What EvalOne maps">
                      Technique coverage for AI systems, tracked in the gap register.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">EU AI Act</th>
                    <td data-th="What EvalOne maps">
                      Obligations by system category, with owners and evidence for each one.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">ISO/IEC 42001</th>
                    <td data-th="What EvalOne maps">
                      AI management system controls, mapped to your policies and reviews.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="lede rv" style={{ marginTop: "22px", maxWidth: "760px" }}>
              Evaluations apply where the framework fits your AI use. A system is only shown as
              evaluated against the frameworks it was actually assessed on.
            </p>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Related</h2>
            </div>
            <Link className="rel-row rv" href="/solutions/ai-and-digital-governance">
              <span className="t">AI and Digital Governance</span>
              <span className="d">Solution</span>
            </Link>
            <Link className="rel-row rv" href="/thinking/data-and-ai-security">
              <span className="t">Data + AI Security Built for Visibility, Control, and Trust</span>
              <span className="d">Insight</span>
            </Link>
            <Link className="rel-row rv" href="/proof">
              <span className="t">All case studies in Proof</span>
              <span className="d">Proof</span>
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
              <h2 className="h2">Know what your AI is governed against.</h2>
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

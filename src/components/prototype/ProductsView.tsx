import Image from "next/image";
import Link from "next/link";
import { BeamsCanvas } from "@/components/motion/BeamsCanvas";
import { PerspectiveGrid } from "@/components/motion/PerspectiveGrid";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function ProductsView() {
  return (
    <div id="view-products">
      <section className="page-hero has-beams" data-nav="dark">
        <BeamsCanvas className="page-beams" />
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="cur">Products</span>
          </nav>
          <h1 className="h-display">Our products</h1>
        </div>
      </section>
      <div data-nav="light">
        <section
          className="page-sec"
          id="prodOverview"
          style={{ paddingTop: "72px", paddingBottom: "0" }}
        >
          <div className="wrap">
            <div className="sec-row rv">
              <h2 className="h2">Overview of products</h2>
              <div className="ov-rail">
                <p className="ov-count" id="ovCount" aria-live="polite">
                  3 of 3 selected
                </p>
                <button className="ov-clear" id="ovClear" type="button">
                  Clear all
                </button>
              </div>
            </div>
            <div className="ov-layout">
              <div>
                <div className="ov-table-wrap" id="ovTableWrap">
                  <div className="cmp-wrap rv">
                    <table className="cmp" id="ovTable">
                      <thead>
                        <tr>
                          <th scope="col" className="cmp-corner">
                            <span>Compare products</span>
                          </th>
                          <th scope="col" data-ov-col="postureone" className="cmp-prod">
                            <div className="ov-panel">
                              <Image
                                src="/images/products/img-48a7fb34.jpg"
                                alt="Server racks with network cabling in a data centre"
                                width={1600}
                                height={898}
                              />
                            </div>
                            <span className="cmp-name">PostureOne</span>
                            <Link className="ov-view" href="/products/postureone">
                              View PostureOne
                            </Link>
                            <button className="ov-remove" type="button" data-ov-remove="postureone">
                              Remove PostureOne
                            </button>
                          </th>
                          <th scope="col" data-ov-col="xsense" className="cmp-prod">
                            <div className="ov-panel">
                              <Image
                                src="/images/products/img-86bd27dc.jpg"
                                alt="Analytics dashboard with charts on a laptop screen"
                                width={1600}
                                height={1067}
                              />
                            </div>
                            <span className="cmp-name">XSense</span>
                            <Link className="ov-view" href="/products/xsense">
                              View XSense
                            </Link>
                            <button className="ov-remove" type="button" data-ov-remove="xsense">
                              Remove XSense
                            </button>
                          </th>
                          <th scope="col" data-ov-col="authtouch" className="cmp-prod">
                            <div className="ov-panel">
                              <Image
                                src="/images/products/img-2c6f4413.jpg"
                                alt="Combination padlock and chip cards resting on a keyboard"
                                width={1600}
                                height={1068}
                              />
                            </div>
                            <span className="cmp-name">AUTH Touch</span>
                            <Link className="ov-view" href="/products/passwordless-keys/touch">
                              View AUTH Touch
                            </Link>
                            <button className="ov-remove" type="button" data-ov-remove="authtouch">
                              Remove AUTH Touch
                            </button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">
                            <span className="cmp-label">
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <circle cx="12" cy="12" r="8" />
                                <circle cx="12" cy="12" r="3.5" />
                                <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
                              </svg>
                              What it does
                            </span>
                          </th>
                          <td data-th="PostureOne" data-ov-col="postureone">
                            Website and cloud security posture in one view.
                          </td>
                          <td data-th="XSense" data-ov-col="xsense">
                            Identity analytics and MFA through a governed identity provider.
                          </td>
                          <td data-th="AUTH Touch" data-ov-col="authtouch">
                            A FIDO2 security key: one touch confirms the person is present.
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <span className="cmp-label">
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <circle cx="9" cy="8" r="3.2" />
                                <path d="M3 19c0-3.2 2.7-5.2 6-5.2s6 2 6 5.2" />
                                <path d="m16.5 9.5 1.8 1.8 3-3.2" />
                              </svg>
                              Best for
                            </span>
                          </th>
                          <td data-th="PostureOne" data-ov-col="postureone">
                            Findings, owners and evidence in one place.
                          </td>
                          <td data-th="XSense" data-ov-col="xsense">
                            A live view of sign-in and MFA coverage at scale.
                          </td>
                          <td data-th="AUTH Touch" data-ov-col="authtouch">
                            The simplest sign-in step: connect, tap, done.
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <span className="cmp-label">
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M3.5 8 12 3.5 20.5 8v8L12 20.5 3.5 16z" />
                                <path d="M3.5 8 12 12.5 20.5 8M12 12.5v8" />
                              </svg>
                              Delivery
                            </span>
                          </th>
                          <td data-th="PostureOne" data-ov-col="postureone">
                            <span className="cmp-chip">Platform view</span>
                            <span className="cmp-chip">Mapped to frameworks</span>
                          </td>
                          <td data-th="XSense" data-ov-col="xsense">
                            <span className="cmp-chip">SaaS</span>
                            <span className="cmp-chip">On-premises</span>
                            <span className="cmp-chip">Air-gapped</span>
                          </td>
                          <td data-th="AUTH Touch" data-ov-col="authtouch">
                            <span className="cmp-chip">Hardware key</span>
                            <span className="cmp-chip">Supported by XSignOn</span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <span className="cmp-label">
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
                                <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
                              </svg>
                              Works with
                            </span>
                          </th>
                          <td data-th="PostureOne" data-ov-col="postureone">
                            <span className="cmp-chip">Websites</span>
                            <span className="cmp-chip">Cloud services</span>
                            <span className="cmp-chip">Data stores</span>
                          </td>
                          <td data-th="XSense" data-ov-col="xsense">
                            <span className="cmp-chip">Passwordless Keys</span>
                            <span className="cmp-chip">AMS</span>
                          </td>
                          <td data-th="AUTH Touch" data-ov-col="authtouch">
                            <span className="cmp-chip">Existing identity provider</span>
                            <span className="cmp-chip">AMS</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="ov-addback" id="ovAddback" hidden>
                  <p>Select products to compare</p>
                  <div className="ov-add-btns" id="ovAddBtns"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="page-sec"
          id="platform"
          style={{ paddingTop: "72px", paddingBottom: "0" }}
        >
          <div className="wrap">
            <div
              className="prodx-tabs rv"
              style={{ marginTop: "0" }}
              role="tablist"
              aria-label="Products"
              id="prodxTabs"
            >
              <button
                className="prodx-tab"
                role="tab"
                id="ptab-0"
                aria-controls="ppanel-0"
                aria-selected="true"
              >
                PostureOne
              </button>
              <button
                className="prodx-tab"
                role="tab"
                id="ptab-1"
                aria-controls="ppanel-1"
                aria-selected="false"
                tabIndex={-1}
              >
                Passwordless Keys
              </button>
              <button
                className="prodx-tab"
                role="tab"
                id="ptab-2"
                aria-controls="ppanel-2"
                aria-selected="false"
                tabIndex={-1}
              >
                EvalOne
              </button>
              <button
                className="prodx-tab"
                role="tab"
                id="ptab-3"
                aria-controls="ppanel-3"
                aria-selected="false"
                tabIndex={-1}
              >
                XSense
              </button>
              <button
                className="prodx-tab"
                role="tab"
                id="ptab-4"
                aria-controls="ppanel-4"
                aria-selected="false"
                tabIndex={-1}
              >
                AMS
              </button>
            </div>
            <article
              className="prodx-panel on"
              id="ppanel-0"
              role="tabpanel"
              aria-labelledby="ptab-0"
            >
              <div className="prodx-img">
                <Image
                  src="/images/products/img-48a7fb34.jpg"
                  alt="Rows of servers in a data centre"
                  width={1600}
                  height={898}
                />
              </div>
              <div>
                <h3>PostureOne</h3>
                <div className="prodx-tags">
                  <span className="prodx-tag">Identity inventory</span>
                  <span className="prodx-tag">Posture scoring</span>
                  <span className="prodx-tag">Continuous review</span>
                </div>
                <p>
                  A living inventory of every person, device and agent, with posture scored
                  continuously so reviews start from evidence instead of spreadsheets.
                </p>
                <Link className="prodx-more" href="/contact">
                  View more{" "}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M4 12h16m-6-6 6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </article>
            <article
              className="prodx-panel"
              id="ppanel-1"
              role="tabpanel"
              aria-labelledby="ptab-1"
              hidden
            >
              <div className="prodx-img">
                <Image
                  src="/images/products/img-80a343ae.jpg"
                  alt="A person signing in with a fingerprint on a phone"
                  width={1600}
                  height={1067}
                />
              </div>
              <div>
                <h3>Passwordless Keys</h3>
                <div className="prodx-tags">
                  <span className="prodx-tag">Passkeys</span>
                  <span className="prodx-tag">Biometrics</span>
                  <span className="prodx-tag">Hardware keys</span>
                  <span className="prodx-tag">4 AUTH models</span>
                </div>
                <p>
                  Sign-in your team will love: passkeys, biometrics and hardware keys in one calm
                  flow, with recovery paths people can actually follow.
                </p>
                <Link className="prodx-more" href="/contact">
                  View more{" "}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M4 12h16m-6-6 6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </article>
            <article
              className="prodx-panel"
              id="ppanel-2"
              role="tabpanel"
              aria-labelledby="ptab-2"
              hidden
            >
              <div className="prodx-img">
                <Image
                  src="/images/products/img-b5d58838.jpg"
                  alt="A team reviewing work together in a workshop"
                  width={1600}
                  height={1067}
                />
              </div>
              <div>
                <h3>EvalOne</h3>
                <div className="prodx-tags">
                  <span className="prodx-tag">Agent evaluation</span>
                  <span className="prodx-tag">Evidence packs</span>
                  <span className="prodx-tag">Sign-off flows</span>
                </div>
                <p>
                  Agents are evaluated the way great teams review code: structured checks, attached
                  evidence and a named reviewer before authority grows.
                </p>
                <Link className="prodx-more" href="/contact">
                  View more{" "}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M4 12h16m-6-6 6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </article>
            <article
              className="prodx-panel"
              id="ppanel-3"
              role="tabpanel"
              aria-labelledby="ptab-3"
              hidden
            >
              <div className="prodx-img">
                <Image
                  src="/images/products/img-86bd27dc.jpg"
                  alt="An analytics dashboard on a screen"
                  width={1600}
                  height={1067}
                />
              </div>
              <div>
                <h3>XSense</h3>
                <div className="prodx-tags">
                  <span className="prodx-tag">Live signals</span>
                  <span className="prodx-tag">Behaviour context</span>
                  <span className="prodx-tag">Adaptive decisions</span>
                </div>
                <p>
                  Behavioural and contextual signals stream into every access decision, so the
                  platform responds to the moment rather than a static rule.
                </p>
                <Link className="prodx-more" href="/contact">
                  View more{" "}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M4 12h16m-6-6 6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </article>
            <article
              className="prodx-panel"
              id="ppanel-4"
              role="tabpanel"
              aria-labelledby="ptab-4"
              hidden
            >
              <div className="prodx-img">
                <Image
                  src="/images/products/img-02a71707.jpg"
                  alt="Organised warehouse shelves representing managed access operations"
                  width={1600}
                  height={1067}
                />
              </div>
              <div>
                <h3>AMS</h3>
                <div className="prodx-tags">
                  <span className="prodx-tag">Access requests</span>
                  <span className="prodx-tag">Approvals</span>
                  <span className="prodx-tag">Periodic reviews</span>
                </div>
                <p>
                  The day-to-day home of access operations: requests, approvals and periodic reviews
                  with clear owners and a complete trail.
                </p>
                <Link className="prodx-more" href="/contact">
                  View more{" "}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M4 12h16m-6-6 6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </article>
          </div>
        </section>
        <section
          className="page-sec"
          id="prodThinking"
          style={{ paddingTop: "72px", paddingBottom: "104px" }}
        >
          <div className="wrap">
            <div className="sec-row rv">
              <h2 className="h2">Our thinking</h2>
              <Link className="products-all" href="/thinking">
                All articles{" "}
                <span className="arr" aria-hidden="true">
                  &#8594;
                </span>
              </Link>
            </div>
            <div
              className="tc2"
              id="prodThinkCar"
              role="region"
              aria-roledescription="carousel"
              aria-label="Our thinking"
            >
              <div className="tc2-view">
                <div className="tc2-track">
                  <Link className="tc2-card" href="/thinking/identity-first-controls">
                    <span className="tc2-img">
                      <Image
                        src="/images/products/img-c9abf1f6.jpg"
                        alt="Glass office towers photographed from below"
                        width={640}
                        height={427}
                      />
                    </span>
                    <span className="tc2-title">
                      Elevate Enterprise Security with Identity-First Controls
                    </span>
                    <span className="tc2-go">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <path d="M4 12h16m-6-6 6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                  <Link className="tc2-card" href="/thinking/data-and-ai-security">
                    <span className="tc2-img">
                      <Image
                        src="/images/products/img-1cea8d4a.jpg"
                        alt="Illuminated circuit board"
                        width={640}
                        height={427}
                      />
                    </span>
                    <span className="tc2-title">
                      Data + AI Security Built for Visibility, Control, and Trust
                    </span>
                    <span className="tc2-go">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <path d="M4 12h16m-6-6 6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                  <Link className="tc2-card" href="/thinking/modern-micro-segmentation">
                    <span className="tc2-img">
                      <Image
                        src="/images/products/img-8bd6d3d2.jpg"
                        alt="Padlock and chip cards resting on a keyboard"
                        width={640}
                        height={427}
                      />
                    </span>
                    <span className="tc2-title">
                      Modern Micro-Segmentation for Zero Trust Security
                    </span>
                    <span className="tc2-go">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <path d="M4 12h16m-6-6 6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                  <Link className="tc2-card" href="/thinking/agentic-ai-cybersecurity">
                    <span className="tc2-img">
                      <Image
                        src="/images/products/img-ddf584c7.jpg"
                        alt="Engineer working on a laptop in a technology lab"
                        width={640}
                        height={427}
                      />
                    </span>
                    <span className="tc2-title">
                      Building Smarter Cybersecurity with Agentic AI and the AutoGen Framework
                    </span>
                    <span className="tc2-go">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <path d="M4 12h16m-6-6 6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                  <Link className="tc2-card" href="/thinking/non-human-identities">
                    <span className="tc2-img">
                      <Image
                        src="/images/products/img-fec5d462.jpg"
                        alt="Close-up of server hardware and cabling"
                        width={640}
                        height={427}
                      />
                    </span>
                    <span className="tc2-title">
                      Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynamic
                      Security Model
                    </span>
                    <span className="tc2-go">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <path d="M4 12h16m-6-6 6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
              <div className="tc2-dots" role="group" aria-label="Choose position"></div>
            </div>
          </div>
        </section>
        <section className="cta-sec" data-nav="light">
          <div className="wrap">
            <div className="cta-panel rv has-persp">
              <PerspectiveGrid className="bg-persp" horizon={0.28} alpha={1.6} />
              <h2 className="h2">Talk to us about sign-in your team will love.</h2>
              <Link className="btn btn-white" href="/contact">
                Book a strategy call{" "}
                <span className="chev" aria-hidden="true">
                  &#8250;
                </span>
              </Link>
              <div className="cta-card cta-logo" aria-hidden="true">
                <span className="cl-ring r1"></span>
                <span className="cl-ring r2"></span>
                <Image src="/images/products/img-990ffb0c.png" alt="" width={760} height={198} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

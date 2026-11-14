import { BeamsCanvas } from "@/components/motion/BeamsCanvas";
import Image from "next/image";
import Link from "next/link";
import { HeroArt } from "@/components/home/HeroArt";
import { ContactCta } from "@/components/common/ContactCta";
import { HeroDomainScan } from "@/components/home/HeroDomainScan";
import { PerspectiveGrid } from "@/components/motion/PerspectiveGrid";
import { Standards } from "@/components/home/Standards";
import { SecurityEcosystem } from "@/components/home/SecurityEcosystem";
import { SolutionIllustration } from "@/components/home/SolutionIllustration";

// The Home page markup, converted from the approved prototype (view-home) by compare/html2jsx.py.
// The interactive pieces (hero card, product coverflow, partner hub, journey, thinking rows, scroll
// reveals) are switched on by HomeBehaviors, which is a port of the prototype's scripts.
export function HomeView() {
  return (
    <div id="view-home">
      <section className="hero-split" data-nav="dark">
        <div className="hero-lines" aria-hidden="true">
          <svg
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            stroke="#9db9f5"
            strokeWidth="1.5"
          >
            <g>
              <ellipse cx="1300" cy="140" rx="130" ry="86" />
              <ellipse cx="1300" cy="140" rx="215" ry="140" />
              <ellipse cx="1300" cy="140" rx="300" ry="196" />
              <ellipse cx="1300" cy="140" rx="385" ry="252" />
              <ellipse cx="1300" cy="140" rx="470" ry="308" />
            </g>
            <g>
              <ellipse cx="140" cy="790" rx="120" ry="80" />
              <ellipse cx="140" cy="790" rx="200" ry="132" />
              <ellipse cx="140" cy="790" rx="280" ry="184" />
              <ellipse cx="140" cy="790" rx="360" ry="236" />
            </g>
            <circle cx="760" cy="430" r="180" />
            <circle cx="760" cy="430" r="262" />
          </svg>
          <svg
            className="hl-b"
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            stroke="#9db9f5"
            strokeWidth="1"
          >
            <path d="M0 150 H1600 M0 300 H1600 M0 450 H1600 M0 600 H1600 M0 750 H1600 M200 0 V900 M400 0 V900 M600 0 V900 M800 0 V900 M1000 0 V900 M1200 0 V900 M1400 0 V900" />
            <circle cx="330" cy="180" r="120" />
            <circle cx="330" cy="180" r="188" />
            <circle cx="1420" cy="720" r="110" />
            <circle cx="1420" cy="720" r="176" />
          </svg>
        </div>
        <BeamsCanvas id="heroBeams" className="hero-beams" />
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hero-eyebrow">Identity, governance and security</p>
              <h1 className="h-display">
                Protect identity. Govern risk.{" "}
                <span className="h1-acc">Prepare for what&apos;s next.</span>
              </h1>
              <p className="hero-sub">
                XSignOn develops security products across identity governance, passwordless
                authentication, AI evaluation, and emerging digital risk.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-navy" href="/products">
                  Explore our products{" "}
                  <span className="arr-up" aria-hidden="true">
                    &#8599;
                  </span>
                </Link>
                <Link className="link-arrow" href="/about">
                  About XSignOn{" "}
                  <span className="arr" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </div>
              <HeroDomainScan />
            </div>
            <div className="hero-visual">
              <HeroArt />
            </div>
          </div>
        </div>
      </section>

      <section className="block" id="products" data-nav="light">
        <div className="wrap">
          <div className="sec-row rv">
            <h2 className="h2">Our products</h2>
            <Link className="products-all" href="/products">
              View all products{" "}
              <span className="arr" aria-hidden="true">
                &#8594;
              </span>
            </Link>
          </div>
          <div
            className="coverflow"
            id="productCoverflow"
            role="region"
            aria-roledescription="carousel"
            aria-label="Our products"
          >
            <div className="cf-viewport" id="cfViewport">
              <div className="cf-track" id="cfTrack">
                <article
                  className="cf-card is-active"
                  data-cf="0"
                  aria-roledescription="slide"
                  aria-label="1 of 7: PostureOne"
                >
                  <div className="cf-photo">
                    <div className="pcard-icon">
                      <svg
                        viewBox="0 0 96 96"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="10" y="10" width="76" height="76" rx="16" />
                        <line x1="48" y1="10" x2="48" y2="86" />
                        <line x1="10" y1="48" x2="86" y2="48" />
                        <path
                          d="M48 10 H70 a16 16 0 0 1 16 16 V48 H48 Z"
                          stroke="currentColor"
                          className="acc"
                        />
                        <circle cx="29" cy="29" r="4" />
                        <circle cx="67" cy="29" r="4" />
                        <circle cx="29" cy="67" r="4" />
                        <circle cx="67" cy="67" r="4" />
                        <path
                          d="M48 39 l8.5 3.2 V50 c0 5.2-3.6 8.4-8.5 10.5 C43.1 58.4 39.5 55.2 39.5 50 V42.2 Z"
                          className="bgfill"
                        />
                      </svg>
                    </div>
                    <Image
                      src="/images/home/img-48a7fb34.jpg"
                      alt="Server racks with network cabling in a data centre"
                      width={1600}
                      height={898}
                    />
                  </div>
                  <div className="cf-body">
                    <h3>PostureOne</h3>
                    <p className="cf-desc">
                      A living inventory of every person, device and agent, scored continuously.
                    </p>
                    <div className="cf-tags" aria-label="PostureOne tags">
                      <span>Identity inventory</span>
                      <span>Posture scoring</span>
                      <span>Continuous review</span>
                    </div>
                    <Link
                      className="btn pcard-btn cf-btn"
                      href="/products/postureone"
                      aria-label="View more about PostureOne"
                    >
                      View more{" "}
                      <span className="arr" aria-hidden="true">
                        &#8594;
                      </span>
                    </Link>
                  </div>
                </article>
                <article
                  className="cf-card"
                  data-cf="1"
                  aria-roledescription="slide"
                  aria-label="2 of 7: Passwordless Keys"
                >
                  <div className="cf-photo">
                    <div className="pcard-icon">
                      <svg
                        viewBox="0 0 96 96"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="10" y="10" width="76" height="76" rx="16" />
                        <path d="M26 72 V52 a22 22 0 0 1 44 0 V72" />
                        <path d="M34 72 V52 a14 14 0 0 1 28 0 V72" />
                        <path
                          d="M42 70 V52 a6 6 0 0 1 12 0 V70"
                          stroke="currentColor"
                          className="acc"
                        />
                      </svg>
                    </div>
                    <Image
                      src="/images/home/img-80a343ae.jpg"
                      alt="Person holding a phone in one hand while signing in on a laptop"
                      width={1600}
                      height={1067}
                    />
                  </div>
                  <div className="cf-body">
                    <h3>Passwordless Keys</h3>
                    <p className="cf-desc">
                      Passkeys, biometrics and hardware keys in one calm sign-in flow.
                    </p>
                    <div className="cf-tags" aria-label="Passwordless Keys tags">
                      <span>Passkeys</span>
                      <span>Biometrics</span>
                      <span>Hardware keys</span>
                    </div>
                    <Link
                      className="btn pcard-btn cf-btn"
                      href="/products/passwordless-keys"
                      aria-label="View more about Passwordless Keys"
                    >
                      View more{" "}
                      <span className="arr" aria-hidden="true">
                        &#8594;
                      </span>
                    </Link>
                  </div>
                </article>
                <article
                  className="cf-card"
                  data-cf="2"
                  aria-roledescription="slide"
                  aria-label="3 of 7: EvalOne"
                >
                  <div className="cf-photo">
                    <div className="pcard-icon">
                      <svg
                        viewBox="0 0 96 96"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="10" y="10" width="76" height="76" rx="16" />
                        <circle cx="48" cy="48" r="27" />
                        <circle cx="48" cy="48" r="18" />
                        <circle cx="48" cy="48" r="9" />
                        <path d="M48 21 A27 27 0 0 1 75 48" stroke="currentColor" className="acc" />
                        <circle cx="48" cy="48" r="3.5" fill="currentColor" stroke="none" />
                      </svg>
                    </div>
                    <Image
                      src="/images/home/img-b5d58838.jpg"
                      alt="Team running an evaluation workshop with notes on a wall"
                      width={1600}
                      height={1067}
                    />
                  </div>
                  <div className="cf-body">
                    <h3>EvalOne</h3>
                    <p className="cf-desc">
                      Agents evaluated with structured checks, evidence and a named reviewer.
                    </p>
                    <div className="cf-tags" aria-label="EvalOne tags">
                      <span>Agent evaluation</span>
                      <span>Evidence packs</span>
                      <span>Sign-off flows</span>
                    </div>
                    <Link
                      className="btn pcard-btn cf-btn"
                      href="/products/evalone"
                      aria-label="View more about EvalOne"
                    >
                      View more{" "}
                      <span className="arr" aria-hidden="true">
                        &#8594;
                      </span>
                    </Link>
                  </div>
                </article>
                <article
                  className="cf-card"
                  data-cf="3"
                  aria-roledescription="slide"
                  aria-label="4 of 7: XSense"
                >
                  <div className="cf-photo">
                    <div className="pcard-icon">
                      <svg
                        viewBox="0 0 96 96"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="10" y="10" width="76" height="76" rx="16" />
                        <circle cx="48" cy="48" r="10" />
                        <line x1="61" y1="48" x2="68" y2="48" />
                        <line x1="55" y1="59" x2="58" y2="65" />
                        <line x1="41" y1="59" x2="38" y2="65" />
                        <line x1="35" y1="48" x2="28" y2="48" />
                        <line x1="41" y1="37" x2="38" y2="31" />
                        <line x1="55" y1="37" x2="58" y2="31" />
                        <circle cx="73" cy="48" r="3.5" className="bgfill" />
                        <circle cx="61" cy="70" r="3.5" className="bgfill" />
                        <circle cx="35" cy="70" r="3.5" className="bgfill" />
                        <circle cx="23" cy="48" r="3.5" className="bgfill" />
                        <circle cx="35" cy="26" r="3.5" className="bgfill" />
                        <circle
                          cx="61"
                          cy="26"
                          r="3.5"
                          className="bgfill acc"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <Image
                      src="/images/home/img-86bd27dc.jpg"
                      alt="Analytics dashboard with charts on a laptop screen"
                      width={1600}
                      height={1067}
                    />
                  </div>
                  <div className="cf-body">
                    <h3>XSense</h3>
                    <p className="cf-desc">
                      Live behavioural signals that shape every access decision.
                    </p>
                    <div className="cf-tags" aria-label="XSense tags">
                      <span>Live signals</span>
                      <span>Behaviour context</span>
                      <span>Adaptive decisions</span>
                    </div>
                    <Link
                      className="btn pcard-btn cf-btn"
                      href="/products/xsense"
                      aria-label="View more about XSense"
                    >
                      View more{" "}
                      <span className="arr" aria-hidden="true">
                        &#8594;
                      </span>
                    </Link>
                  </div>
                </article>
                <article
                  className="cf-card"
                  data-cf="4"
                  aria-roledescription="slide"
                  aria-label="5 of 7: AMS"
                >
                  <div className="cf-photo">
                    <div className="pcard-icon">
                      <svg
                        viewBox="0 0 96 96"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="10" y="10" width="76" height="76" rx="16" />
                        <path
                          d="M52.2 24.4 A24 24 0 0 1 71.6 43.8"
                          stroke="currentColor"
                          className="acc"
                        />
                        <path d="M71.6 52.2 A24 24 0 0 1 52.2 71.6" />
                        <path d="M43.8 71.6 A24 24 0 0 1 24.4 52.2" />
                        <path d="M24.4 43.8 A24 24 0 0 1 43.8 24.4" />
                        <circle cx="48" cy="48" r="4" fill="currentColor" stroke="none" />
                      </svg>
                    </div>
                    <Image
                      src="/images/home/img-02a71707.jpg"
                      alt="Warehouse shelves of tracked inventory and parts"
                      width={1600}
                      height={1067}
                    />
                  </div>
                  <div className="cf-body">
                    <h3>AMS</h3>
                    <p className="cf-desc">
                      Access requests, approvals and periodic reviews with a complete trail.
                    </p>
                    <div className="cf-tags" aria-label="AMS tags">
                      <span>Access requests</span>
                      <span>Approvals</span>
                      <span>Periodic reviews</span>
                    </div>
                    <Link
                      className="btn pcard-btn cf-btn"
                      href="/products/ams"
                      aria-label="View more about AMS"
                    >
                      View more{" "}
                      <span className="arr" aria-hidden="true">
                        &#8594;
                      </span>
                    </Link>
                  </div>
                </article>
                <article
                  className="cf-card"
                  data-cf="5"
                  aria-roledescription="slide"
                  aria-label="6 of 7: XDMACsec"
                >
                  <div className="cf-photo">
                    <div className="pcard-icon">
                      <svg
                        viewBox="0 0 96 96"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="10" y="10" width="76" height="76" rx="16" />
                        <rect x="24" y="32" width="48" height="34" rx="6" />
                        <path d="M24 38l24 17 24-17" stroke="currentColor" className="acc" />
                      </svg>
                    </div>
                    <Image
                      src="/images/home/img-86bd27dc.jpg"
                      alt="Analytics dashboard with charts on a laptop screen"
                      width={1600}
                      height={1067}
                    />
                  </div>
                  <div className="cf-body">
                    <h3>XDMACsec</h3>
                    <p className="cf-desc">Email security for your organization.</p>
                    <div className="cf-tags" aria-label="XDMACsec tags">
                      <span>Email security</span>
                    </div>
                    <Link
                      className="btn pcard-btn cf-btn"
                      href="/products"
                      aria-label="View more about XDMACsec"
                    >
                      View more{" "}
                      <span className="arr" aria-hidden="true">
                        &#8594;
                      </span>
                    </Link>
                  </div>
                </article>
                <article
                  className="cf-card"
                  data-cf="6"
                  aria-roledescription="slide"
                  aria-label="7 of 7: XDMACsec"
                >
                  <div className="cf-photo">
                    <div className="pcard-icon">
                      <svg
                        viewBox="0 0 96 96"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="10" y="10" width="76" height="76" rx="16" />
                        <rect x="24" y="32" width="48" height="34" rx="6" />
                        <path d="M24 38l24 17 24-17" stroke="currentColor" className="acc" />
                      </svg>
                    </div>
                    <Image
                      src="/images/home/img-86bd27dc.jpg"
                      alt="Analytics dashboard with charts on a laptop screen"
                      width={1600}
                      height={1067}
                    />
                  </div>
                  <div className="cf-body">
                    <h3>XDMACsec</h3>
                    <p className="cf-desc">Email security for your organization.</p>
                    <div className="cf-tags" aria-label="XDMACsec tags">
                      <span>Email security</span>
                    </div>
                    <Link
                      className="btn pcard-btn cf-btn"
                      href="/products"
                      aria-label="View more about XDMACsec"
                    >
                      View more{" "}
                      <span className="arr" aria-hidden="true">
                        &#8594;
                      </span>
                    </Link>
                  </div>
                </article>
              </div>
            </div>
            <div className="cf-controls">
              <button className="cf-arrow cf-prev" type="button" aria-label="Previous product">
                &#8592;
              </button>
              <div className="cf-dots" role="group" aria-label="Choose product">
                <button
                  className="cf-dot act"
                  type="button"
                  aria-label="Show PostureOne"
                  aria-current="true"
                ></button>
                <button
                  className="cf-dot"
                  type="button"
                  aria-label="Show Passwordless Keys"
                ></button>
                <button className="cf-dot" type="button" aria-label="Show EvalOne"></button>
                <button className="cf-dot" type="button" aria-label="Show XSense"></button>
                <button className="cf-dot" type="button" aria-label="Show AMS"></button>
                <button className="cf-dot" type="button" aria-label="Show XDMACsec"></button>
                <button
                  className="cf-dot"
                  type="button"
                  aria-label="Show XDMACsec (second card)"
                ></button>
              </div>
              <button className="cf-arrow cf-next" type="button" aria-label="Next product">
                &#8594;
              </button>
              <p className="cf-status" id="cfStatus" aria-live="polite">
                PostureOne, 1 of 7
              </p>
            </div>
            <div className="cf-timer" aria-hidden="true">
              <i></i>
            </div>
          </div>
        </div>
      </section>

      <section
        className="block"
        id="partners"
        data-nav="light"
        style={{ paddingTop: "48px", paddingBottom: "56px" }}
      >
        <div className="wrap">
          <div className="sec-row rv">
            <div>
              <h2 className="h2">XSignOn Security Ecosystem</h2>
            </div>
          </div>

          <SecurityEcosystem />
        </div>
      </section>

      <section className="block dark has-persp" id="resources" data-nav="dark">
        <PerspectiveGrid className="bg-persp" horizon={0.38} alpha={1.7} />
        <div className="wrap">
          <div className="sec-row rv">
            <h2 className="h2">What XSignOn does</h2>
            <Link className="products-all" href="/solutions">
              View all solutions{" "}
              <span className="arr" aria-hidden="true">
                &#8594;
              </span>
            </Link>
          </div>

          <div id="solutions">
            <div className="journey" id="journey">
              <div className="j-stage">
                <div className="j-rail">
                  <button type="button" data-j="0" className="act">
                    Identity Governance
                  </button>
                  <button type="button" data-j="1">
                    AI and Digital Governance
                  </button>
                  <button type="button" data-j="2">
                    Passwordless Security
                  </button>
                  <button type="button" data-j="3">
                    Quantum-Safe Security
                  </button>
                </div>
                <div className="j-panels">
                  <article className="j-panel act">
                    <div className="j-txt">
                      <h4 className="h4">Identity Governance</h4>
                      <p>
                        Teams want one accountable sign-in for every person and agent. Govern who
                        and what gets access, and prove it with confidence.
                      </p>
                      <Link className="link-arrow" href="/solutions/identity-governance">
                        View solution{" "}
                        <span className="arr" aria-hidden="true">
                          &#8594;
                        </span>
                      </Link>
                    </div>
                    <figure className="j-art">
                      <SolutionIllustration name="identity" />
                    </figure>
                  </article>
                  <article className="j-panel">
                    <div className="j-txt">
                      <h4 className="h4">AI and Digital Governance</h4>
                      <p>
                        Teams want AI evidence ready with confidence. Map AI use to frameworks and
                        keep evidence ready.
                      </p>
                      <Link className="link-arrow" href="/solutions/ai-and-digital-governance">
                        View solution{" "}
                        <span className="arr" aria-hidden="true">
                          &#8594;
                        </span>
                      </Link>
                    </div>
                    <figure className="j-art">
                      <SolutionIllustration name="ai" />
                    </figure>
                  </article>
                  <article className="j-panel">
                    <div className="j-txt">
                      <h4 className="h4">Passwordless Security</h4>
                      <p>
                        Phishing-resistant sign-in with hardware biometric keys, so people prove who
                        they are without a password.
                      </p>
                      <Link className="link-arrow" href="/products/passwordless-keys">
                        View solution{" "}
                        <span className="arr" aria-hidden="true">
                          &#8594;
                        </span>
                      </Link>
                    </div>
                    <figure className="j-art">
                      <SolutionIllustration name="key" />
                    </figure>
                  </article>
                  <article className="j-panel">
                    <div className="j-txt">
                      <h4 className="h4">Quantum-Safe Security</h4>
                      <p>
                        Teams are preparing early for post-quantum methods. Inventory what you rely
                        on and plan the move with clarity and confidence.
                      </p>
                      <Link className="link-arrow" href="/solutions/quantum-safe-security">
                        View solution{" "}
                        <span className="arr" aria-hidden="true">
                          &#8594;
                        </span>
                      </Link>
                    </div>
                    <figure className="j-art">
                      <SolutionIllustration name="atom" />
                    </figure>
                  </article>
                </div>
              </div>
              <div className="j-scroll" aria-hidden="true">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Standards />

      <section className="block think-band" id="thinking" data-nav="dark">
        <div className="wrap">
          <div className="sec-row rv">
            <h2 className="h2">Our thinking</h2>
            <Link className="products-all" href="/proof">
              Read the case studies{" "}
              <span className="arr" aria-hidden="true">
                &#8594;
              </span>
            </Link>
          </div>
          <div className="think-stack">
            <article className="think-lead rv">
              <div className="think-body">
                <h4 className="h4">Elevate Enterprise Security with Identity-First Controls</h4>
                <p className="meta" style={{ color: "#5b667c" }}>
                  June 29, 2026
                </p>
                <p>
                  Removing passwords changes more than the login screen. Enrollment, recovery and
                  support all shift, and the rollout order matters more than the hardware.
                </p>
                <Link className="link-arrow" href="/thinking/identity-first-controls">
                  Read the article{" "}
                  <span className="arr" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </div>
              <div className="think-panel diag">
                <Image
                  src="/images/home/img-bedb86b4.jpg"
                  alt="Glass office towers photographed from below"
                  width={1600}
                  height={1067}
                />
              </div>
            </article>
            <div className="think-list">
              <div className="think-item">
                <Link
                  className="think-row"
                  href="/thinking/data-and-ai-security"
                  aria-expanded="false"
                >
                  <span className="t">
                    Data + AI Security Built for Visibility, Control, and Trust
                  </span>
                  <span className="d">June 29, 2026</span>
                </Link>
                <div className="think-expand">
                  <div className="think-expand-in">
                    <article className="think-lead">
                      <div className="think-body">
                        <h4 className="h4">
                          Data + AI Security Built for Visibility, Control, and Trust
                        </h4>
                        <p className="meta" style={{ color: "#5b667c" }}>
                          June 29, 2026
                        </p>
                        <p>
                          AI governance assessments start with simple questions: which AI systems
                          are in production, who owns them, and what data they touch. This article
                          sets out the evidence that answers each one, ready before the assessment
                          letter arrives.
                        </p>
                        <Link className="link-arrow" href="/thinking/data-and-ai-security">
                          Read the article{" "}
                          <span className="arr" aria-hidden="true">
                            &#8594;
                          </span>
                        </Link>
                      </div>
                      <div className="think-panel">
                        <Image
                          src="/images/home/img-d10eb158.jpg"
                          alt="Engineer with a laptop walking past server racks in a data centre"
                          width={1600}
                          height={1068}
                        />
                      </div>
                    </article>
                  </div>
                </div>
              </div>
              <div className="think-item">
                <Link
                  className="think-row"
                  href="/thinking/modern-micro-segmentation"
                  aria-expanded="false"
                >
                  <span className="t">Modern Micro-Segmentation for Zero Trust Security</span>
                  <span className="d">June 29, 2026</span>
                </Link>
                <div className="think-expand">
                  <div className="think-expand-in">
                    <article className="think-lead">
                      <div className="think-body">
                        <h4 className="h4">Modern Micro-Segmentation for Zero Trust Security</h4>
                        <p className="meta" style={{ color: "#5b667c" }}>
                          June 29, 2026
                        </p>
                        <p>
                          Micro-segmentation divides an estate into small, governed zones, and the
                          modern version starts with identity: who and what is asking, with what
                          assurance, before any connection is allowed.
                        </p>
                        <Link className="link-arrow" href="/thinking/modern-micro-segmentation">
                          Read the article{" "}
                          <span className="arr" aria-hidden="true">
                            &#8594;
                          </span>
                        </Link>
                      </div>
                      <div className="think-panel">
                        <Image
                          src="/images/home/img-ccd69738.jpg"
                          alt="Close-up of server hardware and cabling in a rack"
                          width={1600}
                          height={1068}
                        />
                      </div>
                    </article>
                  </div>
                </div>
              </div>
              <div className="think-item">
                <Link
                  className="think-row"
                  href="/thinking/agentic-ai-cybersecurity"
                  aria-expanded="false"
                >
                  <span className="t">
                    Building Smarter Cybersecurity with Agentic AI and the AutoGen Framework
                  </span>
                  <span className="d">June 29, 2026</span>
                </Link>
                <div className="think-expand">
                  <div className="think-expand-in">
                    <article className="think-lead">
                      <div className="think-body">
                        <h4 className="h4">
                          Building Smarter Cybersecurity with Agentic AI and the AutoGen Framework
                        </h4>
                        <p className="meta" style={{ color: "#5b667c" }}>
                          June 29, 2026
                        </p>
                        <p>
                          Agentic AI divides a job among specialized agents that plan, act and check
                          each other&apos;s work. For security and governance, that structure is the
                          point: every action owned, scoped and reviewable.
                        </p>
                        <Link className="link-arrow" href="/thinking/agentic-ai-cybersecurity">
                          Read the article{" "}
                          <span className="arr" aria-hidden="true">
                            &#8594;
                          </span>
                        </Link>
                      </div>
                      <div className="think-panel">
                        <Image
                          src="/images/home/img-1a9a6905.jpg"
                          alt="Engineer working on a laptop in a technology lab"
                          width={1600}
                          height={1067}
                        />
                      </div>
                    </article>
                  </div>
                </div>
              </div>
              <div className="think-item">
                <Link
                  className="think-row"
                  href="/thinking/non-human-identities"
                  aria-expanded="false"
                >
                  <span className="t">
                    Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynamic Security
                    Model
                  </span>
                  <span className="d">June 29, 2026</span>
                </Link>
                <div className="think-expand">
                  <div className="think-expand-in">
                    <article className="think-lead">
                      <div className="think-body">
                        <h4 className="h4">
                          Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynamic
                          Security Model
                        </h4>
                        <p className="meta" style={{ color: "#5b667c" }}>
                          June 29, 2026
                        </p>
                        <p>
                          A growing share of sign-ins comes from non-human identities: service
                          accounts, automations and AI agents. Each one deserves the same governance
                          as a person&apos;s account: an owner, a scope, and a review cycle.
                        </p>
                        <Link className="link-arrow" href="/thinking/non-human-identities">
                          Read the article{" "}
                          <span className="arr" aria-hidden="true">
                            &#8594;
                          </span>
                        </Link>
                      </div>
                      <div className="think-panel">
                        <Image
                          src="/images/home/img-74215995.jpg"
                          alt="Close-up photograph of an illuminated circuit board"
                          width={1600}
                          height={1068}
                        />
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCta />
    </div>
  );
}

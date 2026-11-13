import { BeamsCanvas } from "@/components/motion/BeamsCanvas";
import Image from "next/image";
import Link from "next/link";
import { SecurityEcosystem } from "@/components/home/SecurityEcosystem";
import { PerspectiveGrid } from "@/components/motion/PerspectiveGrid";

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
            </div>
            <div className="hero-visual">
              <div className="hero-rail" aria-hidden="true">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3l7 2.5v5.2c0 4.4-3 7.6-7 9.3-4-1.7-7-4.9-7-9.3V5.5z" />
                  <path d="m9 12 2.2 2.2L15.5 10" />
                </svg>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="8" />
                  <circle cx="12" cy="12" r="3.5" />
                  <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
                </svg>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 4a6 6 0 0 0-6 6v3m6-9a6 6 0 0 1 6 6v5m-9-5v3a6 6 0 0 0 .6 2.6M12 10v4a9 9 0 0 1-1.2 4.4M15 12v2.5" />
                </svg>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3 3.5 7.5 12 12l8.5-4.5z" />
                  <path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5" />
                </svg>
              </div>
              <div
                className="hcard"
                id="heroCard"
                role="region"
                aria-roledescription="carousel"
                aria-label="Featured products"
              >
                <div className="hslides">
                  <article
                    className="hslide act"
                    aria-roledescription="slide"
                    aria-label="1 of 5: PostureOne"
                  >
                    <div className="hviz" aria-hidden="true">
                      <svg
                        viewBox="0 0 120 120"
                        fill="none"
                        stroke="#9db9f5"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M60 12l38 13v26c0 26-16 44-38 55C38 95 22 77 22 51V25z" />
                        <path
                          d="M60 25l26 9v18c0 19-11 32-26 41C45 84 34 71 34 52V34z"
                          opacity=".6"
                        />
                        <path
                          d="M60 38l15 5v9c0 12-6.5 21-15 27C51.5 73 45 64 45 52v-9z"
                          opacity=".38"
                        />
                        <line x1="60" y1="12" x2="60" y2="106" stroke="#be1b23" />
                      </svg>
                    </div>
                    <div className="hinfo">
                      <div className="hinfo-top">
                        <p className="hcat">Security Posture</p>
                        <span className="hcount">01 / 05</span>
                      </div>
                      <h3>PostureOne</h3>
                      <p className="hdesc">
                        Website and cloud security posture in one view, with findings, owners and
                        evidence in a single place.
                      </p>
                    </div>
                  </article>
                  <article
                    className="hslide"
                    aria-roledescription="slide"
                    aria-label="2 of 5: EvalOne"
                    aria-hidden="true"
                  >
                    <div className="hviz" aria-hidden="true">
                      <svg
                        viewBox="0 0 120 120"
                        fill="none"
                        stroke="#9db9f5"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <circle cx="60" cy="60" r="46" opacity=".45" />
                        <circle cx="60" cy="60" r="33" opacity=".65" />
                        <circle cx="60" cy="60" r="20" />
                        <line x1="60" y1="6" x2="60" y2="24" />
                        <line x1="60" y1="96" x2="60" y2="114" />
                        <line x1="6" y1="60" x2="24" y2="60" />
                        <line x1="96" y1="60" x2="114" y2="60" />
                        <circle cx="60" cy="60" r="5" fill="#be1b23" stroke="none" />
                      </svg>
                    </div>
                    <div className="hinfo">
                      <div className="hinfo-top">
                        <p className="hcat">AI Evaluation</p>
                        <span className="hcount">02 / 05</span>
                      </div>
                      <h3>EvalOne</h3>
                      <p className="hdesc">
                        AI systems evaluated against recognized frameworks, with evidence a reviewer
                        can follow.
                      </p>
                    </div>
                  </article>
                  <article
                    className="hslide"
                    aria-roledescription="slide"
                    aria-label="3 of 5: XSense"
                    aria-hidden="true"
                  >
                    <div className="hviz" aria-hidden="true">
                      <svg
                        viewBox="0 0 120 120"
                        fill="none"
                        stroke="#9db9f5"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M28 78V58a32 32 0 0 1 64 0v20" opacity=".5" />
                        <path d="M40 84V58a20 20 0 0 1 40 0v26" opacity=".75" />
                        <path d="M52 88V60a8 8 0 0 1 16 0v30" />
                        <line x1="60" y1="66" x2="60" y2="96" stroke="#be1b23" />
                        <path d="M22 92c10 6 23 9 38 9s28-3 38-9" opacity=".5" />
                      </svg>
                    </div>
                    <div className="hinfo">
                      <div className="hinfo-top">
                        <p className="hcat">Identity Analytics and MFA</p>
                        <span className="hcount">03 / 05</span>
                      </div>
                      <h3>XSense</h3>
                      <p className="hdesc">
                        Identity analytics and a software-bound identity provider for governed
                        sign-in at scale.
                      </p>
                    </div>
                  </article>
                  <article
                    className="hslide"
                    aria-roledescription="slide"
                    aria-label="4 of 5: Passwordless Keys"
                    aria-hidden="true"
                  >
                    <div className="hviz" aria-hidden="true">
                      <svg
                        viewBox="0 0 120 120"
                        fill="none"
                        stroke="#9db9f5"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <rect x="24" y="38" width="72" height="46" rx="14" />
                        <circle cx="47" cy="61" r="10" />
                        <line x1="57" y1="61" x2="84" y2="61" />
                        <line x1="76" y1="61" x2="76" y2="72" />
                        <line x1="84" y1="61" x2="84" y2="75" />
                        <circle cx="47" cy="61" r="3.5" fill="#be1b23" stroke="none" />
                      </svg>
                    </div>
                    <div className="hinfo">
                      <div className="hinfo-top">
                        <p className="hcat">FIDO2 Hardware Keys</p>
                        <span className="hcount">04 / 05</span>
                      </div>
                      <h3>Passwordless Keys</h3>
                      <p className="hdesc">
                        FIDO2 biometric keys in four models, delivered and supported by XSignOn.
                      </p>
                    </div>
                  </article>
                  <article
                    className="hslide"
                    aria-roledescription="slide"
                    aria-label="5 of 5: AMS"
                    aria-hidden="true"
                  >
                    <div className="hviz" aria-hidden="true">
                      <svg
                        viewBox="0 0 120 120"
                        fill="none"
                        stroke="#9db9f5"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M60 18l40 15-40 15-40-15z" />
                        <path d="M24 52l36 13 36-13" opacity=".65" />
                        <path d="M24 71l36 13 36-13" opacity=".4" />
                        <circle cx="60" cy="33" r="3.5" fill="#be1b23" stroke="none" />
                      </svg>
                    </div>
                    <div className="hinfo">
                      <div className="hinfo-top">
                        <p className="hcat">Key Management</p>
                        <span className="hcount">05 / 05</span>
                      </div>
                      <h3>AMS</h3>
                      <p className="hdesc">
                        The platform that delivers, enrolls and manages passwordless keys across the
                        organization.
                      </p>
                    </div>
                  </article>
                </div>
                <div className="hctl">
                  <div className="hdots" role="group" aria-label="Choose slide">
                    <button
                      className="hdot act"
                      type="button"
                      aria-label="Show slide 1: PostureOne"
                      aria-current="true"
                    ></button>
                    <button
                      className="hdot"
                      type="button"
                      aria-label="Show slide 2: EvalOne"
                    ></button>
                    <button
                      className="hdot"
                      type="button"
                      aria-label="Show slide 3: XSense"
                    ></button>
                    <button
                      className="hdot"
                      type="button"
                      aria-label="Show slide 4: Passwordless Keys"
                    ></button>
                    <button className="hdot" type="button" aria-label="Show slide 5: AMS"></button>
                  </div>
                </div>
              </div>
              <div className="hero-float" aria-hidden="true">
                <span className="hero-float-ic">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                </span>
                Evidence attached
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="strip" data-nav="dark" role="region" aria-label="Frameworks we align with">
        <p className="strip-label">Aligned with the frameworks your auditors ask about</p>
        <div
          className="marquee"
          role="group"
          aria-label="Standards and frameworks: FIDO2, SOC 2, ISO 27001, NIST AI-RMF, NIST 800-207, GDPR"
        >
          <div className="mq-track" aria-hidden="true">
            <div className="mq-set">
              <span>FIDO2</span>
              <i className="mq-dot"></i>
              <span>SOC 2</span>
              <i className="mq-dot"></i>
              <span>ISO 27001</span>
              <i className="mq-dot"></i>
              <span>NIST AI-RMF</span>
              <i className="mq-dot"></i>
              <span>NIST 800-207</span>
              <i className="mq-dot"></i>
              <span>GDPR</span>
              <i className="mq-dot"></i>
            </div>
            <div className="mq-set">
              <span>FIDO2</span>
              <i className="mq-dot"></i>
              <span>SOC 2</span>
              <i className="mq-dot"></i>
              <span>ISO 27001</span>
              <i className="mq-dot"></i>
              <span>NIST AI-RMF</span>
              <i className="mq-dot"></i>
              <span>NIST 800-207</span>
              <i className="mq-dot"></i>
              <span>GDPR</span>
              <i className="mq-dot"></i>
            </div>
          </div>
        </div>
      </div>

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
            <h2 className="h2">Solutions</h2>
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
                    Quantum-Safe Security
                  </button>
                  <button type="button" data-j="3">
                    Business Process
                  </button>
                  <button type="button" data-j="4">
                    Enterprise Technology
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
                      <svg
                        viewBox="0 0 400 228"
                        role="img"
                        preserveAspectRatio="xMidYMid meet"
                        aria-label="Identity graph: staff, devices and AI agents connected to one governed core, each with a named owner"
                      >
                        <g className="art-ln art-fl">
                          <path d="M200 96 L78 52" />
                          <path d="M200 96 L322 52" />
                          <path d="M200 96 L200 172" />
                        </g>
                        <circle
                          className="art-pulse art-hotfill"
                          cx="200"
                          cy="96"
                          r="28"
                          opacity=".5"
                        />
                        <circle className="art-nd art-hot" cx="200" cy="96" r="28" />
                        <path
                          className="art-ln art-hot"
                          d="M200 82l12 4.5v9.5c0 7-5 11-12 14.5-7-3.5-12-7.5-12-14.5v-9.5z"
                        />
                        <circle className="art-nd" cx="78" cy="52" r="21" />
                        <circle className="art-ln" cx="78" cy="46" r="6" />
                        <path className="art-ln" d="M66 62c2-7 6-10 12-10s10 3 12 10" />
                        <rect className="art-nd" x="300" y="34" width="44" height="36" rx="8" />
                        <path className="art-ln" d="M310 62h24M322 70v4" />
                        <circle className="art-nd" cx="200" cy="172" r="21" />
                        <path className="art-ln" d="M200 160l10 6v12l-10 6-10-6v-12z" />
                        <text className="art-tx" x="78" y="92" textAnchor="middle">
                          Staff
                        </text>
                        <text className="art-tx" x="322" y="92" textAnchor="middle">
                          Devices
                        </text>
                        <text className="art-tx" x="200" y="208" textAnchor="middle">
                          AI agents
                        </text>
                        <g transform="translate(86 126)">
                          <rect className="art-nd" width="82" height="20" rx="10" />
                          <text
                            className="art-tx2"
                            x="41"
                            y="14"
                            textAnchor="middle"
                            style={{ fontSize: "10.5px" }}
                          >
                            Named owner
                          </text>
                        </g>
                      </svg>
                      <figcaption className="j-by">
                        <span>Delivered by</span>
                        <b>PostureOne</b>
                        <b>AMS</b>
                        <b>Passwordless Keys</b>
                      </figcaption>
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
                      <svg
                        viewBox="0 0 400 228"
                        role="img"
                        preserveAspectRatio="xMidYMid meet"
                        aria-label="AI governance: an AI system with an owner mapped to inventory, frameworks and current evidence"
                      >
                        <g className="art-ln art-fl">
                          <path d="M110 98 C150 98 150 44 188 44" />
                          <path d="M110 98 L188 98" />
                          <path d="M110 98 C150 98 150 152 188 152" />
                        </g>
                        <circle
                          className="art-pulse art-hotfill"
                          cx="80"
                          cy="98"
                          r="30"
                          opacity=".5"
                        />
                        <path className="art-nd art-hot" d="M80 68l26 15v30L80 128 54 113V83z" />
                        <text
                          className="art-tx2"
                          x="80"
                          y="103"
                          textAnchor="middle"
                          style={{ fontSize: "15px" }}
                        >
                          AI
                        </text>
                        <g>
                          <rect className="art-nd" x="188" y="28" width="186" height="32" rx="9" />
                          <text className="art-tx2" x="204" y="48">
                            Inventory with owners
                          </text>
                          <circle className="art-nd" cx="354" cy="44" r="9" />
                          <path className="art-ln" d="m349.5 44 3.2 3.2 5.2-6" />
                        </g>
                        <g>
                          <rect className="art-nd" x="188" y="82" width="186" height="32" rx="9" />
                          <text className="art-tx2" x="204" y="102">
                            Mapped to frameworks
                          </text>
                          <circle className="art-nd" cx="354" cy="98" r="9" />
                          <path className="art-ln" d="m349.5 98 3.2 3.2 5.2-6" />
                        </g>
                        <g>
                          <rect
                            className="art-nd art-hot"
                            x="188"
                            y="136"
                            width="186"
                            height="32"
                            rx="9"
                          />
                          <text className="art-tx2" x="204" y="156">
                            Evidence kept current
                          </text>
                          <circle className="art-nd art-hot" cx="354" cy="152" r="9" />
                          <path className="art-ln art-hot" d="m349.5 152 3.2 3.2 5.2-6" />
                        </g>
                      </svg>
                      <figcaption className="j-by">
                        <span>Delivered by</span>
                        <b>EvalOne</b>
                        <b>PostureOne</b>
                      </figcaption>
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
                      <svg
                        viewBox="0 0 400 228"
                        role="img"
                        preserveAspectRatio="xMidYMid meet"
                        aria-label="Quantum-safe plan: inventory, prioritize, then migrate"
                      >
                        <g className="art-ln art-fl">
                          <path d="M96 104 L174 104" />
                          <path d="M226 104 L304 104" />
                        </g>
                        <circle className="art-nd" cx="70" cy="104" r="26" />
                        <g className="art-ln">
                          <rect x="58" y="92" width="10" height="10" rx="2" />
                          <rect x="72" y="92" width="10" height="10" rx="2" />
                          <rect x="58" y="106" width="10" height="10" rx="2" />
                          <rect x="72" y="106" width="10" height="10" rx="2" />
                        </g>
                        <circle className="art-nd" cx="200" cy="104" r="26" />
                        <path className="art-ln" d="M186 94h28M186 104h20M186 114h12" />
                        <circle
                          className="art-pulse art-hotfill"
                          cx="330"
                          cy="104"
                          r="26"
                          opacity=".5"
                        />
                        <circle className="art-nd art-hot" cx="330" cy="104" r="26" />
                        <path className="art-ln art-hot" d="M318 104h24m-8-8 8 8-8 8" />
                        <text className="art-tx" x="70" y="150" textAnchor="middle">
                          Inventory
                        </text>
                        <text className="art-tx" x="200" y="150" textAnchor="middle">
                          Prioritize
                        </text>
                        <text className="art-tx2" x="330" y="150" textAnchor="middle">
                          Migrate
                        </text>
                        <g transform="translate(284 40)">
                          <rect className="art-nd art-hot" width="92" height="22" rx="11" />
                          <text
                            className="art-tx2"
                            x="46"
                            y="15"
                            textAnchor="middle"
                            style={{ fontSize: "10.5px" }}
                          >
                            Post-quantum
                          </text>
                        </g>
                      </svg>
                      <figcaption className="j-by">
                        <span>Delivered by</span>
                        <b>PostureOne</b>
                        <b>Passwordless Keys</b>
                      </figcaption>
                    </figure>
                  </article>
                  <article className="j-panel">
                    <div className="j-txt">
                      <h4 className="h4">Business Process</h4>
                      <p>
                        Teams want access reviews, approvals and evidence in one governed,
                        repeatable flow, with clarity at every step.
                      </p>
                      <Link className="link-arrow" href="/solutions/business-process">
                        View solution{" "}
                        <span className="arr" aria-hidden="true">
                          &#8594;
                        </span>
                      </Link>
                    </div>
                    <figure className="j-art">
                      <svg
                        viewBox="0 0 400 228"
                        role="img"
                        preserveAspectRatio="xMidYMid meet"
                        aria-label="Governed review cycle: review, approve, record evidence, repeat"
                      >
                        <circle className="art-ln art-fl" cx="200" cy="106" r="64" />
                        <circle className="art-nd" cx="200" cy="42" r="19" />
                        <path className="art-ln" d="M191 42l6 6 11-12" />
                        <circle className="art-nd" cx="255" cy="138" r="19" />
                        <path className="art-ln" d="M246 138l6 6 11-12" />
                        <circle className="art-nd art-hot" cx="145" cy="138" r="19" />
                        <path className="art-ln art-hot" d="M136 138l6 6 11-12" />
                        <circle
                          className="art-pulse art-hotfill"
                          cx="145"
                          cy="138"
                          r="19"
                          opacity=".5"
                        />
                        <text className="art-tx2" x="200" y="18" textAnchor="middle">
                          Review
                        </text>
                        <text className="art-tx2" x="292" y="176" textAnchor="middle">
                          Approve
                        </text>
                        <text className="art-tx2" x="108" y="176" textAnchor="middle">
                          Evidence
                        </text>
                        <text className="art-tx" x="200" y="110" textAnchor="middle">
                          One cycle
                        </text>
                      </svg>
                      <figcaption className="j-by">
                        <span>Delivered by</span>
                        <b>PostureOne</b>
                        <b>AMS</b>
                      </figcaption>
                    </figure>
                  </article>
                  <article className="j-panel">
                    <div className="j-txt">
                      <h4 className="h4">Enterprise Technology</h4>
                      <p>
                        Identity sits across every system you run. Connect the platforms you already
                        have into one governed sign-in and access layer.
                      </p>
                      <Link className="link-arrow" href="/solutions/enterprise-technology">
                        View solution{" "}
                        <span className="arr" aria-hidden="true">
                          &#8594;
                        </span>
                      </Link>
                    </div>
                    <figure className="j-art">
                      <svg
                        viewBox="0 0 400 228"
                        role="img"
                        preserveAspectRatio="xMidYMid meet"
                        aria-label="One governed layer connecting directories, SaaS, branch terminals and plant systems"
                      >
                        <g className="art-ln art-fl">
                          <path d="M65 50 C65 76 150 70 160 88" />
                          <path d="M155 50 C155 76 180 70 184 88" />
                          <path d="M245 50 C245 76 220 70 216 88" />
                          <path d="M335 50 C335 76 250 70 240 88" />
                          <path d="M200 128 L200 168" />
                        </g>
                        <g>
                          <rect className="art-nd" x="28" y="20" width="74" height="30" rx="9" />
                          <text className="art-tx" x="65" y="39" textAnchor="middle">
                            Directory
                          </text>
                        </g>
                        <g>
                          <rect className="art-nd" x="118" y="20" width="74" height="30" rx="9" />
                          <text className="art-tx" x="155" y="39" textAnchor="middle">
                            SaaS
                          </text>
                        </g>
                        <g>
                          <rect className="art-nd" x="208" y="20" width="74" height="30" rx="9" />
                          <text className="art-tx" x="245" y="39" textAnchor="middle">
                            Branch
                          </text>
                        </g>
                        <g>
                          <rect className="art-nd" x="298" y="20" width="74" height="30" rx="9" />
                          <text className="art-tx" x="335" y="39" textAnchor="middle">
                            Plant
                          </text>
                        </g>
                        <rect
                          className="art-pulse art-hotfill"
                          x="110"
                          y="88"
                          width="180"
                          height="40"
                          rx="12"
                          opacity=".35"
                        />
                        <rect
                          className="art-nd art-hot"
                          x="110"
                          y="88"
                          width="180"
                          height="40"
                          rx="12"
                        />
                        <text className="art-tx2" x="200" y="113" textAnchor="middle">
                          One governed layer
                        </text>
                        <g>
                          <rect
                            className="art-nd"
                            x="130"
                            y="168"
                            width="140"
                            height="28"
                            rx="14"
                          />
                          <text
                            className="art-tx2"
                            x="200"
                            y="186"
                            textAnchor="middle"
                            style={{ fontSize: "11px" }}
                          >
                            One posture view
                          </text>
                        </g>
                      </svg>
                      <figcaption className="j-by">
                        <span>Delivered by</span>
                        <b>PostureOne</b>
                        <b>Passwordless Keys</b>
                        <b>AMS</b>
                      </figcaption>
                    </figure>
                  </article>
                </div>
              </div>
              <div className="j-scroll" aria-hidden="true">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section className="cta-sec" id="contact" data-nav="dark">
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
              <Image src="/images/home/img-990ffb0c.png" alt="" width={760} height={198} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

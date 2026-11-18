# Content from xsignon.com for the new site

Source: the live site at https://xsignon.com, read on 2026-11-18. Every page of the live site was crawled. The live site is mostly one long home page. The addresses `/about-us`, `/identity-governance`, `/ai-digital-governance`, `/quantum-safe-security`, `/business-process-solutions`, `/enterprise-technology-solutions`, `/postureone`, `/passwordless-authenticators`, `/careers`, `/contact`, `/roi-calculator`, `/privacy-policy`, `/terms-and-conditions` and `/unsubscribe` all show the same home page (a one-page site that scrolls to a section). Only the pages in section A have their own content.

How to read the tables: **Reuse** = copy with light edits. **Reword** = use the facts, write new wording. **Verify** = a claim the company must prove before it goes live. **Gap** = nothing on the live site, needs new content.

---

## A. What exists on the live site

| # | Live page | What it holds | Verdict | Goes to (new site) |
|---|---|---|---|---|
| 1 | Home: hero | Eyebrow "Secure your code. Scale without limits." Pitch banner ("finalist for the Identity Week America Startup Pitch"). Paragraph: "AI-powered cybersecurity, identity governance, and quantum safe security... One framework. Total coverage. Zero disruption." Two buttons. | Reword | Home hero, About hero |
| 2 | Home: numbers | 500K+ identities protected, 1M+ data assets secured, 14+ industries, 99.9% uptime SLA, 25+ years combined expertise, 24/7 security visibility | **Verify** | Home (optional), About |
| 3 | Home: Why XSignOn | "One Platform. Zero Complexity. 25+ Years of Combined Expertise." | Reuse | About, Why XSignOn |
| 4 | Home: What we do | Five solutions, each with a two-line description: Identity Governance, AI & Digital Governance, Quantum-Safe Security, Business Process Solutions, Enterprise Technology Solutions | Reuse | Home "What XSignOn does", Solutions pages |
| 5 | Home: How it works | Three stages with four bullets each: Identity and Risk Baseline; Zero Trust Security Architecture; Continuous Governance and Response | Reuse | About "How we work" |
| 6 | Home: Technology ecosystem | Ticker: NIST PQC (quantum security), FIDO2 (passwordless), SOC 2 (enterprise compliance), GDPR (data protection), NIST AI-RMF (AI governance), NIST 800-207 (zero trust) | **Verify** | Home standards strip |
| 7 | Home: Our products | Two products: PostureOne, Passwordless Authenticators, one paragraph each | Reuse | Products hub |
| 8 | Home: The PostureOne framework | Intro paragraph and six benefits (See Everything, Close the Gaps, Stay Audit-Ready, Govern AI Safely, Reduce Exposure, Move with Confidence) | Reuse | PostureOne page |
| 9 | Home: Partner ecosystem | Four partner types, with the partner names left out: micro-segmentation and breach containment, Data + AI Security and DSPM, hardware biometric passwordless authentication (ThinC-AUTH), quantum-safe encryption | Reword | Security Ecosystem section |
| 10 | Home: XSignOn Insights | Intro line and two featured articles | Reuse | Insights |
| 11 | Home: Quick answers | Four questions, only two answered in text | Reuse and complete | FAQ (new) |
| 12 | Home: Get in touch | "Your security posture starts here." Buttons "Book a strategy call" and "Take the posture assessment". Stats: 99.9% uptime, 25+ years, 24/7. | Reuse | Contact block |
| 13 | `/auth-bio` | AUTH Bio key: tagline, four features, four "ideal for", ten product details (FIDO2 standard, PIN-fallback, single WebAuthn account, fingerprint limit, digital signature) | Reuse | Passwordless Keys: AUTH Bio |
| 14 | `/auth-bio-pro` | AUTH Bio Pro: four features, four "ideal for", six details (PIV and FIDO2, X.509 smart card, AD/LDAP/AAD, secure logon to Windows, Linux, macOS, VPN, firewalls) | Reuse | AUTH Bio Pro |
| 15 | `/auth-bio-desktop` | AUTH Bio Desktop: four features, four "best for", two details | Reuse with care | AUTH Bio Desktop |
| 16 | `/ams` | AMS: three features, three "ideal for", asset management for ThinC-AUTH keys, SaaS or on-prem | Reuse | AMS page |
| 17 | Six insight articles | Identity-First Controls (security products), Non-Human Identities (analysis), Data + AI Security (security products), Modern Micro-Segmentation (security products), Agentic AI and AutoGen (analysis). All dated June 29, 2026, "By XSignOn Team". | Reuse and edit | Our thinking |
| 18 | `sitemap.xml`, `robots.txt` | Ten addresses listed | Reference | SEO setup |
| 19 | Page titles and descriptions | Written for every page | Reuse | SEO |

**Pages with nothing on the live site (Gap):** XSignOn Mesh, EvalOne, XSense, Proof and case studies, Careers (roles), Contact page details, Privacy, Terms, Unsubscribe, ROI calculator inputs, About "Who we are" story, leadership.

---

## B. Claims that need proof before they go live

| Claim on live site | Where | Risk | Suggested action |
|---|---|---|---|
| 500K+ identities protected, 1M+ data assets | Home | Numbers with no source | Confirm the figure and how it is counted, or leave out |
| 99.9% uptime SLA across deployments | Home, Get in touch | A contractual claim | Confirm with operations, or say "designed for high availability" |
| 14+ industries | Home | Unsourced | Confirm the list |
| SOC 2, GDPR (as ecosystem badges) | Home ticker | Reads as certified | State exactly: "SOC 2 reporting" only if audited; GDPR is a regulation to support, not a badge |
| ISO 27001 | On our new site, not on the live site | Not on the live site at all | Remove unless certified |
| "Selected as a finalist, Identity Week America Startup Pitch" | Home banner | Time-bound | Confirm the result and keep the date |
| "25+ years combined expertise" | Several | Needs a source | Keep as "combined team experience" |
| "World's leading breach containment platform" | Partner text | A claim about the partner | Rewrite neutrally |
| "99.9% accuracy", "iris scanning", "facial recognition" (AUTH Bio Desktop) | `/auth-bio-desktop` | Does not match its own detail line ("Biometric FIDO2 and PIV") | Confirm the real specs before use |
| Statistics in articles: $10.93M healthcare breach (IBM 2023), $4.45M average breach, GDPR fines up to €20M or 4%, up to 90% breach impact reduction (partner research) | Articles | Third-party figures | Cite the source and year in the text |
| Partner names (Ensurity, WhiteSwan, Symmetry, Illumio) | Articles only | Partner relationships | Confirm the partners agree to be named |
| Placeholder text "Nullam dignissim, ante scelerisque..." | Top of every live page | Left-over template text | Do not copy |
| Draft notes in product details ("The deck identifies it as...") | Key and AMS pages | Reads like internal notes | Rewrite |

---

## C. Drafted content

All wording below is built from the live site. Where I had to write something new it is marked *(new)*.

### C1. Home

**Hero**
- Eyebrow: Identity, governance and security
- Headline: Protect identity. Govern risk. Prepare for what's next. *(already built)*
- Description: XSignOn develops security products across identity governance, passwordless authentication, AI evaluation, and emerging digital risk. *(already built)*
- Button: Explore our products

**Proof line under the hero** *(optional, after verification)*
- 25+ years of combined team experience · FIDO2 hardware keys · NIST-aligned AI governance

**Standards strip**
- Names only, verified list: FIDO2 · NIST AI-RMF · NIST 800-207 · NIST PQC. Add SOC 2 and GDPR only with proof.

**Products** (from live "Our products")
- Intro: Products built to remove your most critical exposure before a breach forces the conversation.
- PostureOne: Real-time protection of your whole digital perimeter across AWS, Azure and Google Cloud. Prevent attacks, stop defacement and contain breaches before they spread.
- Passwordless Authenticators: Replace passwords with biometric sign-in on FIDO2-certified hardware keys, with phishing-resistant access across enterprise systems.
- XSignOn Mesh *(new, micro-segmentation)*: Divide the environment into small controlled zones and contain a threat before it spreads.

**Security Ecosystem** (four capabilities, from "Partner ecosystem")
1. Contain threats faster. Micro-segmentation that stops ransomware spreading, with real-time visibility and instant isolation across every environment.
2. Protect data and AI. Find, classify and govern sensitive data across cloud, SaaS and on-premises, with visibility over data access and AI use.
3. Sign in without passwords. FIDO2-certified biometric keys that use fingerprint checks for phishing-resistant, Zero Trust-aligned access.
4. Prepare for quantum risk. Post-quantum cryptography, quantum key distribution and hardware security modules for crypto-agile encryption.

**What XSignOn does** (four panels, from the five on the live site)
- Identity governance: Remove credential risk with FIDO2 passwordless sign-in and biometric identity, securing access without slowing people down.
- AI and digital governance: Deploy AI agents and LLMs with confidence. PostureOne maps each deployment to NIST AI-RMF, so AI work stays audit-ready.
- Passwordless security *(merged from the two enterprise items)*: Phishing-resistant authentication, secure recovery and smoother onboarding inside your existing systems.
- Quantum-safe security: Protect sensitive data today with post-quantum cryptography against "harvest now, decrypt later" threats.
- Business process solutions and Enterprise technology solutions stay on the Solutions pages.

**Insights**
- Intro: From AI governance to AI cybersecurity, XSignOn Insights covers the issues, decisions and security questions shaping modern enterprises and regulated environments.
- Featured: Elevate Enterprise Security With Identity-First Controls; Non-Human Identities and the Future of Cyber Risk.

**FAQ** (live answers, plus two to write)
- What is PostureOne, and how is it different from a regular security framework? PostureOne isn't a compliance or audit tool. It's a dynamic approach that brings identity, governance, data and operational security into one continuously updated view, so leadership knows where the enterprise stands. *(live)*
- Does XSignOn only work with large enterprises? No. XSignOn is built for mid-market, growth-stage and high-trust organizations that need security matched to real operating needs rather than oversized enterprise complexity. *(live)*
- How quickly can XSignOn integrate with an existing security stack? *(Gap: answer not shown on the live site. Needs the team's real timeline.)*
- What does "quantum-safe" mean for a business today? *(new draft)* It means protecting data now against attackers who store encrypted data today to decrypt it once quantum computers arrive, by moving to post-quantum cryptography on a clear plan.

**Contact block**
- Heading: Let's talk about your organization's security priorities. *(already built)*
- Buttons: Book a strategy call · Take the posture assessment *(posture assessment page is a Gap)*

### C2. About

- **Who we are** *(new, built on the live "Why XSignOn")*: XSignOn is a cybersecurity and identity company developing products across security posture, passwordless authentication and AI evaluation. One platform, zero complexity, backed by 25+ years of combined team experience.
- **What we do:** the four capabilities above.
- **How we work** (live, three stages, each with its four bullets):
  1. Identity and risk baseline: map human, non-human and AI identities; find control gaps and excess privilege; surface exposure across access environments; prioritize fixes by risk and compliance.
  2. Zero Trust security architecture: design around real operating conditions; apply passwordless and privileged access controls; segment systems, users and sensitive pathways; align to compliance.
  3. Continuous governance and response: keep access reviews and monitoring active; detect anomalies early; keep compliance visible; adapt as environments change.
- **Why XSignOn:** One platform. Zero complexity. 25+ years of combined expertise.
- **Gap:** founders and leadership, company history, office address, team size.

### C3. Products

**PostureOne** (live)
- Lead: Most organizations manage security across disconnected tools, fragmented teams and isolated audits. PostureOne gives leadership a single, continuously updated view of where the organization stands across identity, governance, data and risk, so decisions rest on evidence, not assumption.
- Six benefits: See everything · Close the gaps · Stay audit-ready (mapped to SOC 2, HIPAA, GDPR, NIST) · Govern AI safely (NIST AI-RMF built in) · Reduce exposure · Move with confidence
- Button: See how PostureOne works

**Passwordless Authenticators** (live key pages, rewritten)
- **AUTH Bio:** Simple fingerprint sign-in for passwordless access. Features: fingerprint authentication, passwordless access, compact design, enterprise security. Ideal for: workstation access, remote and hybrid staff, identity-sensitive applications, organizations strengthening account security. Details: biometric FIDO2; follows FIDO2 standards; PIN fallback can be turned off; limit to one WebAuthn account; limit the number of enrolled fingerprints; require biometric sign-in; link the user's biometric to the credential; digital signature support.
- **AUTH Bio Pro:** Advanced biometric authentication for business. Features: enhanced fingerprint sensor, fingerprint, PIN and RFID card support, network integration, audit and reporting. Ideal for: small to mid-size businesses, workplace access, financial institutions, government. Details: biometric multi-protocol key (PIV and FIDO2); smart card with X.509 certificate; works with AD, LDAP and AAD; secure logon to Windows, Linux, macOS, RDP, VPN, firewalls and network devices.
- **AUTH Bio Desktop:** Biometric authentication for fixed workstations and kiosks. Use only the verified line "Biometric FIDO2 and PIV". Hold the "99.9% accuracy", "face and iris" and "bank-level" claims until confirmed.

**AMS:** An asset management system for ThinC-AUTH keys, available as SaaS or on-premises. Central inventory of hardware, software and users; consistent access and device policy; reporting on usage, adoption and compliance. Ideal for enterprise IT teams, operations managers and compliance-focused organizations. Tabs on the live page: users and roles, inventory, enrollment, policy controls, audit, deployments.

**XSignOn Mesh** *(Gap: no live source)* and **EvalOne, XSense** *(Gap)*: keep the current drafts and send the team's real descriptions.

### C4. Our thinking (articles)

| Article | Category | Use as |
|---|---|---|
| Elevate Enterprise Security With Identity-First Controls | Security products | Featured. Identity-first security for healthcare and finance: unify IAM and PAM under Zero Trust, with passwordless biometric sign-in, session recording and compliance automation. |
| Non-Human Identities and the Future of Cyber Risk | Analysis | Dynamic Security Model and DSPM for the Agentic AI era; the CXO playbook. |
| Data + AI Security Built for Visibility, Control and Trust | Security products | Why data and AI need security together; five-point CXO playbook. |
| Modern Micro-Segmentation for Zero Trust Security | Security products | Contain breaches and stop lateral movement; ties to XSignOn Mesh. |
| Building Smarter Cybersecurity with Agentic AI and the AutoGen Framework | Analysis | Agents for security operations. |

Edits for every article: add the author's name (live shows "By XSignOn Team"), a real date, a cited source for each statistic, and a unique image. Remove the 📩 emoji line, and end with a standard contact line using info@xsignon.com.

### C5. Contact, careers and legal

- **Contact:** email info@xsignon.com *(live)*. Gap: phone, office address, form wording, response time.
- **Careers:** Gap. The live site has no roles page. Use the "no open positions" message until roles exist.
- **Privacy, Terms, Unsubscribe:** Gap. The live addresses show the home page. Needs real legal text from counsel.

### C6. SEO (from the live site)

| Page | Title | Description |
|---|---|---|
| Home | AI Cybersecurity & Identity Governance Solutions \| XSignOn | Secure your enterprise with XSignOn. We deliver AI governance, quantum-safe security and passwordless identity solutions for modern organizations. |
| AUTH Bio | AUTH Bio: Biometric Passwordless Security Key \| XSignOn | Upgrade workstation security with XSignOn AUTH Bio. Biometric FIDO2 security keys with fast fingerprint authentication and passwordless access. |
| AUTH Bio Pro | AUTH Bio Pro: Enterprise Biometric Security Key \| XSignOn | Secure access with AUTH Bio Pro: multi-protocol FIDO2 and PIV biometric keys for enterprise workstations and smart card authentication. |
| AMS | AMS Platform: Enterprise Asset & Key Management \| XSignOn | Streamline security keys and access with XSignOn AMS: central inventory, FIDO2 lifecycle management and policy controls. |

---

## D. Open questions for the company

1. Which numbers on the home page can be proven (identities, data assets, industries, uptime)?
2. Which of SOC 2, GDPR and ISO 27001 does XSignOn hold or report against?
3. May the partners (Ensurity, WhiteSwan, Symmetry, Illumio) be named on the site?
4. What is the real integration time for the FAQ answer?
5. What are the real specs of AUTH Bio Desktop?
6. What do XSignOn Mesh, EvalOne and XSense actually do, and who is each for?
7. Phone, address, careers and leadership details?
8. Who writes and approves the Privacy and Terms text?

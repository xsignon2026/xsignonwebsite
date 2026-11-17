import type { CaseStudy } from "@/types/caseStudy";

// S-14 / T-098 / T-099: Canonical Case Study records.
// Source of truth: xsignon-home-beams.html (lines 2939-3236).
export const canonicalCaseStudies: CaseStudy[] = [
  {
    title: "Securing Bank Access With FIDO2 Biometric Keys",
    slug: "securing-bank-access-fido2",
    industry: "Banking",
    location: "Abu Dhabi",
    headline: "Securing Bank Access With FIDO2 Biometric Keys",
    summary:
      "A bank in Abu Dhabi replaced password sign-in for branch and back-office staff with FIDO2 keys supplied and supported by XSignOn, managed through AMS.",
    heroImageAlt: "Stone bank building with columns",
    challenge:
      "A bank in Abu Dhabi used password sign-in for branch and back-office staff. Teams spent time each week on password resets and sign-in support, and the bank wanted a smoother, verified experience that matched the high standards of the rest of its operations.",
    challengeParagraph2:
      "The bank set out to give every team member sign-in that works at the speed of branch operations and meets the audit standards the rest of the business already upholds.",
    approach:
      "FIDO2 keys supplied and supported by XSignOn replaced password sign-in for branch and back-office staff. Enrollment, replacements and exceptions ran through AMS, so the bank's help desk stayed focused on supporting staff.",
    deployedFeatures: [
      {
        title: "FIDO2 keys",
        description:
          "for branch and back-office staff, compatible with the bank's existing identity provider.",
      },
      {
        title: "AMS",
        description: "for delivery, guided enrollment, replacements and exception handling.",
      },
      {
        title: "Pilot-first rollout",
        description: ", so enrollment and recovery flows were proven before scale-up.",
      },
    ],
    rolloutSteps: [
      {
        stepNumber: "01",
        title: "Pilot",
        description:
          "A pilot group enrolled first. Enrollment and recovery flows were tested with real staff, and the order of the wider rollout was set from what the pilot taught.",
      },
      {
        stepNumber: "02",
        title: "Branch rollout",
        description:
          "Branch staff enrolled in phases, so every branch kept continuous sign-in during the move. Replacements and exceptions ran through AMS.",
      },
      {
        stepNumber: "03",
        title: "Back office",
        description:
          "Back-office teams followed, with help desk time freed as staff moved to verified keys. Coverage stayed visible in AMS throughout.",
      },
    ],
    outcome:
      "A verified rollout across branches and back office, transitioning away from password sign-in with full audit traceability.",
    outcomeStatus:
      "Sourced outcome needed: one verifiable result, with its source and date, is added here before this page ships. No number is shown until it is sourced.",
    approvalOwner: "Chief Information Security Officer, UAE Banking Group",
    approvalStatus: "approved",
    evidenceLink: "https://xsignon.com/compliance/evidence/case-bank-2026.pdf",
    relatedProducts: [
      { name: "Passwordless Keys", slug: "keys", type: "Product" },
      { name: "AMS", slug: "ams", type: "Product" },
    ],
    relatedCaseStudies: [
      {
        title: "Passwordless Access For A Global Healthcare Enterprise",
        slug: "passwordless-access-global-healthcare",
        industry: "Healthcare",
      },
      {
        title: "Biometric FIDO2 Access For Air-Gapped Industrial Systems",
        slug: "biometric-fido2-air-gapped-industrial",
        industry: "Electrical",
      },
      {
        title: "Biometric-Only Authentication For A Global IT Enterprise",
        slug: "biometric-only-authentication-global-it",
        industry: "IT",
      },
    ],
  },
  {
    title: "Passwordless Access For A Global Healthcare Enterprise",
    slug: "passwordless-access-global-healthcare",
    industry: "Healthcare",
    deploymentDate: "March 2020",
    headline: "Passwordless Access For A Global Healthcare Enterprise",
    summary:
      "Passwordless access for a global healthcare enterprise, where clinical and administrative staff sign in across shared workstations and shift changes.",
    heroImageAlt: "Doctor holding a phone, wearing a stethoscope",
    challenge:
      "A global healthcare enterprise set out to give clinical and administrative staff passwordless access. Staff sign in across shared workstations and shift changes, where fast, verified sign-in helps care teams keep moving smoothly. This study covers the FIDO2 key rollout for that environment, completed in March 2020.",
    approach:
      "Hardware-bound FIDO2 biometric keys deployed across hospital workstations and clinical carts, enabling tap-and-biometric authentication in seconds without shared password risk.",
    deployedFeatures: [
      {
        title: "FIDO2 biometric keys",
        description:
          "deployed across shared nursing stations, consultation desks, and mobile hospital carts.",
      },
      {
        title: "Centralized enrollment",
        description: "allowing fast badge-and-key linking during staff shift onboarding.",
      },
    ],
    rolloutSteps: [
      {
        stepNumber: "01",
        title: "Clinical triage pilot",
        description:
          "Emergency triage and intensive care stations enrolled first to prove sign-in speed during emergency handoffs.",
      },
      {
        stepNumber: "02",
        title: "Workstation rollout",
        description:
          "Departmental deployment covering shared terminals, electronic health record (EHR) workstations, and mobile carts.",
      },
      {
        stepNumber: "03",
        title: "Shift worker provisioning",
        description:
          "Shift workers and visiting specialists provisioned with individual hardware keys managed through centralized directory sync.",
      },
    ],
    outcome:
      "Fast, verified sign-in across clinical shifts eliminating credential fatigue and maintaining strict HIPAA compliance.",
    outcomeStatus:
      "Case details pending: deployment specifics are confirmed and sourced before this page ships.",
    approvalOwner: "Healthcare Information Security Officer",
    approvalStatus: "approved",
    evidenceLink: "https://xsignon.com/compliance/evidence/case-health-2020.pdf",
    relatedProducts: [{ name: "Passwordless Keys", slug: "keys", type: "Product" }],
    relatedCaseStudies: [
      {
        title: "Securing Bank Access With FIDO2 Biometric Keys",
        slug: "securing-bank-access-fido2",
        industry: "Banking",
      },
      {
        title: "Biometric FIDO2 Access For Air-Gapped Industrial Systems",
        slug: "biometric-fido2-air-gapped-industrial",
        industry: "Electrical",
      },
      {
        title: "Biometric-Only Authentication For A Global IT Enterprise",
        slug: "biometric-only-authentication-global-it",
        industry: "IT",
      },
    ],
  },
  {
    title: "Biometric FIDO2 Access For Air-Gapped Industrial Systems",
    slug: "biometric-fido2-air-gapped-industrial",
    industry: "Electrical",
    location: "Asia",
    deploymentDate: "December 2023",
    headline: "Biometric FIDO2 Access For Air-Gapped Industrial Systems",
    summary:
      "Biometric FIDO2 access for air-gapped industrial systems in Asia, running on the XSense identity platform with the AMS module.",
    heroImageAlt: "Industrial worker welding with sparks",
    challenge:
      "An electrical operator in Asia runs industrial systems that are air-gapped by design, separated from public networks. Sign-in for those systems has to work fully on site, with the same assurance as any connected system. This study covers biometric FIDO2 access for that environment, completed in December 2023.",
    challengeParagraph2:
      "The deployment runs on the XSense identity platform, with XSenseCPP at the systems and the AMS module handling device enrollment and life-cycle events without external telemetry.",
    approach:
      "Local biometric authentication servers integrated with physical access control and terminal locks, completely disconnected from public clouds.",
    deployedFeatures: [
      {
        title: "XSense Identity Platform",
        description:
          "running self-contained authentication routines on isolated on-premises hardware.",
      },
      {
        title: "AMS Lifecycle Module",
        description: "managing hardware key life-cycles, revocation, and re-enrollment offline.",
      },
    ],
    rolloutSteps: [
      {
        stepNumber: "01",
        title: "Substation pilot",
        description:
          "High-voltage substation command stations piloted local biometric challenge-response routines without network dependencies.",
      },
      {
        stepNumber: "02",
        title: "Regional grid expansion",
        description:
          "Isolated regional grid stations equipped with hardened on-premises authentication nodes.",
      },
      {
        stepNumber: "03",
        title: "Operator console cutover",
        description:
          "Full cutover of engineering consoles to mandatory cryptographic key authentication with local audit logging.",
      },
    ],
    outcome:
      "Zero reliance on external network connectivity while maintaining high-assurance cryptographic attribution for all operator commands.",
    outcomeStatus:
      "Case details pending: deployment specifics are confirmed and sourced before this page ships.",
    approvalOwner: "Director of Industrial Cyber Security",
    approvalStatus: "approved",
    evidenceLink: "https://xsignon.com/compliance/evidence/case-electrical-2023.pdf",
    relatedProducts: [
      { name: "XSense", slug: "xsense", type: "Product" },
      { name: "AMS", slug: "ams", type: "Product" },
    ],
    relatedCaseStudies: [
      {
        title: "Securing Bank Access With FIDO2 Biometric Keys",
        slug: "securing-bank-access-fido2",
        industry: "Banking",
      },
      {
        title: "Passwordless Access For A Global Healthcare Enterprise",
        slug: "passwordless-access-global-healthcare",
        industry: "Healthcare",
      },
      {
        title: "Biometric-Only Authentication For A Global IT Enterprise",
        slug: "biometric-only-authentication-global-it",
        industry: "IT",
      },
    ],
  },
  {
    title: "Biometric-Only Authentication For A Global IT Enterprise",
    slug: "biometric-only-authentication-global-it",
    industry: "IT",
    deploymentDate: "July 2020",
    headline: "Biometric-Only Authentication For A Global IT Enterprise",
    summary:
      "Biometric-only authentication for a global IT enterprise, where every sign-in is completed with a verified key.",
    heroImageAlt: "IT team working at laptops around a table, seen from above",
    challenge:
      "A global IT enterprise set out to run biometric-only authentication: every sign-in completed with a verified key, for every team, in every region. This study covers that move, completed in July 2020.",
    approach:
      "Phased global replacement of password and SMS OTP factors with FIDO2 security keys, governed by XSense risk-adaptive policies.",
    deployedFeatures: [
      {
        title: "Mandatory biometric keys",
        description: "for 100% of internal developers, administrators, and back-office employees.",
      },
      {
        title: "XSense adaptive policies",
        description:
          "providing continuous session posture scoring across global multi-cloud infrastructure.",
      },
    ],
    rolloutSteps: [
      {
        stepNumber: "01",
        title: "Privileged engineering pilot",
        description:
          "Cloud infrastructure and privileged access accounts transitioned to mandatory biometric keys first.",
      },
      {
        stepNumber: "02",
        title: "Global office rollout",
        description:
          "Distributed offices across EMEA, APAC, and Americas enrolled staff with hardware security keys.",
      },
      {
        stepNumber: "03",
        title: "Legacy factor decommission",
        description:
          "Complete removal of passwords and SMS OTP fallbacks across the single sign-on directory.",
      },
    ],
    outcome:
      "100% passwordless workforce access across global engineering and administrative divisions.",
    outcomeStatus:
      "Case details pending: deployment specifics are confirmed and sourced before this page ships.",
    approvalOwner: "Vice President of Identity Security",
    approvalStatus: "approved",
    evidenceLink: "https://xsignon.com/compliance/evidence/case-it-2020.pdf",
    relatedProducts: [
      { name: "Passwordless Keys", slug: "keys", type: "Product" },
      { name: "XSense", slug: "xsense", type: "Product" },
    ],
    relatedCaseStudies: [
      {
        title: "Securing Bank Access With FIDO2 Biometric Keys",
        slug: "securing-bank-access-fido2",
        industry: "Banking",
      },
      {
        title: "Passwordless Access For A Global Healthcare Enterprise",
        slug: "passwordless-access-global-healthcare",
        industry: "Healthcare",
      },
      {
        title: "Biometric FIDO2 Access For Air-Gapped Industrial Systems",
        slug: "biometric-fido2-air-gapped-industrial",
        industry: "Electrical",
      },
    ],
  },
];

// Slug alias resolver (e.g. #case-bank -> securing-bank-access-fido2)
export const caseStudySlugAliases: Record<string, string> = {
  bank: "securing-bank-access-fido2",
  "case-bank": "securing-bank-access-fido2",
  banking: "securing-bank-access-fido2",
  health: "passwordless-access-global-healthcare",
  "case-health": "passwordless-access-global-healthcare",
  healthcare: "passwordless-access-global-healthcare",
  electrical: "biometric-fido2-air-gapped-industrial",
  "case-electrical": "biometric-fido2-air-gapped-industrial",
  it: "biometric-only-authentication-global-it",
  "case-it": "biometric-only-authentication-global-it",
};

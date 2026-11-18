import type { CaseStudyPage } from "@/types/case-study-page";

// The four case study pages as they are today (taken from the live pages). Used when Sanity is not connected,
// and for any part the editors leave empty. Parts marked pending stay visible to visitors until real, sourced
// details replace them: see the claims rules in the XSignOn content skill.
export const caseStudyPages: CaseStudyPage[] = [
  {
    slug: "securing-bank-access-fido2",
    title: "Securing Bank Access With FIDO2 Biometric Keys",
    crumb: "Banking",
    tags: ["Banking · Abu Dhabi", "Passwordless Keys", "AMS"],
    sections: [
      {
        heading: "Where they started",
        paragraphs: [
          "A bank in Abu Dhabi used password sign-in for branch and back-office staff. Teams spent time each week on password resets and sign-in support, and the bank wanted a smoother, verified experience that matched the high standards of the rest of its operations.",
          "The bank set out to give every team member sign-in that works at the speed of branch operations and meets the audit standards the rest of the business already upholds.",
        ],
        features: [],
        steps: [],
        notes: [],
      },
      {
        heading: "What was deployed",
        paragraphs: [
          "FIDO2 keys supplied and supported by XSignOn replaced password sign-in for branch and back-office staff. Enrollment, replacements and exceptions ran through AMS, so the bank's help desk stayed focused on supporting staff.",
        ],
        features: [
          {
            lead: "FIDO2 keys",
            joiner: "",
            body: "for branch and back-office staff, compatible with the bank's existing identity provider.",
          },
          {
            lead: "AMS",
            joiner: "",
            body: "for delivery, guided enrollment, replacements and exception handling.",
          },
          {
            lead: "Pilot-first rollout",
            joiner: ",",
            body: "so enrollment and recovery flows were proven before scale-up.",
          },
        ],
        steps: [],
        notes: [],
      },
      {
        heading: "Rollout",
        paragraphs: [],
        features: [],
        steps: [
          {
            number: "01",
            title: "Pilot",
            text: "A pilot group enrolled first. Enrollment and recovery flows were tested with real staff, and the order of the wider rollout was set from what the pilot taught.",
          },
          {
            number: "02",
            title: "Branch rollout",
            text: "Branch staff enrolled in phases, so every branch kept continuous sign-in during the move. Replacements and exceptions ran through AMS.",
          },
          {
            number: "03",
            title: "Back office",
            text: "Back-office teams followed, with help desk time freed as staff moved to verified keys. Coverage stayed visible in AMS throughout.",
          },
        ],
        notes: [],
      },
      {
        heading: "Outcome",
        paragraphs: [],
        features: [],
        steps: [],
        notes: [
          {
            label: "Sourced outcome needed",
            text: "one verifiable result, with its source and date, is added here before this page ships. No number is shown until it is sourced.",
          },
        ],
      },
    ],
    related: [
      { title: "Passwordless Keys", type: "Product", href: "/products/passwordless-keys" },
      { title: "AMS", type: "Product", href: "/products/ams" },
      {
        title: "Enterprise Technology",
        type: "Solution",
        href: "/solutions/enterprise-technology",
      },
      {
        title: "Passwordless Access For A Global Healthcare Enterprise",
        type: "Case study",
        href: "/proof/passwordless-access-global-healthcare",
      },
      {
        title: "Biometric FIDO2 Access For Air-Gapped Industrial Systems",
        type: "Case study",
        href: "/proof/biometric-fido2-air-gapped-industrial",
      },
      {
        title: "Biometric-Only Authentication For A Global IT Enterprise",
        type: "Case study",
        href: "/proof/biometric-only-authentication-global-it",
      },
      { title: "Back to Proof", type: "Proof", href: "/proof" },
    ],
    ctaHeadline: "Run a rollout your branches can trust.",
  },
  {
    slug: "passwordless-access-global-healthcare",
    title: "Passwordless Access For A Global Healthcare Enterprise",
    crumb: "Healthcare",
    tags: ["Healthcare", "March 2020", "Passwordless Keys"],
    sections: [
      {
        heading: "Where they started",
        paragraphs: [
          "A global healthcare enterprise set out to give clinical and administrative staff passwordless access. Staff sign in across shared workstations and shift changes, where fast, verified sign-in helps care teams keep moving smoothly. This study covers the FIDO2 key rollout for that environment, completed in March 2020.",
        ],
        features: [],
        steps: [],
        notes: [
          {
            label: "Case details pending",
            text: "deployment specifics are confirmed and sourced before this page ships.",
          },
        ],
      },
      {
        heading: "What was deployed",
        paragraphs: [],
        features: [],
        steps: [],
        notes: [
          {
            label: "Case details pending",
            text: "deployment scope is confirmed before this section ships.",
          },
        ],
      },
      {
        heading: "Rollout",
        paragraphs: [],
        features: [],
        steps: [],
        notes: [
          {
            label: "Case details pending",
            text: "rollout phases are confirmed before this section ships.",
          },
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [],
        features: [],
        steps: [],
        notes: [
          {
            label: "Sourced outcome needed",
            text: "no result is shown until it is verifiable, with its source and date.",
          },
        ],
      },
    ],
    related: [
      { title: "Passwordless Keys", type: "Product", href: "/products/passwordless-keys" },
      {
        title: "Enterprise Technology",
        type: "Solution",
        href: "/solutions/enterprise-technology",
      },
      {
        title: "Securing Bank Access With FIDO2 Biometric Keys",
        type: "Case study",
        href: "/proof/securing-bank-access-fido2",
      },
      {
        title: "Biometric FIDO2 Access For Air-Gapped Industrial Systems",
        type: "Case study",
        href: "/proof/biometric-fido2-air-gapped-industrial",
      },
      {
        title: "Biometric-Only Authentication For A Global IT Enterprise",
        type: "Case study",
        href: "/proof/biometric-only-authentication-global-it",
      },
      { title: "Back to Proof", type: "Proof", href: "/proof" },
    ],
    ctaHeadline: "Talk to us about clinical sign-in.",
  },
  {
    slug: "biometric-fido2-air-gapped-industrial",
    title: "Biometric FIDO2 Access For Air-Gapped Industrial Systems",
    crumb: "Electrical",
    tags: ["Electrical", "December 2023", "XSense", "AMS"],
    sections: [
      {
        heading: "Where they started",
        paragraphs: [
          "An electrical operator in Asia runs industrial systems that are air-gapped by design, separated from public networks. Sign-in for those systems has to work fully on site, with the same assurance as any connected system. This study covers biometric FIDO2 access for that environment, completed in December 2023.",
          "The deployment runs on the XSense identity platform, with XSenseCPP at the systems and the AMS module managing the keys.",
        ],
        features: [],
        steps: [],
        notes: [
          {
            label: "Case details pending",
            text: "deployment specifics are confirmed and sourced before this page ships.",
          },
        ],
      },
      {
        heading: "What was deployed",
        paragraphs: [],
        features: [],
        steps: [],
        notes: [
          {
            label: "Case details pending",
            text: "deployment scope is confirmed before this section ships.",
          },
        ],
      },
      {
        heading: "Rollout",
        paragraphs: [],
        features: [],
        steps: [],
        notes: [
          {
            label: "Case details pending",
            text: "rollout phases are confirmed before this section ships.",
          },
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [],
        features: [],
        steps: [],
        notes: [
          {
            label: "Sourced outcome needed",
            text: "no result is shown until it is verifiable, with its source and date.",
          },
        ],
      },
    ],
    related: [
      { title: "XSense", type: "Product", href: "/products/xsense" },
      { title: "AMS", type: "Product", href: "/products/ams" },
      {
        title: "Enterprise Technology",
        type: "Solution",
        href: "/solutions/enterprise-technology",
      },
      {
        title: "Securing Bank Access With FIDO2 Biometric Keys",
        type: "Case study",
        href: "/proof/securing-bank-access-fido2",
      },
      {
        title: "Passwordless Access For A Global Healthcare Enterprise",
        type: "Case study",
        href: "/proof/passwordless-access-global-healthcare",
      },
      {
        title: "Biometric-Only Authentication For A Global IT Enterprise",
        type: "Case study",
        href: "/proof/biometric-only-authentication-global-it",
      },
      { title: "Back to Proof", type: "Proof", href: "/proof" },
    ],
    ctaHeadline: "Bring verified sign-in to air-gapped systems.",
  },
  {
    slug: "biometric-only-authentication-global-it",
    title: "Biometric-Only Authentication For A Global IT Enterprise",
    crumb: "IT",
    tags: ["IT", "July 2020", "Passwordless Keys", "XSense"],
    sections: [
      {
        heading: "Where they started",
        paragraphs: [
          "A global IT enterprise set out to run biometric-only authentication: every sign-in completed with a verified key, for every team, in every region. This study covers that move, completed in July 2020.",
        ],
        features: [],
        steps: [],
        notes: [
          {
            label: "Case details pending",
            text: "deployment specifics are confirmed and sourced before this page ships.",
          },
        ],
      },
      {
        heading: "What was deployed",
        paragraphs: [],
        features: [],
        steps: [],
        notes: [
          {
            label: "Case details pending",
            text: "deployment scope is confirmed before this section ships.",
          },
        ],
      },
      {
        heading: "Rollout",
        paragraphs: [],
        features: [],
        steps: [],
        notes: [
          {
            label: "Case details pending",
            text: "rollout phases are confirmed before this section ships.",
          },
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [],
        features: [],
        steps: [],
        notes: [
          {
            label: "Sourced outcome needed",
            text: "no result is shown until it is verifiable, with its source and date.",
          },
        ],
      },
    ],
    related: [
      { title: "Passwordless Keys", type: "Product", href: "/products/passwordless-keys" },
      { title: "XSense", type: "Product", href: "/products/xsense" },
      {
        title: "Enterprise Technology",
        type: "Solution",
        href: "/solutions/enterprise-technology",
      },
      {
        title: "Securing Bank Access With FIDO2 Biometric Keys",
        type: "Case study",
        href: "/proof/securing-bank-access-fido2",
      },
      {
        title: "Passwordless Access For A Global Healthcare Enterprise",
        type: "Case study",
        href: "/proof/passwordless-access-global-healthcare",
      },
      {
        title: "Biometric FIDO2 Access For Air-Gapped Industrial Systems",
        type: "Case study",
        href: "/proof/biometric-fido2-air-gapped-industrial",
      },
      { title: "Back to Proof", type: "Proof", href: "/proof" },
    ],
    ctaHeadline: "Run biometric-only sign-in at global scale.",
  },
];

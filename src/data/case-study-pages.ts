import type { CaseStudyPage, CaseStudyPageSection } from "@/types/case-study-page";

// The four case study pages, written from the case studies on the current xsignon.com (use-cases). Used when
// Sanity is not connected, and for any part the editors leave empty. Only facts from the live pages are used:
// no result or number appears here unless the live page states it (see the claims rules in the content skill).

const section = (
  heading: string,
  parts: Partial<Omit<CaseStudyPageSection, "heading">>,
): CaseStudyPageSection => ({
  heading,
  paragraphs: [],
  features: [],
  steps: [],
  notes: [],
  ...parts,
});

const feat = (lead: string, body: string) => ({ lead, joiner: ":" as const, body });
const step = (number: string, title: string, text: string) => ({ number, title, text });

export const caseStudyPages: CaseStudyPage[] = [
  {
    slug: "securing-bank-access-fido2",
    title: "Securing Bank Access With FIDO2 Biometric Keys",
    crumb: "Banking",
    tags: ["Banking · Abu Dhabi", "Passwordless Keys", "AMS"],
    sections: [
      section("The challenge", {
        paragraphs: [
          "A leading bank in Abu Dhabi ran a hybrid Active Directory with several local directories behind a firewall. It wanted to end single-factor sign-in and tie every sign-in to one named person.",
        ],
        features: [
          feat(
            "Attributable sign-in",
            "security keys instead of soft authenticators, each locked to the user's Azure AD account.",
          ),
          feat("No shared credentials", "no password or key sharing."),
          feat(
            "Controlled enrolment",
            "fingerprints enrolled in a secure place, with limits on resets and self-enrolment.",
          ),
          feat(
            "Central control",
            "reassign, reactivate and lock keys from one place, across locations.",
          ),
        ],
      }),
      section("What was deployed", {
        features: [
          feat(
            "ThinC-AUTH biometric keys",
            "single sign-on through the bank's hybrid AD, with no conventional password.",
          ),
          feat(
            "Life cycle management software",
            "runs in the bank's data centre with no external access. It syncs users from Azure AD and signs in with Azure AD MFA.",
          ),
          feat(
            "Custom key functions",
            "FIDO2 and WebAuthn on Windows 10 1903 or later, a PIN generated per key at enrolment, PIN fallback off, one Microsoft account per key.",
          ),
        ],
      }),
      section("How keys are managed", {
        steps: [
          step(
            "01",
            "Enrol",
            "Staff register one to five fingerprints in a controlled environment.",
          ),
          step(
            "02",
            "Assign",
            "Automated emails assign keys. Administrators, service users and generic users each have their own role.",
          ),
          step(
            "03",
            "Reset",
            "Administrators clear a returned key's fingerprints remotely, so it can be reassigned.",
          ),
        ],
      }),
      section("Outcome", {
        paragraphs: [
          "The bank manages the full key life cycle centrally, and staff reach business applications without passwords.",
        ],
        features: [
          feat("Lower risk", "less exposure to phishing and credential sharing."),
          feat("Central management", "one view of keys across locations."),
          feat("Secure handover", "controlled enrolment, reassignment and reset."),
        ],
      }),
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
      section("The challenge", {
        paragraphs: [
          "A multibillion-dollar global healthcare company runs development, support and regional centres on the Microsoft cloud, with local domain controllers and several Azure AD environments.",
        ],
        features: [
          feat(
            "Passwordless DevOps",
            "sign-in to Microsoft DevOps applications without passwords.",
          ),
          feat(
            "Biometric keys",
            "replace soft authenticators and stop password and authenticator sharing.",
          ),
          feat(
            "Any hybrid-joined PC",
            "staff sign in to any hybrid-joined PC and reach their enterprise apps.",
          ),
          feat("Global teams", "secure FIDO2 sign-in across locations."),
        ],
      }),
      section("What was deployed", {
        paragraphs: [
          "XSignOn ran a rapid proof of concept, then rolled out FIDO2 biometric sign-in across the environment.",
        ],
        steps: [
          step(
            "01",
            "ThinC-AUTH keys",
            "FIDO2-certified keys, with administrators supported on setup, fingerprint registration and PIN fallback.",
          ),
          step("02", "Windows 10", "Devices set up for FIDO2 across the Microsoft environment."),
          step("03", "Intune", "Windows 10 devices managed centrally through Microsoft Intune."),
          step(
            "04",
            "Hybrid AD",
            "Hybrid AD set up for biometric, passwordless sign-in on hybrid-joined devices.",
          ),
        ],
      }),
      section("What it supports", {
        features: [
          feat("Fingerprint sign-in", "with a PIN fallback option."),
          feat("Sign-in across hybrid-joined PCs", "with access to assigned enterprise apps."),
          feat("Central device management", "through Microsoft Intune."),
          feat(
            "Existing directories",
            "local domain controllers and multiple Azure AD environments.",
          ),
        ],
      }),
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
    tags: ["Electrical", "Asia · December 2023", "XSense", "AMS"],
    sections: [
      section("The challenge", {
        paragraphs: [
          "A global electrical automation company runs air-gapped Windows PCs and servers joined to a local Active Directory. Staff signed in with usernames and passwords.",
        ],
        features: [
          feat("FIDO2 sign-in", "on AD-joined PCs and servers, with no external connection."),
          feat("Biometric-only access", "and no password sharing."),
          feat("Any work-area PC", "staff sign in to any PC in their work area."),
        ],
      }),
      section("What was deployed", {
        paragraphs: [
          "XSense IdP runs in the customer's own data centre, with ThinC-AUTH keys, XSenseCPP and the AMS module.",
        ],
        steps: [
          step("01", "On-premises XSense IdP", "Runs fully inside the air gap."),
          step(
            "02",
            "Key life cycle in AMS",
            "One inventory of keys, managed on site with no external access.",
          ),
          step(
            "03",
            "Licensed keys",
            "Keys work only with XSense IdP and XSenseCPP, and need a registered fingerprint.",
          ),
        ],
      }),
      section("How sign-in works", {
        features: [
          feat(
            "Biometric-only",
            "every sign-in belongs to one person, so passwords and authenticators cannot be shared.",
          ),
          feat("XSenseCPP", "brings FIDO2 sign-in to air-gapped, locally joined Windows machines."),
          feat(
            "One-time enrolment",
            "a tool for Windows, macOS and Linux saves settings on the key.",
          ),
          feat(
            "Shared work areas",
            "staff sign in to different PCs and reach their assigned apps.",
          ),
        ],
      }),
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
    tags: ["IT", "July 2020", "Passwordless Keys"],
    sections: [
      section("The challenge", {
        paragraphs: [
          "A leading multinational IT company runs Windows systems on Azure AD across several locations, with shared PCs in work areas.",
        ],
        features: [
          feat("FIDO2 for enterprise apps", "staff use FIDO2 keys across applications."),
          feat("No sharing", "no password or authenticator sharing."),
          feat("No PIN shortcut", "a PIN is not an alternative to biometrics."),
          feat("Any work-area PC", "staff sign in to any PC in their work area."),
        ],
      }),
      section("What was deployed", {
        paragraphs: [
          "ThinC-AUTH keys and the enrolment software were customised for biometric-only sign-in.",
        ],
        steps: [
          step("01", "Biometric-only keys", "Users sign in with a registered fingerprint."),
          step(
            "02",
            "PIN fallback off",
            "A failed fingerprint does not fall back to a PIN, so only enrolled biometrics work.",
          ),
          step(
            "03",
            "Enrolment tool",
            "One tool for Windows, macOS and Linux enrols fingerprints. Settings stay on the key.",
          ),
        ],
      }),
      section("Outcome", {
        paragraphs: [
          "Staff sign in to Windows with a key and a fingerprint, with no password. With PIN fallback off, only enrolled biometrics get in.",
        ],
        features: [
          feat("Passwordless Windows sign-in", "completed by the enrolled fingerprint."),
          feat("Work-area PCs", "staff use different PCs with their assigned keys."),
        ],
      }),
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

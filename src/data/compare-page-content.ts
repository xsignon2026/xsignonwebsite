import type { ComparePageContent } from "@/types/last-pages-content";

// The comparison page as it is today. Used when Sanity is not connected, and for any part left empty.
// Every claim in the XSignOn column needs to be true and provable (see the content skill).
export const comparePageFallback: ComparePageContent = {
  hero: {
    title: "How XSignOn compares",
  },
  intro: {
    bold: "Four ways to run sign-in, compared on what each one gives your team.",
    text: "XSignOn pairs FIDO2 hardware with a governed platform, so the sign-in itself, the enrollment behind it, and the evidence after it all come from one place.",
  },
  columns: ["Capability", "XSignOn", "Password-based sign-in", "One-time codes", "Legacy MFA"],
  rows: [
    {
      capability: "Sign-in only the account owner can complete",
      values: [
        "Yes, with a verified key",
        "Shared secret",
        "Code shared by message",
        "Added on top of a password",
      ],
    },
    {
      capability: "Nothing to remember or type",
      values: [
        "Yes",
        "Password to remember",
        "Code to type each time",
        "Password plus a second step",
      ],
    },
    {
      capability: "Hardware-backed verification",
      values: ["Yes, FIDO2 keys", "No", "No", "Varies by setup"],
    },
    {
      capability: "Enrollment and lifecycle managed for you",
      values: [
        "Yes, through AMS",
        "Reset by help desk",
        "Managed per account",
        "Managed per account",
      ],
    },
    {
      capability: "Recovery with a verified replacement",
      values: [
        "Yes, guided by AMS",
        "Reset questions and calls",
        "Re-registration per service",
        "Re-registration per service",
      ],
    },
    {
      capability: "Evidence ready for access reviews",
      values: [
        "Yes, in PostureOne and XSense",
        "Assembled by hand",
        "Assembled by hand",
        "Assembled by hand",
      ],
    },
    {
      capability: "Works with your existing identity provider",
      values: ["Yes, standard protocols", "Yes", "Yes", "Yes"],
    },
  ],
  lede: "Every XSignOn row is delivered by the products on this site: the keys, AMS, XSense and PostureOne, working as one program.",
  related: [
    {
      title: "Passwordless Keys",
      type: "Product",
      href: "/products/passwordless-keys",
    },
    {
      title: "Securing Bank Access With FIDO2 Biometric Keys",
      type: "Case study",
      href: "/proof/securing-bank-access-fido2",
    },
    {
      title: "Back to Our products",
      type: "Products",
      href: "/products",
    },
  ],
  cta: {
    title: "Compare it against your current sign-in.",
    button: {
      label: "Book a strategy call",
      href: "/contact",
    },
  },
};

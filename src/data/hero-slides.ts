// The slides of the home hero card, newest first. For now they live here; later the same shape can be filled
// from the CMS so the heading, one-liner and button follow the three most recent launches.
//
// - "variant" picks the look of the picture: 0 violet and red, 1 red, 2 light.
// - "tag", "heading" (up to three short lines) and "sub" are printed on the picture's glowing panel.
// - "line" is the one-liner under the picture; "action" is either the free domain check or a button.

export type HeroSlideAction = { type: "scan" } | { type: "link"; label: string; href: string };

export type HeroSlide = {
  id: string;
  variant: 0 | 1 | 2;
  tag: string;
  heading: readonly string[];
  sub: readonly string[];
  line?: string;
  action: HeroSlideAction;
};

export const heroSlides: ReadonlyArray<HeroSlide> = [
  {
    id: "domain-check",
    variant: 0,
    tag: "Free check",
    heading: ["Can someone send", "email as your", "domain?"],
    sub: ["Reads public DNS only."],
    action: { type: "scan" },
  },
  {
    id: "xsignon-mesh",
    variant: 1,
    tag: "New product",
    heading: ["Contain risk", "before it", "spreads."],
    sub: ["XSignOn Mesh"],
    line: "Micro-segmentation and containment that keeps one failure small.",
    action: { type: "link", label: "Explore XSignOn Mesh", href: "/products/xsignon-mesh" },
  },
  {
    id: "passwordless",
    variant: 2,
    tag: "Product",
    heading: ["Sign in", "without a", "password."],
    sub: ["Passwordless Authenticators"],
    line: "Hardware biometric keys for phishing-resistant sign-in.",
    action: { type: "link", label: "Explore the keys", href: "/products/passwordless-keys" },
  },
];

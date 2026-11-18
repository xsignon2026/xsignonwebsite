import type { CareersPageContent } from "@/types/careers-page-content";

// The Careers page as it is today. Used when Sanity is not connected, and for any part the editors leave empty.
export const careersPageFallback: CareersPageContent = {
  hero: { title: "Careers" },
  working: {
    title: "Working here",
    values: [
      {
        title: "Evidence over assertion",
        text: "We work the way our products work: claims point at evidence, and owners are named. It applies to posture reviews and to how we run the company.",
      },
      {
        title: "The secure way is the easy way",
        text: "Security work that slows teams down is unfinished design. We hold our own tools to the standard we sell.",
      },
      {
        title: "Small team, real responsibility",
        text: "XSignOn is an early team in McKinney, Texas. The work touches products customers trust for every sign-in.",
      },
    ],
  },
  roles: {
    title: "Open roles",
    emptyNote: "There are no open positions right now. Follow XSignOn for future opportunities.",
    general: {
      title: "General applications",
      text: 'For roles beyond the two listed here, send your background through Contact and choose "Careers" as the reason.',
      button: { label: "Contact us about careers", href: "/contact?reason=careers" },
    },
  },
  cta: {
    title: "Want to build sign-in people trust?",
    button: { label: "Get in touch", href: "/contact" },
  },
};

import type { ContactPageContent } from "@/types/contact-page-content";

// The Contact page as it is today. Used when Sanity is not connected, and for any part the editors leave empty.
export const contactPageFallback: ContactPageContent = {
  hero: { title: "Contact us" },
  details: [
    {
      label: "Office.",
      text: "XSignOn Corporation, 3900 S Stonebridge Dr., Suite 1101, McKinney, TX 75070.",
    },
    { label: "Phone.", text: "+1 469-897-9399", href: "tel:+14698979399" },
    { label: "Email.", text: "info@xsignon.com", href: "mailto:info@xsignon.com" },
  ],
  closing: "",
  cta: {
    title: "Prefer reading first?",
    button: { label: "Browse our thinking", href: "/thinking" },
  },
};

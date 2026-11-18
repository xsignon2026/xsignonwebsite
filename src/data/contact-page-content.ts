import type { ContactPageContent } from "@/types/contact-page-content";

// The Contact page as it is today. Used when Sanity is not connected, and for any part the editors leave empty.
export const contactPageFallback: ContactPageContent = {
  hero: { title: "Contact us" },
  details: [
    {
      label: "What happens next.",
      text: "Every inquiry goes to a person who replies with care. Strategy calls are short working sessions on your access, AI governance or quantum readiness goals, and you leave with a clear next step.",
    },
    {
      label: "Office.",
      text: "XSignOn Corporation, 3900 S Stonebridge Dr., Suite 1101, McKinney, TX 75070.",
    },
    { label: "Phone.", text: "+1 469-897-9399", href: "tel:+14698979399" },
    { label: "Email.", text: "info@xsignon.com", href: "mailto:info@xsignon.com" },
  ],
  closing:
    'This form is designed to be quick and welcoming. To book quickly, choose "Book a strategy call" and share your preferred timing in the message.',
  cta: {
    title: "Prefer reading first?",
    button: { label: "Browse our thinking", href: "/thinking" },
  },
};

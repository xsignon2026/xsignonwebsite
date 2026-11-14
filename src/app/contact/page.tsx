import type { Metadata } from "next";
import { ContactView } from "@/components/prototype/ContactView";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us | XSignOn",
  description:
    "Speak with our security architects to evaluate your identity posture, AI governance, or quantum readiness goals.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <ContactView />
      <PrototypeBehaviors root="view-contact" features={["reveal"]} />
    </>
  );
}

import type { Metadata } from "next";
import { IndustryView } from "@/components/prototype/IndustryView";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";

export const metadata: Metadata = {
  title: "Industry Thinking | XSignOn",
  description:
    "Practical thinking for security, governance, and growth across modern enterprise environments.",
};

export default function IndustryThinkingPage() {
  return (
    <>
      <IndustryView />
      <PrototypeBehaviors root="view-industry" features={["reveal"]} />
    </>
  );
}

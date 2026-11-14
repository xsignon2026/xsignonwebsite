import type { Metadata } from "next";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { ThinkingView } from "@/components/prototype/ThinkingView";

export const metadata: Metadata = {
  title: "Our thinking | XSignOn",
  description:
    "Practical perspectives on identity governance, AI security, micro-segmentation, and zero-trust engineering.",
};

export default function ThinkingHubPage() {
  return (
    <>
      <ThinkingView />
      <PrototypeBehaviors root="view-thinking" features={["reveal"]} />
    </>
  );
}

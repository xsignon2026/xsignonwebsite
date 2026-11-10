import type { Metadata } from "next";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { UnsubscribeView } from "@/components/prototype/UnsubscribeView";

export const metadata: Metadata = {
  title: "Unsubscribe | XSignOn",
  description: "Manage your marketing email preferences for XSignOn updates and announcements.",
};

export const dynamic = "force-dynamic";

export default function UnsubscribePage() {
  return (
    <>
      <UnsubscribeView />
      <PrototypeBehaviors root="view-unsubscribe" features={["reveal"]} />
    </>
  );
}

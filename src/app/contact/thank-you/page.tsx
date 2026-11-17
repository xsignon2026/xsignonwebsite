import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ThankYouView } from "@/components/prototype/ThankYouView";

export const metadata: Metadata = {
  title: "Thank You | XSignOn",
  description: "Your inquiry has been received.",
  robots: {
    index: false,
    follow: false,
  },
};

// T-058: only reachable right after sending. The contact route sets a short-lived cookie; anyone
// else who opens this address is sent back to the form.
async function ThankYouContent() {
  if (!(await cookies()).has("contact_sent")) redirect("/contact");
  return <ThankYouView />;
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={<div aria-busy="true" style={{ minHeight: "60vh", background: "var(--d1)" }} />}
    >
      <ThankYouContent />
    </Suspense>
  );
}

import { redirect, RedirectType } from "next/navigation";

// Permanent redirect alias from /case-studies to /proof
export default function CaseStudiesRedirect() {
  redirect("/proof", RedirectType.replace);
}

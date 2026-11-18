import type { IndustryPageContent } from "@/types/last-pages-content";

// The Industry Thinking page as it is today. Used when Sanity is not connected, and for any part left empty.
// Pieces marked pending stay visible to visitors until the full text is published.
export const industryPageFallback: IndustryPageContent = {
  hero: {
    title: "Industry Thinking",
    tag: "Practical thinking for security, governance, and growth",
  },
  featured: {
    label: "Featured insight",
    title: "Why AI Governance Is Becoming a Security Priority",
    text: "AI use is now part of everyday operations, and governance is joining the security agenda: inventories, owners, and evidence for every system in production.",
    noteLabel: "Full text pending",
    noteText: "this piece is being prepared for publication.",
  },
  cards: [
    {
      title: "How to Reduce Shadow AI Risk Before It Spreads",
      text: "Team-adopted AI, brought into the open and into the inventory, with owners and evidence.",
      noteLabel: "Full text pending",
      noteText: "this piece is being prepared for publication.",
    },
    {
      title: "Why Passwordless Identity Matters for Mid-Market Teams",
      text: "Verified sign-in sized for growing teams: keys, guided enrollment, and support that scales.",
      noteLabel: "Full text pending",
      noteText: "this piece is being prepared for publication.",
    },
    {
      title: "Zero Trust Works Best When It Starts With Identity",
      text: "Identity-first sequencing for zero trust programs: verify the person and the agent first.",
      noteLabel: "Full text pending",
      noteText: "this piece is being prepared for publication.",
    },
    {
      title: "How Continuous Compliance Improves Audit Readiness",
      text: "Evidence gathered as work happens, so reviews open with the record already complete.",
      noteLabel: "Full text pending",
      noteText: "this piece is being prepared for publication.",
    },
    {
      title: "What NIST AI-RMF Means for Practical AI Oversight",
      text: "The framework translated into inventories, control maps and reviewer-ready evidence.",
      noteLabel: "Full text pending",
      noteText: "this piece is being prepared for publication.",
    },
    {
      title: "Access Reviews Should Not Be a Last-Minute Exercise",
      text: "Review cycles that run all year, with owners and deadlines carried in one flow.",
      noteLabel: "Full text pending",
      noteText: "this piece is being prepared for publication.",
    },
  ],
  cta: {
    title: "Discuss what you are reading.",
    button: {
      label: "Book a strategy call",
      href: "/contact",
    },
  },
};

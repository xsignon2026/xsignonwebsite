import type { ThinkingPicture } from "@/types/insights-page-content";

// The article pictures the hub can show. Editors choose one by name; files and descriptions live here.
export const THINKING_PICTURES: Record<ThinkingPicture, { src: string; alt: string }> = {
  "identity-first": {
    src: "/images/thinking/identity-first-controls.jpg",
    alt: "Server racks with network cables and status lights",
  },
  "data-ai": {
    src: "/images/thinking/data-ai-security.jpg",
    alt: "Person working on a laptop while holding a phone",
  },
  "micro-segmentation": {
    src: "/images/thinking/modern-micro-segmentation.jpg",
    alt: "Team planning with sticky notes on a whiteboard",
  },
  "non-human": {
    src: "/images/thinking/non-human-identities.jpg",
    alt: "Automated warehouse with rows of shelves and yellow bins",
  },
  "agentic-ai": {
    src: "/images/thinking/agentic-ai-cybersecurity.jpg",
    alt: "Analytics dashboard with charts on a laptop screen",
  },
};

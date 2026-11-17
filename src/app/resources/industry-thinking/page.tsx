import { permanentRedirect } from "next/navigation";

// T-121: Alias redirect from /resources/industry-thinking to /thinking/industry
export default function IndustryThinkingRedirect() {
  permanentRedirect("/thinking/industry");
}

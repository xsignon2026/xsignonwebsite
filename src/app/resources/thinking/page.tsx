import { permanentRedirect } from "next/navigation";

// T-114: Alias redirect from /resources/thinking to /thinking
export default function ResourcesThinkingRedirect() {
  permanentRedirect("/thinking");
}

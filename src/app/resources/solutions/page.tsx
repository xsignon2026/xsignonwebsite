import { redirect, RedirectType } from "next/navigation";

// Redirect /resources/solutions to canonical /solutions
export default function ResourcesSolutionsRedirect() {
  redirect("/solutions", RedirectType.replace);
}

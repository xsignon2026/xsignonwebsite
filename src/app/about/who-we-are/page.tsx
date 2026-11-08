import { redirect } from "next/navigation";

export default function WhoWeAreAliasPage() {
  redirect("/about#who");
}

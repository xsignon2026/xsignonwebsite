import { redirect, RedirectType } from "next/navigation";

// Redirect /products/proof to /proof
export default function ProductsProofRedirect() {
  redirect("/proof", RedirectType.replace);
}

import type { Metadata } from "next";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { ProductsView } from "@/components/prototype/ProductsView";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Our Products | XSignOn",
  description:
    "Explore XSignOn's zero-trust products: PostureOne, Passwordless Keys, EvalOne, XSense, and AMS.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <ProductsView />
      <PrototypeBehaviors
        root="view-products"
        features={["reveal", "productTabs", "overview", "thinkCarousel"]}
      />
    </>
  );
}

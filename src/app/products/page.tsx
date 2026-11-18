import type { Metadata } from "next";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { ProductsView } from "@/components/prototype/ProductsView";
import { getProductsPageContent } from "@/lib/products-page-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Our Products | XSignOn",
  description:
    "Explore XSignOn's zero-trust products: PostureOne, Passwordless Keys, EvalOne, XSense, and AMS.",
  path: "/products",
});

export default async function ProductsPage() {
  const content = await getProductsPageContent();
  return (
    <>
      <ProductsView content={content} />
      <PrototypeBehaviors
        root="view-products"
        features={["reveal", "productTabs", "overview", "thinkCarousel"]}
      />
    </>
  );
}

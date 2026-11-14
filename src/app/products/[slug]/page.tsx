import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { JsonLd } from "@/components/common/JsonLd";
import { AmsView } from "@/components/prototype/AmsView";
import { EvalOneView } from "@/components/prototype/EvalOneView";
import { KeysView } from "@/components/prototype/KeysView";
import { PostureOneView } from "@/components/prototype/PostureOneView";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import type { Feature } from "@/components/prototype/prototype-behaviours";
import { XSenseView } from "@/components/prototype/XSenseView";
import { getProductBySlug } from "@/lib/product";
import { createBreadcrumbSchema, createSoftwareApplicationSchema } from "@/lib/schema-org";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

// The five product pages, as designed in the approved prototype. "keys" and "passwordless-keys" are the
// same page (the second is the address used in the menus).
const VIEWS: Record<
  string,
  { View: ComponentType; id: string; features: Feature[]; data: string }
> = {
  postureone: {
    View: PostureOneView,
    id: "view-postureone",
    features: ["reveal", "reviewLoop"],
    data: "postureone",
  },
  evalone: { View: EvalOneView, id: "view-evalone", features: ["reveal"], data: "evalone" },
  xsense: { View: XSenseView, id: "view-xsense", features: ["reveal", "docTabs"], data: "xsense" },
  ams: { View: AmsView, id: "view-ams", features: ["reveal", "docTabs"], data: "ams" },
  keys: { View: KeysView, id: "view-keys", features: ["reveal", "docTabs"], data: "keys" },
  "passwordless-keys": {
    View: KeysView,
    id: "view-keys",
    features: ["reveal", "docTabs"],
    data: "keys",
  },
};

export function generateStaticParams() {
  return Object.keys(VIEWS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = Object.hasOwn(VIEWS, slug) ? VIEWS[slug] : undefined;
  if (!entry) return {};
  const product = await getProductBySlug(entry.data);
  if (!product) return {};
  return {
    title: product.seo?.title || `${product.name} | XSignOn`,
    description: product.seo?.description || product.tagline,
    alternates: {
      canonical: `/products/${entry.data === "keys" ? "passwordless-keys" : entry.data}`,
    },
    robots: product.seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const entry = Object.hasOwn(VIEWS, slug) ? VIEWS[slug] : undefined;
  if (!entry) notFound();

  const product = await getProductBySlug(entry.data);
  const { View } = entry;

  return (
    <>
      {product && (
        <JsonLd
          schema={[
            createSoftwareApplicationSchema({
              name: product.name,
              description: product.tagline || product.hero?.subline || "",
              slug: product.slug,
            }),
            createBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Products", url: "/products" },
              { name: product.name, url: `/products/${slug}` },
            ]),
          ]}
        />
      )}
      <View />
      <PrototypeBehaviors root={entry.id} features={entry.features} />
    </>
  );
}

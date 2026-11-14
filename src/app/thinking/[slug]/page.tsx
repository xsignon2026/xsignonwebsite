import type { Metadata } from "next";
import type { ComponentType } from "react";
import { ArticleAgenticView } from "@/components/prototype/ArticleAgenticView";
import { ArticleDataAiView } from "@/components/prototype/ArticleDataAiView";
import { ArticleIdentityFirstView } from "@/components/prototype/ArticleIdentityFirstView";
import { ArticleMicrosegView } from "@/components/prototype/ArticleMicrosegView";
import { ArticleNonhumanView } from "@/components/prototype/ArticleNonhumanView";
import { PrototypeBehaviors } from "@/components/prototype/PrototypeBehaviors";
import { notFound, permanentRedirect } from "next/navigation";
import {
  getAllArticles,
  getArticleBySlug,
  isValidArticleSlug,
  resolveArticleCanonicalSlug,
} from "@/lib/article";
import { JsonLd } from "@/components/common/JsonLd";
import { createArticleSchema, createBreadcrumbSchema } from "@/lib/schema-org";

// The five articles, as designed in the approved prototype (keyed by canonical address).
const VIEWS: Record<string, { View: ComponentType; id: string }> = {
  "identity-first-controls": { View: ArticleIdentityFirstView, id: "view-article-identity-first" },
  "data-and-ai-security": { View: ArticleDataAiView, id: "view-article-data-ai" },
  "modern-micro-segmentation": { View: ArticleMicrosegView, id: "view-article-microseg" },
  "non-human-identities": { View: ArticleNonhumanView, id: "view-article-nonhuman" },
  "agentic-ai-cybersecurity": { View: ArticleAgenticView, id: "view-article-agentic" },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((art) => ({
    slug: art.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidArticleSlug(slug)) {
    return { title: "Article Not Found | XSignOn" };
  }

  const article = await getArticleBySlug(slug);
  if (!article) {
    return { title: "Article Not Found | XSignOn" };
  }

  return {
    title: `${article.title} | XSignOn Thinking`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;

  if (!isValidArticleSlug(slug)) {
    notFound();
  }

  const canonicalSlug = resolveArticleCanonicalSlug(slug);
  if (!canonicalSlug) {
    notFound();
  }

  // If accessed by alias (e.g. article-identity-first), 308 redirect to canonical URL
  if (slug !== canonicalSlug) {
    permanentRedirect(`/thinking/${canonicalSlug}`);
  }

  const article = await getArticleBySlug(canonicalSlug);
  if (!article) {
    notFound();
  }

  const articleSchema = createArticleSchema({
    title: article.title,
    excerpt: article.excerpt,
    date: article.date,
    author: article.author,
    slug: article.slug,
  });

  const breadcrumbsSchema = createBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Thinking", url: "/thinking" },
    { name: article.title, url: `/thinking/${article.slug}` },
  ]);

  const entry = Object.hasOwn(VIEWS, article.slug) ? VIEWS[article.slug] : undefined;
  if (!entry) notFound();
  const { View } = entry;

  return (
    <>
      <JsonLd schema={[articleSchema, breadcrumbsSchema]} />
      <View />
      <PrototypeBehaviors root={entry.id} features={["reveal"]} />
    </>
  );
}

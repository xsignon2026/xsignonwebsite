import type { Metadata } from "next";
import { ArticleView } from "@/components/prototype/ArticleView";
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

  return (
    <>
      <JsonLd schema={[articleSchema, breadcrumbsSchema]} />
      <ArticleView article={article} />
      <PrototypeBehaviors root={`view-article-${article.slug}`} features={["reveal"]} />
    </>
  );
}

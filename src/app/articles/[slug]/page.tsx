import { notFound, permanentRedirect } from "next/navigation";
import {
  getAllArticles,
  isValidArticleSlug,
  resolveArticleCanonicalSlug,
} from "@/lib/article";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((art) => ({
    slug: art.slug,
  }));
}

// S-14 / T-113: Alias redirect from /articles/:slug to /thinking/:slug
export default async function ArticleLegacyRedirect({ params }: PageProps) {
  const { slug } = await params;

  if (!isValidArticleSlug(slug)) {
    notFound();
  }

  const canonical = resolveArticleCanonicalSlug(slug);
  if (!canonical) {
    notFound();
  }

  permanentRedirect(`/thinking/${canonical}`);
}

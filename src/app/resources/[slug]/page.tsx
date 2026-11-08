import { redirect, RedirectType } from "next/navigation";
import { getAllSolutions, getSolutionBySlug } from "@/lib/solution";
import { getAllArticles, getArticleBySlug } from "@/lib/article";

interface ResourcesSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const [solutions, articles] = await Promise.all([
    getAllSolutions(),
    getAllArticles(),
  ]);
  const solutionSlugs = solutions.map((s) => ({ slug: s.slug }));
  const articleSlugs = articles.map((a) => ({ slug: a.slug }));
  return [...solutionSlugs, ...articleSlugs];
}

// Redirects /resources/:slug to canonical /solutions/:slug or /thinking/:slug
export default async function ResourcesSlugRedirect({
  params,
}: ResourcesSlugPageProps) {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);

  if (solution) {
    redirect(`/solutions/${solution.slug}`, RedirectType.replace);
  }

  const article = await getArticleBySlug(slug);
  if (article) {
    redirect(`/thinking/${article.slug}`, RedirectType.replace);
  }

  redirect("/solutions", RedirectType.replace);
}

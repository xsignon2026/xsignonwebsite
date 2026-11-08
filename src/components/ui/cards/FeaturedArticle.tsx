import Link from "next/link";
import React from "react";

type FeaturedArticleProps = {
  category: string;
  title: string;
  summary: string;
  href: string;
  date?: string;
  readTime?: string;
  className?: string;
};

export function FeaturedArticle({
  category,
  title,
  summary,
  href,
  date,
  readTime,
  className = "",
}: FeaturedArticleProps) {
  return (
    <article
      tabIndex={0}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-card border border-line bg-card p-8 md:p-10 shadow-carousel transition-[transform,box-shadow,border-color] duration-300 ease-brand hover:border-acc/40 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus active:scale-[.97] ${className}`}
    >
      <div>
        <div className="flex items-center gap-3 text-caption text-gray">
          <span className="text-eyebrow font-bold uppercase tracking-wider text-acc">
            Featured &middot; {category}
          </span>
          {date && <span>&middot;</span>}
          {date && <time>{date}</time>}
          {readTime && <span>&middot; {readTime}</span>}
        </div>

        <h3 className="mt-4 text-h3 font-bold tracking-tight text-txt group-hover:text-acc transition-colors">
          <Link href={href} className="focus:outline-none">
            {title}
          </Link>
        </h3>

        <p className="mt-4 text-body text-gray leading-relaxed max-w-3xl">{summary}</p>
      </div>

      <div className="mt-8 flex items-center gap-2 font-semibold text-acc">
        <span>Read featured article</span>
        <span
          aria-hidden="true"
          className="transition-transform duration-300 ease-brand group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </div>
    </article>
  );
}

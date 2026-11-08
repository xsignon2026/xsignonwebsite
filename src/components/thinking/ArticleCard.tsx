"use client";

import Link from "next/link";
import { useState } from "react";
import type { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardId = `article-${article.slug}`;
  const excerptId = `excerpt-${article.slug}`;

  if (featured) {
    return (
      <article className="bcard rv" id={cardId}>
        <div className="pmeta">
          <span className="pill-cat">Featured</span>
          <span className="pill-cat">{article.author}</span>
          <span className="pill-cat">{article.date}</span>
        </div>
        <h3 className="h3" style={{ marginTop: "18px" }}>
          {article.title}
        </h3>
        <p id={excerptId}>
          {article.excerpt}
          {isExpanded && article.sections[0] && (
            <span style={{ display: "block", marginTop: "12px", color: "var(--txt)" }}>
              {article.sections[0].paragraphs[0]}
            </span>
          )}
        </p>

        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <Link
            className="link-arrow"
            href={`/thinking/${article.slug}`}
            aria-label={`Read the article: ${article.title}`}
          >
            Read the article <span className="arr" aria-hidden="true">&#8594;</span>
          </Link>
          <button
            type="button"
            className="card-toggle-btn"
            aria-expanded={isExpanded}
            aria-controls={excerptId}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show less summary" : "Read summary preview"}
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="case-card rv" id={cardId}>
      <div className="pmeta">
        <span className="pill-cat">{article.author}</span>
        <span className="pill-cat">{article.date}</span>
      </div>
      <h3 className="h4" style={{ marginTop: "14px" }}>
        {article.title}
      </h3>
      <p id={excerptId} style={{ marginTop: "8px" }}>
        {article.excerpt}
        {isExpanded && article.sections[0] && (
          <span style={{ display: "block", marginTop: "10px", color: "var(--txt)" }}>
            {article.sections[0].paragraphs[0]}
          </span>
        )}
      </p>

      <div
        style={{
          marginTop: "auto",
          paddingTop: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <Link
          className="link-arrow"
          href={`/thinking/${article.slug}`}
          aria-label={`Read the article: ${article.title}`}
        >
          Read the article <span className="arr" aria-hidden="true">&#8594;</span>
        </Link>
        <button
          type="button"
          className="card-toggle-btn"
          aria-expanded={isExpanded}
          aria-controls={excerptId}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Preview"}
        </button>
      </div>
    </article>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { INITIAL_LINKEDIN_POSTS } from "@/data/linkedin-posts";
import type { LinkedInPost } from "@/types/linkedin";

interface LinkedInSectionProps {
  initialPosts?: LinkedInPost[];
}

export function LinkedInSection({ initialPosts = INITIAL_LINKEDIN_POSTS }: LinkedInSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(0);

  const categories = ["All", "Identity-First", "Agentic AI", "Zero Trust", "NHI Governance"];

  const filteredPosts =
    activeFilter === "All"
      ? initialPosts
      : initialPosts.filter((p) => p.badge?.toLowerCase() === activeFilter.toLowerCase());

  const postsPerPage = 3;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;
  const displayedPosts = filteredPosts.slice(
    currentPage * postsPerPage,
    (currentPage + 1) * postsPerPage
  );

  const handleFilterChange = (cat: string) => {
    setActiveFilter(cat);
    setCurrentPage(0);
  };

  return (
    <section
      aria-labelledby="linkedin-updates-heading"
      className="page-sec w-full py-16 px-4 sm:px-6 relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% -20%, #170d47 0%, #060129 70%)",
      }}
    >
      <div className="wrap max-w-6xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#25205c] pb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="pill-cat">LinkedIn Stream</span>
              <span className="text-xs text-sky-400 font-mono tracking-wider">
                Syncs 9:00 AM CST Daily
              </span>
            </div>
            <h2 id="linkedin-updates-heading" className="h2 text-white m-0">
              Perspectives & Updates from LinkedIn
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl m-0 leading-relaxed">
              Explore our latest observations on dynamic micro-segmentation, non-human identity
              governance, and enterprise AI security directly from the XSignON team.
            </p>
          </div>

          <a
            href="https://www.linkedin.com/company/xsignon/posts/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-white text-xs px-4 py-2 self-start md:self-auto inline-flex items-center gap-1.5"
          >
            Follow on LinkedIn
            <span className="chev" aria-hidden="true">&#8250;</span>
          </a>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter LinkedIn topics">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeFilter === cat}
                onClick={() => handleFilterChange(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-violet-400 ${
                  activeFilter === cat
                    ? "bg-violet-600 text-white shadow-md shadow-violet-900/40 border border-violet-400"
                    : "bg-[#160e4a] text-slate-300 border border-[#25205c] hover:border-violet-500 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                aria-label="Previous posts page"
                className="px-3 py-1.5 rounded-lg border border-[#3b347a] bg-[#160e4a] text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:border-violet-400 transition-colors"
              >
                ← Prev
              </button>
              <span>
                {currentPage + 1} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage >= totalPages - 1}
                aria-label="Next posts page"
                className="px-3 py-1.5 rounded-lg border border-[#3b347a] bg-[#160e4a] text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:border-violet-400 transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </div>

        {/* 2D Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPosts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col justify-between rounded-xl p-6 bg-gradient-to-b from-[#0f0a3a] to-[#060129] border border-[#25205c] hover:border-violet-500/70 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-950/50 group"
            >
              <div className="space-y-4">
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide bg-violet-950/70 text-violet-300 border border-violet-700/60">
                    {post.badge ?? "Security Perspective"}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-violet-600/80 border border-violet-400/60 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                    X
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-200 block leading-tight">
                      {post.authorName}
                    </span>
                    <span className="text-xs text-slate-400 block font-mono">
                      @{post.authorHandle}
                    </span>
                  </div>
                </div>

                {/* Post Text */}
                <p className="text-sm text-slate-200 leading-relaxed font-normal m-0 group-hover:text-white transition-colors">
                  {post.text}
                </p>
              </div>

              {/* Engagement & Link Footer */}
              <div className="pt-5 mt-5 border-t border-[#25205c]/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span>👍 {post.likesCount ?? 0}</span>
                  <span>💬 {post.commentsCount ?? 0}</span>
                  <span>🔁 {post.repostsCount ?? 0}</span>
                </div>

                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow text-xs text-sky-400 hover:text-sky-300 font-semibold inline-flex items-center gap-1 focus:outline-none focus:ring-1 focus:ring-sky-400 rounded"
                >
                  Read post <span className="arr" aria-hidden="true">&#8594;</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="text-center pt-2">
          <Link
            href="/thinking"
            className="link-arrow text-sm text-slate-300 hover:text-white inline-flex items-center gap-1.5"
          >
            Explore all articles & research in Our Thinking
            <span className="arr" aria-hidden="true">&#8594;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

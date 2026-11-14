export interface LinkedInPost {
  id: string;
  urn: string;
  text: string;
  authorName: string;
  authorHandle: string;
  authorAvatarUrl?: string;
  publishedAt: string;
  url: string;
  likesCount?: number;
  commentsCount?: number;
  repostsCount?: number;
  imageUrl?: string;
  badge?: string;
}

export interface LinkedInSyncResult {
  success: boolean;
  timestamp: string;
  postsCount: number;
  source: "api" | "sanity" | "fallback";
  syncedAtCST: string;
  message?: string;
}

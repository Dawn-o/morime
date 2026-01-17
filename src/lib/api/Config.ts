export const JIKAN_API =
  process.env.JIKAN_API_BASE_URL || "https://api.jikan.moe/v4";

interface CacheConfig {
  next: {
    revalidate: number;
    tags: string[];
  };
}

export const CACHE_CONFIG: Record<"SHORT" | "MEDIUM" | "LONG", CacheConfig> = {
  SHORT: {
    next: {
      revalidate: parseInt(process.env.CACHE_SHORT_TTL || "300"),
      tags: ["anime-list"],
    },
  },
  MEDIUM: {
    next: {
      revalidate: parseInt(process.env.CACHE_MEDIUM_TTL || "7200"),
      tags: ["anime-details"],
    },
  },
  LONG: {
    next: {
      revalidate: parseInt(process.env.CACHE_LONG_TTL || "86400"),
      tags: ["anime-static"],
    },
  },
};

export const DEFAULT_LIMITS: Record<string, number> = {
  ANIME_LIST: parseInt(process.env.DEFAULT_ANIME_LIMIT || "20"),
  MANGA_LIST: parseInt(process.env.DEFAULT_MANGA_LIMIT || "20"),
  UPCOMING: parseInt(process.env.DEFAULT_UPCOMING_LIMIT || "6"),
  SEARCH: parseInt(process.env.DEFAULT_SEARCH_LIMIT || "20"),
};

export const RATE_LIMIT = {
  delay: parseInt(process.env.RATE_LIMIT_DELAY || "333"),
  maxRetries: parseInt(process.env.RATE_LIMIT_MAX_RETRIES || "5"),
  retryDelay: parseInt(process.env.RATE_LIMIT_RETRY_DELAY || "2000"),
} as const;

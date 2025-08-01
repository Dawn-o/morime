export const JIKAN_API = process.env.JIKAN_API_BASE_URL || 'https://api.jikan.moe/v4';

export const CACHE_CONFIG = {
    SHORT: {
        next: {
            revalidate: parseInt(process.env.CACHE_SHORT_TTL) || 60,
            tags: ['anime-list']
        }
    },
    MEDIUM: {
        next: {
            revalidate: parseInt(process.env.CACHE_MEDIUM_TTL) || 3600,
            tags: ['anime-details']
        }
    },
    LONG: {
        next: {
            revalidate: parseInt(process.env.CACHE_LONG_TTL) || 86400,
            tags: ['anime-static']
        }
    }
};

export const DEFAULT_LIMITS = {
    ANIME_LIST: parseInt(process.env.DEFAULT_ANIME_LIMIT) || 20,
    MANGA_LIST: parseInt(process.env.DEFAULT_MANGA_LIMIT) || 20,
    UPCOMING: parseInt(process.env.DEFAULT_UPCOMING_LIMIT) || 6,
    SEARCH: parseInt(process.env.DEFAULT_SEARCH_LIMIT) || 20
};

export const RATE_LIMIT = {
  delay: 400,
  maxRetries: 5,
  retryDelay: 800,
};

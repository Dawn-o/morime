import { notFound } from "next/navigation";
import { JIKAN_API, CACHE_CONFIG, RATE_LIMIT } from "@/lib/api/config";
import { getSfwParam } from "@/lib/api/cookies";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function withRateLimit(fetchFn) {
  let attempts = 0;

  while (attempts < RATE_LIMIT.maxRetries) {
    try {
      if (attempts > 0) {
        await delay(RATE_LIMIT.retryDelay * attempts);
      } else {
        await delay(RATE_LIMIT.delay);
      }

      const result = await fetchFn();
      return result;
    } catch (error) {
      attempts++;

      if (error.status === 429 || !error.status) {
        console.warn(
          `Rate limit hit, retrying... (${attempts}/${RATE_LIMIT.maxRetries})`
        );
        if (attempts === RATE_LIMIT.maxRetries) {
          throw new Error("Too many requests. Please try again later.");
        }
        continue;
      }

      throw error;
    }
  }
}

export function buildUrl(endpoint, params = {}) {
  const url = new URL(`${JIKAN_API}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value.toString());
    }
  });
  return url.toString();
}

export async function fetchWithSfw(
  endpoint,
  params = {},
  cacheConfig = CACHE_CONFIG.SHORT
) {
  const sfw = await getSfwParam();
  const targetLimit = params.limit || 24;
  let allAnime = [];
  let page = params.page || 1;
  let attempts = 0;
  const maxAttempts = 3;
  let originalPagination = null;

  while (allAnime.length < targetLimit && attempts < maxAttempts) {
    const fetchParams = { ...params, page, limit: targetLimit };
    const url = buildUrl(endpoint, { ...fetchParams, sfw });

    const response = await withRateLimit(async () => {
      const res = await fetch(url, {
        ...cacheConfig,
        headers: {
          Accept: "application/json",
        },
        signal:
          typeof AbortController !== "undefined"
            ? new AbortController().signal
            : undefined,
      });

      if (!res.ok) {
        if (res.status === 404) {
          notFound();
        }
        const error = new Error(`API error: ${res.status} - ${res.statusText}`);
        error.status = res.status;
        throw error;
      }

      return res.json();
    });

    const newAnime = response.data || [];

    if (!originalPagination) {
      originalPagination = response.pagination;
    }

    allAnime = [...allAnime, ...newAnime];

    if (
      allAnime.length < targetLimit &&
      newAnime.length > 0 &&
      response.pagination?.has_next_page
    ) {
      page++;
      attempts++;
    } else {
      break;
    }
  }

  return {
    data: allAnime.slice(0, targetLimit),
    pagination: {
      current_page: params.page || 1,
      has_next_page: originalPagination?.has_next_page || false,
      last_visible_page: originalPagination?.last_visible_page || 1,
      items: {
        count: Math.min(allAnime.length, targetLimit),
        total: originalPagination?.items?.total || allAnime.length,
        per_page: targetLimit,
      },
    },
  };
}

export async function revalidateAnimeCache(tag = "anime-list") {
  const { revalidateTag } = await import("next/cache");
  revalidateTag(tag);
}

export async function fetchSingle(
  endpoint,
  params = {},
  cacheConfig = CACHE_CONFIG.SHORT
) {
  const sfw = await getSfwParam();
  const url = buildUrl(endpoint, { ...params, sfw });

  return withRateLimit(async () => {
    const response = await fetch(url, {
      ...cacheConfig,
      headers: {
        Accept: "application/json",
      },
      signal:
        typeof AbortController !== "undefined"
          ? new AbortController().signal
          : undefined,
    });

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      const error = new Error(
        `API error: ${response.status} - ${response.statusText}`
      );
      error.status = response.status;
      throw error;
    }

    return response.json();
  });
}

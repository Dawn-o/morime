import { notFound } from "next/navigation";
import { JIKAN_API, CACHE_CONFIG, RATE_LIMIT } from "@/lib/api/Config";
import { getSfwParam } from "@/lib/api/Cookies";

interface FetchError extends Error {
  status?: number;
}

interface PaginationData {
  current_page: number;
  has_next_page: boolean;
  last_visible_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

interface ApiResponse<T> {
  data: T;
  pagination?: PaginationData;
}

interface FetchParams {
  [key: string]: string | number | boolean | undefined | null;
}

interface CacheConfig {
  next: {
    revalidate: number;
    tags: string[];
  };
}

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function withRateLimit<T>(fetchFn: () => Promise<T>): Promise<T> {
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

      const fetchError = error as FetchError;
      // Retry on rate limit (429), network errors, or gateway timeouts (502, 503, 504)
      if (
        fetchError.status === 429 ||
        fetchError.status === 502 ||
        fetchError.status === 503 ||
        fetchError.status === 504 ||
        !fetchError.status
      ) {
        const errorType =
          fetchError.status === 429
            ? "Rate limit"
            : fetchError.status === 504
              ? "Gateway timeout"
              : fetchError.status
                ? `Server error (${fetchError.status})`
                : "Network error";
        console.warn(
          `${errorType}, retrying... (${attempts}/${RATE_LIMIT.maxRetries})`,
        );
        if (attempts === RATE_LIMIT.maxRetries) {
          throw error;
        }
        continue;
      }

      throw error;
    }
  }

  throw new Error("Max retries exceeded");
}

export function buildUrl(endpoint: string, params: FetchParams = {}): string {
  const url = new URL(`${JIKAN_API}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value.toString());
    }
  });
  return url.toString();
}

export async function fetchWithSfw<T>(
  endpoint: string,
  params: FetchParams & { page?: number; limit?: number } = {},
  cacheConfig: CacheConfig = CACHE_CONFIG.SHORT,
): Promise<ApiResponse<T[]>> {
  const sfw = await getSfwParam();
  const targetLimit = params.limit || 24;
  let allItems: T[] = [];
  let page = params.page || 1;
  let attempts = 0;
  const maxAttempts = 3;
  let originalPagination: PaginationData | null = null;

  while (allItems.length < targetLimit && attempts < maxAttempts) {
    const fetchParams = { ...params, page, limit: targetLimit };
    const url = buildUrl(endpoint, { ...fetchParams, sfw });

    const response = await withRateLimit(async () => {
      const controller =
        typeof AbortController !== "undefined" ? new AbortController() : null;
      const timeoutId = controller
        ? setTimeout(() => controller.abort(), 30000)
        : null; // 30 second timeout

      const res = await fetch(url, {
        ...cacheConfig,
        headers: {
          Accept: "application/json",
        },
        signal: controller?.signal,
      });

      if (timeoutId) clearTimeout(timeoutId);

      if (!res.ok) {
        if (res.status === 404) {
          notFound();
        }
        const error: FetchError = new Error(
          `API error: ${res.status} - ${res.statusText}`,
        );
        error.status = res.status;
        throw error;
      }

      return res.json();
    });

    const newItems = (response.data || []) as T[];

    if (!originalPagination) {
      originalPagination = response.pagination;
    }

    allItems = [...allItems, ...newItems];

    if (
      allItems.length < targetLimit &&
      newItems.length > 0 &&
      response.pagination?.has_next_page
    ) {
      page++;
      attempts++;
    } else {
      break;
    }
  }

  return {
    data: allItems.slice(0, targetLimit),
    pagination: {
      current_page: params.page || 1,
      has_next_page: originalPagination?.has_next_page || false,
      last_visible_page: originalPagination?.last_visible_page || 1,
      items: {
        count: Math.min(allItems.length, targetLimit),
        total: originalPagination?.items?.total || allItems.length,
        per_page: targetLimit,
      },
    },
  };
}

export async function fetchSingle<T>(
  endpoint: string,
  params: FetchParams = {},
  cacheConfig: CacheConfig = CACHE_CONFIG.SHORT,
): Promise<T> {
  const sfw = await getSfwParam();
  const url = buildUrl(endpoint, { ...params, sfw });

  return withRateLimit(async () => {
    const controller =
      typeof AbortController !== "undefined" ? new AbortController() : null;
    const timeoutId = controller
      ? setTimeout(() => controller.abort(), 30000)
      : null; // 30 second timeout

    const response = await fetch(url, {
      ...cacheConfig,
      headers: {
        Accept: "application/json",
      },
      signal: controller?.signal,
    });

    if (timeoutId) clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      const error: FetchError = new Error(
        `API error: ${response.status} - ${response.statusText}`,
      );
      error.status = response.status;
      throw error;
    }

    return response.json();
  });
}

import { notFound } from 'next/navigation';
import { JIKAN_API, CACHE_CONFIG } from '@/lib/anime/config';
import { getSfwParam } from '@/lib/anime/cookies';

export function buildUrl(endpoint, params = {}) {
  const url = new URL(`${JIKAN_API}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value.toString());
    }
  });
  return url.toString();
}

export async function fetchWithSfw(endpoint, params = {}, cacheConfig = CACHE_CONFIG.SHORT) {
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

    const response = await fetch(url, cacheConfig);

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error(`API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const newAnime = data.data || [];

    if (!originalPagination) {
      originalPagination = data.pagination;
    }

    allAnime = [...allAnime, ...newAnime];

    if (allAnime.length < targetLimit && newAnime.length > 0 && data.pagination?.has_next_page) {
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
        per_page: targetLimit
      }
    }
  };
}

export async function revalidateAnimeCache(tag = 'anime-list') {
  const { revalidateTag } = await import('next/cache');
  revalidateTag(tag);
}

export async function fetchSingle(endpoint, params = {}, cacheConfig = CACHE_CONFIG.SHORT) {
  const sfw = await getSfwParam();
  const url = buildUrl(endpoint, { ...params, sfw });

  const response = await fetch(url, cacheConfig);

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(`API error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
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
  const url = buildUrl(endpoint, { ...params, sfw });

  const response = await fetch(url, cacheConfig);

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(`API error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
}

export function deduplicateAnimeById(animeArray) {
  if (!Array.isArray(animeArray)) return [];

  const uniqueData = [];
  const seenIds = new Set();

  for (const item of animeArray) {
    if (item?.mal_id && !seenIds.has(item.mal_id)) {
      seenIds.add(item.mal_id);
      uniqueData.push(item);
    }
  }

  return uniqueData;
}

export async function revalidateAnimeCache(tag = 'anime-list') {
  const { revalidateTag } = await import('next/cache');
  revalidateTag(tag);
}
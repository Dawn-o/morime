import { API_BASE, CACHE_CONFIG, DEFAULT_LIMITS } from '@/lib/anime/config';
import { fetchWithSfw, deduplicateAnimeById } from '@/lib/anime/utils';

export async function getAnime(page = 1, apiConfig = {}) {
  const { type = 'anime', limit = DEFAULT_LIMITS.ANIME_LIST, filter } = apiConfig;

  try {
    let endpoint = `/${type}`;
    const params = { limit, page };
    
    if (filter) {
      params.filter = filter;
    }

    const data = await fetchWithSfw(endpoint, params, CACHE_CONFIG.SHORT);

    if (!data?.data) {
      throw new Error("Invalid API response format");
    }

    const totalItems = data.pagination?.items?.total || data.data.length;
    const totalPages = data.pagination ? Math.ceil(totalItems / limit) : 1;

    return {
      data: deduplicateAnimeById(data.data),
      totalPages,
      currentPage: page,
      totalItems
    };
  } catch (error) {
    console.error("Error fetching anime list:", error);
    return {
      data: [],
      totalPages: 0,
      currentPage: page,
      totalItems: 0,
      error: error.message
    };
  }
}

export async function getUpcomingAnime(limit = DEFAULT_LIMITS.UPCOMING) {
  try {
    const data = await fetchWithSfw('/seasons/upcoming', { limit }, CACHE_CONFIG.MEDIUM);
    return deduplicateAnimeById(data.data || []);
  } catch (error) {
    console.error('Failed to fetch upcoming anime:', error);
    return [];
  }
}

export async function getDetailAnime(malId) {
  if (!malId || isNaN(malId)) {
    throw new Error('Invalid anime ID');
  }

  try {
    const data = await fetchWithSfw(`/anime/${malId}/full`, {}, CACHE_CONFIG.MEDIUM);
    return data.data;
  } catch (error) {
    console.error(`Error fetching anime details for ID ${malId}:`, error);
    throw error;
  }
}

export async function getEpisodeAnime(malId) {
  if (!malId || isNaN(malId)) {
    return [];
  }

  try {
    const data = await fetchWithSfw(`/anime/${malId}/episodes`, {}, CACHE_CONFIG.SHORT);
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching episodes for ID ${malId}:`, error);
    return [];
  }
}

export async function getAnimeGenresList() {
  try {
    const data = await fetchWithSfw('/genres/anime', {}, CACHE_CONFIG.LONG);
    return data.data || [];
  } catch (error) {
    console.error('Error fetching anime genres list:', error);
    return [];
  }
}

export async function getAnimeByGenre(page = 1, genreId, limit = DEFAULT_LIMITS.ANIME_LIST) {
  if (!genreId) {
    throw new Error('Genre ID is required');
  }

  try {
    const data = await fetchWithSfw('/anime', {
      genres: genreId,
      page,
      limit
    }, CACHE_CONFIG.SHORT);

    if (!data?.data) {
      throw new Error("Invalid API response format");
    }

    const totalItems = data.pagination?.items?.total || 0;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: deduplicateAnimeById(data.data),
      totalPages,
      currentPage: page,
      totalItems
    };
  } catch (error) {
    console.error(`Error fetching anime for genre ${genreId}:`, error);
    return {
      data: [],
      totalPages: 0,
      currentPage: page,
      totalItems: 0,
      error: error.message
    };
  }
}

export async function getAnimeCharacters(malId) {
  if (!malId || isNaN(malId)) {
    return [];
  }

  try {
    const data = await fetchWithSfw(`/anime/${malId}/characters`, {}, CACHE_CONFIG.MEDIUM);
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching characters for anime ID ${malId}:`, error);
    return [];
  }
}

export async function searchAnime(query, page = 1, limit = DEFAULT_LIMITS.SEARCH) {
  if (!query?.trim()) {
    return { data: [], total: 0, hasNextPage: false };
  }

  try {
    const data = await fetchWithSfw('/anime', {
      q: query.trim(),
      page,
      limit
    }, CACHE_CONFIG.SHORT);

    return {
      data: deduplicateAnimeById(data.data || []),
      total: data.pagination?.items?.total || 0,
      hasNextPage: data.pagination?.has_next_page || false,
      currentPage: page
    };
  } catch (error) {
    console.error('Error searching anime:', error);
    return {
      data: [],
      total: 0,
      hasNextPage: false,
      currentPage: page,
      error: error.message
    };
  }
}
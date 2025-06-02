import { notFound } from 'next/navigation';

// API base configuration
const API_BASE = 'https://api.jikan.moe/v4';

// Revalidation times
const CACHE_SHORT = { next: { revalidate: 60 } };        // 1 minute
const CACHE_MEDIUM = { next: { revalidate: 3600 } };     // 1 hour
const CACHE_LONG = { next: { revalidate: 86400 } };      // 1 day

/**
 * Get anime list with pagination
 */
export async function getAnime(page = 1, apiConfig) {
  const { type, limit = 24 } = apiConfig;

  try {
    const response = await fetch(
      `${API_BASE}/${type}&limit=${limit}&page=${page}`,
      CACHE_SHORT
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data?.data || !data?.pagination?.items) {
      throw new Error("Invalid API response format");
    }

    const totalItems = data.pagination.items.total;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: data.data,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching anime list:", error);
    return { data: [], totalPages: 0, currentPage: page };
  }
}

/**
 * Get upcoming anime for carousel
 */
export async function getUpcomingAnime(limit = 6) {
  try {
    const response = await fetch(
      `${API_BASE}/seasons/upcoming?limit=${limit}`,
      CACHE_MEDIUM // Cache for longer since upcoming doesn't change often
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Failed to fetch carousel anime:', error);
    return [];
  }
}

/**
 * Get detailed anime information
 */
export async function getDetailAnime(malId) {
  try {
    const response = await fetch(
      `${API_BASE}/anime/${malId}/full`,
      CACHE_MEDIUM
    );

    if (!response.ok) {
      if (response.status === 404) {
        notFound(); // Uses Next.js not-found.js page
      }
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching anime details for ID ${malId}:`, error);
    throw error; // Let the component handle the error
  }
}

/**
 * Get anime episodes
 */
export async function getEpisodeAnime(malId) {
  try {
    const response = await fetch(
      `${API_BASE}/anime/${malId}/episodes`,
      CACHE_SHORT // Episodes may update frequently
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching episodes for ID ${malId}:`, error);
    return [];
  }
}

/**
 * Get anime genres list
 */
export async function getAnimeGenresList() {
  try {
    const response = await fetch(
      `${API_BASE}/genres/anime`,
      CACHE_LONG // Genres rarely change
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching anime genres list:', error);
    return [];
  }
}

/**
 * Get anime by genre
 */
export async function getAnimeGenre(page = 1, apiConfig, malId) {
  const { baseURL, limit = 24 } = apiConfig;

  try {
    const response = await fetch(
      `${baseURL}${malId}&limit=${limit}&page=${page}`,
      CACHE_SHORT
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data?.data || !data?.pagination?.items) {
      throw new Error("Invalid API response format");
    }

    const totalItems = data.pagination.items.total;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: data.data,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error(`Error fetching anime for genre ${malId}:`, error);
    return { data: [], totalPages: 0, currentPage: page };
  }
}
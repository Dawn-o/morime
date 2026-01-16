import { CACHE_CONFIG, DEFAULT_LIMITS } from "@/lib/api/Config";
import { fetchWithSfw, fetchSingle } from "@/lib/api/Utils";
import type { Manga, Character, Genre } from "@/types/anime";

interface MangaApiConfig {
  type?: string;
  limit?: number;
  genres?: string;
  filter?: string;
  order_by?: string;
  sort?: string;
  magazines?: string;
}

interface MangaResponse {
  data: Manga[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  error?: string;
}

interface TopMangaResponse extends MangaResponse {
  pagination?: any;
}

interface SearchResponse {
  data: Manga[];
  total: number;
  hasNextPage: boolean;
  currentPage: number;
  error?: string;
}

export async function getManga(
  page: number = 1,
  apiConfig: MangaApiConfig = {},
): Promise<MangaResponse> {
  const {
    type = "manga",
    limit = DEFAULT_LIMITS.MANGA_LIST,
    genres,
    filter,
    order_by,
    sort,
    magazines,
  } = apiConfig;

  try {
    const endpoint = `/${type}`;
    const params: Record<string, string | number> = { limit, page };

    if (genres) {
      params.genres = genres;
    }

    if (filter) {
      params.filter = filter;
    }

    if (order_by) {
      params.order_by = order_by;
    }

    if (sort) {
      params.sort = sort;
    }

    if (magazines) {
      params.magazines = magazines;
    }

    const data = await fetchWithSfw<Manga>(
      endpoint,
      params,
      CACHE_CONFIG.SHORT,
    );

    if (!data?.data) {
      throw new Error("Invalid API response format");
    }

    const totalItems = data.pagination?.items?.total || data.data.length;
    const totalPages = data.pagination ? Math.ceil(totalItems / limit) : 1;

    return {
      data: data.data,
      totalPages,
      currentPage: page,
      totalItems,
    };
  } catch (error: unknown) {
    console.error("Error fetching manga list:", error);
    return {
      data: [],
      totalPages: 0,
      currentPage: page,
      totalItems: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getTopManga(
  page: number = 1,
  options: MangaApiConfig & { rating?: string; sfw?: boolean } = {},
): Promise<TopMangaResponse> {
  const {
    type,
    filter,
    rating,
    sfw,
    limit = DEFAULT_LIMITS.MANGA_LIST,
  } = options;

  try {
    const params: Record<string, string | number> = { limit, page };

    if (type) {
      params.type = type;
    }
    if (filter) {
      params.filter = filter;
    }
    if (rating) {
      params.rating = rating;
    }
    if (sfw) {
      params.sfw = "";
    }

    const data = await fetchWithSfw<Manga>(
      "/top/manga",
      params,
      CACHE_CONFIG.SHORT,
    );

    if (!data?.data) {
      throw new Error("Invalid API response format");
    }

    const totalItems = data.pagination?.items?.total || data.data.length;
    const totalPages =
      data.pagination?.last_visible_page || Math.ceil(totalItems / limit);

    return {
      data: data.data,
      totalPages,
      currentPage: page,
      totalItems,
      pagination: data.pagination,
    };
  } catch (error: unknown) {
    console.error("Error fetching top manga:", error);
    return {
      data: [],
      totalPages: 0,
      currentPage: page,
      totalItems: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getDetailManga(malId: number): Promise<Manga> {
  try {
    const data = await fetchSingle<{ data: Manga }>(
      `/manga/${malId}/full`,
      {},
      CACHE_CONFIG.MEDIUM,
    );
    return data.data;
  } catch (error) {
    console.error(`Error fetching manga details for ID ${malId}:`, error);
    throw error;
  }
}

export async function getEpisodeManga(malId: number): Promise<any[]> {
  try {
    const data = await fetchSingle<{ data: any[] }>(
      `/manga/${malId}/episodes`,
      {},
      CACHE_CONFIG.SHORT,
    );
    return data.data || [];
  } catch (error: unknown) {
    console.error(`Error fetching episodes for ID ${malId}:`, error);
    return [];
  }
}

export async function getMangaGenresList(): Promise<Genre[]> {
  try {
    const data = await fetchSingle<{ data: Genre[] }>(
      "/genres/manga",
      {},
      CACHE_CONFIG.LONG,
    );
    return data.data || [];
  } catch (error: unknown) {
    console.error("Error fetching manga genres list:", error);
    return [];
  }
}

export async function getMangaCharacters(malId: number): Promise<Character[]> {
  try {
    const data = await fetchSingle<{ data: Character[] }>(
      `/manga/${malId}/characters`,
      {},
      CACHE_CONFIG.MEDIUM,
    );
    return data.data || [];
  } catch (error: unknown) {
    console.error(`Error fetching characters for manga ID ${malId}:`, error);
    return [];
  }
}

export async function searchManga(
  query: string,
  page: number = 1,
  limit: number = DEFAULT_LIMITS.SEARCH,
): Promise<SearchResponse> {
  if (!query?.trim()) {
    return { data: [], total: 0, hasNextPage: false, currentPage: page };
  }

  try {
    const data = await fetchWithSfw<Manga>(
      "/manga",
      {
        q: query.trim(),
        page,
        limit,
      },
      CACHE_CONFIG.SHORT,
    );

    return {
      data: data.data || [],
      total: data.pagination?.items?.total || 0,
      hasNextPage: data.pagination?.has_next_page || false,
      currentPage: page,
    };
  } catch (error: unknown) {
    console.error("Error searching manga:", error);
    return {
      data: [],
      total: 0,
      hasNextPage: false,
      currentPage: page,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

import { CACHE_CONFIG, DEFAULT_LIMITS } from "@/lib/api/Config";
import { fetchWithSfw, fetchSingle } from "@/lib/api/Utils";
import { getRecentSeasons } from "@/lib/navigation/SeasonUtils";
import type {
  Anime,
  ApiConfig,
  PaginatedResponse,
  Genre,
  Character,
  Episode,
} from "@/types";

interface AnimeResponse {
  data: Anime[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  error?: string;
}

interface TopAnimeResponse extends AnimeResponse {
  pagination?: any;
}

interface SearchResponse {
  data: Anime[];
  total: number;
  hasNextPage: boolean;
  currentPage: number;
  error?: string;
}

export async function getAnime(
  page: number = 1,
  apiConfig: ApiConfig = {},
): Promise<AnimeResponse> {
  const {
    type = "anime",
    limit = DEFAULT_LIMITS.ANIME_LIST,
    genres,
    filter,
    order_by,
    sort,
    producers,
    status,
  } = apiConfig;

  try {
    let endpoint = `/${type}`;
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

    if (producers) {
      params.producers = producers;
    }

    if (status) {
      params.status = status;
    }

    const data = await fetchWithSfw<Anime>(
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
    console.error("Error fetching anime list:", error);
    return {
      data: [],
      totalPages: 0,
      currentPage: page,
      totalItems: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getTopAnime(
  page: number = 1,
  options: ApiConfig = {},
): Promise<TopAnimeResponse> {
  const {
    type,
    filter,
    rating,
    sfw,
    limit = DEFAULT_LIMITS.ANIME_LIST,
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

    const data = await fetchWithSfw<Anime>(
      "/top/anime",
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
    console.error("Error fetching top anime:", error);
    return {
      data: [],
      totalPages: 0,
      currentPage: page,
      totalItems: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getDetailAnime(malId: number): Promise<Anime> {
  try {
    const data = await fetchSingle<{ data: Anime }>(
      `/anime/${malId}/full`,
      {},
      CACHE_CONFIG.MEDIUM,
    );
    return data.data;
  } catch (error) {
    console.error(`Error fetching anime details for ID ${malId}:`, error);
    throw error;
  }
}

export async function getEpisodeAnime(malId: number): Promise<Episode[]> {
  try {
    const data = await fetchSingle<{ data: Episode[] }>(
      `/anime/${malId}/episodes`,
      {},
      CACHE_CONFIG.SHORT,
    );
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching episodes for ID ${malId}:`, error);
    return [];
  }
}

export async function getAnimeGenresList(): Promise<Genre[]> {
  try {
    const data = await fetchSingle<{ data: Genre[] }>(
      "/genres/anime",
      {},
      CACHE_CONFIG.LONG,
    );
    return data.data || [];
  } catch (error) {
    console.error("Error fetching anime genres list:", error);
    return [];
  }
}

export async function getAnimeCharacters(malId: number): Promise<Character[]> {
  try {
    const data = await fetchSingle<{ data: Character[] }>(
      `/anime/${malId}/characters`,
      {},
      CACHE_CONFIG.MEDIUM,
    );
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching characters for anime ID ${malId}:`, error);
    return [];
  }
}

export async function searchAnime(
  query: string,
  page: number = 1,
  limit: number = DEFAULT_LIMITS.SEARCH,
): Promise<SearchResponse> {
  if (!query?.trim()) {
    return { data: [], total: 0, hasNextPage: false, currentPage: page };
  }

  try {
    const data = await fetchWithSfw<Anime>(
      "/anime",
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
    console.error("Error searching anime:", error);
    return {
      data: [],
      total: 0,
      hasNextPage: false,
      currentPage: page,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getRecentlyCompletedAnime(
  page: number = 1,
  apiConfig: ApiConfig = {},
): Promise<AnimeResponse & { total: number; hasNextPage: boolean }> {
  const { type, limit = DEFAULT_LIMITS.ANIME_LIST } = apiConfig;

  try {
    const recentSeasons = getRecentSeasons(3);
    const allAnime = [];

    for (const { year, season } of recentSeasons) {
      try {
        const params: Record<string, string | number | undefined> = {
          limit: 25,
          filter: type || undefined,
        };
        const seasonData = await fetchWithSfw<Anime>(
          `/seasons/${year}/${season}`,
          params,
          CACHE_CONFIG.SHORT,
        );

        if (seasonData?.data) {
          const completedAnime = seasonData.data.filter(
            (anime) => anime.status === "Finished Airing",
          );
          allAnime.push(...completedAnime);
        }
      } catch (seasonError) {
        console.warn(`Failed to fetch ${season} ${year}:`, seasonError);
      }
    }

    const uniqueAnime = allAnime.filter(
      (anime, index, self) =>
        index === self.findIndex((a) => a.mal_id === anime.mal_id),
    );

    uniqueAnime.sort((a, b) => {
      if (b.score !== a.score) {
        return (b.score || 0) - (a.score || 0);
      }
      return (b.members || 0) - (a.members || 0);
    });

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = uniqueAnime.slice(startIndex, endIndex);
    const totalPages = Math.ceil(uniqueAnime.length / limit);

    return {
      data: paginatedData,
      totalPages,
      totalItems: uniqueAnime.length,
      total: uniqueAnime.length,
      hasNextPage: page < totalPages,
      currentPage: page,
    };
  } catch (error: unknown) {
    console.error("Error fetching recently completed anime:", error);
    return {
      data: [],
      totalPages: 1,
      totalItems: 0,
      total: 0,
      hasNextPage: false,
      currentPage: page,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

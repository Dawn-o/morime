import { CACHE_CONFIG, DEFAULT_LIMITS } from "@/lib/api/config";
import { fetchWithSfw, fetchSingle } from "@/lib/api/utils";
import { getRecentSeasons } from "@/lib/navigation/season-utils";

export async function getAnime(page = 1, apiConfig = {}) {
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
    const params = { limit, page };

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

    const data = await fetchWithSfw(endpoint, params, CACHE_CONFIG.SHORT);

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
  } catch (error) {
    console.error("Error fetching anime list:", error);
    return {
      data: [],
      totalPages: 0,
      currentPage: page,
      totalItems: 0,
      error: error.message,
    };
  }
}

export async function getTopAnime(page = 1, options = {}) {
  const {
    type,
    filter,
    rating,
    sfw,
    limit = DEFAULT_LIMITS.ANIME_LIST,
  } = options;

  try {
    const params = { limit, page };

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

    const data = await fetchWithSfw("/top/anime", params, CACHE_CONFIG.SHORT);

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
  } catch (error) {
    console.error("Error fetching top anime:", error);
    return {
      data: [],
      totalPages: 0,
      currentPage: page,
      totalItems: 0,
      error: error.message,
    };
  }
}

export async function getDetailAnime(malId) {
  try {
    const data = await fetchSingle(
      `/anime/${malId}/full`,
      {},
      CACHE_CONFIG.MEDIUM
    );
    return data.data;
  } catch (error) {
    console.error(`Error fetching anime details for ID ${malId}:`, error);
    throw error;
  }
}

export async function getEpisodeAnime(malId) {
  try {
    const data = await fetchSingle(
      `/anime/${malId}/episodes`,
      {},
      CACHE_CONFIG.SHORT
    );
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching episodes for ID ${malId}:`, error);
    return [];
  }
}

export async function getAnimeGenresList() {
  try {
    const data = await fetchSingle("/genres/anime", {}, CACHE_CONFIG.LONG);
    return data.data || [];
  } catch (error) {
    console.error("Error fetching anime genres list:", error);
    return [];
  }
}

export async function getAnimeCharacters(malId) {
  try {
    const data = await fetchSingle(
      `/anime/${malId}/characters`,
      {},
      CACHE_CONFIG.MEDIUM
    );
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching characters for anime ID ${malId}:`, error);
    return [];
  }
}

export async function searchAnime(
  query,
  page = 1,
  limit = DEFAULT_LIMITS.SEARCH
) {
  if (!query?.trim()) {
    return { data: [], total: 0, hasNextPage: false };
  }

  try {
    const data = await fetchWithSfw(
      "/anime",
      {
        q: query.trim(),
        page,
        limit,
      },
      CACHE_CONFIG.SHORT
    );

    return {
      data: data.data || [],
      total: data.pagination?.items?.total || 0,
      hasNextPage: data.pagination?.has_next_page || false,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error searching anime:", error);
    return {
      data: [],
      total: 0,
      hasNextPage: false,
      currentPage: page,
      error: error.message,
    };
  }
}

export async function getRecentlyCompletedAnime(page = 1, apiConfig = {}) {
  const { type, limit = DEFAULT_LIMITS.ANIME_LIST } = apiConfig;

  try {
    const recentSeasons = getRecentSeasons(3);
    const allAnime = [];

    for (const { year, season } of recentSeasons) {
      try {
        const params = {
          limit: 25,
          filter: type || undefined,
        };
        const seasonData = await fetchWithSfw(
          `/seasons/${year}/${season}`,
          params,
          CACHE_CONFIG.SHORT
        );

        if (seasonData?.data) {
          const completedAnime = seasonData.data.filter(
            (anime) => anime.status === "Finished Airing"
          );
          allAnime.push(...completedAnime);
        }
      } catch (seasonError) {
        console.warn(`Failed to fetch ${season} ${year}:`, seasonError);
      }
    }

    const uniqueAnime = allAnime.filter(
      (anime, index, self) =>
        index === self.findIndex((a) => a.mal_id === anime.mal_id)
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
      total: uniqueAnime.length,
      hasNextPage: page < totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching recently completed anime:", error);
    return {
      data: [],
      totalPages: 1,
      total: 0,
      hasNextPage: false,
      currentPage: page,
      error: error.message,
    };
  }
}

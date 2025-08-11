import { CACHE_CONFIG, DEFAULT_LIMITS } from "@/lib/api/config";
import { fetchWithSfw, fetchSingle } from "@/lib/api/utils";

export async function getManga(page = 1, apiConfig = {}) {
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

    if (magazines) {
      params.magazines = magazines;
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
    console.error("Error fetching manga list:", error);
    return {
      data: [],
      totalPages: 0,
      currentPage: page,
      totalItems: 0,
      error: error.message,
    };
  }
}

export async function getTopManga(page = 1, options = {}) {
  const {
    type,
    filter,
    rating,
    sfw,
    limit = DEFAULT_LIMITS.MANGA_LIST,
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

    const data = await fetchWithSfw("/top/manga", params, CACHE_CONFIG.SHORT);

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
    console.error("Error fetching top manga:", error);
    return {
      data: [],
      totalPages: 0,
      currentPage: page,
      totalItems: 0,
      error: error.message,
    };
  }
}

export async function getDetailManga(malId) {
  try {
    const data = await fetchSingle(
      `/manga/${malId}/full`,
      {},
      CACHE_CONFIG.MEDIUM
    );
    return data.data;
  } catch (error) {
    console.error(`Error fetching manga details for ID ${malId}:`, error);
    throw error;
  }
}

export async function getEpisodeManga(malId) {
  try {
    const data = await fetchSingle(
      `/manga/${malId}/episodes`,
      {},
      CACHE_CONFIG.SHORT
    );
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching episodes for ID ${malId}:`, error);
    return [];
  }
}

export async function getMangaGenresList() {
  try {
    const data = await fetchSingle("/genres/manga", {}, CACHE_CONFIG.LONG);
    return data.data || [];
  } catch (error) {
    console.error("Error fetching manga genres list:", error);
    return [];
  }
}

export async function getMangaCharacters(malId) {
  try {
    const data = await fetchSingle(
      `/manga/${malId}/characters`,
      {},
      CACHE_CONFIG.MEDIUM
    );
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching characters for manga ID ${malId}:`, error);
    return [];
  }
}

export async function searchManga(
  query,
  page = 1,
  limit = DEFAULT_LIMITS.SEARCH
) {
  if (!query?.trim()) {
    return { data: [], total: 0, hasNextPage: false };
  }

  try {
    const data = await fetchWithSfw(
      "/manga",
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
    console.error("Error searching manga:", error);
    return {
      data: [],
      total: 0,
      hasNextPage: false,
      currentPage: page,
      error: error.message,
    };
  }
}

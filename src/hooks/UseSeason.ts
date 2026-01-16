import { CACHE_CONFIG, DEFAULT_LIMITS } from "@/lib/api/Config";
import { fetchWithSfw, fetchSingle } from "@/lib/api/Utils";
import type { Anime } from "@/types/anime";

interface SeasonApiConfig {
  type?: string;
  limit?: number;
  filter?: string;
  unapproved?: boolean;
  continuing?: boolean;
}

interface SeasonResponse {
  data: Anime[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  pagination?: any;
  error?: string;
}

interface SeasonListItem {
  year: number;
  seasons: string[];
}

export async function getSeason(
  page: number = 1,
  apiConfig: SeasonApiConfig = {},
): Promise<SeasonResponse> {
  const {
    type = "seasons/now",
    limit = DEFAULT_LIMITS.ANIME_LIST,
    filter,
    unapproved,
    continuing,
  } = apiConfig;

  try {
    const endpoint = `/${type}`;
    const params: Record<string, string | number> = { limit, page };

    if (filter) {
      params.filter = filter;
    }
    if (unapproved) {
      params.unapproved = "";
    }
    if (continuing) {
      params.continuing = "";
    }

    const data = await fetchWithSfw<Anime>(
      endpoint,
      params,
      CACHE_CONFIG.MEDIUM,
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
    console.error("Error fetching season data:", error);
    return {
      data: [],
      totalPages: 0,
      currentPage: page,
      totalItems: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getSeasonList(): Promise<SeasonListItem[]> {
  try {
    const data = await fetchSingle<{ data: SeasonListItem[] }>(
      "/seasons",
      {},
      CACHE_CONFIG.MEDIUM,
    );
    return data.data || [];
  } catch (error: unknown) {
    console.error("Error fetching season list:", error);
    return [];
  }
}

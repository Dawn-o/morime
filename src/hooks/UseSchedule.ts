import { CACHE_CONFIG, DEFAULT_LIMITS } from "@/lib/api/Config";
import { fetchWithSfw } from "@/lib/api/Utils";
import type { Anime } from "@/types/anime";

interface ScheduleApiConfig {
  filter?: string;
  kids?: string;
  sfw?: string;
  unapproved?: boolean;
  limit?: number;
}

interface ScheduleResponse {
  data: Anime[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  error?: string;
}

export async function getSchedules(
  page: number = 1,
  apiConfig: ScheduleApiConfig = {},
): Promise<ScheduleResponse> {
  const {
    filter = "monday",
    kids = "false",
    sfw = "false",
    unapproved,
    limit = DEFAULT_LIMITS.ANIME_LIST,
  } = apiConfig;

  try {
    const endpoint = "/schedules";
    const params: Record<string, string | number> = { limit, page };

    params.filter = filter;

    if (kids !== "false") {
      params.kids = kids;
    }

    if (sfw !== "false") {
      params.sfw = sfw;
    }

    if (unapproved) {
      params.unapproved = "";
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
    const totalPages = data.pagination ? Math.ceil(totalItems / limit) : 1;

    return {
      data: data.data,
      totalPages,
      currentPage: page,
      totalItems,
    };
  } catch (error: unknown) {
    console.error("Error fetching schedule data:", error);
    return {
      data: [],
      totalPages: 0,
      currentPage: page,
      totalItems: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

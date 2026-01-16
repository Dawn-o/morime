import { CACHE_CONFIG, DEFAULT_LIMITS } from "@/lib/api/Config";
import { fetchWithSfw } from "@/lib/api/Utils";
import type { Anime, Manga } from "@/types/anime";

interface SearchConfig {
  q?: string;
  type?: string;
  score?: number;
  min_score?: number;
  max_score?: number;
  status?: string;
  rating?: string;
  sfw?: boolean;
  genres?: string;
  genres_exclude?: string;
  order_by?: string;
  sort?: string;
  letter?: string;
  producers?: string;
  magazines?: string;
  start_date?: string;
  end_date?: string;
  unapproved?: boolean;
  limit?: number;
}

interface SearchResponse<T> {
  data: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  hasNextPage: boolean;
  error?: string;
}

export async function getAnimeSearch(
  page: number = 1,
  searchConfig: SearchConfig = {},
): Promise<SearchResponse<Anime>> {
  const {
    q,
    type,
    score,
    min_score,
    max_score,
    status,
    rating,
    sfw = true,
    genres,
    genres_exclude,
    order_by,
    sort,
    letter,
    producers,
    start_date,
    end_date,
    unapproved,
    limit = DEFAULT_LIMITS.ANIME_LIST,
  } = searchConfig;

  try {
    const endpoint = "/anime";
    const params: Record<string, string | number | boolean> = {
      page,
      limit,
    };

    if (order_by) params.order_by = order_by;
    if (sort) params.sort = sort;
    if (q) params.q = q;
    if (type) params.type = type;
    if (score !== undefined) params.score = score;
    if (min_score !== undefined) params.min_score = min_score;
    if (max_score !== undefined) params.max_score = max_score;
    if (status) params.status = status;
    if (rating) params.rating = rating;
    if (sfw !== undefined) params.sfw = sfw;
    if (genres) params.genres = genres;
    if (genres_exclude) params.genres_exclude = genres_exclude;
    if (letter) params.letter = letter;
    if (producers) params.producers = producers;
    if (start_date) params.start_date = start_date;
    if (end_date) params.end_date = end_date;
    if (unapproved) params.unapproved = "";

    const data = await fetchWithSfw<Anime>(
      endpoint,
      params,
      CACHE_CONFIG.SHORT,
    );

    if (!data?.data) {
      throw new Error("Invalid search response format");
    }

    const totalItems = data.pagination?.items?.total || data.data.length;
    const totalPages = data.pagination ? Math.ceil(totalItems / limit) : 1;

    return {
      data: data.data,
      totalPages,
      currentPage: page,
      totalItems,
      hasNextPage: data.pagination?.has_next_page || false,
    };
  } catch (error: unknown) {
    console.error("Error searching anime:", error);
    return {
      data: [],
      totalPages: 0,
      currentPage: page,
      totalItems: 0,
      hasNextPage: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getMangaSearch(
  page: number = 1,
  searchConfig: SearchConfig = {},
): Promise<SearchResponse<Manga>> {
  const {
    q,
    type,
    score,
    min_score,
    max_score,
    status,
    rating,
    sfw = true,
    genres,
    genres_exclude,
    order_by,
    sort,
    letter,
    magazines,
    start_date,
    end_date,
    unapproved,
    limit = DEFAULT_LIMITS.MANGA_LIST,
  } = searchConfig;

  try {
    const endpoint = "/manga";
    const params: Record<string, string | number | boolean> = {
      page,
      limit,
    };

    if (order_by) params.order_by = order_by;
    if (sort) params.sort = sort;
    if (q) params.q = q;
    if (type) params.type = type;
    if (score !== undefined) params.score = score;
    if (min_score !== undefined) params.min_score = min_score;
    if (max_score !== undefined) params.max_score = max_score;
    if (status) params.status = status;
    if (rating) params.rating = rating;
    if (sfw !== undefined) params.sfw = sfw;
    if (genres) params.genres = genres;
    if (genres_exclude) params.genres_exclude = genres_exclude;
    if (letter) params.letter = letter;
    if (magazines) params.magazines = magazines;
    if (start_date) params.start_date = start_date;
    if (end_date) params.end_date = end_date;
    if (unapproved) params.unapproved = "";

    const data = await fetchWithSfw<Manga>(
      endpoint,
      params,
      CACHE_CONFIG.SHORT,
    );

    if (!data?.data) {
      throw new Error("Invalid search response format");
    }

    const totalItems = data.pagination?.items?.total || data.data.length;
    const totalPages = data.pagination ? Math.ceil(totalItems / limit) : 1;

    return {
      data: data.data,
      totalPages,
      currentPage: page,
      totalItems,
      hasNextPage: data.pagination?.has_next_page || false,
    };
  } catch (error: unknown) {
    console.error("Error searching manga:", error);
    return {
      data: [],
      totalPages: 0,
      currentPage: page,
      totalItems: 0,
      hasNextPage: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

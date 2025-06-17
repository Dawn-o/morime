import { CACHE_CONFIG, DEFAULT_LIMITS } from '@/lib/api/config';
import { fetchWithSfw, fetchSingle } from '@/lib/api/utils';

export async function getSeason(page = 1, apiConfig = {}) {
    const { type = 'seasons/now', limit = DEFAULT_LIMITS.ANIME_LIST, filter, unapproved, continuing } = apiConfig;

    try {
        let endpoint = `/${type}`;
        const params = { limit, page };

        if (filter) {
            params.filter = filter;
        }
        if (unapproved) {
            params.unapproved = '';
        }
        if (continuing) {
            params.continuing = '';
        }

        const data = await fetchWithSfw(endpoint, params, CACHE_CONFIG.MEDIUM);

        if (!data?.data) {
            throw new Error("Invalid API response format");
        }

        const totalItems = data.pagination?.items?.total || data.data.length;
        const totalPages = data.pagination?.last_visible_page || Math.ceil(totalItems / limit);

        return {
            data: data.data,
            totalPages,
            currentPage: page,
            totalItems,
            pagination: data.pagination
        };
    } catch (error) {
        console.error("Error fetching season data:", error);
        return {
            data: [],
            totalPages: 0,
            currentPage: page,
            totalItems: 0,
            error: error.message
        };
    }
}

export async function getSeasonList() {
  try {
    const data = await fetchSingle('/seasons', {}, CACHE_CONFIG.MEDIUM);
    return data.data || [];
  } catch (error) {
    console.error('Error fetching anime genres list:', error);
    return [];
  }
}
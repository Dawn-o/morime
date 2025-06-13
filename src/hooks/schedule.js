import { CACHE_CONFIG, DEFAULT_LIMITS } from '@/lib/anime/config';
import { fetchWithSfw, deduplicateAnimeById } from '@/lib/anime/utils';

export async function getSchedules(page = 1, apiConfig = {}) {
    const { 
        filter = 'monday', 
        kids = 'false', 
        sfw = 'false', 
        unapproved, 
        limit = DEFAULT_LIMITS.ANIME_LIST 
    } = apiConfig;

    try {
        let endpoint = '/schedules';
        const params = { limit, page };

        params.filter = filter;

        if (kids !== 'false') {
            params.kids = kids;
        }

        if (sfw !== 'false') {
            params.sfw = sfw;
        }

        if (unapproved) {
            params.unapproved = '';
        }

        const data = await fetchWithSfw(endpoint, params, CACHE_CONFIG.MEDIUM);

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
        console.error("Error fetching schedule data:", error);
        return {
            data: [],
            totalPages: 0,
            currentPage: page,
            totalItems: 0,
            error: error.message
        };
    }
}
import { CACHE_CONFIG, DEFAULT_LIMITS } from '@/lib/api/config';
import { fetchWithSfw } from '@/lib/api/utils';

export async function getAnimeSearch(page = 1, searchConfig = {}) {
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
        limit = DEFAULT_LIMITS.ANIME_LIST
    } = searchConfig;

    try {
        const endpoint = '/anime';
        const params = {
            page,
            limit,
            order_by,
            sort
        };

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
        if (unapproved) params.unapproved = '';

        const data = await fetchWithSfw(endpoint, params, CACHE_CONFIG.SHORT);

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
            hasNextPage: data.pagination?.has_next_page || false
        };
    } catch (error) {
        console.error("Error searching anime:", error);
        return {
            data: [],
            totalPages: 0,
            currentPage: page,
            totalItems: 0,
            hasNextPage: false,
            error: error.message
        };
    }
}

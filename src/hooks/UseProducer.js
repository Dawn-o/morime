import { CACHE_CONFIG, DEFAULT_LIMITS } from '@/lib/api/Config';
import { fetchWithSfw, fetchSingle } from '@/lib/api/Utils';

export async function getProducers(page = 1, options = {}) {
    const {
        limit = DEFAULT_LIMITS.ANIME_LIST,
        q,
        order_by,
        sort,
        letter
    } = options;

    try {
        const params = { page, limit };

        if (q) {
            params.q = q;
        }
        if (order_by) {
            params.order_by = order_by;
        }
        if (sort) {
            params.sort = sort;
        }
        if (letter) {
            params.letter = letter;
        }

        const data = await fetchWithSfw('/producers', params, CACHE_CONFIG.MEDIUM);

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
        console.error("Error fetching producers:", error);
        return {
            data: [],
            totalPages: 0,
            currentPage: page,
            totalItems: 0,
            error: error.message
        };
    }
}

export async function getProducerById(id) {
    try {
        if (!id) {
            throw new Error("Producer ID is required");
        }

        const data = await fetchSingle(`/producers/${id}`, {}, CACHE_CONFIG.MEDIUM);
        return data.data;
    } catch (error) {
        console.error(`Error fetching producer details for ID ${id}:`, error);
        throw error;
    }
}

export async function searchProducers(query, page = 1, options = {}) {
    if (!query?.trim()) {
        return { data: [], total: 0, hasNextPage: false };
    }

    const {
        limit = DEFAULT_LIMITS.SEARCH,
        order_by = 'favorites',
        sort = 'desc'
    } = options;

    try {
        const data = await getProducers(page, {
            q: query.trim(),
            limit,
            order_by,
            sort
        });

        return {
            data: data.data || [],
            total: data.totalItems || 0,
            hasNextPage: data.pagination?.has_next_page || false,
            currentPage: page
        };
    } catch (error) {
        console.error('Error searching producers:', error);
        return {
            data: [],
            total: 0,
            hasNextPage: false,
            currentPage: page,
            error: error.message
        };
    }
}
export const getPageUrl = (basePath, page, queryParams = {}) => {
    const url = new URL(basePath, 'http://localhost');

    if (page > 1) {
        url.searchParams.set('page', page.toString());
    }

    Object.entries(queryParams).forEach(([key, value]) => {
        if (value) {
            url.searchParams.set(key, value);
        }
    });

    return url.pathname + url.search;
};

export function getVisiblePages(currentPage, totalPages, maxVisible = 5) {
    if (totalPages <= maxVisible) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const halfVisible = Math.floor(maxVisible / 2);

    if (currentPage <= halfVisible + 1) {
        for (let i = 1; i <= maxVisible - 1; i++) {
            pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
    } else if (currentPage >= totalPages - halfVisible) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - maxVisible + 2; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - halfVisible + 1; i <= currentPage + halfVisible - 1; i++) {
            pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
    }

    return pages;
}

export const getAnimeTopPageUrl = (type, page) => {
    const baseUrl = type === 'all' ? '/anime/top' : `/anime/top/${type}`;
    return page === 1 ? baseUrl : `${baseUrl}?page=${page}`;
};
export const getAnimeTitle = (type) => {
    switch (type) {
        case 'airing': return 'Top Airing Anime';
        case 'upcoming': return 'Top Upcoming Anime';
        case 'tv': return 'Top TV Series Anime';
        case 'movie': return 'Top Anime Movies';
        case 'ova': return 'Top OVA Anime';
        case 'ona': return 'Top ONA Anime';
        case 'special': return 'Top Special Anime';
        case 'bypopularity': return 'Most Popular Anime';
        case 'favorite': return 'Most Favorited Anime';
        default: return 'All Top Anime';
    }
};
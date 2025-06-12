import {
    getAnimeById,
    getAnimeCharacters,
    getAnimeEpisodes,
    getAnimeVideos,
    getAnimeThemes,
    getAnimeRelations,
    searchAnime,
    getTopAnime,
    getSeasonsList,
    getSeasonalAnime,
    getCurrentSeasonAnime,
    getUpcomingAnime,
    getRandomAnime,
    getSchedules,
    getAnimeGenres,
    getAnimeByGenre
} from '@/lib/anime/utils';

export async function getDetailAnime(malId) {
    return getAnimeById(malId);
}

export async function getDetailAnimeCharacters(malId) {
    return getAnimeCharacters(malId);
}

export async function getDetailAnimeEpisodes(malId, page = 1) {
    return getAnimeEpisodes(malId, page);
}

export async function getDetailAnimeVideos(malId) {
    return getAnimeVideos(malId);
}

export async function getDetailAnimeThemes(malId) {
    return getAnimeThemes(malId);
}

export async function getDetailAnimeRelations(malId) {
    return getAnimeRelations(malId);
}

export async function searchAnimeList(query, page = 1, limit = 24) {
    return searchAnime(query, { page, limit });
}

export async function getTopAnimeList(page = 1, limit = 24, type, filter) {
    return getTopAnime(page, limit, type, filter);
}

export async function getSeasons() {
    return getSeasonsList();
}

export async function getSeasonal(year, season, page = 1, limit = 24, filter) {
    return getSeasonalAnime(year, season, page, limit, filter);
}

export async function getCurrentSeason(page = 1, limit = 24) {
    return getCurrentSeasonAnime(page, limit);
}

export async function getUpcoming(page = 1, limit = 24, filter) {
    return getUpcomingAnime(page, limit, filter);
}

export async function getRandomAnimeData() {
    return getRandomAnime();
}

export async function getAnimeSchedule(day = null) {
    return getSchedules(day);
}

export async function getAllGenres() {
    return getAnimeGenres();
}

export async function getAnimeListByGenre(genreId, page = 1, limit = 24) {
    return getAnimeByGenre(genreId, page, limit);
}
import { JIKAN_API, CACHE_CONFIG } from '@/lib/anime/config';
import { buildUrl } from '@/lib/anime/utils';
import { jikanRatelimit } from '@/lib/anime/rate-limiter';

class JikanClient {
    constructor() {
        this.baseUrl = JIKAN_API;
        this.defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        this.retryAttempts = 3;
        this.retryDelay = 1000;
    }

    async request(endpoint, params = {}, cacheConfig = CACHE_CONFIG.MEDIUM) {
        const identifier = "jikan-api";

        try {
            const { success, reset } = await jikanRatelimit.limit(identifier);

            if (!success) {
                const waitTime = Math.min(new Date(reset).getTime() - Date.now(), 5000);
                if (waitTime > 0) {
                    await new Promise(resolve => setTimeout(resolve, waitTime));
                }
                return this.request(endpoint, params, cacheConfig);
            }
        } catch (error) {
            return { disabled: true, error: error.message };
        }

        const url = buildUrl(endpoint, params);
        let lastError;

        for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
            const response = await fetch(url, {
                ...this.defaultOptions,
                ...cacheConfig,
            });

            if (response.status === 429) {
                const retryAfter = response.headers.get('Retry-After');
                const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : this.retryDelay * attempt;
                await new Promise(resolve => setTimeout(resolve, waitTime));
                continue;
            }

            if (response.ok) {
                return await response.json();
            }

            lastError = new Error(`Jikan API error: ${response.status} - ${response.statusText}`);

            if (attempt < this.retryAttempts) {
                const waitTime = this.retryDelay * Math.pow(2, attempt - 1);
                await new Promise(resolve => setTimeout(resolve, waitTime));
            }
        }

        throw lastError;
    }

    async getRateLimitStatus() {
        try {
            const { success, limit, reset, remaining } = await jikanRatelimit.limit('status-check');
            return {
                success,
                limit,
                remaining,
                reset: new Date(reset),
                canMakeRequest: success
            };
        } catch (error) {
            return { disabled: true, error: error.message };
        }
    }

    async getAnime(id) {
        return this.request(`/anime/${id}`);
    }

    async getAnimeCharacters(id) {
        return this.request(`/anime/${id}/characters`);
    }

    async getAnimeStaff(id) {
        return this.request(`/anime/${id}/staff`);
    }

    async getAnimeEpisodes(id, page = 1) {
        return this.request(`/anime/${id}/episodes`, { page });
    }

    async getAnimeNews(id, page = 1) {
        return this.request(`/anime/${id}/news`, { page });
    }

    async getAnimePictures(id) {
        return this.request(`/anime/${id}/pictures`);
    }

    async getAnimeVideos(id) {
        return this.request(`/anime/${id}/videos`);
    }

    async getAnimeStatistics(id) {
        return this.request(`/anime/${id}/statistics`);
    }

    async getAnimeMoreInfo(id) {
        return this.request(`/anime/${id}/moreinfo`);
    }

    async getAnimeRecommendations(id) {
        return this.request(`/anime/${id}/recommendations`);
    }

    async getAnimeUserUpdates(id, page = 1) {
        return this.request(`/anime/${id}/userupdates`, { page });
    }

    async getAnimeReviews(id, page = 1) {
        return this.request(`/anime/${id}/reviews`, { page });
    }

    async getAnimeRelations(id) {
        return this.request(`/anime/${id}/relations`);
    }

    async getAnimeThemes(id) {
        return this.request(`/anime/${id}/themes`);
    }

    async getAnimeExternal(id) {
        return this.request(`/anime/${id}/external`);
    }

    async getAnimeStreaming(id) {
        return this.request(`/anime/${id}/streaming`);
    }

    async searchAnime(params = {}) {
        return this.request('/anime', params);
    }

    async getTopAnime(params = {}) {
        return this.request('/top/anime', params);
    }

    async getSeasonsList() {
        return this.request('/seasons');
    }

    async getSeasonAnime(year, season, params = {}) {
        return this.request(`/seasons/${year}/${season}`, params);
    }

    async getCurrentSeason(params = {}) {
        return this.request('/seasons/now', params);
    }

    async getUpcomingSeason(params = {}) {
        return this.request('/seasons/upcoming', params);
    }

    async getSchedules(day = null, params = {}) {
        const endpoint = day ? `/schedules/${day}` : '/schedules';
        return this.request(endpoint, params);
    }

    async getAnimeGenres() {
        return this.request('/genres/anime');
    }

    async getProducers(params = {}) {
        return this.request('/producers', params);
    }

    async getProducer(id, params = {}) {
        return this.request(`/producers/${id}`, params);
    }

    async getMagazines(params = {}) {
        return this.request('/magazines', params);
    }

    async getMagazine(id, params = {}) {
        return this.request(`/magazines/${id}`, params);
    }

    async getClubs(params = {}) {
        return this.request('/clubs', params);
    }

    async getClub(id) {
        return this.request(`/clubs/${id}`);
    }

    async getClubMembers(id, page = 1) {
        return this.request(`/clubs/${id}/members`, { page });
    }

    async getRandomAnime() {
        return this.request('/random/anime');
    }

    async getRandomManga() {
        return this.request('/random/manga');
    }

    async getRandomCharacters() {
        return this.request('/random/characters');
    }

    async getRandomPeople() {
        return this.request('/random/people');
    }

    async getRandomUsers() {
        return this.request('/random/users');
    }

    async getCharacter(id) {
        return this.request(`/characters/${id}`);
    }

    async getCharacterAnime(id) {
        return this.request(`/characters/${id}/anime`);
    }

    async getCharacterManga(id) {
        return this.request(`/characters/${id}/manga`);
    }

    async getCharacterVoiceActors(id) {
        return this.request(`/characters/${id}/voices`);
    }

    async getCharacterPictures(id) {
        return this.request(`/characters/${id}/pictures`);
    }

    async searchCharacters(params = {}) {
        return this.request('/characters', params);
    }

    async getTopCharacters(params = {}) {
        return this.request('/top/characters', params);
    }

    async getPerson(id) {
        return this.request(`/people/${id}`);
    }

    async getPersonAnime(id) {
        return this.request(`/people/${id}/anime`);
    }

    async getPersonVoices(id) {
        return this.request(`/people/${id}/voices`);
    }

    async getPersonManga(id) {
        return this.request(`/people/${id}/manga`);
    }

    async getPersonPictures(id) {
        return this.request(`/people/${id}/pictures`);
    }

    async searchPeople(params = {}) {
        return this.request('/people', params);
    }

    async getTopPeople(params = {}) {
        return this.request('/top/people', params);
    }

    async getManga(id) {
        return this.request(`/manga/${id}`);
    }

    async getMangaCharacters(id) {
        return this.request(`/manga/${id}/characters`);
    }

    async getMangaNews(id, page = 1) {
        return this.request(`/manga/${id}/news`, { page });
    }

    async getMangaPictures(id) {
        return this.request(`/manga/${id}/pictures`);
    }

    async getMangaStatistics(id) {
        return this.request(`/manga/${id}/statistics`);
    }

    async getMangaMoreInfo(id) {
        return this.request(`/manga/${id}/moreinfo`);
    }

    async getMangaRecommendations(id) {
        return this.request(`/manga/${id}/recommendations`);
    }

    async getMangaUserUpdates(id, page = 1) {
        return this.request(`/manga/${id}/userupdates`, { page });
    }

    async getMangaReviews(id, page = 1) {
        return this.request(`/manga/${id}/reviews`, { page });
    }

    async getMangaRelations(id) {
        return this.request(`/manga/${id}/relations`);
    }

    async getMangaExternal(id) {
        return this.request(`/manga/${id}/external`);
    }

    async searchManga(params = {}) {
        return this.request('/manga', params);
    }

    async getTopManga(params = {}) {
        return this.request('/top/manga', params);
    }

    async getRecentAnimeReviews(params = {}) {
        return this.request('/reviews/anime', params);
    }

    async getRecentMangaReviews(params = {}) {
        return this.request('/reviews/manga', params);
    }

    async getRecentAnimeRecommendations(params = {}) {
        return this.request('/recommendations/anime', params);
    }

    async getRecentMangaRecommendations(params = {}) {
        return this.request('/recommendations/manga', params);
    }

    async getUser(username) {
        return this.request(`/users/${username}`);
    }

    async getUserStatistics(username) {
        return this.request(`/users/${username}/statistics`);
    }

    async getUserFavorites(username) {
        return this.request(`/users/${username}/favorites`);
    }

    async getUserUpdates(username) {
        return this.request(`/users/${username}/userupdates`);
    }

    async getUserAbout(username) {
        return this.request(`/users/${username}/about`);
    }

    async getUserHistory(username, params = {}) {
        return this.request(`/users/${username}/history`, params);
    }

    async getUserFriends(username, page = 1) {
        return this.request(`/users/${username}/friends`, { page });
    }

    async getUserAnimelist(username, params = {}) {
        return this.request(`/users/${username}/animelist`, params);
    }

    async getUserMangalist(username, params = {}) {
        return this.request(`/users/${username}/mangalist`, params);
    }

    async getUserReviews(username, page = 1) {
        return this.request(`/users/${username}/reviews`, { page });
    }

    async getUserRecommendations(username, page = 1) {
        return this.request(`/users/${username}/recommendations`, { page });
    }

    async getUserClubs(username, page = 1) {
        return this.request(`/users/${username}/clubs`, { page });
    }

    async getUserExternal(username) {
        return this.request(`/users/${username}/external`);
    }

    async searchUsers(params = {}) {
        return this.request('/users', params);
    }

    async getUsersSearch(params = {}) {
        return this.request('/users', params);
    }
}

export const jikan = new JikanClient();
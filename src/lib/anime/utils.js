import { JIKAN_API } from '@/lib/anime/config';
import { getSfwParam } from '@/lib/anime/cookies';
import { jikan } from '@/lib/anime/client';

export function buildUrl(endpoint, params = {}) {
  const url = new URL(`${JIKAN_API}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value.toString());
    }
  });
  return url.toString();
}

export async function addSfwParam(params = {}) {
  const sfw = await getSfwParam();
  return { ...params, sfw };
}

export async function handleRequest(requestFn, errorContext) {
  try {
    return await requestFn();
  } catch (error) {
    console.error(`Error ${errorContext}:`, error);
    throw error;
  }
}

export async function getAnimeById(id) {
  return handleRequest(async () => {
    const response = await jikan.getAnime(id);
    return response.data;
  }, 'fetching anime');
}

export async function getAnimeCharacters(id) {
  return handleRequest(async () => {
    const response = await jikan.getAnimeCharacters(id);
    return response.data;
  }, 'fetching anime characters');
}

export async function getAnimeEpisodes(id, page = 1) {
  return handleRequest(async () => {
    const response = await jikan.getAnimeEpisodes(id, page);
    return {
      episodes: response.data,
      pagination: response.pagination
    };
  }, 'fetching anime episodes');
}

export async function getAnimeVideos(id) {
  return handleRequest(async () => {
    const response = await jikan.getAnimeVideos(id);
    return response.data;
  }, 'fetching anime videos');
}

export async function getAnimeThemes(id) {
  return handleRequest(async () => {
    const response = await jikan.getAnimeThemes(id);
    return response.data;
  }, 'fetching anime themes');
}

export async function getAnimeRelations(id) {
  return handleRequest(async () => {
    const response = await jikan.getAnimeRelations(id);
    return response.data;
  }, 'fetching anime relations');
}

export async function searchAnime(query, params = {}) {
  return handleRequest(async () => {
    const searchParams = await addSfwParam({
      q: query,
      ...params
    });
    const response = await jikan.searchAnime(searchParams);
    return {
      anime: response.data,
      pagination: response.pagination
    };
  }, 'searching anime');
}

export async function getTopAnime(page = 1, limit = 25, type, filter) {
  return handleRequest(async () => {
    const params = await addSfwParam({
      page,
      limit,
      type,
      filter
    });
    const response = await jikan.getTopAnime(params);
    return {
      anime: response.data,
      pagination: response.pagination
    };
  }, 'fetching top anime');
}

export async function getSeasonsList() {
  return handleRequest(async () => {
    const response = await jikan.getSeasonsList();
    return response.data;
  }, 'fetching seasons list');
}

export async function getSeasonalAnime(year, season, page = 1, limit = 25, filter) {
  return handleRequest(async () => {
    const params = await addSfwParam({ page, limit, filter });  
    const response = await jikan.getSeasonAnime(year, season, params);
    return {
      anime: response.data,
      pagination: response.pagination
    };
  }, 'fetching seasonal anime');
}

export async function getCurrentSeasonAnime(page = 1, limit = 25) {
  return handleRequest(async () => {
    const params = await addSfwParam({ page, limit });
    const response = await jikan.getCurrentSeason(params);
    return {
      anime: response.data,
      pagination: response.pagination
    };
  }, 'fetching current season anime');
}

export async function getUpcomingAnime(page = 1, limit = 25, filter) {
  return handleRequest(async () => {
    const params = await addSfwParam({ page, limit, filter });
    const response = await jikan.getUpcomingSeason(params);
    return {
      anime: response.data,
      pagination: response.pagination
    };
  }, 'fetching upcoming anime');
}

export async function getAnimeGenres() {
  return handleRequest(async () => {
    const response = await jikan.getAnimeGenres();
    return response.data;
  }, 'fetching anime genres');
}

export async function getAnimeByGenre(genreId, page = 1, limit = 25) {
  return handleRequest(async () => {
    const params = await addSfwParam({
      genres: genreId,
      page,
      limit
    });
    const response = await jikan.searchAnime(params);
    return {
      anime: response.data,
      pagination: response.pagination
    };
  }, 'fetching anime by genre');
}

export async function getRandomAnime() {
  return handleRequest(async () => {
    const response = await jikan.getRandomAnime();
    return response.data;
  }, 'fetching random anime');
}

export async function getSchedules(day = null) {
  return handleRequest(async () => {
    const response = await jikan.getSchedules(day);
    return {
      anime: response.data,
      pagination: response.pagination
    };
  }, 'fetching schedules');
}

// Character utility functions
// Character utility functions
// Character utility functions

export async function getCharacterById(id) {
  return handleRequest(async () => {
    const response = await jikan.getCharacter(id);
    return response.data;
  }, 'fetching character');
}

export async function searchCharacters(query, params = {}) {
  return handleRequest(async () => {
    const searchParams = {
      q: query,
      ...params
    };
    const response = await jikan.searchCharacters(searchParams);
    return {
      characters: response.data,
      pagination: response.pagination
    };
  }, 'searching characters');
}

// People utility functions
// People utility functions
// People utility functions

export async function getPersonById(id) {
  return handleRequest(async () => {
    const response = await jikan.getPerson(id);
    return response.data;
  }, 'fetching person');
}

export async function searchPeople(query, params = {}) {
  return handleRequest(async () => {
    const searchParams = {
      q: query,
      ...params
    };
    const response = await jikan.searchPeople(searchParams);
    return {
      people: response.data,
      pagination: response.pagination
    };
  }, 'searching people');
}

// Producer utility functions
// Producer utility functions
// Producer utility functions
export async function getProducerById(id) {
  return handleRequest(async () => {
    const response = await jikan.getProducer(id);
    return response.data;
  }, 'fetching producer');
}

export async function getProducers(page = 1) {
  return handleRequest(async () => {
    const response = await jikan.getProducers({ page });
    return {
      producers: response.data,
      pagination: response.pagination
    };
  }, 'fetching producers');
}
/**
 * Utility function to create artificial delays for testing loading states
 * @param {number} ms - The delay time in milliseconds
 * @returns {Promise<void>}
 */
export async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Wraps a data fetching function with a delay for testing loading states
 * @param {Function} fetchFn - The original data fetching function
 * @param {number} ms - The delay time in milliseconds (default: 2000ms)
 * @returns {Function} - A function that will delay before calling the original function
 */
export function withTestingDelay(fetchFn, ms = 2000) {
  return async (...args) => {
    await delay(ms);
    return fetchFn(...args);
  };
}

/**
 * Example usage:
 * import { withTestingDelay } from "@lib/testing";
 * 
 * const getDetailAnimeWithDelay = withTestingDelay(getDetailAnime);
 * const getEpisodeAnimeWithDelay = withTestingDelay(getEpisodeAnime);
 * 
 * const animeData = await getDetailAnimeWithDelay(params.id); 
 * const episodesData = await getEpisodeAnimeWithDelay(params.id); 
*/
/**
 * Get the current season based on the current month
 * @returns {string} The current season (winter, spring, summer, fall)
 */
export function getCurrentSeason() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  if (currentMonth >= 1 && currentMonth <= 3) return "winter";
  else if (currentMonth >= 4 && currentMonth <= 6) return "spring";
  else if (currentMonth >= 7 && currentMonth <= 9) return "summer";
  else return "fall";
}

/**
 * Get the current year
 * @returns {number} The current year
 */
export function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Get the current season URL path
 * @returns {string} URL path for the current season (e.g., "/anime/season/2026/winter")
 */
export function getCurrentSeasonPath() {
  const year = getCurrentYear();
  const season = getCurrentSeason();
  return `/anime/season/${year}/${season}`;
}

/**
 * Get the current season based on the current month
 * @returns The current season (winter, spring, summer, fall)
 */
export function getCurrentSeason(): "winter" | "spring" | "summer" | "fall" {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  if (currentMonth >= 1 && currentMonth <= 3) return "winter";
  else if (currentMonth >= 4 && currentMonth <= 6) return "spring";
  else if (currentMonth >= 7 && currentMonth <= 9) return "summer";
  else return "fall";
}

/**
 * Get the current year
 * @returns The current year
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * Get the current season URL path
 * @returns URL path for the current season (e.g., "/anime/season/2026/winter")
 */
export function getCurrentSeasonPath(): string {
  const year = getCurrentYear();
  const season = getCurrentSeason();
  return `/anime/season/${year}/${season}`;
}

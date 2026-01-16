type Season = "winter" | "spring" | "summer" | "fall";

interface SeasonInfo {
  year: number;
  season: Season;
}

interface SeasonNavigationItem extends SeasonInfo {
  href: string;
  label: string;
  isActive: boolean;
}

export const getCurrentSeason = (): Season => {
  const month = new Date().getMonth() + 1;
  if (month >= 1 && month <= 3) return "winter";
  if (month >= 4 && month <= 6) return "spring";
  if (month >= 7 && month <= 9) return "summer";
  return "fall";
};

export const getRecentSeasons = (numberOfSeasons: number = 3): SeasonInfo[] => {
  const currentYear = new Date().getFullYear();
  const currentSeason = getCurrentSeason();
  const seasons: Season[] = ["winter", "spring", "summer", "fall"];
  const currentSeasonIndex = seasons.indexOf(currentSeason);

  const recentSeasons: SeasonInfo[] = [];

  for (let i = 0; i < numberOfSeasons && currentSeasonIndex - i >= 0; i++) {
    recentSeasons.push({
      year: currentYear,
      season: seasons[currentSeasonIndex - i],
    });
  }

  return recentSeasons;
};

export const generateSeasonNavigation = (
  routeParams: string[],
): SeasonNavigationItem[] => {
  const currentYear = new Date().getFullYear();
  const seasons: Season[] = ["winter", "spring", "summer", "fall"];
  const items: SeasonNavigationItem[] = [];

  for (let year = currentYear - 3; year <= currentYear + 1; year++) {
    seasons.forEach((season) => {
      const isActive =
        routeParams[0] === year.toString() && routeParams[1] === season;

      items.push({
        season,
        year,
        href: `/anime/season/${year}/${season}`,
        label: `${season} ${year}`,
        isActive,
      });
    });
  }

  return items.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return seasons.indexOf(a.season) - seasons.indexOf(b.season);
  });
};

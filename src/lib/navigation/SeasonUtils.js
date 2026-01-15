export const getCurrentSeason = () => {
  const month = new Date().getMonth() + 1;
  if (month >= 1 && month <= 3) return "winter";
  if (month >= 4 && month <= 6) return "spring";
  if (month >= 7 && month <= 9) return "summer";
  return "fall";
};

export const getRecentSeasons = (numberOfSeasons = 3) => {
  const currentYear = new Date().getFullYear();
  const currentSeason = getCurrentSeason();
  const seasons = ["winter", "spring", "summer", "fall"];
  const currentSeasonIndex = seasons.indexOf(currentSeason);

  const recentSeasons = [];

  for (let i = 0; i < numberOfSeasons && currentSeasonIndex - i >= 0; i++) {
    recentSeasons.push({
      year: currentYear,
      season: seasons[currentSeasonIndex - i],
    });
  }

  return recentSeasons;
};

export const generateSeasonNavigation = (routeParams) => {
  const currentYear = new Date().getFullYear();
  const seasons = ["winter", "spring", "summer", "fall"];
  const items = [];

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

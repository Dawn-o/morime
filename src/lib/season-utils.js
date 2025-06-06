export const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 1 && month <= 3) return 'winter';
    if (month >= 4 && month <= 6) return 'spring';
    if (month >= 7 && month <= 9) return 'summer';
    return 'fall';
};

export function getSeasonTitle(pageType, routeParams) {
    switch (pageType) {
        case 'current':
            return {
                title: 'Current Season',
                description: 'Discover the latest anime currently airing this season',
            };
        case 'upcoming':
            return {
                title: 'Upcoming Season',
                description: 'Preview anime coming in the next season',
            };
        case 'schedule':
            return {
                title: 'Anime Schedule',
                description: 'Weekly anime broadcast schedule by day',
            };
        case 'archive':
            return {
                title: 'Season Archive',
                description: 'Browse anime seasons by year',
            };
        case 'year':
            return {
                title: `${routeParams[0]} Anime`,
                description: `All anime seasons from ${routeParams[0]}`,
            };
        case 'specific':
            const season = routeParams[1].charAt(0).toUpperCase() + routeParams[1].slice(1);
            return {
                title: `${season} ${routeParams[0]} Anime`,
                description: `Anime from ${season} ${routeParams[0]} season`,
            };
        default:
            return {
                title: 'Season Anime',
                description: 'Explore seasonal anime collections',
            };
    }
}

export const getSeasonBasePath = (pageType, routeParams) => {
    if (pageType === 'schedule') return '/anime/season/schedule';
    if (pageType === 'upcoming') return '/anime/season/later';
    if (routeParams.length > 0) return `/anime/season/${routeParams.join('/')}`;
    return '/anime/season';
};

export const generateSeasonNavigation = (routeParams) => {
    const currentYear = new Date().getFullYear();
    const currentSeason = getCurrentSeason();
    const seasons = ['winter', 'spring', 'summer', 'fall'];
    const items = [];

    const getMaxAvailableSeason = () => {
        let maxYear = currentYear;
        let maxSeasonIndex = seasons.indexOf(currentSeason);
        maxSeasonIndex += 2;

        if (maxSeasonIndex >= seasons.length) {
            maxYear += Math.floor(maxSeasonIndex / seasons.length);
            maxSeasonIndex = maxSeasonIndex % seasons.length;
        }

        return { year: maxYear, seasonIndex: maxSeasonIndex };
    };

    const maxSeason = getMaxAvailableSeason();
    const startYear = 1917;

    for (let year = startYear; year <= maxSeason.year; year++) {
        seasons.forEach((season, seasonIndex) => {
            if (year === maxSeason.year && seasonIndex > maxSeason.seasonIndex) {
                return;
            }

            const isCurrent = season === currentSeason && year === currentYear &&
                (routeParams.length === 0 || (routeParams[0] === year.toString() && routeParams[1] === season));

            const isActive = routeParams[0] === year.toString() && routeParams[1] === season;

            const href = (season === currentSeason && year === currentYear)
                ? '/anime/season'
                : `/anime/season/${year}/${season}`;

            items.push({
                season,
                year,
                href,
                label: `${season} ${year}`,
                isCurrent,
                isActive
            });
        });
    }

    return items;
};
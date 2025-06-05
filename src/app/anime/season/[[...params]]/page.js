import { getSeason } from "@/hooks/season";
import { getSchedules } from "@/hooks/schedule";
import Link from "next/link";

export default async function SeasonAnimePage({ params, searchParams }) {
    const routeParams = params.params || [];
    const typeFilter = searchParams?.type || '';
    const dayFilter = searchParams?.day || '';

    let apiConfig = { limit: 24 };
    let pageType = 'current';
    let seasonData;

    if (routeParams.length === 0) {
        apiConfig.type = "seasons/now";
        pageType = 'current';
        seasonData = await getSeason(1, apiConfig);
    } else if (routeParams[0] === 'later') {
        apiConfig.type = "seasons/upcoming";
        pageType = 'upcoming';
        seasonData = await getSeason(1, apiConfig);
    } else if (routeParams[0] === 'schedule') {
        pageType = 'schedule';
        // Use getSchedules with proper filter
        apiConfig.filter = dayFilter || 'monday'; // Default to monday if no day specified
        seasonData = await getSchedules(1, apiConfig);
    } else if (routeParams.length === 1) {
        // /anime/season/2024 - specific year
        apiConfig.type = `seasons/${routeParams[0]}`;
        pageType = 'year';
        seasonData = await getSeason(1, apiConfig);
    } else if (routeParams.length === 2) {
        // /anime/season/2024/winter - specific year and season
        apiConfig.type = `seasons/${routeParams[0]}/${routeParams[1]}`;
        pageType = 'specific';
        seasonData = await getSeason(1, apiConfig);
    } else {
        // Default fallback
        apiConfig.type = "seasons/now";
        pageType = 'current';
        seasonData = await getSeason(1, apiConfig);
    }

    // Add type filter to API config for non-schedule pages
    if (typeFilter && pageType !== 'schedule') {
        apiConfig.filter = typeFilter;
        // Re-fetch with filter for non-schedule pages
        if (pageType !== 'schedule') {
            seasonData = await getSeason(1, apiConfig);
        }
    }

    // Helper function to get current season
    const getCurrentSeason = () => {
        const month = new Date().getMonth() + 1;
        if (month >= 1 && month <= 3) return 'winter';
        if (month >= 4 && month <= 6) return 'spring';
        if (month >= 7 && month <= 9) return 'summer';
        return 'fall';
    };

    // Generate comprehensive season navigation items
    const generateSeasonNavigation = async () => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const currentSeason = getCurrentSeason();
        const seasons = ['winter', 'spring', 'summer', 'fall'];

        const items = [];

        // Calculate reasonable end point based on current date
        const getMaxAvailableSeason = () => {
            // Anime seasons are typically announced 1-2 seasons ahead
            let maxYear = currentYear;
            let maxSeasonIndex = seasons.indexOf(currentSeason);

            // Add 2 seasons ahead (6 months)
            maxSeasonIndex += 2;

            if (maxSeasonIndex >= seasons.length) {
                maxYear += Math.floor(maxSeasonIndex / seasons.length);
                maxSeasonIndex = maxSeasonIndex % seasons.length;
            }

            return { year: maxYear, seasonIndex: maxSeasonIndex };
        };

        const maxSeason = getMaxAvailableSeason();

        // Generate from 1917 to calculated max season
        const startYear = 1917;

        for (let year = startYear; year <= maxSeason.year; year++) {
            seasons.forEach((season, seasonIndex) => {
                // Stop at calculated max season
                if (year === maxSeason.year && seasonIndex > maxSeason.seasonIndex) {
                    return;
                }

                const isCurrent = season === currentSeason && year === currentYear &&
                    (routeParams.length === 0);

                const isActive = routeParams[0] === year.toString() && routeParams[1] === season;

                items.push({
                    season,
                    year,
                    href: `/anime/season/${year}/${season}`,
                    label: `${season} ${year}`,
                    isCurrent,
                    isActive
                });
            });
        }

        return items;
    };

    const getTitle = () => {
        switch (pageType) {
            case 'upcoming': return 'Upcoming Season Anime';
            case 'schedule': return 'Anime Schedule';
            case 'year': return `${routeParams[0]} Season Anime`;
            case 'specific': return `${routeParams[1]?.charAt(0).toUpperCase() + routeParams[1]?.slice(1)} ${routeParams[0]} Anime`;
            default: return 'Current Season Anime';
        }
    };

    const seasonNavItems = await generateSeasonNavigation();

    // Find active season index
    let activeIndex = seasonNavItems.findIndex(item => item.isActive);
    if (activeIndex === -1) {
        activeIndex = seasonNavItems.findIndex(item => item.isCurrent);
    }

    // If still not found (for Later/Schedule pages), find current season manually
    if (activeIndex === -1) {
        const currentYear = new Date().getFullYear();
        const currentSeason = getCurrentSeason();
        activeIndex = seasonNavItems.findIndex(item =>
            item.year === currentYear && item.season === currentSeason
        );
    }

    // If still not found, default to a reasonable position (not the beginning)
    if (activeIndex === -1) {
        const currentYear = new Date().getFullYear();
        // Find the closest year to current year
        const closestYearIndex = seasonNavItems.findIndex(item => item.year >= currentYear - 2);
        activeIndex = closestYearIndex !== -1 ? closestYearIndex : Math.max(0, seasonNavItems.length - 10);
    }

    // Calculate visible items around active season (show 4 seasons)
    const totalVisible = 4;
    const startIndex = Math.max(0, Math.min(activeIndex - 1, seasonNavItems.length - totalVisible));
    const endIndex = Math.min(seasonNavItems.length, startIndex + totalVisible);
    const visibleItems = seasonNavItems.slice(startIndex, endIndex);

    // Filter anime data by type or day
    const filteredData = seasonData.data ?
        seasonData.data.filter(anime => {
            if (pageType === 'schedule' && dayFilter) {
                // For schedule, the API should already filter by day
                // But we can add client-side filtering as backup
                const animeDay = anime.broadcast?.day?.toLowerCase();
                const filterDay = dayFilter.toLowerCase();

                // Handle special cases
                if (filterDay === 'other') {
                    return animeDay && !['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(animeDay);
                }
                if (filterDay === 'unknown') {
                    return !animeDay || animeDay === 'unknown' || animeDay === '';
                }

                return animeDay === filterDay;
            } else if (typeFilter && pageType !== 'schedule') {
                return anime.type?.toLowerCase() === typeFilter.toLowerCase();
            }
            return true;
        }) : [];

    return (
        <section className="container mx-auto py-8 sm:py-10 px-4">
            <h1 className="text-2xl font-bold mb-4">{getTitle()}</h1>

            <div className="mb-6">
                {/* Season Navigation - Dynamic Pagination */}
                <nav className="flex items-center justify-center gap-2 mb-4 border-b pb-4">
                    {/* Left ellipsis and navigation - No limit on previous */}
                    {startIndex > 0 && (
                        <Link
                            href={seasonNavItems[Math.max(0, startIndex - totalVisible)].href}
                            className="px-3 py-1 text-muted-foreground hover:text-foreground cursor-pointer"
                            title="Go to earlier seasons"
                        >
                            ...
                        </Link>
                    )}

                    {/* Visible season items */}
                    {visibleItems.map((item) => (
                        <Link
                            key={`${item.year}-${item.season}`}
                            href={item.href}
                            className={
                                item.isCurrent || item.isActive
                                    ? 'px-3 py-1 font-bold bg-primary text-primary-foreground rounded capitalize'
                                    : 'px-3 py-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded capitalize'
                            }
                        >
                            {item.label}
                        </Link>
                    ))}

                    {/* Right ellipsis and navigation - Only show if not at the end */}
                    {endIndex < seasonNavItems.length && (
                        <Link
                            href={seasonNavItems[Math.min(seasonNavItems.length - 1, endIndex + totalVisible - 1)].href}
                            className="px-3 py-1 text-muted-foreground hover:text-foreground cursor-pointer"
                            title="Go to later seasons"
                        >
                            ...
                        </Link>
                    )}

                    {/* Special navigation items */}
                    <div className="ml-4 flex gap-2 border-l pl-4">
                        <Link
                            href="/anime/season"
                            className={pageType === 'current' ? 'px-3 py-1 font-bold bg-primary text-primary-foreground rounded' : 'px-3 py-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded'}
                        >
                            Current
                        </Link>
                        <Link
                            href="/anime/season/later"
                            className={pageType === 'upcoming' ? 'px-3 py-1 font-bold bg-primary text-primary-foreground rounded' : 'px-3 py-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded'}
                        >
                            Later
                        </Link>
                        <Link
                            href="/anime/season/schedule"
                            className={pageType === 'schedule' ? 'px-3 py-1 font-bold bg-primary text-primary-foreground rounded' : 'px-3 py-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded'}
                        >
                            Schedule
                        </Link>
                        <Link
                            href="/anime/season/archive"
                            className="px-3 py-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded"
                        >
                            Archive
                        </Link>
                    </div>
                </nav>

                {/* Filters - Different for Schedule vs Regular Pages */}
                {pageType === 'schedule' ? (
                    /* Day Filters for Schedule */
                    <nav className="flex flex-wrap gap-4 mb-4">
                        <Link
                            href="/anime/season/schedule"
                            className={!dayFilter ? 'font-bold text-primary' : 'text-muted-foreground hover:text-foreground'}
                        >
                            All Days
                        </Link>
                        {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'other', 'unknown'].map(day => (
                            <Link
                                key={day}
                                href={`/anime/season/schedule?day=${day}`}
                                className={dayFilter === day ? 'font-bold text-primary' : 'text-muted-foreground hover:text-foreground'}
                            >
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                            </Link>
                        ))}
                    </nav>
                ) : (
                    /* Type Filters for Regular Pages */
                    <nav className="flex flex-wrap gap-4 mb-4">
                        <Link
                            href={`/anime/season${routeParams.length > 0 ? `/${routeParams.join('/')}` : ''}`}
                            className={!typeFilter ? 'font-bold text-primary' : 'text-muted-foreground hover:text-foreground'}
                        >
                            All
                        </Link>
                        {['tv', 'ona', 'ova', 'movie', 'special'].map(type => (
                            <Link
                                key={type}
                                href={`/anime/season${routeParams.length > 0 ? `/${routeParams.join('/')}` : ''}?type=${type}`}
                                className={typeFilter === type ? 'font-bold text-primary' : 'text-muted-foreground hover:text-foreground'}
                            >
                                {type.toUpperCase()}
                            </Link>
                        ))}
                    </nav>
                )}
            </div>

            {filteredData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredData.map((anime) => (
                        <div key={anime.mal_id} className="border rounded-lg p-4">
                            <div className="flex gap-4">
                                {anime.images?.jpg?.image_url && (
                                    <img
                                        src={anime.images.jpg.image_url}
                                        alt={anime.title}
                                        className="w-16 h-20 object-cover rounded"
                                    />
                                )}
                                <div className="flex-1">
                                    <h3 className="font-semibold line-clamp-2">{anime.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {pageType === 'schedule' ? (
                                            <>
                                                <span className="font-medium">
                                                    {anime.broadcast?.day || 'Unknown Day'}
                                                </span>
                                                {anime.broadcast?.time && (
                                                    <span className="ml-2">{anime.broadcast.time} (JST)</span>
                                                )}
                                                <br />
                                                <span className="text-xs">{anime.type} • {anime.status}</span>
                                            </>
                                        ) : (
                                            <>
                                                {anime.type} • {anime.status}
                                                {anime.episodes && <span> • {anime.episodes} episodes</span>}
                                            </>
                                        )}
                                    </p>
                                    {anime.score && (
                                        <div className="flex items-center gap-1 mt-2">
                                            <span className="text-yellow-500">★</span>
                                            <span className="text-sm">{anime.score}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-muted-foreground">
                        {pageType === 'schedule' ?
                            (dayFilter ? `No anime scheduled for ${dayFilter}.` : 'No scheduled anime found.') :
                            'No anime found for the selected filter.'
                        }
                    </p>
                </div>
            )}
        </section>
    );
}
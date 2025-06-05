import { getSeason } from "@/hooks/season";
import { getSchedules } from "@/hooks/schedule";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AnimeCard } from "@/components/anime/anime-card";
import { Separator } from "@/components/ui/separator";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default async function SeasonAnimePage({ params, searchParams }) {
    const routeParams = params.params || [];
    const typeFilter = await searchParams?.type || '';
    const dayFilter = await searchParams?.day || '';

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
        apiConfig.filter = dayFilter || 'monday';
        seasonData = await getSchedules(1, apiConfig);
    } else if (routeParams.length === 1) {
        apiConfig.type = `seasons/${routeParams[0]}`;
        pageType = 'year';
        seasonData = await getSeason(1, apiConfig);
    } else if (routeParams.length === 2) {
        apiConfig.type = `seasons/${routeParams[0]}/${routeParams[1]}`;
        pageType = 'specific';
        seasonData = await getSeason(1, apiConfig);
    } else {
        apiConfig.type = "seasons/now";
        pageType = 'current';
        seasonData = await getSeason(1, apiConfig);
    }

    if (typeFilter && pageType !== 'schedule') {
        apiConfig.filter = typeFilter;
        if (pageType !== 'schedule') {
            seasonData = await getSeason(1, apiConfig);
        }
    }

    const getCurrentSeason = () => {
        const month = new Date().getMonth() + 1;
        if (month >= 1 && month <= 3) return 'winter';
        if (month >= 4 && month <= 6) return 'spring';
        if (month >= 7 && month <= 9) return 'summer';
        return 'fall';
    };

    const generateSeasonNavigation = async () => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
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
                    href: href,
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
            case 'upcoming': return 'Upcoming Season';
            case 'schedule': return 'Anime Schedule';
            case 'year': return `${routeParams[0]} Season Anime`;
            case 'specific': return `${routeParams[1]?.charAt(0).toUpperCase() + routeParams[1]?.slice(1)} ${routeParams[0]} Anime`;
            default: return 'Current Season';
        }
    };

    const seasonNavItems = await generateSeasonNavigation();

    let activeIndex = seasonNavItems.findIndex(item => item.isActive);
    if (activeIndex === -1) {
        activeIndex = seasonNavItems.findIndex(item => item.isCurrent);
    }

    if (activeIndex === -1) {
        const currentYear = new Date().getFullYear();
        const currentSeason = getCurrentSeason();
        activeIndex = seasonNavItems.findIndex(item =>
            item.year === currentYear && item.season === currentSeason
        );
    }

    if (activeIndex === -1) {
        const currentYear = new Date().getFullYear();
        const closestYearIndex = seasonNavItems.findIndex(item => item.year >= currentYear - 2);
        activeIndex = closestYearIndex !== -1 ? closestYearIndex : Math.max(0, seasonNavItems.length - 10);
    }

    const totalVisible = 4;
    const startIndex = Math.max(0, Math.min(activeIndex - 1, seasonNavItems.length - totalVisible));
    const endIndex = Math.min(seasonNavItems.length, startIndex + totalVisible);
    const visibleItems = seasonNavItems.slice(startIndex, endIndex);

    const filteredData = seasonData.data ?
        seasonData.data.filter(anime => {
            if (pageType === 'schedule' && dayFilter) {
                const animeDay = anime.broadcast?.day?.toLowerCase();
                const filterDay = dayFilter.toLowerCase();

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
                <nav className="flex items-center justify-center gap-2">
                    {startIndex > 0 && (
                        <Button variant="ghost" size="sm" asChild>
                            <Link
                                href={seasonNavItems[Math.max(0, startIndex - totalVisible)].href}
                                title="Go to earlier seasons"
                            >
                                ...
                            </Link>
                        </Button>
                    )}

                    {visibleItems.map((item) => (
                        <Button
                            key={`${item.year}-${item.season}`}
                            variant={item.isCurrent || item.isActive ? "default" : "ghost"}
                            size="sm"
                            asChild
                        >
                            <Link href={item.href} className="capitalize">
                                {item.label}
                            </Link>
                        </Button>
                    ))}

                    {endIndex < seasonNavItems.length && (
                        <Button variant="ghost" size="sm" asChild>
                            <Link
                                href={seasonNavItems[Math.min(seasonNavItems.length - 1, endIndex + totalVisible - 1)].href}
                                title="Go to later seasons"
                            >
                                ...
                            </Link>
                        </Button>
                    )}

                    <div className="ml-4 flex gap-2 border-l pl-4">
                        {pageType !== 'current' && (
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/anime/season">Current</Link>
                            </Button>
                        )}
                        <Button
                            variant={pageType === 'upcoming' ? "default" : "ghost"}
                            size="sm"
                            asChild
                        >
                            <Link href="/anime/season/later">Later</Link>
                        </Button>
                        <Button
                            variant={pageType === 'schedule' ? "default" : "ghost"}
                            size="sm"
                            asChild
                        >
                            <Link href="/anime/season/schedule">Schedule</Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/anime/season/archive">Archive</Link>
                        </Button>
                    </div>
                </nav>

                <Separator className="my-4" />

                {pageType === 'schedule' ? (
                    <Tabs value={dayFilter || 'all'} className="mb-4">
                        <TabsList className="h-auto md:h-10 gap-1 md:gap-0 px-1.5 py-1 mx-auto w-fit">
                            <TabsTrigger value="all" asChild className="w-full px-6 py-2.5 text-sm justify-center">
                                <Link href="/anime/season/schedule">All</Link>
                            </TabsTrigger>
                            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'other', 'unknown'].map(day => (
                                <TabsTrigger key={day} value={day} asChild className="w-full px-6 py-2.5 text-sm justify-center">
                                    <Link href={`/anime/season/schedule?day=${day}`}>
                                        {day.charAt(0).toUpperCase() + day.slice(1)}
                                    </Link>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                ) : (
                    <Tabs value={typeFilter || 'all'} className="mb-4">
                        <TabsList className="h-auto md:h-10 gap-1 md:gap-0 px-1.5 py-1 mx-auto w-fit">
                            <TabsTrigger value="all" asChild className="w-full px-6 py-2.5 text-sm justify-center">
                                <Link href={`/anime/season${routeParams.length > 0 ? `/${routeParams.join('/')}` : ''}`} className="w-full">
                                    All
                                </Link>
                            </TabsTrigger>
                            {['TV', 'ONA', 'OVA', 'Movie', 'Special'].map(type => (
                                <TabsTrigger key={type} value={type} asChild className="w-full px-6 py-2.5 text-sm justify-center">
                                    <Link href={`/anime/season${routeParams.length > 0 ? `/${routeParams.join('/')}` : ''}?type=${type}`}>
                                        {type}
                                    </Link>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                )}
            </div>

            {filteredData.length > 0 ? (

                <div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {filteredData.map((anime) => (
                            <AnimeCard key={anime.mal_id} anime={anime} />
                        ))}
                    </div>

                    <Separator className="my-8" />

                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>
                                    2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>

            ) : (
                <Card>
                    <CardContent className="text-center py-8">
                        <p className="text-muted-foreground">
                            {pageType === 'schedule' ?
                                (dayFilter ? `No anime scheduled for ${dayFilter}.` : 'No scheduled anime found.') :
                                'No anime found for the selected filter.'
                            }
                        </p>
                    </CardContent>
                </Card>
            )}
        </section>
    );
}
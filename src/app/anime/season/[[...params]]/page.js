import { getSeason } from "@/hooks/season";
import { getSchedules } from "@/hooks/schedule";
import { AnimeCard } from "@/components/anime/anime-card";
import { Separator } from "@/components/ui/separator";
import { AnimePagination } from "@/components/anime/anime-pagination";
import { AnimeError } from "@/components/anime/season/anime-error";
import { SeasonNavigation } from "@/components/anime/season/navigation";
import { SeasonFilterTabs } from "@/components/anime/season/filter-tabs";
import { getSeasonTitle, getSeasonBasePath } from "@/lib/season-utils";

export async function generateMetadata({ params, searchParams }) {
    const routeParams = (await params).params || [];
    const currentPage = parseInt((await searchParams)?.page) || 1;

    const pageType = getPageType(routeParams);
    const baseTitle = getSeasonTitle(pageType, routeParams);
    const title = currentPage > 1 ? `${baseTitle} - Page ${currentPage}` : baseTitle;

    return {
        title,
        description: `Discover ${baseTitle.toLowerCase()} anime with comprehensive information and ratings.`,
    };
}

export default async function SeasonAnimePage({ params, searchParams }) {
    try {
        const routeParams = (await params).params || [];
        const typeFilter = (await searchParams)?.type || '';
        const dayFilter = (await searchParams)?.day || '';
        const currentPage = parseInt((await searchParams)?.page) || 1;

        const { pageType, apiConfig } = buildApiConfig(routeParams, typeFilter, dayFilter);
        const seasonData = await fetchSeasonData(pageType, currentPage, apiConfig, dayFilter);

        if (!seasonData || seasonData.error) {
            throw new Error('Failed to fetch season data');
        }

        const filteredData = filterSeasonData(seasonData.data, pageType, typeFilter, dayFilter);

        return (
            <section className="container mx-auto py-8 sm:py-10 px-4">
                <h1 className="text-2xl font-bold mb-4">{getSeasonTitle(pageType, routeParams)}</h1>

                <SeasonNavigation routeParams={routeParams} pageType={pageType} />

                <SeasonFilterTabs
                    pageType={pageType}
                    typeFilter={typeFilter}
                    dayFilter={dayFilter}
                    routeParams={routeParams}
                />

                {filteredData.length > 0 ? (
                    <div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {filteredData.map((anime, index) => (
                                <AnimeCard key={anime.mal_id} anime={anime} priority={index < 3} />
                            ))}
                        </div>

                        <Separator className="my-8" />

                        <AnimePagination
                            currentPage={currentPage}
                            totalPages={seasonData.totalPages || 1}
                            basePath={getSeasonBasePath(pageType, routeParams)}
                            queryParams={{
                                ...(typeFilter && { type: typeFilter }),
                                ...(dayFilter && { day: dayFilter })
                            }}
                        />
                    </div>
                ) : (
                    <AnimeError
                        pageType={pageType}
                        dayFilter={dayFilter}
                    />
                )}
            </section>
        );
    } catch (error) {
        console.error('Error in SeasonAnimePage:', error);
        return <AnimeError message="Something went wrong. Please try again later." />;
    }
}

function getPageType(routeParams) {
    if (routeParams.length === 0) return 'current';
    if (routeParams[0] === 'later') return 'upcoming';
    if (routeParams[0] === 'schedule') return 'schedule';
    if (routeParams.length === 1) return 'year';
    if (routeParams.length === 2) return 'specific';
    return 'current';
}

function buildApiConfig(routeParams, typeFilter, dayFilter) {
    let apiConfig = { limit: 24 };
    const pageType = getPageType(routeParams);

    if (routeParams.length === 0) {
        apiConfig.type = "seasons/now";
    } else if (routeParams[0] === 'later') {
        apiConfig.type = "seasons/upcoming";
    } else if (routeParams[0] === 'schedule') {
        apiConfig.filter = dayFilter || 'monday';
    } else if (routeParams.length === 1) {
        apiConfig.type = `seasons/${routeParams[0]}`;
    } else if (routeParams.length === 2) {
        apiConfig.type = `seasons/${routeParams[0]}/${routeParams[1]}`;
    } else {
        apiConfig.type = "seasons/now";
    }

    if (typeFilter && pageType !== 'schedule') {
        apiConfig.filter = typeFilter;
    }

    return { pageType, apiConfig };
}

async function fetchSeasonData(pageType, currentPage, apiConfig) {
    if (pageType === 'schedule') {
        return await getSchedules(currentPage, apiConfig);
    }
    return await getSeason(currentPage, apiConfig);
}

function filterSeasonData(data, pageType, typeFilter, dayFilter) {
    if (!data) return [];

    return data.filter(anime => {
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
    });
}
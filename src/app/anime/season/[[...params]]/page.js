import { getArchive, getSeason } from "@/hooks/season";
import { getSchedules } from "@/hooks/schedule";
import { SeasonNavigation } from "@/components/anime/season/season-navigation";
import { SeasonFilterTabs } from "@/components/anime/season/season-filter-tabs";
import { SeasonContent } from "@/components/anime/season/season-content";
import { SeasonArchive } from "@/components/anime/season/season-archive";
import { AnimeError } from "@/components/anime/season/anime-error";
import { getSeasonTitle, getSeasonBasePath } from "@/lib/season-utils";

export async function generateMetadata({ params, searchParams }) {
    const routeParams = (await params).params || [];
    const currentPage = parseInt((await searchParams)?.page) || 1;

    const pageType = getPageType(routeParams);
    const titleData = getSeasonTitle(pageType, routeParams);
    const title = currentPage > 1 ? `${titleData.title} - Page ${currentPage}` : titleData.title;

    return {
        title,
        description: titleData.description,
    };
}

export default async function SeasonAnimePage({ params, searchParams }) {
    try {
        const routeParams = (await params).params || [];
        const typeFilter = (await searchParams)?.type || '';
        const dayFilter = (await searchParams)?.day || '';
        const currentPage = parseInt((await searchParams)?.page) || 1;

        const pageType = getPageType(routeParams);
        const apiConfig = buildApiConfig(pageType, routeParams, typeFilter, dayFilter);
        const seasonData = await fetchSeasonData(pageType, currentPage, apiConfig);
        const archiveData = await getArchive();

        if (!archiveData && !seasonData || seasonData?.error) {
            throw new Error('Failed to fetch season data');
        }

        const titleData = getSeasonTitle(pageType, routeParams);

        return (
            <section className="container mx-auto py-8 sm:py-10 px-4">
                    <div className="text-center space-y-2 mb-8">
                        <h1 className="text-2xl font-bold text-foreground">{titleData.title}</h1>
                        <p className="text-sm text-muted-foreground">{titleData.description}</p>
                    </div>

                <SeasonNavigation routeParams={routeParams} pageType={pageType} />

                {seasonData ? (
                    <>
                        <SeasonFilterTabs
                            pageType={pageType}
                            typeFilter={typeFilter}
                            dayFilter={dayFilter}
                            routeParams={routeParams}
                        />

                        <SeasonContent
                            seasonData={seasonData}
                            currentPage={currentPage}
                            basePath={getSeasonBasePath(pageType, routeParams)}
                            queryParams={{
                                ...(typeFilter && { type: typeFilter }),
                                ...(dayFilter && { day: dayFilter })
                            }}
                            pageType={pageType}
                            dayFilter={dayFilter}
                        />
                    </>
                ) : (
                    <SeasonArchive archiveData={archiveData} />
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
    if (routeParams[0] === 'archive') return 'archive';
    if (routeParams.length === 1) return 'year';
    if (routeParams.length === 2) return 'specific';
    return 'current';
}

function buildApiConfig(pageType, routeParams, typeFilter, dayFilter) {
    const apiConfig = { limit: 24 };

    switch (pageType) {
        case 'current':
            apiConfig.type = "seasons/now";
            break;
        case 'upcoming':
            apiConfig.type = "seasons/upcoming";
            break;
        case 'schedule':
            apiConfig.filter = dayFilter || 'monday';
            break;
        case 'year':
            apiConfig.type = `seasons/${routeParams[0]}`;
            break;
        case 'specific':
            apiConfig.type = `seasons/${routeParams[0]}/${routeParams[1]}`;
            break;
        default:
            apiConfig.type = "seasons/now";
    }

    if (typeFilter && pageType !== 'schedule') {
        apiConfig.filter = typeFilter;
    }

    return apiConfig;
}

async function fetchSeasonData(pageType, currentPage, apiConfig) {
    if (pageType === 'schedule') {
        return await getSchedules(currentPage, apiConfig);
    } else if (pageType === 'archive') {
        return false;
    }
    return await getSeason(currentPage, apiConfig);
}
import { getSeason } from "@/hooks/season";
import { TypeFilterTabs } from "@/components/anime/season/type-filter-tabs";
import { AnimeGrid } from "@/components/anime/anime-grid";
import { SeasonNavigation } from "@/components/anime/season/season-navigation";
import { Suspense } from "react";
import { SpecificSeasonSkeleton } from "@/components/skeleton/spesific-season-skeleton";

export async function generateMetadata({ params, searchParams }) {
    const { year, season } = await params;
    const currentPage = parseInt((await searchParams)?.page) || 1;
    const title = currentPage > 1
        ? `${season.charAt(0).toUpperCase() + season.slice(1)} ${year} Anime - Page ${currentPage}`
        : `${season.charAt(0).toUpperCase() + season.slice(1)} ${year} Anime`;

    return {
        title,
        description: `Anime from ${season} ${year} season`,
    };
}

export default async function SpesificSeasonPage({ params, searchParams }) {
    const { year, season } = await params;
    const typeFilter = (await searchParams)?.type || '';
    const currentPage = parseInt((await searchParams)?.page) || 1;

    const apiConfig = {
        limit: 24,
        type: `seasons/${year}/${season}`,
        ...(typeFilter && { filter: typeFilter })
    };

    const seasonData = await getSeason(currentPage, apiConfig);
    const seasonTitle = `${season.charAt(0).toUpperCase() + season.slice(1)} ${year} Anime`;

    return (
        <Suspense fallback={<SpecificSeasonSkeleton />}>
            <section className="container mx-auto py-8 sm:py-10 px-4">
                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-2xl font-bold text-foreground">{seasonTitle}</h1>
                    <p className="text-sm text-muted-foreground">Anime from {season} {year} season</p>
                </div>

                <SeasonNavigation routeParams={[year, season]} />

                <TypeFilterTabs typeFilter={typeFilter} basePath={`/anime/season/${year}/${season}`} />

                <AnimeGrid
                    animeData={seasonData}
                    currentPage={currentPage}
                    basePath={`/anime/season/${year}/${season}`}
                    queryParams={{
                        ...(typeFilter && { type: typeFilter })
                    }}
                />
            </section>
        </Suspense>
    );
}
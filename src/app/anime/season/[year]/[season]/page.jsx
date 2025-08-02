import { getSeason } from "@/hooks/season";
import { TypeFilterTabs } from "@/components/forms/type-filter-tabs";
import { AnimeGrid } from "@/components/display/anime/anime-grid";
import { SeasonNavigation } from "@/components/anime/season/season-navigation";
import { notFound } from "next/navigation";

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

    const yearNum = parseInt(year);
    if (isNaN(yearNum) || yearNum < 1917 || yearNum > new Date().getFullYear() + 2) {
        notFound();
    }

    const validSeasons = ['winter', 'spring', 'summer', 'fall'];
    if (!validSeasons.includes(season.toLowerCase())) {
        notFound();
    }

    const typeFilter = (await searchParams)?.type || '';
    const currentPage = parseInt((await searchParams)?.page) || 1;

    const apiConfig = {
        limit: 24,
        type: `seasons/${year}/${season}`,
        ...(typeFilter && { filter: typeFilter })
    };

    const animeSeasonalData = await getSeason(currentPage, apiConfig);
    const seasonTitle = `${season.charAt(0).toUpperCase() + season.slice(1)} ${year} Anime`;

    const animeData = animeSeasonalData ? {
        data: animeSeasonalData.data?.map(anime => ({
            mal_id: anime.mal_id,
            title: anime.title,
            imageUrl: anime.images?.webp?.large_image_url,
            score: anime.score,
            episodes: anime.episodes,
            year: anime.year,
            type: anime.type,
        })) || [],
        totalPages: animeSeasonalData.totalPages,
    } : null;

    return (
        <section className="container mx-auto py-8 sm:py-10 px-4">
            <div className="text-center space-y-2 mb-8">
                <h1 className="text-2xl font-bold text-foreground">{seasonTitle}</h1>
                <p className="text-sm text-muted-foreground">Anime from {season} {year} season</p>
            </div>

            <SeasonNavigation routeParams={[year, season]} />

            <TypeFilterTabs typeFilter={typeFilter} basePath={`/anime/season/${year}/${season}`} />

            <AnimeGrid
                animeData={animeData}
                currentPage={currentPage}
                basePath={`/anime/season/${year}/${season}`}
                queryParams={{
                    ...(typeFilter && { type: typeFilter })
                }}
            />
        </section>
    );
}

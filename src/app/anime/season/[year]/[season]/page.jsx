import { getSeason } from "@/hooks/UseSeason";
import { TypeFilterTabs } from "@/components/forms/TypeFilterTabs";
import { AnimeGrid } from "@/components/display/anime/AnimeGrid";

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

    const animeSeasonalData = await getSeason(currentPage, apiConfig);

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
        <>
            <TypeFilterTabs typeFilter={typeFilter} basePath={`/anime/season/${year}/${season}`} />

            <AnimeGrid
                animeData={animeData}
                currentPage={currentPage}
                basePath={`/anime/season/${year}/${season}`}
                queryParams={{
                    ...(typeFilter && { type: typeFilter })
                }}
            />
        </>
    );
}

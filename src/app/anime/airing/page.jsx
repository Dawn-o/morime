import { getAnime } from "@/hooks/anime";
import { AnimeGrid } from "@/components/display/anime/anime-grid";
import { TypeFilterTabs } from "@/components/forms/type-filter-tabs";

export async function generateMetadata({ searchParams }) {
  const currentPage = parseInt((await searchParams)?.page) || 1;
  const title =
    currentPage > 1
      ? `Currently Airing Anime - Page ${currentPage}`
      : "Currently Airing Anime";

  return {
    title,
    description: "Browse anime that are currently airing this season",
  };
}

export default async function AiringAnimePage({ searchParams }) {
  const typeFilter = (await searchParams)?.type || "";
  const currentPage = parseInt((await searchParams)?.page) || 1;

  const apiConfig = {
    limit: 24,
    status: "airing",
    ...(typeFilter && { type: typeFilter }),
  };

  const animeData = await getAnime(currentPage, apiConfig);

  const airingAnimeData = animeData
    ? {
        data:
          animeData.data?.map((anime) => ({
            mal_id: anime.mal_id,
            title: anime.title,
            imageUrl: anime.images?.webp?.large_image_url,
            score: anime.score,
            episodes: anime.episodes,
            year: anime.year,
            type: anime.type,
            members: anime.members,
          })) || [],
        totalPages: animeData.totalPages,
      }
    : null;

  return (
    <div className="container mx-auto py-8 sm:py-10 px-4">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Currently Airing Anime
        </h1>
        <p className="text-sm text-muted-foreground">
          Discover anime that are currently airing this season
        </p>
      </div>

      <div className="mb-6">
        <TypeFilterTabs currentType={typeFilter} basePath="/anime/airing" />
      </div>

      <AnimeGrid
        animeData={airingAnimeData}
        currentPage={currentPage}
        basePath="/anime/airing"
        queryParams={typeFilter ? { type: typeFilter } : {}}
      />
    </div>
  );
}

import { getAnime } from "@/hooks/anime";
import { AnimeGrid } from "@/components/display/anime/anime-grid";
import { TypeFilterTabs } from "@/components/forms/type-filter-tabs";
import { PageContainer, PageHeader } from "@/components/layout/page-container";

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
    <PageContainer>
      <PageHeader
        title="Currently Airing Anime"
        description="Discover anime that are currently airing this season"
      />

      <div className="mb-6">
        <TypeFilterTabs currentType={typeFilter} basePath="/anime/airing" />
      </div>

      <AnimeGrid
        animeData={airingAnimeData}
        currentPage={currentPage}
        basePath="/anime/airing"
        queryParams={typeFilter ? { type: typeFilter } : {}}
      />
    </PageContainer>
  );
}

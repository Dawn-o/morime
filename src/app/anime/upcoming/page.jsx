import { getSeason } from "@/hooks/season";
import { TypeFilterTabs } from "@/components/forms/type-filter-tabs";
import { AnimeGrid } from "@/components/display/anime/anime-grid";
import { PageContainer, PageHeader } from "@/components/layout/page-container";

export async function generateMetadata({ searchParams }) {
  const currentPage = parseInt((await searchParams)?.page) || 1;
  const title =
    currentPage > 1 ? `Upcoming Anime - Page ${currentPage}` : "Upcoming Anime";

  return {
    title,
    description: "Discover upcoming anime releases and new seasons",
  };
}

export default async function UpcomingPage({ searchParams }) {
  const typeFilter = (await searchParams)?.type || "";
  const currentPage = parseInt((await searchParams)?.page) || 1;

  const apiConfig = {
    limit: 24,
    type: "seasons/upcoming",
    ...(typeFilter && { filter: typeFilter }),
  };

  const animeUpcomingData = await getSeason(currentPage, apiConfig);

  const animeData = animeUpcomingData
    ? {
        data:
          animeUpcomingData.data?.map((anime) => ({
            mal_id: anime.mal_id,
            title: anime.title,
            imageUrl: anime.images?.webp?.large_image_url,
            score: anime.score,
            episodes: anime.episodes,
            year: anime.year,
            type: anime.type,
          })) || [],
        totalPages: animeUpcomingData.totalPages,
      }
    : null;

  return (
    <PageContainer as="section">
      <PageHeader
        title="Upcoming Anime"
        description="Discover upcoming anime releases and new seasons"
      />

      <TypeFilterTabs typeFilter={typeFilter} basePath="/anime/upcoming" />

      <AnimeGrid
        animeData={animeData}
        currentPage={currentPage}
        basePath="/anime/upcoming"
        queryParams={{
          ...(typeFilter && { type: typeFilter }),
        }}
      />
    </PageContainer>
  );
}

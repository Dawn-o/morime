import type { Metadata } from "next";
import { getRecentlyCompletedAnime } from "@/hooks/UseAnime";
import { AnimeGrid } from "@/components/display/anime/AnimeGrid";
import { TypeFilterTabs } from "@/components/forms/TypeFilterTabs";
import { PageContainer, PageHeader } from "@/components/layout/PageContainer";
import type { ListPageProps } from "@/types/pages";

export async function generateMetadata({
  searchParams,
}: ListPageProps): Promise<Metadata> {
  const currentPage = parseInt((await searchParams)?.page) || 1;
  const title =
    currentPage > 1
      ? `Recently Completed Anime - Page ${currentPage}`
      : "Recently Completed Anime";

  return {
    title,
    description:
      "Browse anime series that recently finished airing in current and recent seasons",
  };
}

export default async function Page({ searchParams }: ListPageProps) {
  const typeFilter = (await searchParams)?.type || "";
  const currentPage = parseInt((await searchParams)?.page) || 1;

  const apiConfig = {
    limit: 24,
    ...(typeFilter && { type: typeFilter }),
  };

  const animeData = await getRecentlyCompletedAnime(currentPage, apiConfig);

  const completedAnimeData = animeData
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
        title="Recently Completed Anime"
        description="Browse anime series that recently finished airing"
      />

      <div className="mb-6">
        <TypeFilterTabs typeFilter={typeFilter} basePath="/anime/completed" />
      </div>

      <AnimeGrid
        animeData={completedAnimeData}
        currentPage={currentPage}
        basePath="/anime/completed"
        queryParams={typeFilter ? { type: typeFilter } : {}}
      />
    </PageContainer>
  );
}

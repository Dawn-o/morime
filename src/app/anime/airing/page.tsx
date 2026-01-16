import type { Metadata } from "next";
import { getAnime } from "@/hooks/UseAnime";
import { PageContainer, PageHeader } from "@/components/layout/PageContainer";
import { AnimeGrid } from "@/components/display/anime/AnimeGrid";
import { TypeFilterTabs } from "@/components/forms/TypeFilterTabs";
import type { ListPageProps } from "@/types/pages";

export async function generateMetadata({
  searchParams,
}: ListPageProps): Promise<Metadata> {
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

export default async function Page({ searchParams }: ListPageProps) {
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
        <TypeFilterTabs typeFilter={typeFilter} basePath="/anime/airing" />
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

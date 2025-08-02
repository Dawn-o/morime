import { getSeason } from "@/hooks/season";
import { TypeFilterTabs } from "@/components/forms/type-filter-tabs";
import { AnimeGrid } from "@/components/display/anime/anime-grid";
import { Suspense } from "react";
import { UpcomingSkeleton } from "@/components/loading/upcoming-skeleton";

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
    <Suspense fallback={<UpcomingSkeleton />}>
      <section className="container mx-auto py-8 sm:py-10 px-4">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl font-bold text-foreground">Upcoming Anime</h1>
          <p className="text-sm text-muted-foreground">
            Discover upcoming anime releases and new seasons
          </p>
        </div>

        <TypeFilterTabs typeFilter={typeFilter} basePath="/anime/upcoming" />

        <AnimeGrid
          animeData={animeData}
          currentPage={currentPage}
          basePath="/anime/upcoming"
          queryParams={{
            ...(typeFilter && { type: typeFilter }),
          }}
        />
      </section>
    </Suspense>
  );
}

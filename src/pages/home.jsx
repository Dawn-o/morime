import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { HomeCarousel } from "@/components/fragments/carousel";
import { getAnime, getAnimeGenresList, getUpcomingAnime } from "@/hooks/anime";
import { SectionHeader } from "@/components/fragments/section-header";
import { AnimeCarousel } from "@/components/anime/anime-carousel";
import { GenreGrid } from "@/components/anime/genre-grid";
import { Separator } from "@/components/ui/separator";

export default async function HomePage() {
  const upcomingApiConfig = { type: "seasons/now?filter=tv", limit: 20 };
  const topApiConfig = { type: "top/anime?", limit: 20 };

  // Parallel data fetching
  const [carouselItems, animes, topAnimes, genresList] = await Promise.all([
    getUpcomingAnime(),
    getAnime(1, upcomingApiConfig),
    getAnime(1, topApiConfig),
    getAnimeGenresList(),
  ]);

  return (
    <main className="min-h-screen pb-12">
      {/* Hero Section */}
      <section className="mb-12">
        <Suspense
          fallback={
            <div className="w-full h-[25vh] md:h-[40vh] lg:h-[60vh] rounded-lg overflow-hidden bg-muted/50">
              <div className="grid grid-cols-1 lg:grid-cols-3 h-full relative">
                <div className="flex flex-col lg:flex-row lg:items-end gap-6 p-8 lg:col-span-2">
                  <Skeleton className="hidden lg:block w-48 h-72 rounded-lg" />
                  <div className="flex flex-col justify-end flex-1 space-y-3">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-5 w-1/2" />
                    <div className="flex gap-2 mt-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <div className="bg-primary-foreground rounded-lg overflow-hidden shadow-xl">
            <HomeCarousel items={carouselItems} />
          </div>
        </Suspense>
      </section>

      {/* Top Rated Section */}
      <section className="mb-12">
        <div className="container px-4 mx-auto">
          <SectionHeader
            title="Top Rated"
            subtitle="Most popular among fans"
            viewAllLink="/anime/top"
          />
          <AnimeCarousel animes={topAnimes.data} />
        </div>
      </section>

      {/* Current Season Section */}
      <section className="mb-12">
        <div className="container px-4 mx-auto">
          <SectionHeader
            title="Ongoing Anime"
            subtitle="Currently airing this season"
            viewAllLink="/anime/season/current"
          />
          <AnimeCarousel animes={animes.data} />
        </div>
      </section>

      <section>
        <div className="container p-4 mx-auto border border-primary-foreground">
          <GenreGrid genres={genresList} />
        </div>
      </section>
    </main>
  );
}

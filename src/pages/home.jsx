import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { HomeCarousel } from "@/components/fragments/carousel";
import { getAnime, getAnimeGenresList, getUpcomingAnime } from "@/hooks/anime";
import { SectionHeader } from "@/components/fragments/section-header";
import { AnimeCarousel } from "@/components/anime/anime-carousel";
import { GenreGrid } from "@/components/anime/genre-grid";
import { AnimeCarouselSkeleton } from "@/components/skeleton/anime-carousel-skeleton";
import { GenreGridSkeleton } from "@/components/skeleton/genre-grid-skeleton";
import { HomeCarouselSkeleton } from "@/components/skeleton/home-carousel-skeleton";

export default async function HomePage() {
  const upcomingApiConfig = { type: "seasons/now?filter=tv", limit: 20 };
  const topApiConfig = { type: "top/anime?", limit: 20 };

  const [carouselItems, animes, topAnimes, genresList] = await Promise.all([
    getUpcomingAnime(),
    getAnime(1, upcomingApiConfig),
    getAnime(1, topApiConfig),
    getAnimeGenresList(),
  ]);

  return (
    <main className="min-h-screen pb-12">
      <section className="mb-12">
        <Suspense fallback={<HomeCarouselSkeleton />}>
          <HomeCarousel items={carouselItems} />
        </Suspense>
      </section>

      <section className="mb-12">
        <div className="container px-4 mx-auto">
          <SectionHeader
            title="Top Rated"
            subtitle="Most popular among fans"
            viewAllLink="/anime/top"
          />
          <Suspense fallback={<AnimeCarouselSkeleton />}>
            <AnimeCarousel animes={topAnimes.data} />
          </Suspense>
        </div>
      </section>

      <section className="mb-12">
        <div className="container px-4 mx-auto">
          <SectionHeader
            title="Ongoing Anime"
            subtitle="Currently airing this season"
            viewAllLink="/anime/season/current"
          />
          <Suspense fallback={<AnimeCarouselSkeleton />}>
            <AnimeCarousel animes={animes.data} />
          </Suspense>
        </div>
      </section>

      <section>
        <div className="container px-4 mx-auto">
          <Suspense fallback={<GenreGridSkeleton />}>
            <div className="border border-primary-foreground p-4 rounded-lg">
              <GenreGrid genres={genresList} />
            </div>
          </Suspense>
        </div>
      </section>
    </main>
  );
}

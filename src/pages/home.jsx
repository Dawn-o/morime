import { Suspense } from "react";
import { HomeCarousel } from "@/components/fragments/carousel";
import { getTopAnime, getAnimeGenresList } from "@/hooks/anime";
import { getSeason } from "@/hooks/season";
import { SectionHeader } from "@/components/fragments/section-header";
import { AnimeCarousel } from "@/components/anime/anime-carousel";
import { GenreGrid } from "@/components/anime/genre-grid";
import { AnimeCarouselSkeleton } from "@/components/skeleton/anime-carousel-skeleton";
import { GenreGridSkeleton } from "@/components/skeleton/genre-grid-skeleton";
import { HomeCarouselSkeleton } from "@/components/skeleton/home-carousel-skeleton";

export default async function HomePage() {
  const [upcomings, animes, topAnimes, genresList] = await Promise.all([
    getSeason(1, { type: "seasons/upcoming", limit: 6, filter: "tv" }),
    getSeason(1, { type: "seasons/now", limit: 20, filter: "tv" }),
    getTopAnime(1),
    getAnimeGenresList(),
  ]);

  return (
    <main className="container mx-auto min-h-screen pb-12">
      <section className="mb-12">
        <Suspense fallback={<HomeCarouselSkeleton />}>
          <HomeCarousel items={upcomings.data} />
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
            viewAllLink="/anime/season"
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

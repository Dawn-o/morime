import { Suspense } from "react";
import { HomeCarousel } from "@/components/fragments/carousel";
import { SectionHeader } from "@/components/fragments/section-header";
import { AnimeCarousel } from "@/components/anime/anime-carousel";
import { GenreGrid } from "@/components/anime/genre-grid";
import { AnimeCarouselSkeleton } from "@/components/skeleton/anime-carousel-skeleton";
import { GenreGridSkeleton } from "@/components/skeleton/genre-grid-skeleton";
import { HomeCarouselSkeleton } from "@/components/skeleton/home-carousel-skeleton";

import {
  getTopAnimeList,
  getCurrentSeason,
  getUpcoming,
  getAllGenres,
} from "@/hooks/api";

export default async function HomePage() {
  try {
    const [upcomings, currentSeason, topAnimes, genresList] = await Promise.all(
      [
        getUpcoming(3, 4),
        getCurrentSeason(1, 20),
        getTopAnimeList(1, 24, "tv"),
        getAllGenres(),
      ]
    );

    return (
      <main className="container mx-auto min-h-screen pb-12">
        <section className="mb-12">
          <Suspense fallback={<HomeCarouselSkeleton />}>
            <HomeCarousel items={upcomings.anime} />
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
              <AnimeCarousel animes={topAnimes.anime} />
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
              <AnimeCarousel animes={currentSeason.anime} />
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
  } catch (error) {
    console.error("Error loading home page data:", error);
    return (
      <main className="container mx-auto min-h-screen pb-12">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-muted-foreground">
              Failed to load anime data. Please try again later.
            </p>
          </div>
        </div>
      </main>
    );
  }
}

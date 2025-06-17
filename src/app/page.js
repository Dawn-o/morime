import { Suspense } from "react";
import HomePage from "@/components/anime/home/home-page";
import { HomePageSkeleton } from "@/components/loading/home-page-skeleton";
import { getTopAnime, getAnimeGenresList } from "@/hooks/anime";
import { getSeason } from "@/hooks/season";

async function HomePageContent() {
  const [upcomings, topAnimes, animes, genresList] = await Promise.all([
    getSeason(3, { type: "seasons/upcoming", limit: 5 }),
    getTopAnime(1, { limit: 20 }),
    getSeason(1, { type: "seasons/now", limit: 20 }),
    getAnimeGenresList(),
  ]);

  return (
    <HomePage
      upcomings={upcomings.data}
      topAnimes={topAnimes.data}
      animes={animes.data}
      genresList={genresList}
    />
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePageContent />
    </Suspense>
  );
}
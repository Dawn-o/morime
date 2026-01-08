import HomePage from "@/components/anime/home/home-page";
import { getTopAnime, getAnimeGenresList } from "@/hooks/anime";
import { getSeason } from "@/hooks/season";
import { Suspense } from "react";
import { HomePageSkeleton } from "@/components/loading/home-page-skeleton";

export default async function Home() {
  const upcomings = await getSeason(2, { type: "seasons/upcoming", limit: 6 });
  const topAnimes = await getTopAnime(1, { limit: 20 });
  const animes = await getSeason(1, { type: "seasons/now", limit: 20 });
  const genresList = await getAnimeGenresList();

  const upcomingData =
    upcomings.data?.map((anime) => ({
      mal_id: anime.mal_id,
      title: anime.title,
      title_japanese: anime.title_japanese,
      status: anime.status,
      genres: anime.genres?.slice(0, 3),
      imageUrl: anime.images?.webp?.large_image_url,
      trailerUrl: anime.trailer?.embed_url,
    })) || [];

  const topAnimeData =
    topAnimes.data?.map((anime) => ({
      mal_id: anime.mal_id,
      title: anime.title,
      imageUrl: anime.images?.webp?.large_image_url,
      score: anime.score,
      episodes: anime.episodes,
      year: anime.year,
      type: anime.type,
    })) || [];

  const currentAnimeData =
    animes.data?.map((anime) => ({
      mal_id: anime.mal_id,
      title: anime.title,
      imageUrl: anime.images?.webp?.large_image_url,
      score: anime.score,
      episodes: anime.episodes,
      year: anime.year,
      type: anime.type,
    })) || [];

  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePage
        upcomings={upcomingData}
        topAnimes={topAnimeData}
        animes={currentAnimeData}
        genresList={genresList}
      />
    </Suspense>
  );
}

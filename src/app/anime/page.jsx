import { getAnime, getAnimeGenresList } from "@/hooks/anime";
import { getAnimeSearch } from "@/hooks/search";
import { AnimeGrid } from "@/components/display/anime/anime-grid";
import { SearchInput } from "@/components/forms/search-input";
import { Suspense } from "react";
import { AnimeListSkeleton } from "@/components/loading/anime-list-skeleton";
import { GenreGrid } from "@/components/display/anime/genre-grid";

export async function generateMetadata({ searchParams }) {
  const currentPage = parseInt((await searchParams)?.page) || 1;
  const searchQuery = (await searchParams)?.q || "";

  let title = "Anime List";
  if (searchQuery) {
    title = `Search: ${searchQuery}`;
  }
  if (currentPage > 1) {
    title += ` - Page ${currentPage}`;
  }

  return {
    title,
    description: searchQuery
      ? `Search results for "${searchQuery}" from our anime collection`
      : "Browse all anime series, movies, and specials from our extensive collection.",
  };
}

export default async function AnimePage({ searchParams }) {
  const currentPage = parseInt((await searchParams)?.page) || 1;
  const searchQuery = (await searchParams)?.q || "";
  const genresList = await getAnimeGenresList();

  let animeData;

  if (searchQuery) {
    const searchConfig = {
      limit: 24,
      q: searchQuery,
      sfw: true,
    };
    animeData = await getAnimeSearch(currentPage, searchConfig);
  } else {
    const apiConfig = {
      limit: 24,
      order_by: "favorites",
      sort: "desc",
    };
    animeData = await getAnime(currentPage, apiConfig);
  }

  const animeListData = animeData ? {
    data: animeData.data?.map(anime => ({
      mal_id: anime.mal_id,
      title: anime.title,
      imageUrl: anime.images?.webp?.large_image_url,
      score: anime.score,
      episodes: anime.episodes,
      year: anime.year,
      type: anime.type,
    })) || [],
    totalPages: animeData.totalPages,
  } : null;

  return (
    <Suspense fallback={<AnimeListSkeleton showSearch={true} />}>
      <section className="container mx-auto py-8 sm:py-10 px-4">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            {searchQuery ? `Search: ${searchQuery}` : "Anime List"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : "Browse all anime series, movies, and specials from our extensive collection"}
          </p>
        </div>

        <SearchInput
          defaultValue={searchQuery}
          basePath="/anime"
          placeholder="Search anime titles..."
        />

        <AnimeGrid
          animeData={animeListData}
          currentPage={currentPage}
          basePath="/anime"
          queryParams={{
            ...(searchQuery && { q: searchQuery }),
          }}
        />
      </section>

      <section className="container mx-auto pb-8 sm:pb-10 px-4">
        <div className="border border-primary-foreground p-4 rounded-lg">
          <GenreGrid genres={genresList} />
        </div>
      </section>
    </Suspense>
  );
}

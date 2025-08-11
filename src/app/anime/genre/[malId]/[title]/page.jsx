import { getAnime, getAnimeGenresList } from "@/hooks/anime";
import { AnimeGrid } from "@/components/display/anime/anime-grid";
import { Badge } from "@/components/ui/badge";
import { GenreGrid } from "@/components/display/anime/genre-grid";

export async function generateMetadata({ params }) {
  const { title } = await params;
  const genreName = title?.replace(/_/g, " ") || "Genre";

  return {
    title: `${genreName} Anime`,
    description: `Browse ${genreName} anime series and movies.`,
  };
}

export default async function AnimeGenrePage({ params, searchParams }) {
  const { malId, title } = await params;
  const genresList = await getAnimeGenresList();
  const currentPage = parseInt((await searchParams)?.page) || 1;
  const genreName = title?.replace(/_/g, " ") || "Genre";

  const apiConfig = {
    limit: 24,
    genres: malId,
  };

  const animeData = await getAnime(currentPage, apiConfig);

  const animeListData = animeData
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
    <>
      <section className="container mx-auto py-8 sm:py-10 px-4">
        <div className="text-center space-y-2 mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Genre
            </Badge>
          </div>
          <h1 className="text-2xl font-bold text-foreground capitalize">
            {genreName} Anime
          </h1>
          <p className="text-sm text-muted-foreground">
            Browse anime series and movies in the {genreName} genre
          </p>
        </div>

        <AnimeGrid
          animeData={animeListData}
          currentPage={currentPage}
          basePath={`/anime/genre/${malId}/${title}`}
          queryParams={{}}
        />
      </section>

      <section className="container mx-auto pb-8 sm:pb-10 px-4">
        <GenreGrid genres={genresList} />
      </section>
    </>
  );
}

import { getManga, getMangaGenresList } from "@/hooks/manga";
import { MangaGrid } from "@/components/display/manga/manga-grid";
import { Badge } from "@/components/ui/badge";
import { GenreGrid } from "@/components/display/anime/genre-grid";

export async function generateMetadata({ params }) {
  const { title } = await params;
  const genreName = title?.replace(/_/g, " ") || "Genre";

  return {
    title: `${genreName} Manga`,
    description: `Browse ${genreName} manga series.`,
  };
}

export default async function MangaGenrePage({ params, searchParams }) {
  const { malId, title } = await params;
  const genresList = await getMangaGenresList();
  const currentPage = parseInt((await searchParams)?.page) || 1;

  const genreName = title?.replace(/_/g, " ") || "Genre";

  const apiConfig = {
    limit: 24,
    genres: malId,
  };

  const mangaData = await getManga(currentPage, apiConfig);

  const mangaListData = mangaData
    ? {
        data:
          mangaData.data?.map((manga) => ({
            mal_id: manga.mal_id,
            title: manga.title,
            imageUrl: manga.images?.webp?.large_image_url,
            score: manga.score,
            chapters: manga.chapters,
            published: manga.published,
            type: manga.type,
            status: manga.status,
            members: manga.members,
          })) || [],
        totalPages: mangaData.totalPages,
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
            {genreName} Manga
          </h1>
          <p className="text-sm text-muted-foreground">
            Browse manga series in the {genreName} genre
          </p>
        </div>

        <MangaGrid
          mangaData={mangaListData}
          currentPage={currentPage}
          basePath={`/manga/genre/${malId}/${title}`}
          queryParams={{}}
        />
      </section>

      <section className="container mx-auto pb-8 sm:pb-10 px-4">
        <GenreGrid genres={genresList} />
      </section>
    </>
  );
}

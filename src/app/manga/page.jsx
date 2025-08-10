import { getManga, getMangaGenresList } from "@/hooks/manga";
import { getMangaSearch } from "@/hooks/search";
import { MangaGrid } from "@/components/display/manga/manga-grid";
import { MangaList } from "@/components/display/manga/manga-list";
import { SearchInput } from "@/components/forms/search-input";
import { GenreGrid } from "@/components/display/anime/genre-grid";
import { Separator } from "@/components/ui/separator";
import { MorimePagination } from "@/components/navigation/pagination";

export async function generateMetadata({ searchParams }) {
  const currentPage = parseInt((await searchParams)?.page) || 1;
  const searchQuery = (await searchParams)?.q || "";

  let title = "Manga List";
  if (searchQuery) {
    title = `Search: ${searchQuery}`;
  }
  if (currentPage > 1) {
    title += ` - Page ${currentPage}`;
  }

  return {
    title,
    description: searchQuery
      ? `Search results for "${searchQuery}" from our manga collection`
      : "Browse all manga series, movies, and specials from our extensive collection.",
  };
}

export default async function MangaPage({ searchParams }) {
  const currentPage = parseInt((await searchParams)?.page) || 1;
  const searchQuery = (await searchParams)?.q || "";
  const genresList = await getMangaGenresList();

  let mangaData;

  if (searchQuery) {
    const searchConfig = {
      limit: 24,
      q: searchQuery,
      sfw: true,
    };
    mangaData = await getMangaSearch(currentPage, searchConfig);
  } else {
    const apiConfig = {
      limit: 24,
      order_by: "favorites",
      sort: "desc",
    };
    mangaData = await getManga(currentPage, apiConfig);
  }

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
          <h1 className="text-2xl font-bold text-foreground">
            {searchQuery ? `Search: ${searchQuery}` : "Manga List"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : "Browse all manga series, movies, and specials from our extensive collection"}
          </p>
        </div>

        <SearchInput
          defaultValue={searchQuery}
          basePath="/manga"
          placeholder="Search manga titles..."
          autoFocus={true}
        />

        {searchQuery ? (
          <>
            <MangaList
              mangaData={mangaListData}
              currentPage={currentPage}
              basePath="/manga"
              queryParams={{
                ...(searchQuery && { q: searchQuery }),
              }}
            />

            {mangaListData &&
              mangaListData.data &&
              mangaListData.data.length > 0 && (
                <>
                  <Separator className="my-8" />
                  <MorimePagination
                    currentPage={currentPage}
                    totalPages={mangaListData.totalPages || 1}
                    basePath="/manga"
                    queryParams={{
                      ...(searchQuery && { q: searchQuery }),
                    }}
                  />
                </>
              )}
          </>
        ) : (
          <MangaGrid
            mangaData={mangaListData}
            currentPage={currentPage}
            basePath="/manga"
            queryParams={{
              ...(searchQuery && { q: searchQuery }),
            }}
          />
        )}
      </section>

      <section className="container mx-auto pb-8 sm:pb-10 px-4">
        <div className="border border-primary-foreground p-4 rounded-lg">
          <GenreGrid genres={genresList} />
        </div>
      </section>
    </>
  );
}

import { getManga, getMangaGenresList } from "@/hooks/manga";
import { getMangaSearch } from "@/hooks/search";
import { MangaList } from "@/components/display/manga/manga-list";
import { SearchInput } from "@/components/forms/search-input";
import { GenreGrid } from "@/components/display/manga/genre-grid";
import { Separator } from "@/components/ui/separator";
import { MorimePagination } from "@/components/navigation/pagination";
import { GenreCategories } from "@/components/display/manga/genre-categories";
import {
  PageContainer,
  PageHeader,
  ContentSection,
} from "@/components/layout/page-container";

export default async function MangaPageContent({ searchParams }) {
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
      <PageContainer as="section">
        <PageHeader
          title={searchQuery ? `Search: ${searchQuery}` : "Manga List"}
          description={
            searchQuery
              ? `Search results for "${searchQuery}"`
              : "Browse all manga series, movies, and specials from our extensive collection"
          }
        />

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
          <GenreCategories genres={genresList} />
        )}
      </PageContainer>

      {searchQuery && (
        <ContentSection>
          <GenreGrid genres={genresList} />
        </ContentSection>
      )}
    </>
  );
}

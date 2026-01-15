import { getAnime, getAnimeGenresList } from "@/hooks/anime";
import { getAnimeSearch } from "@/hooks/search";
import { AnimeList } from "@/components/display/anime/anime-list";
import { SearchInput } from "@/components/forms/search-input";
import { GenreGrid } from "@/components/display/anime/genre-grid";
import { Separator } from "@/components/ui/separator";
import { MorimePagination } from "@/components/navigation/pagination";
import { GenreCategories } from "../display/anime/genre-categories";
import {
  PageContainer,
  PageHeader,
  ContentSection,
} from "@/components/layout/page-container";

export default async function AnimePageContent({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt(resolvedSearchParams?.page) || 1;
  const searchQuery = resolvedSearchParams?.q || "";
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
      <PageContainer as="section">
        <PageHeader
          title={searchQuery ? `Search: ${searchQuery}` : "Anime List"}
          description={
            searchQuery
              ? `Search results for "${searchQuery}"`
              : "Browse all anime series, movies, and specials from extensive collection"
          }
        />

        <SearchInput
          defaultValue={searchQuery}
          basePath="/anime"
          placeholder="Search anime titles..."
          autoFocus={true}
        />

        {searchQuery ? (
          <>
            <AnimeList
              animeData={animeListData}
              currentPage={currentPage}
              basePath="/anime"
              queryParams={{
                ...(searchQuery && { q: searchQuery }),
              }}
            />

            {animeListData &&
              animeListData.data &&
              animeListData.data.length > 0 && (
                <>
                  <Separator className="my-8" />
                  <MorimePagination
                    currentPage={currentPage}
                    totalPages={animeListData.totalPages || 1}
                    basePath="/anime"
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

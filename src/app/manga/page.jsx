import { getManga } from "@/hooks/manga";
import { getMangaSearch } from "@/hooks/search";
import { MangaGrid } from "@/components/display/manga/manga-grid";
import { SearchInput } from "@/components/forms/search-input";
import { Suspense } from "react";
import { MangaListSkeleton } from "@/components/loading/manga-list-skeleton";

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

  return (
    <Suspense fallback={<MangaListSkeleton showSearch={true} />}>
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
        />

        <MangaGrid
          mangaData={mangaData}
          currentPage={currentPage}
          basePath="/manga"
          queryParams={{
            ...(searchQuery && { q: searchQuery }),
          }}
        />
      </section>
    </Suspense>
  );
}

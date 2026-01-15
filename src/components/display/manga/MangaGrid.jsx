import { MangaCard } from "@/components/display/manga/MangaCard";
import { Separator } from "@/components/ui/Separator";
import { MorimePagination } from "@/components/navigation/Pagination";
import { EmptyState } from "@/components/content/EmptyState";

export function MangaGrid({ mangaData, currentPage, basePath, queryParams }) {
  if (!mangaData || !mangaData.data || mangaData.data.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {mangaData.data.map((manga, i) => (
          <MangaCard
            key={`${manga.mal_id}-${i}`}
            manga={manga}
            priority={i < 24}
          />
        ))}
      </div>

      <Separator className="my-8" />

      <MorimePagination
        currentPage={currentPage}
        totalPages={mangaData.totalPages || 1}
        basePath={basePath}
        queryParams={queryParams}
      />
    </>
  );
}

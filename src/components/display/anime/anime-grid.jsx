import { AnimeCard } from "@/components/display/anime/anime-card";
import { Separator } from "@/components/ui/separator";
import { MorimePagination } from "@/components/navigation/pagination";
import { EmptyState } from "@/components/content/empty-state";

export function AnimeGrid({ animeData, currentPage, basePath, queryParams }) {
  if (!animeData || !animeData.data || animeData.data.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {animeData.data.map((anime, i) => (
          <AnimeCard key={anime.mal_id + i} anime={anime} priority={i < 24} />
        ))}
      </div>

      <Separator className="my-8" />

      <MorimePagination
        currentPage={currentPage}
        totalPages={animeData.totalPages || 1}
        basePath={basePath}
        queryParams={queryParams}
      />
    </>
  );
}

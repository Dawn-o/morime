import { AnimeCard } from "@/components/anime/anime-card";
import { Separator } from "@/components/ui/separator";
import { AnimePagination } from "@/components/anime/anime-pagination";
import { EmptyState } from "@/components/anime/empty-state";
import { Suspense } from "react";
import { AnimeCardSkeleton } from "@/components/skeleton/anime-card-skeleton";

export function AnimeGrid({ animeData, currentPage, basePath, queryParams }) {
  if (!animeData || !animeData.anime || animeData.anime.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {animeData.anime.map((anime, index) => (
          <Suspense key={anime.mal_id + index} fallback={<AnimeCardSkeleton />}>
            <AnimeCard anime={anime} priority={index < 6} />
          </Suspense>
        ))}
      </div>

      <Separator className="my-8" />

      <AnimePagination
        currentPage={currentPage}
        totalPages={animeData.pagination?.last_visible_page || 1}
        basePath={basePath}
        queryParams={queryParams}
      />
    </div>
  );
}
import { AnimeGridSkeleton } from "@/components/loading/anime-grid-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/layout/page-container";

export default function AiringAnimeLoading() {
  return (
    <PageContainer>
      <div className="text-center space-y-2 mb-8">
        <Skeleton className="h-8 w-56 mx-auto" />
        <Skeleton className="h-4 w-72 mx-auto" />
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-16 rounded-md" />
          ))}
        </div>
      </div>

      <AnimeGridSkeleton />
    </PageContainer>
  );
}

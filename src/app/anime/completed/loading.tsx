import { AnimeGridSkeleton } from "@/components/loading/AnimeGridSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";
import { PageContainer } from "@/components/layout/PageContainer";

export default function RecentlyCompletedAnimeLoading() {
  return (
    <PageContainer>
      <div className="text-center space-y-2 mb-8">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-4 w-64 mx-auto" />
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

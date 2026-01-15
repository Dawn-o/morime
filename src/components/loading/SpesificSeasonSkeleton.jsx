import { Skeleton } from "@/components/ui/Skeleton";
import { PageContainer } from "@/components/layout/PageContainer";
import { Separator } from "@/components/ui/Separator";

export function SpecificSeasonSkeleton() {
  return (
    <PageContainer as="section">
      <div className="text-center space-y-2 mb-8">
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-4 w-48 mx-auto" />
      </div>

      <div className="mb-6">
        <div className="hidden md:flex items-center justify-center gap-2 mb-4">
          <Skeleton className="h-8 w-8" />
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24" />
          ))}
          <Skeleton className="h-8 w-8" />
        </div>

        <div className="md:hidden overflow-x-auto mb-4">
          <div className="flex justify-center gap-2 pb-2 min-w-max px-1">
            <Skeleton className="h-8 w-8 shrink-0" />
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-24 shrink-0" />
            ))}
            <Skeleton className="h-8 w-8 shrink-0" />
          </div>
        </div>

        <Separator className="my-4" />
      </div>

      <div className="mb-4">
        <div className="hidden md:flex h-10 gap-1 px-1.5 py-1 mx-auto w-fit">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-16" />
          ))}
        </div>

        <div className="md:hidden overflow-x-auto">
          <div className="flex justify-center gap-2 pb-2 min-w-max px-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-16 shrink-0" />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-3/4 w-full rounded-md" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        ))}
      </div>

      <Separator className="my-8" />

      <div className="flex justify-center items-center gap-2">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-20" />
      </div>
    </PageContainer>
  );
}

import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function AnimeListSkeleton({ showSearch = true }) {
  return (
    <>
      <section className="container mx-auto py-8 sm:py-10 px-4">
        <div className="text-center space-y-2 mb-8">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>

        {showSearch && (
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-[3/4] w-full rounded-md" />
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
      </section>

      <section className="container mx-auto pb-8 sm:pb-10 px-4">
        <div className="border border-primary-foreground p-4 rounded-lg">
          <div className="flex items-center justify-center flex-wrap gap-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-16 rounded" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export { AnimeListSkeleton };

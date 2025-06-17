import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

function ProducerCardSkeleton() {
  return (
    <div className="p-4 border border-border rounded-lg">
      <div className="flex items-start space-x-4">
        <Skeleton className="w-16 h-16 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
    </div>
  );
}

export function ProducersPageSkeleton() {
  return (
    <section className="container mx-auto py-8 sm:py-10 px-4">
      {/* Header skeleton */}
      <div className="text-center space-y-2 mb-8">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-5 w-64 mx-auto" />
      </div>

      {/* Search input skeleton */}
      <div className="mb-8">
        <Skeleton className="h-10 w-full max-w-md mx-auto" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(24)].map((_, i) => (
          <ProducerCardSkeleton key={i} />
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
  );
}

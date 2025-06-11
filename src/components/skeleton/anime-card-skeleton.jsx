import { Skeleton } from "@/components/ui/skeleton";

export function AnimeCardSkeleton() {
  return (
    <div className="w-full h-auto aspect-[2/3] flex flex-col">
      <div className="w-full h-full overflow-hidden rounded-lg shadow-lg relative">
        <Skeleton className="w-full h-full" />
        
        <div className="absolute top-2 right-2 z-10">
          <Skeleton className="h-6 w-12 rounded" />
        </div>
      </div>

      <div className="pt-2">
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-3/4" />
        
        <div className="flex items-center mt-1 space-x-1">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-1 rounded-full" />
          <Skeleton className="h-3 w-8" />
        </div>
      </div>
    </div>
  );
}
import { Skeleton } from "@/components/ui/skeleton";

export function AnimeCardSkeleton() {
  return (
    <div className="group transition-all duration-300">
      <div className="w-full h-auto aspect-[2/3] flex flex-col">
        <div className="w-full h-full overflow-hidden rounded-lg shadow-lg relative">
          <Skeleton className="w-full h-full absolute" />
          <div className="absolute top-2 right-2 z-10">
            <Skeleton className="h-6 w-14 rounded" />
          </div>
        </div>

        <div className="pt-2">
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 w-3/4 mt-1" />
          
          <div className="flex items-center mt-1">
            <Skeleton className="h-3 w-16 mr-2" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
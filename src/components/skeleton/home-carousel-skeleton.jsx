import { Skeleton } from "@/components/ui/skeleton";

export function HomeCarouselSkeleton() {
  return (
    <div className="w-full h-[25vh] md:h-[40vh] lg:h-[60vh] rounded-lg overflow-hidden bg-muted/50">
      <div className="grid grid-cols-1 lg:grid-cols-3 h-full relative">
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 p-8 lg:col-span-2">
          <Skeleton className="hidden lg:block w-48 h-72 rounded-lg" />
          <div className="flex flex-col justify-end flex-1 space-y-3">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
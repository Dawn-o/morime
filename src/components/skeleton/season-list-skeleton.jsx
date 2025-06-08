import { Skeleton } from "@/components/ui/skeleton";

export function SeasonListSkeleton() {
  return (
    <section className="container mx-auto py-8 sm:py-10 px-4">
      <div className="text-center space-y-2 mb-8">
        <Skeleton className="h-8 w-72 mx-auto" />
        <Skeleton className="h-4 w-80 mx-auto" />
      </div>

      <div className="space-y-8">
        {Array.from({ length: 5 }).map((_, yearIndex) => (
          <div key={yearIndex} className="space-y-4">
            <Skeleton className="h-7 w-20" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, seasonIndex) => (
                <div key={seasonIndex} className="p-4 border rounded-lg space-y-3">
                  <Skeleton className="h-6 w-24" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <Skeleton className="h-9 w-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
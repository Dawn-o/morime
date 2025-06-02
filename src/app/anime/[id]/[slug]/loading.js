import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      {/* Hero Section Skeleton */}
      <section className="w-full h-[30vh] md:h-[40vh] relative bg-background">
        <div className="container mx-auto h-full">
          <div className="flex h-full items-end pb-8">
            <div className="flex gap-6 items-end">
              {/* Poster Skeleton */}
              <div className="hidden md:block">
                <Skeleton className="h-[200px] w-[140px] rounded-lg" />
              </div>
              
              {/* Title Skeleton */}
              <div>
                <Skeleton className="h-6 w-20 mb-2" />
                <Skeleton className="h-10 w-72 mb-1" />
                <Skeleton className="h-5 w-48 mb-3" />
                <div className="flex gap-3">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content Skeleton */}
      <section className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Skeleton */}
          <div className="md:col-span-1">
            {/* Mobile Poster Skeleton */}
            <div className="md:hidden mb-4 mx-auto w-[180px]">
              <Skeleton className="h-[250px] w-[180px] rounded-lg" />
            </div>
            
            {/* Info Table Skeleton */}
            <div className="bg-card rounded-lg p-4 shadow divide-y divide-border">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="py-2">
                  <Skeleton className="h-4 w-20 mb-1" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Main Content Skeleton */}
          <div className="md:col-span-3">
            {/* Synopsis Skeleton */}
            <div className="mb-8">
              <Skeleton className="h-7 w-32 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            
            {/* Episodes Skeleton */}
            <div className="mb-8">
              <Skeleton className="h-7 w-32 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {Array(6).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-md" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      {/* Hero Banner Section - Matching the enhanced layout */}
      <section className="w-full min-h-[45vh] md:min-h-[55vh] relative overflow-hidden bg-gradient-to-b from-background/60 via-background/80 to-background">
        {/* Background skeleton with gradient overlays */}
        <div className="absolute inset-0">
          <Skeleton className="h-full w-full opacity-25" />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent" />

        {/* Content with matching structure */}
        <div className="container mx-auto h-full relative z-10 px-4">
          <div className="flex h-full items-end pb-8 md:pb-10 pt-20 sm:pt-24">
            <div className="flex flex-col sm:flex-row w-full gap-5 sm:gap-8 items-center sm:items-start md:items-end">
              {/* Poster skeleton with matching dimensions */}
              <div className="flex flex-col items-center gap-2">
                <div className="h-[180px] w-[130px] sm:h-[210px] sm:w-[150px] lg:h-[250px] lg:w-[180px] 
                     rounded-lg overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.3)] shrink-0 
                     -mt-14 sm:-mt-18 md:-mt-24 sm:mb-0 ring-2 ring-white/10 bg-card">
                  <Skeleton className="h-full w-full" />
                </div>
                
                {/* Add to List button skeleton (hidden on mobile) */}
                <div className="hidden sm:block w-full">
                  <Skeleton className="h-7 w-full rounded-md" />
                </div>
              </div>

              {/* Title section with matching layout */}
              <div className="flex-1 text-center sm:text-left max-w-full">
                {/* Type and status badges */}
                <div className="flex items-center justify-center sm:justify-start flex-wrap gap-2 mb-2 sm:mb-3">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>

                {/* Title skeleton */}
                <Skeleton className="h-8 sm:h-9 md:h-10 lg:h-12 w-4/5 mx-auto sm:mx-0 mb-1 sm:mb-2" />
                
                {/* English Title skeleton */}
                <Skeleton className="h-4 sm:h-5 w-3/5 mx-auto sm:mx-0 mb-2" />

                {/* Quick stats badges */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-y-2 gap-x-3 mt-3 mb-4">
                  {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="h-6 w-20 rounded-full" />
                  ))}
                </div>

                {/* Detailed stats display */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                  {[1, 2, 3, 4].map(i => (
                    <Skeleton key={i} className="h-20 rounded-lg" />
                  ))}
                </div>

                {/* Add to List button skeleton (mobile only) */}
                <div className="mt-4 flex sm:hidden">
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="container mx-auto py-8 sm:py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8">
          {/* Left Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-card rounded-xl p-4 shadow-lg border border-border/40 divide-y divide-border/60">
              {/* Alternative titles */}
              <div className="py-3">
                <Skeleton className="h-5 w-32 mb-2" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20 mb-1" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-20 mb-1" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>

              {/* Basic Info */}
              <div className="py-3">
                <Skeleton className="h-5 w-24 mb-2" />
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="flex justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Credits */}
              <div className="py-3">
                <Skeleton className="h-5 w-20 mb-2" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-24 mb-1.5" />
                    <div className="flex flex-wrap gap-1.5">
                      {[1, 2, 3].map(i => (
                        <Skeleton key={i} className="h-6 w-16 rounded-md" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="py-3">
                <Skeleton className="h-5 w-20 mb-2" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-16 mb-1" />
                    <div className="flex flex-wrap gap-1">
                      {[1, 2, 3, 4].map(i => (
                        <Skeleton key={i} className="h-6 w-14 rounded-md" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="py-3">
                <Skeleton className="h-5 w-24 mb-2" />
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  {[1, 2, 3, 4].map(i => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3">
            {/* Synopsis */}
            <div className="bg-card rounded-xl p-5 shadow-lg border border-border/40 mb-6 sm:mb-8">
              <Skeleton className="h-6 sm:h-7 w-28 mb-3 sm:mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>

            {/* Trailer Section */}
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-border/30 mb-6 sm:mb-8">
              <Skeleton className="h-6 sm:h-7 w-24 mb-3 sm:mb-4" />
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <Skeleton className="h-full w-full" />
              </div>
            </div>

            {/* Theme Songs Section */}
            <div className="mb-6 sm:mb-8">
              <Skeleton className="h-6 sm:h-7 w-32 mb-2 sm:mb-4" />
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-5 w-36 mb-1" />
                  <div className="space-y-1">
                    {[1, 2, 3].map(i => (
                      <Skeleton key={i} className="h-4 w-full pl-2" />
                    ))}
                  </div>
                </div>
                <div>
                  <Skeleton className="h-5 w-36 mb-1" />
                  <div className="space-y-1">
                    {[1, 2].map(i => (
                      <Skeleton key={i} className="h-4 w-full pl-2" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Episodes Section */}
            <div className="bg-card rounded-xl p-5 shadow-lg border border-border/40 mb-6 sm:mb-8">
              <Skeleton className="h-6 sm:h-7 w-28 mb-3 sm:mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                {Array(9).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded-md" />
                ))}
              </div>
              <Skeleton className="h-9 w-full mt-4 rounded-md" />
            </div>

            {/* Related Anime */}
            <div className="mb-6 sm:mb-8">
              <Skeleton className="h-6 sm:h-7 w-32 mb-2 sm:mb-4" />
              <div className="space-y-1.5 sm:space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-card rounded-md p-2 sm:p-3">
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
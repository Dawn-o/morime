import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <section className="w-full h-[40vh] sm:h-[35vh] md:h-[40vh] relative overflow-hidden bg-gradient-to-b from-background/80 to-background">
        <div className="absolute inset-0 bg-card/10"></div>

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />

        <div className="container mx-auto h-full relative z-10 px-4">
          <div className="flex h-full items-end pb-6 md:pb-8 pt-14 sm:pt-0">
            <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-6 items-center sm:items-start md:items-end">
              <div className="h-[170px] w-[120px] sm:h-[200px] sm:w-[140px] lg:h-[240px] lg:w-[170px] 
                            rounded-lg overflow-hidden shadow-xl shrink-0 -mt-16 sm:mt-0 sm:mb-0 
                            ring-2 ring-white/10 bg-card">
                <Skeleton className="h-full w-full" />
              </div>

              <div className="flex-1 text-center sm:text-left max-w-full">
                <div className="flex items-center justify-center sm:justify-start flex-wrap gap-1.5 mb-1.5 sm:mb-2">
                  <Skeleton className="h-5 w-14 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>

                <Skeleton className="h-7 sm:h-8 md:h-9 lg:h-10 w-4/5 mx-auto sm:mx-0 mb-1" />

                <Skeleton className="h-4 sm:h-5 w-3/5 mx-auto sm:mx-0 mb-3" />

                <div className="flex flex-wrap justify-center sm:justify-start gap-y-1.5 gap-x-2 mt-2 sm:mt-3">
                  {[1, 2, 3, 4].map(i => (
                    <Skeleton key={i} className="h-6 w-16 sm:w-20 rounded-full" />
                  ))}
                </div>

                <div className="mt-3 sm:mt-6 flex justify-center sm:justify-start gap-2">
                  <Skeleton className="h-8 w-20 sm:w-24 rounded-md" />
                  <Skeleton className="h-8 w-24 sm:w-32 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-6 sm:py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="md:col-span-1">
            <div className="bg-card rounded-lg p-3 sm:p-4 shadow-sm sm:shadow divide-y divide-border">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="py-1.5 sm:py-2">
                  <Skeleton className="h-4 w-16 mb-1" />
                  <Skeleton className="h-4 w-28" />
                </div>
              ))}

              <div className="py-1.5 sm:py-2">
                <Skeleton className="h-4 w-16 mb-1" />
                <div className="flex flex-wrap gap-1 mt-1">
                  {[1, 2, 3, 4].map(i => (
                    <Skeleton key={i} className="h-5 w-12 rounded-md" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="mb-6 sm:mb-8">
              <Skeleton className="h-6 sm:h-7 w-24 sm:w-28 mb-2 sm:mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <Skeleton className="h-6 sm:h-7 w-24 sm:w-28 mb-2 sm:mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {Array(6).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded-md" />
                ))}
              </div>
              <Skeleton className="h-9 w-full mt-4 rounded-md" />
            </div>

            <div className="mb-6 sm:mb-8">
              <Skeleton className="h-6 sm:h-7 w-32 mb-2 sm:mb-4" />
              <div className="space-y-1.5 sm:space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-card/50 rounded-md p-2 sm:p-3">
                    <Skeleton className="h-5 w-24 mb-1" />
                    <Skeleton className="h-4 w-3/4" />
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
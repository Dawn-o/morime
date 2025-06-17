import { Skeleton } from "@/components/ui/skeleton";

export default function DetailAnimeSkeleton() {
  return (
    <>
      <section className="w-full min-h-[45vh] md:min-h-[55vh] relative overflow-hidden bg-gradient-to-b from-background/60 via-background/80 to-background">
        <div className="absolute inset-0">
          <Skeleton className="h-full w-full opacity-25" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent" />

        <div className="container mx-auto h-full relative z-10 px-4">
          <div className="flex h-full items-end pb-8 md:pb-10 pt-20 sm:pt-24">
            <div className="flex flex-col sm:flex-row w-full gap-5 sm:gap-8 items-center sm:items-start md:items-end">
              <div className="flex flex-col items-center gap-2">
                <div className="h-[180px] w-[130px] sm:h-[210px] sm:w-[150px] lg:h-[250px] lg:w-[180px] rounded-lg overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.3)] shrink-0 -mt-14 sm:-mt-18 md:-mt-24 sm:mb-0 ring-2 ring-white/10 bg-card">
                  <Skeleton className="h-full w-full" />
                </div>

                <div className="hidden sm:block w-full">
                  <Skeleton className="h-7 w-full rounded-md" />
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left max-w-full">
                <div className="flex items-center justify-center sm:justify-start flex-wrap gap-2 mb-2 sm:mb-3">
                  <Skeleton className="h-6 w-12 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>

                <Skeleton className="h-8 sm:h-9 md:h-10 lg:h-12 w-4/5 mx-auto sm:mx-0 mb-1 sm:mb-2" />

                <Skeleton className="h-4 sm:h-5 w-3/5 mx-auto sm:mx-0 mb-2" />

                <div className="flex flex-wrap justify-center sm:justify-start gap-y-2 gap-x-3 mt-3 mb-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-6 w-20 rounded-full" />
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="bg-card/40 backdrop-blur-sm rounded-lg p-3 border border-border/20 flex flex-col items-center justify-center"
                    >
                      <Skeleton className="h-3 w-16 mb-1" />
                      <Skeleton className="h-6 w-12" />
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex sm:hidden">
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto pb-8 sm:pb-10 px-4 -mt-0 md:-mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="py-0 shadow-lg border-border/40 rounded-xl bg-card">
              <div className="p-4 space-y-0 divide-y divide-border/60">
                <div className="py-3">
                  <Skeleton className="h-4 w-32 mb-1.5" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-16 mb-1" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-20 mb-1" />
                    <div className="space-y-0.5">
                      <Skeleton className="h-4 w-4/5" />
                      <Skeleton className="h-4 w-3/5" />
                    </div>
                  </div>
                </div>

                <div className="py-3">
                  <Skeleton className="h-4 w-20 mb-1.5" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="py-3">
                  <Skeleton className="h-4 w-16 mb-1.5" />
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <Skeleton className="h-3 w-12" />
                        <div className="flex flex-wrap gap-1.5 justify-end">
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="py-3">
                  <Skeleton className="h-4 w-16 mb-1.5" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <Skeleton className="h-3 w-14" />
                        <div className="flex flex-wrap gap-1.5 justify-end">
                          {[1, 2].map((j) => (
                            <Skeleton key={j} className="h-5 w-12" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="py-3">
                  <Skeleton className="h-4 w-20 mb-1.5" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-6 sm:space-y-8">
              <div className="shadow-lg border-border/40 rounded-xl bg-card">
                <div className="-mt-2 -mb-4 p-5 pb-1">
                  <div className="flex items-center gap-2 text-lg sm:text-xl">
                    <span className="w-1.5 h-5 bg-primary rounded-full mr-1.5"></span>
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
                <div className="p-5 pt-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              </div>

              <div className="shadow-lg border-border/30 bg-card/80 backdrop-blur-sm rounded-xl">
                <div className="-mt-2 -mb-4 p-5 pb-1">
                  <div className="flex items-center gap-2 text-lg sm:text-xl">
                    <span className="w-1.5 h-5 bg-red-500 rounded-full mr-1.5"></span>
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
                <div className="p-5 pt-4">
                  <div className="aspect-video w-full rounded-lg overflow-hidden shadow-xl">
                    <Skeleton className="h-full w-full" />
                  </div>
                </div>
              </div>

              <div className="shadow-lg border-border/40 rounded-xl bg-card">
                <div className="-mt-2 -mb-4 p-5 pb-1">
                  <div className="flex items-center justify-between text-lg sm:text-xl">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-5 bg-primary rounded-full mr-1.5"></span>
                      <Skeleton className="h-6 w-48" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
                <div className="p-5 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array(8)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border/50"
                        >
                          <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
                          <div className="flex-1 min-w-0 space-y-1">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-3 w-3/4" />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="shadow-lg border-border/40 rounded-xl bg-card">
                <div className="-mt-2 -mb-4 p-5 pb-1">
                  <div className="flex items-center gap-2 text-lg sm:text-xl">
                    <span className="w-1.5 h-5 bg-primary rounded-full mr-1.5"></span>
                    <Skeleton className="h-6 w-28" />
                  </div>
                </div>
                <div className="p-5 pt-4">
                  <div className="space-y-4">
                    <div>
                      <Skeleton className="h-4 w-32 mb-1" />
                      <div className="space-y-1">
                        {[1, 2].map((i) => (
                          <div
                            key={i}
                            className="pl-2 border-l-2 border-primary/30"
                          >
                            <Skeleton className="h-3 w-full" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Skeleton className="h-4 w-28 mb-1" />
                      <div className="space-y-1">
                        {[1, 2].map((i) => (
                          <div
                            key={i}
                            className="pl-2 border-l-2 border-primary/30"
                          >
                            <Skeleton className="h-3 w-full" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="shadow-lg border-border/40 rounded-xl bg-card">
                <div className="-mt-2 -mb-4 p-5 pb-1">
                  <div className="flex items-center gap-2 text-lg sm:text-xl">
                    <span className="w-1.5 h-5 bg-primary rounded-full mr-1.5"></span>
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
                <div className="p-5 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                    {Array(12)
                      .fill(0)
                      .map((_, i) => (
                        <Skeleton key={i} className="h-16 rounded-md" />
                      ))}
                  </div>
                  <Skeleton className="h-9 w-full mt-4 rounded-md" />
                </div>
              </div>

              <div className="shadow-lg border-border/40 rounded-xl bg-card">
                <div className="-mt-2 -mb-4 p-5 pb-1">
                  <div className="flex items-center gap-2 text-lg sm:text-xl">
                    <span className="w-1.5 h-5 bg-primary rounded-full mr-1.5"></span>
                    <Skeleton className="h-6 w-32" />
                  </div>
                </div>
                <div className="p-5 pt-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="bg-muted/50 rounded-md p-2 sm:p-3"
                      >
                        <Skeleton className="h-4 w-32 mb-1" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

function HomeCarouselSkeleton() {
  return (
    <div className="relative overflow-hidden">
      <div className="relative h-[25vh] md:h-[40vh] lg:h-[60vh]">
        <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-3 z-0">
          <div className="hidden lg:block bg-background"></div>
          <div className="relative h-full lg:col-span-2">
            <Skeleton className="w-full h-full" />
            <div className="absolute inset-0 -left-1 bg-gradient-to-t lg:bg-gradient-to-r from-background from-15% lg:from-1% via-background/90 via-30% lg:via-5% to-transparent to-70% lg:to-100%"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 h-full relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 p-0 lg:p-8 z-20 lg:col-span-2">
            <div className="hidden lg:block w-48 h-72 flex-shrink-0">
              <Skeleton className="w-full h-full rounded-lg" />
            </div>

            <div className="flex flex-col justify-end pb-9 lg:pb-0 lg:justify-center flex-1">
              <div className="mb-3">
                <Skeleton className="h-6 w-20 rounded" />
              </div>
              <Skeleton className="h-8 lg:h-12 w-3/4 mb-2" />
              <Skeleton className="h-4 lg:h-6 w-1/2 mb-3" />
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-16 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-2 h-2 rounded-full" />
        ))}
      </div>
    </div>
  );
}

function SectionHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-48" />
      </div>
      <Skeleton className="h-5 w-16" />
    </div>
  );
}

function AnimeCarouselSkeleton() {
  return (
    <div className="relative">
      <div className="flex gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="basis-1/3 md:basis-1/4 lg:basis-1/6">
            <div className="w-full h-auto aspect-[2/3] flex flex-col">
              <div className="w-full h-full overflow-hidden rounded-lg shadow-lg relative">
                <Skeleton className="w-full h-full" />
                <div className="absolute top-2 right-2">
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
          </div>
        ))}
      </div>
      {/* Carousel navigation (hidden on mobile) */}
      <div className="hidden lg:block">
        <div className="absolute top-1/2 -left-12 transform -translate-y-1/2">
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
        <div className="absolute top-1/2 -right-12 transform -translate-y-1/2">
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function GenreGridSkeleton() {
  return (
    <div className="flex items-center justify-center flex-wrap gap-2">
      {[...Array(15)].map((_, i) => (
        <Skeleton key={i} className="h-8 w-16 rounded" />
      ))}
    </div>
  );
}

export function HomePageSkeleton() {
  return (
    <main className="container mx-auto min-h-screen pb-12">
      {/* Hero Carousel Section */}
      <section className="mb-12">
        <HomeCarouselSkeleton />
      </section>

      {/* Top Rated Section */}
      <section className="mb-12">
        <div className="container px-4 mx-auto">
          <SectionHeaderSkeleton />
          <AnimeCarouselSkeleton />
        </div>
      </section>

      {/* Ongoing Anime Section */}
      <section className="mb-12">
        <div className="container px-4 mx-auto">
          <SectionHeaderSkeleton />
          <AnimeCarouselSkeleton />
        </div>
      </section>

      {/* Genres Section */}
      <section>
        <div className="container px-4 mx-auto">
          <div className="border border-primary-foreground p-4 rounded-lg">
            <GenreGridSkeleton />
          </div>
        </div>
      </section>
    </main>
  );
}

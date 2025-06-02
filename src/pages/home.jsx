import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { HomeCarousel } from "@/components/fragments/carousel";
import { getAnime, getUpcomingAnime } from "@/hooks/anime";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default async function HomePage() {
  const apiConfig = { type: "seasons/now?filter=tv", limit: 24 };

  const carouselItemsPromise = getUpcomingAnime();
  const animesPromise = getAnime(1, apiConfig);

  const [carouselItems, animes] = await Promise.all([
    carouselItemsPromise,
    animesPromise,
  ]);

  return (
    <>
      <Suspense
        fallback={
          <Skeleton className="w-full h-[25vh] md:h-[40vh] lg:h-[60vh] rounded-lg" />
        }
      >
        <div className="bg-primary-foreground">
          <HomeCarousel items={carouselItems} />
          <Separator />
          <div className="w-full relative p-4 md:p-8">
            <h1 className="text-2xl font-bold pb-6">Ongoing Anime</h1>
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {animes.data.map((anime) => (
                <div
                  className="w-full md:max-w-[15rem] h-auto aspect-[2/3]"
                  key={anime.mal_id * 0.1 * Math.random()}
                >
                  <div className="w-full h-full overflow-hidden rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.3)] relative">
                    <Image
                      src={anime.images.webp.image_url}
                      alt={anime.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 15rem"
                    />
                  </div>
                  <p className="text-sm lg:text-base pt-1 truncate">
                    {anime.title}
                  </p>
                  <div className="text-sm text-muted-foreground truncate">
                    {anime.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}

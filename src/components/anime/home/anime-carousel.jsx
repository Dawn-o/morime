import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AnimeCard } from "@/components/display/anime/anime-card";

export function AnimeCarousel({ animes }) {
  return (
    <div className="relative">
      <Carousel opts={{ align: "start" }}>
        <div className="flex items-center">
          <div className="hidden lg:block shrink-0">
            <CarouselPrevious className="relative h-12 w-12 translate-y-0 left-10 top-0 backdrop-blur-3xl z-10 bg-transparent cursor-pointer" />
          </div>
          <CarouselContent>
            {animes.map((anime, i) => (
              <CarouselItem
                key={anime.mal_id + i}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
              >
                <AnimeCard anime={anime} priority={i < 6} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-14 h-[88%] bg-linear-to-r from-background to-transparent pointer-events-none rounded-l-lg" />
          <div className="hidden lg:block absolute right-8 top-0 bottom-0 w-14 h-[88%] bg-linear-to-l from-background to-transparent pointer-events-none rounded-r-lg" />

          <div className="hidden lg:block shrink-0">
            <CarouselNext className="relative h-12 w-12 translate-y-0 right-6 top-0 backdrop-blur-3xl z-10 bg-transparent cursor-pointer" />
          </div>
        </div>
      </Carousel>
    </div>
  );
}

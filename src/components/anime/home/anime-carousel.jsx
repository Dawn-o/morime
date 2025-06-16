import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AnimeCard } from "@/components/anime/anime-card";

export function AnimeCarousel({ animes }) {
  return (
    <Carousel opts={{ align: "start" }}>
      <CarouselContent>
        {animes.map((anime, i) => (
          <CarouselItem
            key={anime.mal_id + i}
            className="basis-1/3 md:basis-1/4 lg:basis-1/6"
          >
            <AnimeCard anime={anime} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden lg:block">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}

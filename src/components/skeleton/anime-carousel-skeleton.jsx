import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AnimeCardSkeleton } from "@/components/skeleton/anime-card-skeleton";

export function AnimeCarouselSkeleton({ count = 6 }) {
  return (
    <Carousel opts={{ align: "start" }}>
      <CarouselContent>
        {Array(count).fill(0).map((_, i) => (
          <CarouselItem
            key={i}
            className="basis-1/3 md:basis-1/4 lg:basis-1/6"
          >
            <AnimeCardSkeleton />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
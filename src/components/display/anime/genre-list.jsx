import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { toSnakeCase } from "@/lib/utils/formatter";

export function GenreList({ genres }) {
  return (
    <div className="relative">
      <Carousel opts={{ align: "start" }}>
        <div className="flex items-center">
          <div className="shrink-0">
            <CarouselPrevious className="relative h-8 w-8 translate-y-0 left-0 top-0" />
          </div>

          <div className="flex-1 relative overflow-hidden">
            <CarouselContent>
              {genres.map((genre) => (
                <CarouselItem key={genre.mal_id} className="basis-auto pl-2">
                  <Link
                    href={`/anime/genre/${genre.mal_id}/${toSnakeCase(genre.name)}`}
                  >
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-xs cursor-pointer uppercase whitespace-nowrap"
                    >
                      {genre.name}
                    </Button>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-background to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-background to-transparent pointer-events-none z-10" />
          </div>

          <div className="shrink-0">
            <CarouselNext className="relative h-8 w-8 translate-y-0 right-0 top-0" />
          </div>
        </div>
      </Carousel>
    </div>
  );
}

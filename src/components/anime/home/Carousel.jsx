"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Fade from "embla-carousel-fade";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/Cn";
import { toSnakeCase } from "@/lib/utils/Formatter";
import { Link } from "@/components/ui/Link";
import { getYouTubeThumbnail } from "@/lib/utils/Youtube";

export function HomeCarousel({ items }) {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugin = useRef(Fade({ delay: 2500, stopOnInteraction: true }));

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const goToSlide = (i) => {
    api?.scrollTo(i);
  };

  if (!items.length) return null;

  return (
    <div className="relative overflow-hidden rounded-lg">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {items.map((item, i) => (
            <CarouselItem
              key={`${item.mal_id}-${i}`}
              className="relative h-87.5 md:h-100 lg:h-137.5"
            >
              <Link
                href={`/anime/${item.mal_id}/${toSnakeCase(item.title)}`}
                className="absolute inset-0 z-30 cursor-pointer"
                aria-label={`View details for ${item.title}`}
              />

              <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-3 z-0">
                <div className="hidden lg:block bg-background lg:col-span-1"></div>

                <div className="relative h-full lg:col-span-2">
                  {item.trailerUrl ? (
                    <Image
                      src={getYouTubeThumbnail(item.trailerUrl, "maxres")}
                      alt={`${item.title} background`}
                      fill
                      className="object-cover"
                      priority={i === 0}
                      quality={85}
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted/50"></div>
                  )}
                  <div className="absolute inset-0 -left-1 bg-linear-to-t lg:bg-linear-to-r from-background from-15% lg:from-1% via-background/90 via-30% lg:via-5% to-transparent to-70% lg:to-100%"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 h-full relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end gap-6 p-0 lg:p-8 z-20 lg:col-span-2">
                  <div className="hidden lg:block w-48 h-72 shrink-0">
                    <div className="w-full h-full overflow-hidden rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.3)] relative">
                      {item.imageUrl && (
                        <Image
                          src={item.imageUrl}
                          alt={`${item.title} cover`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col justify-end pb-9 lg:pb-0 lg:justify-center flex-1">
                    {item.status && (
                      <div className="mb-3">
                        <Badge
                          variant="secondary"
                          className="bg-amber-400/90 text-black hover:bg-amber-400"
                        >
                          {item.status === "Currently Airing"
                            ? "Airing"
                            : item.status === "Not yet aired"
                              ? "Upcoming"
                              : "Completed"}
                        </Badge>
                      </div>
                    )}

                    <h2 className="text-xl lg:text-4xl font-bold text-foreground truncate mr-10">
                      {item.title}
                    </h2>
                    {item.title_japanese && (
                      <div className="text-sm lg:text-base font-normal text-muted-foreground mt-1">
                        {item.title_japanese}
                      </div>
                    )}

                    {item.genres && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {item.genres.map((genre, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs border-border"
                          >
                            {genre.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {items.map((_, i) => (
            <Button
              key={i}
              onClick={() => goToSlide(i)}
              variant="ghost"
              size="icon"
              className={cn(
                "w-2 h-2 p-0 rounded-full transition-all",
                i === current
                  ? "bg-primary w-6"
                  : "bg-primary/40 hover:bg-primary/30",
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

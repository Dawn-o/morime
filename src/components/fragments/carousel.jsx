"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, toSnakeCase } from "@/lib/utils";
import Link from "next/link";

export function HomeCarousel({ items = [] }) {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugin = useRef(Autoplay({ delay: 2500, stopOnInteraction: true }));

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

  const goToSlide = (index) => {
    api?.scrollTo(index);
  };

  if (!items.length) return null;

  return (
    <div className="dark relative overflow-hidden">
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
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className="relative h-[25vh] md:h-[40vh] lg:h-[60vh]"
            >
              {/* Background elements with split design */}
              <Link
                href={`/anime/${item.mal_id}/${toSnakeCase(item.title)}`}
                className="absolute inset-0 z-30 cursor-pointer"
                aria-label={`View details for ${item.title}`}
              />

              <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-3 z-0">
                {/* Left side - Gradient background */}
                <div className="hidden lg:block bg-primary-foreground"></div>

                {/* Right side - Image background */}
                <div className="relative h-full lg:col-span-2">
                  {item.trailer?.images?.maximum_image_url ? (
                    <Image
                      src={item.trailer.images.maximum_image_url}
                      alt={`${item.title} background`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      quality={85}
                      sizes="1024px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-900/50"></div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 -left-1 bg-gradient-to-t lg:bg-gradient-to-r from-primary-foreground from-15% lg:from-1% via-primary-foreground/90 via-30% lg:via-5% to-transparent to-70% lg:to-100%"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 h-full relative z-10">
                {/* Left side - Anime details */}
                <div className="flex flex-col lg:flex-row lg:items-end gap-6 p-0 lg:p-8 z-20 lg:col-span-2">
                  {/* Left poster image */}
                  <div className="hidden lg:block w-48 h-72 flex-shrink-0">
                    <div className="w-full h-full overflow-hidden rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.3)] relative">
                      {item.images?.webp?.large_image_url && (
                        <Image
                          src={item.images.webp.large_image_url}
                          alt={`${item.title} cover`}
                          fill
                          className="object-cover"
                          sizes="1024px"
                        />
                      )}
                    </div>
                  </div>

                  {/* Right side - Anime details */}
                  <div className="flex flex-col justify-end pb-9 lg:pb-0 lg:justify-center flex-1">
                    {/* Status badge */}
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

                    {/* Genres */}
                    {item.genres && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {item.genres.slice(0, 3).map((genre, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs border-gray-700"
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

      {/* Custom Indicators */}
      {items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {items.map((_, index) => (
            <Button
              key={index}
              onClick={() => goToSlide(index)}
              variant="ghost"
              size="icon"
              className={cn(
                "w-2 h-2 p-0 rounded-full transition-all",
                index === current
                  ? "bg-primary w-6"
                  : "bg-primary/40 hover:bg-primary/30"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

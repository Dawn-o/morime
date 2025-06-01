"use client";
import { useEffect, useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Play, Clock, Star, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroCarousel({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }));
  const carouselRef = useRef(null);
  const [api, setApi] = useState(null);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    setActiveIndex(api.selectedScrollSnap());

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const scrollTo = (index) => {
    if (!api) return;
    api.scrollTo(index);
  };

  return (
    <div className="container h-[550px] xs:h-[600px] sm:h-[500px] md:h-[600px] lg:h-[650px] relative overflow-hidden px-3 sm:px-6">
      <Carousel
        ref={carouselRef}
        plugins={[plugin.current]}
        className="w-full h-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        setApi={setApi}
      >
        <CarouselContent className="h-full">
          {items.map((carouselItem, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative w-full h-full overflow-hidden rounded-lg">
                {/* Gradient Overlay - Enhanced for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent/10 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent z-10" />

                {/* Background Image */}
                <Image
                  src={
                    carouselItem.trailer?.images?.maximum_image_url ||
                    carouselItem.images.jpg.large_image_url
                  }
                  alt={carouselItem.title}
                  width={1920}
                  height={1080}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 85vw"
                  className="object-cover object-center opacity-90"
                  priority={index === 0}
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 flex items-end md:items-center p-4 sm:p-6 md:p-10 lg:p-12">
                  <div className="container mx-auto grid md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr] gap-6 md:gap-8 items-end md:items-center">
                    {/* Poster Image */}
                    <div className="hidden md:block relative group">
                      <div className="relative overflow-hidden rounded-lg shadow-2xl h-[350px] lg:h-[450px] w-full">
                        <Image
                          src={carouselItem.images.jpg.large_image_url}
                          alt={carouselItem.title}
                          fill
                          sizes="(max-width: 768px) 240px, 300px"
                          className="rounded-lg transform transition-transform duration-500 group-hover:scale-105 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Button
                            variant="default"
                            size="icon"
                            className="rounded-full bg-primary/90 hover:bg-primary"
                          >
                            <Play className="h-5 w-5 md:h-6 md:w-6" />
                          </Button>
                        </div>
                      </div>
                      <div className="absolute -right-3 -bottom-3 md:-right-4 md:-bottom-4 bg-background/80 backdrop-blur-sm px-2 py-1.5 md:px-3 md:py-2 rounded-lg shadow-lg">
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="fill-yellow-500 stroke-yellow-500 h-3.5 w-3.5 md:h-4 md:w-4" />
                          <span className="font-bold text-sm md:text-base">
                            {carouselItem.score || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 text-foreground space-y-2 md:space-y-4 max-w-full">
                      <div className="flex flex-wrap gap-1.5 md:gap-2 mb-1 md:mb-2">
                        <Badge
                          variant="secondary"
                          className="bg-primary text-primary-foreground text-xs md:text-sm"
                        >
                          {carouselItem.status || "Upcoming"}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-muted-foreground/30 text-xs md:text-sm"
                        >
                          <Clock className="mr-1 h-3 w-3" />{" "}
                          {carouselItem.duration || "24 min"}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-muted-foreground/30 text-xs md:text-sm"
                        >
                          {carouselItem.rating || "PG-13"}
                        </Badge>
                      </div>

                      <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold tracking-tight line-clamp-2">
                        {carouselItem.title}
                      </h1>

                      <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl line-clamp-1">
                        {carouselItem.title_japanese}
                      </p>

                      <p className="hidden sm:block text-xs md:text-sm text-muted-foreground max-w-2xl line-clamp-2 md:line-clamp-3">
                        {carouselItem.synopsis || "No synopsis available."}
                      </p>

                      <div className="flex gap-1.5 md:gap-2 flex-wrap mt-2 md:mt-4">
                        {carouselItem.genres?.slice(0, 3).map((genre, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-muted/50 hover:bg-muted text-xs md:text-sm"
                          >
                            {genre.name}
                          </Badge>
                        )) || (
                          <>
                            <Badge variant="secondary" className="bg-muted/50 text-xs md:text-sm">
                              Action
                            </Badge>
                            <Badge variant="secondary" className="bg-muted/50 text-xs md:text-sm">
                              Adventure
                            </Badge>
                            <Badge variant="secondary" className="bg-muted/50 text-xs md:text-sm">
                              Fantasy
                            </Badge>
                          </>
                        )}
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Button variant="outline" className="gap-1.5 h-8 md:h-10 text-xs md:text-sm">
                          <Info className="h-3.5 w-3.5 md:h-4 md:w-4" /> More Info
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Controls - Adjusted positioning and visibility */}
        <div className="absolute z-10 right-2 bottom-2 sm:right-4 sm:bottom-4 md:right-12 md:bottom-6 lg:right-16 lg:bottom-8">
          <CarouselPrevious className="h-7 w-7 sm:h-8 sm:w-8 rounded-full opacity-70 hover:opacity-100 mr-1" />
          <CarouselNext className="h-7 w-7 sm:h-8 sm:w-8 rounded-full opacity-70 hover:opacity-100" />
        </div>

        {/* Dots Indicator - Smaller on mobile */}
        <div className="absolute z-30 bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 sm:w-8 bg-primary"
                  : "w-1.5 sm:w-2 bg-foreground/30 hover:bg-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
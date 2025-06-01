"use client";
import { useEffect, useState } from "react";
import { getCarouselAnime } from "@/hooks/anime";
import { HeroCarousel } from "@/components/fragments/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export function HomePage() {
  const [carousel, setCarousel] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCarouselAnime((data) => {
      setCarousel(data);
      setTimeout(() => {
        setLoading(false);
      }, 600);
    });
  }, []);

  return (
    <>
      {/* Hero Carousel */}
      {loading ? (
        <div className="container h-[600px] sm:h-[500px] md:h-[600px] lg:h-[650px] relative overflow-hidden">
          <div className="w-full h-full rounded-lg relative">
            {/* Background skeleton */}
            <Skeleton className="w-full h-full rounded-lg absolute" />

            {/* Content skeleton with responsive grid */}
            <div className="absolute inset-0 z-10 flex items-end md:items-center p-6 md:p-12">
              <div className="container mx-auto grid md:grid-cols-[300px_1fr] gap-8">
                {/* Poster skeleton - hidden on mobile */}
                <div className="hidden md:block">
                  <Skeleton className="w-[300px] h-[450px] rounded-lg" />
                </div>

                {/* Text content skeletons */}
                <div className="space-y-4 w-full">
                  <div className="flex gap-2 flex-wrap">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-12 w-full max-w-[80%] rounded-lg" />
                  <Skeleton className="h-6 w-full max-w-[60%] rounded-lg" />
                  <div className="hidden md:block">
                    <Skeleton className="h-20 w-full max-w-2xl rounded-lg" />
                  </div>
                  <div className="flex gap-2 flex-wrap pt-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-10 w-32 rounded-lg" />
                </div>
              </div>
            </div>

            {/* Dots indicator skeleton */}
            <div className="absolute z-30 bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton
                  key={i}
                  className={`h-2 rounded-full ${
                    i === 0 ? "w-8" : "w-2"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <HeroCarousel items={carousel} />
      )}
    </>
  );
}

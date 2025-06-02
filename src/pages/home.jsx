"use client";
import { useEffect, useState } from "react";
import { getCarouselAnime } from "@/hooks/anime";
import { HomeCarousel } from "@/components/fragments/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
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
        <></>
      ) : (
        <div className="">
          <HomeCarousel items={carousel} />
        </div>
      )}
    </>
  );
}

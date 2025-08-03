import { SeasonNavigation } from "@/components/anime/season/season-navigation";
import { Suspense } from "react";
import AnimeGridSkeleton from "@/components/loading/anime-grid-skeleton";
import { notFound } from "next/navigation";

export default async function SeasonLayout({ children, params }) {
  const { year, season } = await params;

  const yearNum = parseInt(year);
  if (
    isNaN(yearNum) ||
    yearNum < 1917 ||
    yearNum > new Date().getFullYear() + 2
  ) {
    notFound();
  }

  const validSeasons = ["winter", "spring", "summer", "fall"];
  if (!validSeasons.includes(season.toLowerCase())) {
    notFound();
  }

  const seasonTitle = `${
    season.charAt(0).toUpperCase() + season.slice(1)
  } ${year} Anime`;

  return (
    <section className="container mx-auto py-8 sm:py-10 px-4">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-bold text-foreground">{seasonTitle}</h1>
        <p className="text-sm text-muted-foreground">
          Anime from {season} {year} season
        </p>
      </div>

      <SeasonNavigation routeParams={[year, season]} />

      {children}
    </section>
  );
}

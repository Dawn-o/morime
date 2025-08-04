import { notFound } from "next/navigation";
import { PageHeader } from "@/components/headers/page-header";
import { SeasonNavigation } from "@/components/navigation/season-navigation";

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
      <PageHeader
        title={seasonTitle}
        description={`Anime from ${season} ${year} season`}
      />

      <SeasonNavigation routeParams={[year, season]} />

      {children}
    </section>
  );
}

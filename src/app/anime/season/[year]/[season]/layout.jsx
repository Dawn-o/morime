import { notFound } from "next/navigation";
import { PageHeader } from "@/components/headers/page-header";
import { SeasonNavigation } from "@/components/navigation/season-navigation";
import { PageContainer } from "@/components/layout/page-container";

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
    <PageContainer as="section">
      <PageHeader
        title={seasonTitle}
        description={`Anime from ${season} ${year} season`}
      />

      <SeasonNavigation routeParams={[year, season]} />

      {children}
    </PageContainer>
  );
}

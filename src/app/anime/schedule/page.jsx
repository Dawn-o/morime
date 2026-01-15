import { getSchedules } from "@/hooks/UseSchedule";
import { AnimeGrid } from "@/components/display/anime/AnimeGrid";
import { DayFilterTabs } from "@/components/forms/DayFilterTabs";
import { notFound } from "next/navigation";
import { PageContainer, PageHeader } from "@/components/layout/PageContainer";

export async function generateMetadata({ searchParams }) {
  const currentPage = parseInt((await searchParams)?.page) || 1;
  const title =
    currentPage > 1 ? `Anime Schedule - Page ${currentPage}` : "Anime Schedule";

  return {
    title,
    description:
      "Weekly anime schedule - Find out when your favorite anime episodes air",
  };
}

export default async function SchedulePage({ searchParams }) {
  const dayFilter = (await searchParams)?.day || "monday";

  if (
    ![
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
      "other",
      "unknown",
    ].includes(dayFilter.toLowerCase())
  ) {
    notFound();
  }

  const currentPage = parseInt((await searchParams)?.page) || 1;

  const apiConfig = {
    limit: 24,
    filter: dayFilter,
  };

  const animeScheduleData = await getSchedules(currentPage, apiConfig);

  const animeData = animeScheduleData
    ? {
        data:
          animeScheduleData.data?.map((anime) => ({
            mal_id: anime.mal_id,
            title: anime.title,
            imageUrl: anime.images?.webp?.large_image_url,
            score: anime.score,
            episodes: anime.episodes,
            year: anime.year,
            type: anime.type,
          })) || [],
        totalPages: animeScheduleData.totalPages,
      }
    : null;

  return (
    <PageContainer as="section">
      <PageHeader
        title="Anime Schedule"
        description="Weekly anime schedule - Find out when your favorite anime episodes air"
      />

      <DayFilterTabs dayFilter={dayFilter} />

      <AnimeGrid
        animeData={animeData}
        currentPage={currentPage}
        basePath="/anime/schedule"
        queryParams={{
          ...(dayFilter && { day: dayFilter }),
        }}
      />
    </PageContainer>
  );
}

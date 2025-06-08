import { getSchedules } from "@/hooks/schedule";
import { AnimeGrid } from "@/components/anime/anime-grid";
import { DayFilterTabs } from "@/components/anime/day-filter-tabs";
import { Suspense } from "react";
import { ScheduleSkeleton } from "@/components/skeleton/schedule-skeleton";

export async function generateMetadata({ searchParams }) {
    const currentPage = parseInt((await searchParams)?.page) || 1;
    const title = currentPage > 1 ? `Anime Schedule - Page ${currentPage}` : 'Anime Schedule';

    return {
        title,
        description: 'Weekly anime schedule - Find out when your favorite anime episodes air',
    };
}

export default async function SchedulePage({ searchParams }) {
    const dayFilter = (await searchParams)?.day || 'monday';
    const currentPage = parseInt((await searchParams)?.page) || 1;

    const apiConfig = {
        limit: 24,
        filter: dayFilter
    };

    const scheduleData = await getSchedules(currentPage, apiConfig);

    return (
        <Suspense fallback={<ScheduleSkeleton />}>
            <section className="container mx-auto py-8 sm:py-10 px-4">
                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-2xl font-bold text-foreground">Anime Schedule</h1>
                    <p className="text-sm text-muted-foreground">Weekly anime schedule - Find out when your favorite anime episodes air</p>
                </div>

                <DayFilterTabs dayFilter={dayFilter} />

                <AnimeGrid
                    animeData={scheduleData}
                    currentPage={currentPage}
                    basePath="/anime/schedule"
                    queryParams={{
                        ...(dayFilter && { day: dayFilter })
                    }}
                />
            </section>
        </Suspense>
    );
}
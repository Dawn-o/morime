import { getSeason } from "@/hooks/season";
import { TypeFilterTabs } from "@/components/forms/type-filter-tabs";
import { AnimeGrid } from "@/components/display/anime-grid";

export async function generateMetadata({ searchParams }) {
    const currentPage = parseInt((await searchParams)?.page) || 1;
    const title = currentPage > 1 ? `Upcoming Anime - Page ${currentPage}` : 'Upcoming Anime';

    return {
        title,
        description: 'Discover upcoming anime releases and new seasons',
    };
}

export default async function UpcomingPage({ searchParams }) {
    const typeFilter = (await searchParams)?.type || '';
    const currentPage = parseInt((await searchParams)?.page) || 1;

    const apiConfig = {
        limit: 24,
        type: "seasons/upcoming",
        ...(typeFilter && { filter: typeFilter })
    };

    const upcomingData = await getSeason(currentPage, apiConfig);

    return (
            <section className="container mx-auto py-8 sm:py-10 px-4">
                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-2xl font-bold text-foreground">Upcoming Anime</h1>
                    <p className="text-sm text-muted-foreground">Discover upcoming anime releases and new seasons</p>
                </div>

                <TypeFilterTabs typeFilter={typeFilter} basePath="/anime/upcoming" />

                <AnimeGrid
                    animeData={upcomingData}
                    currentPage={currentPage}
                    basePath="/anime/upcoming"
                    queryParams={{
                        ...(typeFilter && { type: typeFilter })
                    }}
                />
            </section>
    );
}
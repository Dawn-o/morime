import { TypeFilterTabs } from "@/components/anime/type-filter-tabs";
import { AnimeGrid } from "@/components/anime/anime-grid";
import { getUpcoming } from "@/hooks/api";

export async function generateMetadata({ searchParams }) {
    const currentPage = parseInt((await searchParams)?.page) || 1;
    const title = currentPage > 1 ? `Upcoming Anime - Page ${currentPage}` : 'Upcoming Anime';

    return {
        title,
        description: 'Discover upcoming anime releases and new seasons',
    };
}

export default async function UpcomingPage({ searchParams }) {
    const filter = (await searchParams)?.type || '';
    const currentPage = parseInt((await searchParams)?.page) || 1;
    const upcomingData = await getUpcoming(currentPage, 24, filter);

    return (
        <section className="container mx-auto py-8 sm:py-10 px-4">
            <div className="text-center space-y-2 mb-8">
                <h1 className="text-2xl font-bold text-foreground">Upcoming Anime</h1>
                <p className="text-sm text-muted-foreground">Discover upcoming anime releases and new seasons</p>
            </div>

            <TypeFilterTabs typeFilter={filter} basePath="/anime/upcoming" />

            <AnimeGrid
                animeData={upcomingData}
                currentPage={currentPage}
                basePath="/anime/upcoming"
                queryParams={{
                    ...(filter && { type: filter })
                }}
            />
        </section>
    );
}
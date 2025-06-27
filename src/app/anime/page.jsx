import { getAnime } from "@/hooks/anime";
import { getAnimeSearch } from "@/hooks/search";
import { AnimeGrid } from "@/components/display/anime-grid";
import { SearchInput } from "@/components/forms/search-input";
import { Suspense } from "react";
import { AnimeListSkeleton } from "@/components/loading/anime-list-skeleton";

export async function generateMetadata({ searchParams }) {
    const currentPage = parseInt((await searchParams)?.page) || 1;
    const searchQuery = (await searchParams)?.q || '';

    let title = 'Anime List';
    if (searchQuery) {
        title = `Search: ${searchQuery}`;
    }
    if (currentPage > 1) {
        title += ` - Page ${currentPage}`;
    }

    return {
        title,
        description: searchQuery
            ? `Search results for "${searchQuery}" in our anime database`
            : 'Browse all anime series, movies, and specials in our comprehensive database.',
    };
}

export default async function AnimePage({ searchParams }) {
    const currentPage = parseInt((await searchParams)?.page) || 1;
    const searchQuery = (await searchParams)?.q || '';

    let animeData;

    if (searchQuery) {
        const searchConfig = {
            limit: 24,
            q: searchQuery,
            order_by: 'popularity',
            sort: 'asc',
            sfw: true
        };
        animeData = await getAnimeSearch(currentPage, searchConfig);
    } else {
        const apiConfig = {
            limit: 24,
            order_by: 'favorites',
            sort: 'desc'
        };
        animeData = await getAnime(currentPage, apiConfig);
    }

    return (
        <Suspense fallback={<AnimeListSkeleton showSearch={true} />}>
            <section className="container mx-auto py-8 sm:py-10 px-4">
                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-2xl font-bold text-foreground">
                        {searchQuery ? `Search: ${searchQuery}` : 'Anime List'}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {searchQuery
                            ? `Search results for "${searchQuery}"`
                            : 'Browse all anime series, movies, and specials in our comprehensive database'
                        }
                    </p>
                </div>

                <SearchInput
                    defaultValue={searchQuery}
                    basePath="/anime"
                    placeholder="Search anime titles..."
                />

                <AnimeGrid
                    animeData={animeData}
                    currentPage={currentPage}
                    basePath="/anime"
                    queryParams={{
                        ...(searchQuery && { q: searchQuery })
                    }}
                />
            </section>
        </Suspense>
    );
}
import { getTopAnime } from "@/hooks/anime";
import { Card, CardContent } from "@/components/ui/card";
import { AnimeCard } from "@/components/anime/anime-card";
import { Separator } from "@/components/ui/separator";
import { TopAnimeNavigation } from "@/components/anime/top/navigation";
import { AnimePagination } from "@/components/anime/anime-pagination";
import { AnimeError } from "@/components/anime/top/anime-error";
import { TopAnimeSkeleton } from "@/components/skeleton/top-anime-skeleton";
import { getAnimeTitle } from "@/lib/anime-titles";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const VALID_TYPES = ['all', 'tv', 'movie', 'ova', 'ona', 'special', 'airing', 'upcoming', 'bypopularity', 'favorite'];

export async function generateMetadata({ params, searchParams }) {
    const type = (await params).type?.[0] || 'all';
    const currentPage = parseInt((await searchParams)?.page) || 1;

    const titleData = getAnimeTitle(type);
    const title = currentPage > 1 ? `${titleData.title} - Page ${currentPage}` : titleData.title;

    return {
        title,
        description: titleData.description,
    };
}

async function TopAnimeContent({ params, searchParams }) {
    const type = (await params).type?.[0] || 'all';
    const currentPage = parseInt((await searchParams)?.page) || 1;

    if (!VALID_TYPES.includes(type)) {
        notFound();
    }

    const apiConfig = buildApiConfig(type);
    const animeData = await getTopAnime(currentPage, apiConfig);

    if (!animeData || animeData.error) {
        throw new Error('Failed to fetch anime data');
    }

    const titleData = getAnimeTitle(type);

    return (
        <section className="container mx-auto py-8 sm:py-10 px-4">
            <div className="text-center space-y-2 mb-8">
                <h1 className="text-2xl font-bold text-foreground">{titleData.title}</h1>
                <p className="text-sm text-muted-foreground">{titleData.description}</p>
            </div>

            <TopAnimeNavigation currentType={type} />

            {animeData.data && animeData.data.length > 0 ? (
                <div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {animeData.data.map((anime, index) => (
                            <AnimeCard key={anime.mal_id} anime={anime} priority={index < 3} />
                        ))}
                    </div>

                    <Separator className="my-8" />

                    <AnimePagination
                        currentPage={currentPage}
                        totalPages={animeData.totalPages}
                        type={type}
                    />
                </div>
            ) : (
                <Card>
                    <CardContent className="text-center py-8">
                        <p className="text-muted-foreground">
                            No anime found for the selected filter.
                        </p>
                    </CardContent>
                </Card>
            )}
        </section>
    );
}

export default async function TopAnimePage({ params, searchParams }) {
    try {
        return (
            <Suspense fallback={<TopAnimeSkeleton />}>
                <TopAnimeContent params={params} searchParams={searchParams} />
            </Suspense>
        );
    } catch (error) {
        console.error('Error in TopAnimePage:', error);
        return <AnimeError />;
    }
}

function buildApiConfig(type) {
    const config = { limit: 24 };

    if (['tv', 'movie', 'ova', 'ona', 'special'].includes(type)) {
        config.type = type;
    } else if (['airing', 'upcoming', 'bypopularity', 'favorite'].includes(type)) {
        config.filter = type;
    }

    return config;
}
import { getTopAnime } from "@/hooks/anime";
import { TopAnimeNavigation } from "@/components/navigation/top-navigation";
import { getAnimeTitle } from "@/lib/content/anime-titles";
import { AnimeGrid } from "@/components/display/anime/anime-grid";

export async function generateMetadata({ params, searchParams }) {
    const type = (await params).type?.[0] || 'all';
    const currentPage = parseInt((await searchParams)?.page) || 1;
    const titleData = getAnimeTitle(type);

    const title = currentPage > 1
        ? `${titleData.title} - Page ${currentPage}`
        : titleData.title;

    return {
        title,
        description: titleData.description,
    };
}

export default async function TopAnimePage({ params, searchParams }) {
    const type = (await params).type?.[0] || 'all';
    const currentPage = parseInt((await searchParams)?.page) || 1;
    const titleData = getAnimeTitle(type);
    const apiConfig = { limit: 24 };
    if (['tv', 'movie', 'ova', 'ona', 'special'].includes(type)) {
        apiConfig.type = type;
    } else if (['airing', 'upcoming', 'bypopularity', 'favorite'].includes(type)) {
        apiConfig.filter = type;
    }

    const animeData = await getTopAnime(currentPage, apiConfig);

    return (
        <section className="container mx-auto py-8 sm:py-10 px-4">
            <div className="text-center space-y-2 mb-8">
                <h1 className="text-2xl font-bold text-foreground">{titleData.title}</h1>
                <p className="text-sm text-muted-foreground">{titleData.description}</p>
            </div>

            <TopAnimeNavigation currentType={type} />

            <AnimeGrid
                animeData={animeData}
                currentPage={currentPage}
                basePath={type === 'all' ? '/anime/top' : `/anime/top/${type}`}
                queryParams={{}}
            />
        </section>
    );
}

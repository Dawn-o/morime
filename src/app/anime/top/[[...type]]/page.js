import { getTopAnime } from "@/lib/anime/utils";
import { TopAnimeNavigation } from "@/components/anime/top/navigation";
import { getAnimeTitle } from "@/lib/anime-titles";
import { AnimeGrid } from "@/components/anime/anime-grid";

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

    let animeType;
    let filter;
    
    if (['tv', 'movie', 'ova', 'ona', 'special'].includes(type)) {
        animeType = type;
    } else if (['airing', 'upcoming', 'bypopularity', 'favorite'].includes(type)) {
        filter = type;
    }

    const animeData = await getTopAnime(currentPage, 24, animeType, filter);

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
                type={type}
            />
        </section>
    );
}
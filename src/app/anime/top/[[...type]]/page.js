import { getTopAnime } from "@/hooks/anime";
import Link from "next/link";

export default async function TopAnimePage({ params }) {
    const type = params.type?.[0] || 'all';

    let apiConfig = { limit: 24 };

    // For type filters (tv, movie, ova, etc.) - these go in 'type' parameter
    if (['tv', 'movie', 'ova', 'ona', 'special'].includes(type)) {
        apiConfig.type = type;
    }
    // For ranking filters (airing, upcoming, etc.) - these go in 'filter' parameter
    else if (['airing', 'upcoming', 'bypopularity', 'favorite'].includes(type)) {
        apiConfig.filter = type;
    }

    const animeData = await getTopAnime(1, apiConfig);

    const getTitle = () => {
        switch (type) {
            case 'airing': return 'Top Airing Anime';
            case 'upcoming': return 'Top Upcoming Anime';
            case 'tv': return 'Top TV Series Anime';
            case 'movie': return 'Top Anime Movies';
            case 'ova': return 'Top OVA Anime';
            case 'ona': return 'Top ONA Anime';
            case 'special': return 'Top Special Anime';
            case 'bypopularity': return 'Most Popular Anime';
            case 'favorite': return 'Most Favorited Anime';
            default: return 'All Anime Top';
        }
    };

    return (
        <section className="container mx-auto py-8 sm:py-10 px-4">
            <h1 className="text-2xl font-bold mb-4">{getTitle()}</h1>
            <div className="mb-6">
                <nav className="flex flex-wrap gap-2">
                    <Link href="/anime/top" className={`px-3 py-1 rounded text-sm ${type === 'all' ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}`}>
                        All Anime
                    </Link>
                    <Link href="/anime/top/airing" className={`px-3 py-1 rounded text-sm ${type === 'airing' ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}`}>
                        Top Airing
                    </Link>
                    <Link href="/anime/top/upcoming" className={`px-3 py-1 rounded text-sm ${type === 'upcoming' ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}`}>
                        Top Upcoming
                    </Link>
                    <Link href="/anime/top/tv" className={`px-3 py-1 rounded text-sm ${type === 'tv' ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}`}>
                        Top TV Series
                    </Link>
                    <Link href="/anime/top/movie" className={`px-3 py-1 rounded text-sm ${type === 'movie' ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}`}>
                        Top Movies
                    </Link>
                    <Link href="/anime/top/ova" className={`px-3 py-1 rounded text-sm ${type === 'ova' ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}`}>
                        Top OVAs
                    </Link>
                    <Link href="/anime/top/ona" className={`px-3 py-1 rounded text-sm ${type === 'ona' ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}`}>
                        Top ONAs
                    </Link>
                    <Link href="/anime/top/special" className={`px-3 py-1 rounded text-sm ${type === 'special' ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}`}>
                        Top Specials
                    </Link>
                    <Link href="/anime/top/bypopularity" className={`px-3 py-1 rounded text-sm ${type === 'bypopularity' ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}`}>
                        Most Popular
                    </Link>
                    <Link href="/anime/top/favorite" className={`px-3 py-1 rounded text-sm ${type === 'favorite' ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}`}>
                        Most Favorited
                    </Link>
                </nav>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {animeData.data?.map((anime) => (
                    <div key={anime.mal_id}>
                        <p>{anime.title}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export async function generateStaticParams() {
    return [
        {},  // For /anime/top (no params)
        { type: ['airing'] },
        { type: ['upcoming'] },
        { type: ['tv'] },
        { type: ['movie'] },
        { type: ['ova'] },
        { type: ['ona'] },
        { type: ['special'] },
        { type: ['bypopularity'] },
        { type: ['favorite'] }
    ];
}
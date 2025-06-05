import { getTopAnime } from "@/hooks/anime";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimeCard } from "@/components/anime/anime-card";
import { Separator } from "@/components/ui/separator";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default async function TopAnimePage({ params }) {
    const type = params.type?.[0] || 'all';

    let apiConfig = { limit: 24 };

    if (['tv', 'movie', 'ova', 'ona', 'special'].includes(type)) {
        apiConfig.type = type;
    }
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
            default: return 'All Top Anime';
        }
    };

    const navigationItems = [
        { key: 'all', label: 'All', href: '/anime/top', type: 'ranking' },
        { key: 'airing', label: 'Top Airing', href: '/anime/top/airing', type: 'ranking' },
        { key: 'upcoming', label: 'Top Upcoming', href: '/anime/top/upcoming', type: 'ranking' },
        { key: 'bypopularity', label: 'Top TV Series', href: '/anime/top/bypopularity', type: 'ranking' },
        { key: 'favorite', label: 'Top Movies', href: '/anime/top/favorite', type: 'ranking' },
        { key: 'tv', label: 'Top OVAs', href: '/anime/top/tv', type: 'filter' },
        { key: 'movie', label: 'Top ONAs', href: '/anime/top/movie', type: 'filter' },
        { key: 'ova', label: 'Top Specials', href: '/anime/top/ova', type: 'filter' },
        { key: 'ona', label: 'Most Popular', href: '/anime/top/ona', type: 'filter' },
        { key: 'special', label: 'Most Favorited', href: '/anime/top/special', type: 'filter' }
    ];

    const isRankingType = ['airing', 'upcoming', 'bypopularity', 'favorite'].includes(type);

    return (
        <section className="container mx-auto py-8 sm:py-10 px-4">
            <h1 className="text-2xl font-bold mb-4">{getTitle()}</h1>

            <div className="mb-6">
                <nav className="flex items-center justify-center gap-2 flex-wrap">
                    {navigationItems.map((item) => (
                        <Button
                            key={item.key}
                            variant={type === item.key ? "default" : "ghost"}
                            size="sm"
                            asChild
                        >
                            <Link href={item.href}>
                                {item.label}
                            </Link>
                        </Button>
                    ))}
                </nav>
                <Separator className="my-4" />
            </div>

            {animeData.data && animeData.data.length > 0 ? (
                <div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {animeData.data.map((anime) => (
                            <AnimeCard key={anime.mal_id} anime={anime} />
                        ))}
                    </div>

                    <Separator className="my-8" />

                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>
                                    2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
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
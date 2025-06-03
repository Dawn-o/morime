import { getDetailAnime, getEpisodeAnime } from "@/hooks/anime";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { StarIcon, PlayIcon, CalendarIcon, ClockIcon } from "lucide-react";
import { EpisodesSection } from "@/components/anime/episodes-section";
import { toCamelCase } from "@/lib/utils";

// Generate metadata for SEO
export async function generateMetadata({ params }) {
    const animeData = await getDetailAnime(params.id);

    if (!animeData) {
        return {
            title: "Anime Not Found | Morime"
        };
    }

    return {
        title: `${animeData.title} | Morime`,
        description: animeData.synopsis?.slice(0, 160) || "View anime details on Morime",
        openGraph: {
            title: animeData.title,
            description: animeData.synopsis?.slice(0, 160),
            images: animeData.images?.jpg?.large_image_url ? [animeData.images.jpg.large_image_url] : [],
        }
    };
}

export default async function AnimeDetailsPage({ params }) {
    const animeData = await getDetailAnime(params.id);
    const episodesData = await getEpisodeAnime(params.id);

    if (!animeData) {
        notFound();
    }

    return (
        <>
            {/* Hero Banner Section */}
            <section className="w-full min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] relative overflow-hidden bg-gradient-to-b from-background/80 to-background">
                {animeData.images?.jpg?.large_image_url && (
                    <>
                        {/* Better Background Image with Overlay */}
                        <>
                            {/* Main background with parallax-like effect */}
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="absolute inset-0 scale-105">
                                    <Image
                                        src={animeData.images?.jpg?.large_image_url}
                                        alt=""
                                        fill
                                        className="object-cover opacity-40 blur-[10px]"
                                        priority
                                        sizes="100vw"
                                        quality={60} // Lower quality is fine for background blur
                                    />
                                </div>
                            </div>

                            {/* Gradient overlays for better text contrast and visual appeal */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
                            <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />

                            {/* Subtle animated pattern overlay for texture (optional) */}
                            <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('/noise.png')] bg-repeat" />
                        </>
                    </>
                )}

                {/* Content - Better mobile layout */}
                <div className="container mx-auto h-full relative z-10 px-4">
                    <div className="flex h-full items-end pb-6 md:pb-8 pt-16 sm:pt-20">
                        <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-6 items-center sm:items-start md:items-end">
                            {/* Poster - Improved sizing and positioning on mobile */}
                            <div className="h-[170px] w-[120px] sm:h-[200px] sm:w-[140px] lg:h-[240px] lg:w-[170px] rounded-lg overflow-hidden shadow-xl shrink-0 -mt-12 sm:-mt-16 md:-mt-20 sm:mb-0 ring-2 ring-white/10 bg-card">
                                {animeData.images?.jpg?.large_image_url && (
                                    <Image
                                        src={animeData.images.jpg.large_image_url}
                                        alt={animeData.title}
                                        width={240}
                                        height={340}
                                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 640px) 120px, (max-width: 1024px) 140px, 170px"
                                    />
                                )}
                            </div>

                            {/* Title section - Better spacing on mobile */}
                            <div className="flex-1 text-center sm:text-left max-w-full">
                                {/* Type Badge - Simplified for mobile */}
                                <div className="flex items-center justify-center sm:justify-start flex-wrap gap-1.5 mb-1.5 sm:mb-2">
                                    <Badge variant="secondary" className="text-xs sm:text-sm">
                                        {animeData.type || "TV"}
                                    </Badge>
                                    {animeData.status && (
                                        <Badge
                                            variant={
                                                animeData.status.toLowerCase().includes("airing")
                                                    ? "success"
                                                    : animeData.status.toLowerCase().includes("not yet aired")
                                                        ? "warning"  // Different style for unreleased anime
                                                        : "default"
                                            }
                                            className={`text-xs sm:text-sm ${animeData.status.toLowerCase().includes("not yet aired")
                                                ? "font-medium"
                                                : ""
                                                }`}
                                        >
                                            {animeData.status.includes("Currently")
                                                ? "Airing"
                                                : animeData.status}
                                        </Badge>
                                    )}
                                </div>

                                {/* Title - Better text sizing for mobile */}
                                <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight line-clamp-2 mb-0.5 sm:mb-1">
                                    {animeData.title}
                                </h1>

                                {/* English Title - More compact on mobile */}
                                {animeData.title_english && animeData.title_english !== animeData.title && (
                                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground line-clamp-1">
                                        {animeData.title_english}
                                    </p>
                                )}

                                {/* Stats - More compact on mobile */}
                                <div className="flex flex-wrap justify-center sm:justify-start gap-y-1.5 gap-x-2 sm:gap-y-2 sm:gap-x-3 mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground">
                                    {animeData.score && (
                                        <div className="flex items-center bg-card/50 backdrop-blur-sm rounded-full px-2 py-0.5 sm:px-3 sm:py-1.5">
                                            <StarIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-yellow-500" />
                                            <span>{animeData.score}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center bg-card/50 backdrop-blur-sm rounded-full px-2 py-0.5 sm:px-3 sm:py-1.5">
                                        <PlayIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                        <span>{animeData.episodes || "?"} eps</span>
                                    </div>
                                    {animeData.aired?.string && (
                                        <div className="flex items-center bg-card/50 backdrop-blur-sm rounded-full px-2 py-0.5 sm:px-3 sm:py-1.5">
                                            <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                            <span className="line-clamp-1">{animeData.aired.string.split("to")[0].trim()}</span>
                                        </div>
                                    )}
                                    {animeData.duration && (
                                        <div className="flex items-center bg-card/50 backdrop-blur-sm rounded-full px-2 py-0.5 sm:px-3 sm:py-1.5">
                                            <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                            <span>{animeData.duration}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons - Better mobile buttons with labels */}
                                <div className="mt-3 sm:mt-6 flex justify-center sm:justify-start gap-2">
                                    {animeData.status && !animeData.status.toLowerCase().includes("not yet aired") ? (
                                        <Link
                                            href={`https://skuy.fun/watch/${toCamelCase(animeData.title_english || animeData.title)}?ep=1`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors"
                                        >
                                            <PlayIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                            <span>Watch</span>
                                        </Link>
                                    ) : (
                                        <div className="bg-muted text-muted-foreground rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium flex items-center gap-1.5">
                                            <CalendarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                            <span>Coming Soon</span>
                                        </div>
                                    )}
                                    <button className="bg-card hover:bg-card/80 border border-border rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors">
                                        <StarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                        <span>Add To List</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="container mx-auto py-6 sm:py-8 px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
                    {/* Left Sidebar */}
                    <div className="md:col-span-1">
                        {/* Info Table - More compact on mobile */}
                        <div className="bg-card rounded-lg p-3 sm:p-4 shadow-sm sm:shadow divide-y divide-border">
                            {/* Add full title display for long titles */}
                            {animeData.title && animeData.title.length > 50 && (
                                <div className="py-1.5 sm:py-2">
                                    <span className="text-xs sm:text-sm font-medium">Title</span>
                                    <p className="text-xs sm:text-sm text-muted-foreground break-words">
                                        {animeData.title}
                                    </p>
                                </div>
                            )}

                            <div className="py-1.5 sm:py-2">
                                <span className="text-xs sm:text-sm font-medium">Status</span>
                                <p className="text-xs sm:text-sm text-muted-foreground">{animeData.status || "N/A"}</p>
                            </div>
                            <div className="py-1.5 sm:py-2">
                                <span className="text-xs sm:text-sm font-medium">Season</span>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                    {animeData.season && `${animeData.season.charAt(0).toUpperCase() + animeData.season.slice(1)} ${animeData.year}`}
                                </p>
                            </div>
                            <div className="py-1.5 sm:py-2">
                                <span className="text-xs sm:text-sm font-medium">Studio</span>
                                <div className="text-xs sm:text-sm text-muted-foreground">
                                    {animeData.studios?.map((studio, i) => (
                                        <span key={studio.mal_id}>
                                            {i > 0 ? ", " : ""}
                                            {studio.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="py-1.5 sm:py-2">
                                <span className="text-xs sm:text-sm font-medium">Source</span>
                                <p className="text-xs sm:text-sm text-muted-foreground">{animeData.source || "N/A"}</p>
                            </div>
                            <div className="py-1.5 sm:py-2">
                                <span className="text-xs sm:text-sm font-medium">Genres</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {animeData.genres?.map(genre => (
                                        <Link href={`/anime/genre/${genre.mal_id}`} key={genre.mal_id}>
                                            <Badge variant="outline" className="text-xs hover:bg-primary/10 py-0 h-5 sm:h-6">
                                                {genre.name}
                                            </Badge>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area - Better spacing for mobile */}
                    <div className="md:col-span-3">
                        {/* Synopsis */}
                        <div className="mb-6 sm:mb-8">
                            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Synopsis</h2>
                            <p className="text-sm sm:text-base text-muted-foreground whitespace-pre-line">
                                {animeData.synopsis || "No synopsis available."}
                            </p>
                        </div>

                        {/* Episodes Section - Adjust EpisodesSection component for better mobile display */}
                        <div className="mb-6 sm:mb-8">
                            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Episodes</h2>
                            <EpisodesSection episodes={episodesData} />
                        </div>

                        {/* Related Anime - Improved for mobile */}
                        {animeData.relations && animeData.relations.length > 0 && (
                            <div className="mb-6 sm:mb-8">
                                <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Related Anime</h2>
                                <div className="space-y-1.5 sm:space-y-2">
                                    {animeData.relations.map((relation, index) => (
                                        <div key={index} className="bg-card rounded-md p-2 sm:p-3">
                                            <div className="text-sm sm:text-base font-medium">{relation.relation}</div>
                                            <div className="text-xs sm:text-sm text-muted-foreground">
                                                {relation.entry.map((entry, i) => (
                                                    <span key={entry.mal_id}>
                                                        {i > 0 ? ", " : ""}
                                                        <Link href={`/anime/${entry.mal_id}`} className="hover:text-primary">
                                                            {entry.name}
                                                        </Link>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
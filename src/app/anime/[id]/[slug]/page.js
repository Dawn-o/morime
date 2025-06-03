import { getDetailAnime, getEpisodeAnime } from "@/hooks/anime";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { StarIcon } from "lucide-react";
import { EpisodesSection } from "@/components/anime/episodes-section";
import { toSnakeCase } from "@/lib/utils";

// Generate metadata for SEO
export async function generateMetadata({ params }) {
    const { id } = await params;
    const animeData = await getDetailAnime(id);

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
    const { id } = await params;
    const animeData = await getDetailAnime(id);
    const episodesData = await getEpisodeAnime(id);

    if (!animeData) {
        notFound();
    }

    return (
        <>
            {/* Hero Banner Section - Enhanced layout */}
            <section className="w-full min-h-[45vh] md:min-h-[55vh] relative overflow-hidden bg-gradient-to-b from-background/60 via-background/80 to-background">
                {animeData.images?.jpg?.large_image_url && (
                    <>
                        {/* Background image with better effect */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute inset-0 scale-110 animate-subtle-zoom">
                                <Image
                                    src={animeData.images?.jpg?.large_image_url}
                                    alt=""
                                    fill
                                    className="object-cover opacity-25 blur-[10px]"
                                    priority
                                    sizes="100vw"
                                    quality={60}
                                />
                            </div>
                        </div>

                        {/* Enhanced gradient overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
                        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent" />
                        <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('/noise.png')] bg-repeat" />
                    </>
                )}

                {/* Content with improved structure */}
                <div className="container mx-auto h-full relative z-10 px-4">
                    <div className="flex h-full items-end pb-8 md:pb-10 pt-20 sm:pt-24">
                        <div className="flex flex-col sm:flex-row w-full gap-5 sm:gap-8 items-center sm:items-start md:items-end">
                            {/* Poster with Add to List button for larger screens */}
                            <div className="flex flex-col items-center gap-2">
                                <div className="h-[180px] w-[130px] sm:h-[210px] sm:w-[150px] lg:h-[250px] lg:w-[180px] 
                         rounded-lg overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.3)] shrink-0 
                         -mt-14 sm:-mt-18 md:-mt-24 sm:mb-0 ring-2 ring-white/10 bg-card
                         transform transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.4)] hover:scale-[1.02]">
                                    {animeData.images?.jpg?.large_image_url && (
                                        <Image
                                            src={animeData.images.jpg.large_image_url}
                                            alt={animeData.title}
                                            width={260}
                                            height={360}
                                            className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                                            sizes="(max-width: 640px) 130px, (max-width: 1024px) 150px, 180px"
                                        />
                                    )}
                                </div>

                                {/* Add to List button below poster (hidden on mobile) */}
                                <div className="hidden sm:block w-full">
                                    <button className="w-full bg-card hover:bg-card/90 border border-border rounded-md 
                                         py-1.5 text-xs font-medium flex items-center justify-center gap-1.5
                                         shadow-md hover:shadow-lg transition-all duration-200">
                                        <StarIcon className="h-3.5 w-3.5" />
                                        <span>Add To List</span>
                                    </button>
                                </div>
                            </div>

                            {/* Title section with improved layout */}
                            <div className="flex-1 text-center sm:text-left max-w-full">
                                {/* Type and status badges */}
                                <div className="flex items-center justify-center sm:justify-start flex-wrap gap-2 mb-2 sm:mb-3">
                                    <Badge variant="secondary" className="text-xs sm:text-sm px-2.5 py-0.5">
                                        {animeData.type || "TV"}
                                    </Badge>
                                    {animeData.status && (
                                        <Badge
                                            variant={
                                                animeData.status.toLowerCase().includes("airing")
                                                    ? "success"
                                                    : animeData.status.toLowerCase().includes("not yet aired")
                                                        ? "warning"
                                                        : "default"
                                            }
                                            className="text-xs sm:text-sm px-2.5 py-0.5 font-medium"
                                        >
                                            {animeData.status.includes("Currently")
                                                ? "Airing"
                                                : animeData.status}
                                        </Badge>
                                    )}
                                </div>

                                {/* Title with better styling */}
                                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight line-clamp-2 mb-1 sm:mb-2
                                  bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/90">
                                    {animeData.title}
                                </h1>

                                {/* English Title */}
                                {animeData.title_english && animeData.title_english !== animeData.title && (
                                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground/90 line-clamp-1 mb-2">
                                        {animeData.title_english}
                                    </p>
                                )}

                                {/* Quick stats badges */}
                                <div className="flex flex-wrap justify-center sm:justify-start gap-y-2 gap-x-3 mt-3 mb-4">
                                    {animeData.score && (
                                        <div className="flex items-center bg-card/60 backdrop-blur-md border border-white/5 
                                          rounded-full px-3 py-1 text-xs">
                                            <StarIcon className="h-3.5 w-3.5 mr-1.5 text-yellow-500" />
                                            <span className="font-medium">{animeData.score}</span>
                                        </div>
                                    )}
                                    {animeData.season && (
                                        <div className="flex items-center bg-card/60 backdrop-blur-md border border-white/5 
                                          rounded-full px-3 py-1 text-xs">
                                            <span className="font-medium">{animeData.season && `${animeData.season.charAt(0).toUpperCase() + animeData.season.slice(1)} ${animeData.year}`}</span>
                                        </div>
                                    )}
                                    {animeData.studios && (
                                        <div className="flex items-center bg-card/60 backdrop-blur-md border border-white/5 
                                          rounded-full px-3 py-1 text-xs">
                                            {animeData.studios?.map((studio, i) => (
                                                <span key={studio.mal_id}>
                                                    {i > 0 ? ", " : ""}
                                                    {studio.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Detailed stats display */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                                    {animeData.score && (
                                        <div className="bg-card/40 backdrop-blur-sm rounded-lg p-3 border border-border/20 flex flex-col items-center">
                                            <div className="text-xs uppercase tracking-wider text-muted-foreground/80 mb-1">Score</div>
                                            <div className="font-bold text-lg sm:text-xl flex items-center gap-1">
                                                {animeData.score}
                                                <StarIcon className="h-4 w-4 text-yellow-500" />
                                            </div>
                                            <div className="text-xs text-muted-foreground/60 mt-0.5 text-center">
                                                {animeData.scored_by && `${new Intl.NumberFormat('en-US', {
                                                    notation: 'compact',
                                                    maximumFractionDigits: 1
                                                }).format(animeData.scored_by)} users`}
                                            </div>
                                        </div>
                                    )}

                                    {animeData.rank && (
                                        <div className="bg-card/40 backdrop-blur-sm rounded-lg p-3 border border-border/20 flex flex-col items-center justify-center">
                                            <div className="text-xs uppercase tracking-wider text-muted-foreground/80 mb-1">Ranked</div>
                                            <div className="font-bold text-lg sm:text-xl">
                                                #{animeData.rank}
                                            </div>
                                        </div>
                                    )}

                                    {animeData.popularity && (
                                        <div className="bg-card/40 backdrop-blur-sm rounded-lg p-3 border border-border/20 flex flex-col items-center justify-center">
                                            <div className="text-xs uppercase tracking-wider text-muted-foreground/80 mb-1">Popularity</div>
                                            <div className="font-bold text-lg sm:text-xl">
                                                #{animeData.popularity}
                                            </div>
                                        </div>
                                    )}

                                    {animeData.members && (
                                        <div className="bg-card/40 backdrop-blur-sm rounded-lg p-3 border border-border/20 flex flex-col items-center justify-center">
                                            <div className="text-xs uppercase tracking-wider text-muted-foreground/80 mb-1">Members</div>
                                            <div className="font-bold text-lg sm:text-xl">
                                                {new Intl.NumberFormat('en-US', {
                                                    notation: 'compact',
                                                    maximumFractionDigits: 1
                                                }).format(animeData.members)}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Add to List button on mobile only */}
                                <div className="mt-4 flex sm:hidden">
                                    <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-md 
                                     py-2 text-sm font-medium flex items-center justify-center gap-2
                                     shadow-md hover:shadow-lg transition-all duration-200">
                                        <StarIcon className="h-4 w-4" />
                                        <span>Add To List</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content - Enhanced card design and spacing */}
            <section className="container mx-auto py-8 sm:py-10 px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8">
                    {/* Left Sidebar - Improved card styling */}
                    <div className="md:col-span-1">
                        <div className="bg-card rounded-xl p-4 shadow-lg border border-border/40 divide-y divide-border/60">
                            {/* Alternative titles with improved styling */}
                            {(animeData.title_japanese || (animeData.title_synonyms && animeData.title_synonyms.length > 0)) && (
                                <div className="py-3">
                                    <span className="text-sm font-semibold text-foreground/90">Alternative Titles</span>
                                    <div className="mt-1.5 space-y-2">
                                        {animeData.title_japanese && (
                                            <div className="space-y-1">
                                                <span className="text-xs text-muted-foreground/80 font-medium block">Japanese</span>
                                                <div className="font-japanese text-sm">{animeData.title_japanese}</div>
                                            </div>
                                        )}

                                        {animeData.title_synonyms && animeData.title_synonyms.length > 0 && (
                                            <div className="space-y-1">
                                                <span className="text-xs text-muted-foreground/80 font-medium block">Synonyms</span>
                                                <div className="space-y-0.5">
                                                    {animeData.title_synonyms.map((title, i) => (
                                                        <div key={i} className="text-sm">{title}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Basic Info */}
                            <div className="py-3">
                                <span className="text-sm font-semibold text-foreground/90">Basic Info</span>
                                <div className="mt-1.5 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Status</span>
                                        <span className="font-medium">{animeData.status || "N/A"}</span>
                                    </div>

                                    {/* Add episodes here */}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Episodes</span>
                                        <span className="font-medium">{animeData.episodes || "?"}</span>
                                    </div>

                                    {animeData.rating && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Age Rating</span>
                                            <span className="font-medium">{animeData.rating}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Season</span>
                                        <span className="font-medium">
                                            {animeData.season && `${animeData.season.charAt(0).toUpperCase() + animeData.season.slice(1)} ${animeData.year}`}
                                        </span>
                                    </div>

                                    {/* Add aired date here */}
                                    {animeData.aired?.string && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Aired</span>
                                            <span className="font-medium">{animeData.aired.string}</span>
                                        </div>
                                    )}

                                    {/* Add duration here */}
                                    {animeData.duration && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Duration</span>
                                            <span className="font-medium">{animeData.duration}</span>
                                        </div>
                                    )}

                                    {animeData.broadcast?.string && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Broadcast</span>
                                            <span className="font-medium">{animeData.broadcast.string}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Studios, Producers, Licensors - Consistent styling */}
                            <div className="py-3">
                                <span className="text-sm font-semibold text-foreground/90">Credits</span>
                                <div className="mt-1.5 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Studio</span>
                                        <div className="font-medium">
                                            {animeData.studios?.map((studio, i) => (
                                                <span key={studio.mal_id}>
                                                    {i > 0 ? ", " : ""}
                                                    {studio.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {animeData.producers && animeData.producers.length > 0 && (
                                        <div className="flex flex-col text-sm">
                                            <span className="text-muted-foreground mb-1.5">Producers</span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {animeData.producers.map((producer) => (
                                                    <Link
                                                        key={producer.mal_id}
                                                        href={`/producer/${producer.mal_id}/${toSnakeCase(producer.name)}`}
                                                    >
                                                        <Badge variant="outline" className="text-xs hover:bg-primary/10 py-0 h-5 sm:h-6">
                                                            {producer.name}
                                                        </Badge>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {animeData.licensors && animeData.licensors.length > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Licensors</span>
                                            <div className="font-medium">
                                                {animeData.licensors.map((licensor, i) => (
                                                    <span key={licensor.mal_id}>
                                                        {i > 0 ? ", " : ""}
                                                        {licensor.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Source, Genres, Themes, Demographics - Consistent styling */}
                            <div className="py-3">
                                <span className="text-sm font-semibold text-foreground/90">Details</span>
                                <div className="mt-1.5 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Source</span>
                                        <span className="font-medium">{animeData.source || "N/A"}</span>
                                    </div>

                                    {/* Genres */}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Genres</span>
                                        <div className="flex flex-wrap gap-1 mt-1 font-medium">
                                            {animeData.genres?.map(genre => (
                                                <Link href={`/anime/genre/${genre.mal_id}/${toSnakeCase(genre.name)}`} key={genre.mal_id}>
                                                    <Badge variant="outline" className="text-xs hover:bg-primary/10 py-0 h-5 sm:h-6">
                                                        {genre.name}
                                                    </Badge>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Themes */}
                                    {animeData.themes && animeData.themes.length > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Themes</span>
                                            <div className="flex flex-wrap gap-1 mt-1 font-medium">
                                                {animeData.themes.map(theme => (
                                                    <Link href={`/anime/theme/${theme.mal_id}/${toSnakeCase(theme.name)}`} key={theme.mal_id}>
                                                        <Badge variant="outline" className="text-xs hover:bg-primary/10 py-0 h-5 sm:h-6">
                                                            {theme.name}
                                                        </Badge>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Demographics */}
                                    {animeData.demographics && animeData.demographics.length > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Demographics</span>
                                            <div className="flex flex-wrap gap-1 mt-1 font-medium">
                                                {animeData.demographics.map(demographic => (
                                                    <Badge key={demographic.mal_id} variant="outline" className="text-xs py-0 h-5 sm:h-6">
                                                        {demographic.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Popularity Stats */}
                            <div className="py-3">
                                <span className="text-sm font-semibold text-foreground/90">Statistics</span>
                                <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 mt-1 text-xs text-muted-foreground">
                                    {animeData.rank && (
                                        <>
                                            <div>Rank:</div>
                                            <div className="font-medium">#{animeData.rank}</div>
                                        </>
                                    )}
                                    {animeData.popularity && (
                                        <>
                                            <div>Popularity:</div>
                                            <div className="font-medium">#{animeData.popularity}</div>
                                        </>
                                    )}
                                    {animeData.members && (
                                        <>
                                            <div>Members:</div>
                                            <div className="font-medium">{animeData.members.toLocaleString()}</div>
                                        </>
                                    )}
                                    {animeData.favorites && (
                                        <>
                                            <div>Favorites:</div>
                                            <div className="font-medium">{animeData.favorites.toLocaleString()}</div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area - Enhanced sections */}
                    <div className="md:col-span-3">
                        {/* Synopsis - Improved typography and card design */}
                        <div className="bg-card rounded-xl p-5 shadow-lg border border-border/40 mb-6 sm:mb-8">
                            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-5 bg-primary rounded-full mr-1.5"></span>
                                Synopsis
                            </h2>
                            <p className="text-sm sm:text-base text-muted-foreground/90 whitespace-pre-line leading-relaxed">
                                {animeData.synopsis || "No synopsis available."}
                            </p>
                        </div>

                        {/* Trailer Section - Enhanced with card and better shadow */}
                        {animeData.trailer?.youtube_id && (
                            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-border/30 mb-6 sm:mb-8">
                                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-5 bg-red-500 rounded-full mr-1.5"></span>
                                    Trailer
                                </h2>
                                <div className="aspect-video w-full rounded-lg overflow-hidden shadow-xl">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${animeData.trailer.youtube_id}`}
                                        title={`${animeData.title} Trailer`}
                                        className="w-full h-full"
                                        allowFullScreen
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        loading="lazy"
                                    ></iframe>
                                </div>
                            </div>
                        )}

                        {/* Theme Songs Section */}
                        {((animeData.theme?.openings && animeData.theme.openings.length > 0) ||
                            (animeData.theme?.endings && animeData.theme.endings.length > 0)) && (
                                <div className="mb-6 sm:mb-8">
                                    <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Theme Songs</h2>
                                    <div className="space-y-4">
                                        {animeData.theme?.openings && animeData.theme.openings.length > 0 && (
                                            <div>
                                                <h3 className="text-base font-semibold mb-1">Opening Themes</h3>
                                                <ul className="space-y-1 text-sm text-muted-foreground">
                                                    {animeData.theme.openings.map((opening, i) => (
                                                        <li key={i} className="pl-2 border-l-2 border-primary/30">
                                                            {opening}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {animeData.theme?.endings && animeData.theme.endings.length > 0 && (
                                            <div>
                                                <h3 className="text-base font-semibold mb-1">Ending Themes</h3>
                                                <ul className="space-y-1 text-sm text-muted-foreground">
                                                    {animeData.theme.endings.map((ending, i) => (
                                                        <li key={i} className="pl-2 border-l-2 border-primary/30">
                                                            {ending}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                        {/* Episodes Section - Enhanced card design */}
                        <div className="bg-card rounded-xl p-5 shadow-lg border border-border/40 mb-6 sm:mb-8">
                            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-5 bg-primary rounded-full mr-1.5"></span>
                                Episodes
                            </h2>
                            <EpisodesSection episodes={episodesData} />
                        </div>

                        {/* Related Anime */}
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
                                                        <Link href={`/anime/${entry.mal_id}/${toSnakeCase(entry.name)}`} className="hover:text-primary">
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
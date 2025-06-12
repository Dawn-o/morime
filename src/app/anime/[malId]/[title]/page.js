import { notFound } from "next/navigation";
import { AnimeHeroSection } from "@/components/anime/detail/hero-section";
import { AnimeSidebar } from "@/components/anime/detail/sidebar";
import { AnimeContentSections } from "@/components/anime/detail/content-sections";
import { getDetailAnime, getDetailAnimeThemes, getDetailAnimeRelations, getDetailAnimeCharacters, getDetailAnimeEpisodes } from "@/hooks/api";

export async function generateMetadata({ params }) {
    const { malId } = await params;
    const animeData = await getDetailAnime(malId);

    if (isNaN(malId) || !animeData) {
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
            images: animeData.images?.webp?.image_url ? [animeData.images.webp.image_url] : [],
        }
    };
}

export default async function AnimeDetailsPage({ params }) {
    const { malId } = await params;
    const [animeData, animeThemesData, animeRelationsData, charactersData, episodesData] = await Promise.all([
        getDetailAnime(malId),
        getDetailAnimeThemes(malId),
        getDetailAnimeRelations(malId),
        getDetailAnimeCharacters(malId),
        getDetailAnimeEpisodes(malId, 1),
    ]);

    if (isNaN(malId) || !animeData) {
        notFound();
    }

    return (
        <>
            <AnimeHeroSection animeData={animeData} />
            <section className="container mx-auto pb-8 sm:pb-10 px-4 -mt-0 md:-mt-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
                    <div className="lg:col-span-1">
                        <AnimeSidebar animeData={animeData} />
                    </div>
                    <div className="lg:col-span-3">
                        <AnimeContentSections
                            animeData={animeData}
                            themesData={animeThemesData}
                            relationsData={animeRelationsData}
                            charactersData={charactersData}
                            episodesData={episodesData.episodes}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
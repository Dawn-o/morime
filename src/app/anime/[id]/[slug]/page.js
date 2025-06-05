import { getDetailAnime, getEpisodeAnime, getAnimeCharacters } from "@/hooks/anime";
import { notFound } from "next/navigation";
import { AnimeHeroSection } from "@/components/anime/anime-hero-section";
import { AnimeSidebar } from "@/components/anime/anime-sidebar";
import { AnimeContentSections } from "@/components/anime/anime-content-sections";

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

    const [animeData, episodesData, charactersData] = await Promise.all([
        getDetailAnime(id),
        getEpisodeAnime(id),
        getAnimeCharacters(id)
    ]);

    if (!animeData) {
        notFound();
    }

    return (
        <>
            <AnimeHeroSection animeData={animeData} />
            <section className="container mx-auto py-8 sm:py-10 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
                    <div className="lg:col-span-1">
                        <AnimeSidebar animeData={animeData} />
                    </div>
                    <div className="lg:col-span-3">
                        <AnimeContentSections animeData={animeData} episodesData={episodesData} charactersData={charactersData} />
                    </div>
                </div>
            </section>
        </>
    );
}
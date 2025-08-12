import { getDetailManga, getMangaCharacters } from "@/hooks/manga";
import { notFound } from "next/navigation";
import { MangaHeroSection } from "@/components/manga/detail/sections/hero-section";
import { MangaSidebar } from "@/components/manga/detail/sections/sidebar";
import { MangaContentSections } from "@/components/manga/detail/sections/content-sections";

export async function generateMetadata({ params }) {
  try {
    const { malId } = await params;
    const mangaData = await getDetailManga(malId);

    if (isNaN(malId) || !mangaData) {
      return {
        title: "Manga Not Found | Morime",
      };
    }

    return {
      title: `${mangaData.title} | Morime`,
      description:
        mangaData.synopsis?.slice(0, 160) || "View manga details on Morime",
      openGraph: {
        title: mangaData.title,
        description: mangaData.synopsis?.slice(0, 160),
        images: mangaData.images?.webp?.image_url
          ? [mangaData.images.webp.image_url]
          : [],
      },
    };
  } catch (error) {
    return {
      title: "Manga Details",
      description: "Manga information",
    };
  }
}

export default async function MangaDetailsPage({ params }) {
  const { malId } = await params;
  const [mangaData, charactersData] = await Promise.all([
    getDetailManga(malId),
    getMangaCharacters(malId),
  ]);

  if (isNaN(malId) || !mangaData) {
    notFound();
  }

  const heroData = {
    imageUrl: mangaData.images?.webp?.large_image_url,
    title: mangaData.title,
    titleEnglish: mangaData.title_english,
    titleJapanese: mangaData.title_japanese,
    titleSynonyms: mangaData.title_synonyms,
    type: mangaData.type,
    status: mangaData.status,
    score: mangaData.score,
    scoredBy: mangaData.scored_by,
    rank: mangaData.rank,
    popularity: mangaData.popularity,
    members: mangaData.members,
    published: mangaData.published,
    authors: mangaData.authors,
  };

  const sidebarData = {
    titleJapanese: mangaData.title_japanese,
    titleSynonyms: mangaData.title_synonyms,
    status: mangaData.status,
    chapters: mangaData.chapters,
    volumes: mangaData.volumes,
    published: mangaData.published,
    type: mangaData.type,
    authors: mangaData.authors,
    serializations: mangaData.serializations,
    genres: mangaData.genres,
    themes: mangaData.themes,
    demographics: mangaData.demographics,
    rank: mangaData.rank,
    popularity: mangaData.popularity,
    members: mangaData.members,
    favorites: mangaData.favorites,
  };

  const contentData = {
    synopsis: mangaData.synopsis,
    charactersData: charactersData,
    relationsData: mangaData.relations,
  };

  return (
    <>
      <MangaHeroSection heroData={heroData} />
      <section className="container mx-auto pb-8 sm:pb-10 px-4 -mt-0 md:-mt-24 lg:-mt-48 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="lg:col-span-1">
            <MangaSidebar sidebarData={sidebarData} />
          </div>
          <div className="lg:col-span-3">
            <MangaContentSections contentData={contentData} />
          </div>
        </div>
      </section>
    </>
  );
}

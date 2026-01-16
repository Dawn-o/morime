import type { Metadata } from "next";
import {
  getDetailAnime,
  getEpisodeAnime,
  getAnimeCharacters,
} from "@/hooks/UseAnime";
import { notFound } from "next/navigation";
import { ContentSection } from "@/components/layout/PageContainer";
import { AnimeHeroSection } from "@/components/anime/detail/sections/HeroSection";
import { AnimeSidebar } from "@/components/anime/detail/sections/Sidebar";
import { AnimeContentSections } from "@/components/anime/detail/sections/ContentSections";

interface PageProps {
  params: Promise<{
    malId: string;
    title: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { malId } = await params;
  const animeData = await getDetailAnime(Number(malId));

  if (isNaN(Number(malId)) || !animeData) {
    return {
      title: "Anime Not Found | Morime",
    };
  }

  return {
    title: `${animeData.title} | Morime`,
    description:
      animeData.synopsis?.slice(0, 160) || "View anime details on Morime",
    openGraph: {
      title: animeData.title,
      description: animeData.synopsis?.slice(0, 160),
      images: animeData.images?.webp?.image_url
        ? [animeData.images.webp.image_url]
        : [],
    },
  };
}

export default async function AnimeDetailsPage({ params }: PageProps) {
  const { malId } = await params;
  const [animeData, episodesData, charactersData] = await Promise.all([
    getDetailAnime(Number(malId)),
    getEpisodeAnime(Number(malId)),
    getAnimeCharacters(Number(malId)),
  ]);

  if (isNaN(Number(malId)) || !animeData) {
    notFound();
  }

  const heroData = {
    imageUrl: animeData.images?.webp?.large_image_url,
    title: animeData.title,
    titleEnglish: animeData.title_english,
    titleJapanese: animeData.title_japanese,
    titleSynonyms: animeData.title_synonyms,
    type: animeData.type,
    status: animeData.status,
    score: animeData.score,
    scoredBy: animeData.scored_by,
    rank: animeData.rank,
    popularity: animeData.popularity,
    members: animeData.members,
    season: animeData.season,
    year: animeData.year,
    studios: animeData.studios,
    schedules: animeData.broadcast.day,
  };

  const sidebarData = {
    titleJapanese: animeData.title_japanese,
    titleSynonyms: animeData.title_synonyms,
    status: animeData.status,
    episodes: animeData.episodes,
    rating: animeData.rating,
    season: animeData.season,
    year: animeData.year,
    aired: animeData.aired,
    duration: animeData.duration,
    broadcast: animeData.broadcast,
    studios: animeData.studios,
    producers: animeData.producers,
    licensors: animeData.licensors,
    source: animeData.source,
    genres: animeData.genres,
    themes: animeData.themes,
    demographics: animeData.demographics,
    rank: animeData.rank,
    popularity: animeData.popularity,
    members: animeData.members,
    favorites: animeData.favorites,
  };

  const contentData = {
    synopsis: animeData.synopsis,
    trailersData: animeData.trailer,
    charactersData: charactersData,
    themesData: animeData.theme,
    episodesData: episodesData,
    relationsData: animeData.relations,
  };

  return (
    <>
      <AnimeHeroSection heroData={heroData} />
      <ContentSection className="mt-0 md:-mt-24 lg:-mt-48 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="lg:col-span-1">
            <AnimeSidebar sidebarData={sidebarData} />
          </div>
          <div className="lg:col-span-3">
            <AnimeContentSections contentData={contentData} />
          </div>
        </div>
      </ContentSection>
    </>
  );
}

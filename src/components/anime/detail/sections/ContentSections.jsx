"use client";
import { useState, useRef, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/anime/detail/SectionCard";
import { TrailerSection } from "@/components/anime/detail/sections/TrailerSection";
import { CharactersSection } from "@/components/anime/detail/sections/CharactersSection";
import { CharactersOverview } from "@/components/anime/detail/CharactersOverview";
import { ThemeSongsSection } from "@/components/anime/detail/sections/ThemeSongsSection";
import { EpisodesSection } from "@/components/anime/detail/sections/EpisodesSection";
import { RelatedAnimeSection } from "@/components/anime/detail/sections/RelatedAnimeSection";

export function AnimeContentSections({ contentData }) {
  const {
    synopsis,
    trailersData,
    themesData,
    charactersData,
    episodesData,
    relationsData,
  } = contentData;
  const [showCharactersOnly, setShowCharactersOnly] = useState(false);
  const synopsisRef = useRef(null);
  const charactersRef = useRef(null);

  const characterGroups = useMemo(
    () => ({
      main: charactersData?.filter((char) => char.role === "Main") || [],
      supporting:
        charactersData?.filter((char) => char.role === "Supporting") || [],
      limited: charactersData?.slice(0, 8) || [],
    }),
    [charactersData]
  );

  const handleViewAllCharacters = useCallback(() => {
    setShowCharactersOnly(true);
    synopsisRef.current?.scrollIntoView({
      block: "end",
      inline: "end",
    });
  }, []);

  const handleBackToOverview = useCallback(() => {
    setShowCharactersOnly(false);
    setTimeout(() => {
      charactersRef.current?.scrollIntoView({
        block: "start",
        inline: "nearest",
      });
    });
  }, []);

  if (showCharactersOnly) {
    return (
      <CharactersOverview
        charactersData={charactersData}
        characterGroups={characterGroups}
        onBackToOverview={handleBackToOverview}
      />
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <SectionCard title="Synopsis" cardRef={synopsisRef}>
        <p className="text-sm sm:text-base text-muted-foreground/90 whitespace-pre-line leading-relaxed">
          {synopsis || "No synopsis available."}
        </p>
      </SectionCard>

      <SectionCard
        title="Trailer"
        titleColor="bg-red-500"
        className="border-border/30 bg-card/80 backdrop-blur-sm"
      >
        <TrailerSection trailersData={trailersData} />
      </SectionCard>

      <SectionCard
        title="Characters & Voice Actors"
        cardRef={charactersRef}
        headerActions={
          charactersData &&
          charactersData.length > 8 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleViewAllCharacters}
              className="text-xs"
            >
              View All ({charactersData.length})
            </Button>
          )
        }
      >
        <CharactersSection characters={characterGroups.limited} />
      </SectionCard>

      <SectionCard title="Theme Songs">
        <ThemeSongsSection themesData={themesData} />
      </SectionCard>

      <SectionCard title="Episodes">
        <EpisodesSection episodes={episodesData} />
      </SectionCard>

      <SectionCard title="Related Anime">
        <RelatedAnimeSection relationsData={relationsData} />
      </SectionCard>
    </div>
  );
}

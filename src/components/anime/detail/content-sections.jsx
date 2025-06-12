"use client";
import { useState, useRef, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/anime/detail/section-card";
import { TrailerSection } from "@/components/anime/detail/trailer-section";
import { CharactersSection } from "@/components/anime/detail/characters-section";
import { CharactersOverview } from "@/components/anime/detail/characters-overview";
import { ThemeSongsSection } from "@/components/anime/detail/theme-songs-section";
import { EpisodesSection } from "@/components/anime/detail/episodes-section";
import { RelatedAnimeSection } from "@/components/anime/detail/related-anime-section";

export function AnimeContentSections({
  animeData,
  themesData,
  relationsData,
  charactersData,
  episodesData,
}) {
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
          {animeData.synopsis || "No synopsis available."}
        </p>
      </SectionCard>

      <SectionCard
        title="Trailer"
        titleColor="bg-red-500"
        className="border-border/30 bg-card/80 backdrop-blur-sm"
      >
        <TrailerSection animeData={animeData} />
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
        <ThemeSongsSection themes={themesData} />
      </SectionCard>

      <SectionCard title="Episodes">
        <EpisodesSection episodes={episodesData} />
      </SectionCard>

      <SectionCard title="Related Anime">
        <RelatedAnimeSection relations={relationsData} />
      </SectionCard>
    </div>
  );
}

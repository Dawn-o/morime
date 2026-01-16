"use client";
import { useState, useRef, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/anime/detail/SectionCard";
import { MangaCharactersSection } from "@/components/manga/detail/sections/CharactersSection";
import { MangaCharactersOverview } from "@/components/manga/detail/CharactersOverview";
import { RelatedMangaSection } from "@/components/manga/detail/sections/RelatedMangaSection";
import { EmptyState } from "@/components/content/EmptyState";
import type { Character, Relation } from "@/types/anime";

interface SynopsisSectionProps {
  synopsis?: string | null;
}

const SynopsisSection = ({ synopsis }: SynopsisSectionProps) => {
  if (!synopsis) {
    return <EmptyState message="No synopsis available." />;
  }

  return (
    <p className="text-sm sm:text-base text-muted-foreground/90 whitespace-pre-line leading-relaxed">
      {synopsis}
    </p>
  );
};

interface MangaContentSectionsProps {
  contentData: {
    synopsis?: string | null;
    charactersData?: Character[] | null;
    relationsData?: Relation[] | null;
  };
}

export function MangaContentSections({
  contentData,
}: MangaContentSectionsProps) {
  const { synopsis, charactersData, relationsData } = contentData;

  const [showCharactersOnly, setShowCharactersOnly] = useState(false);
  const synopsisRef = useRef<HTMLDivElement>(null);
  const charactersRef = useRef<HTMLDivElement>(null);

  const characterGroups = useMemo(
    () => ({
      main: charactersData?.filter((char) => char.role === "Main") || [],
      supporting:
        charactersData?.filter((char) => char.role === "Supporting") || [],
      limited: charactersData?.slice(0, 8) || [],
    }),
    [charactersData],
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
      <MangaCharactersOverview
        charactersData={charactersData}
        characterGroups={characterGroups}
        onBackToOverview={handleBackToOverview}
      />
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <SectionCard title="Synopsis" cardRef={synopsisRef}>
        <SynopsisSection synopsis={synopsis} />
      </SectionCard>

      <SectionCard
        title="Characters"
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
        <MangaCharactersSection characters={characterGroups.limited} />
      </SectionCard>

      <SectionCard title="Related Manga">
        <RelatedMangaSection relationsData={relationsData} />
      </SectionCard>
    </div>
  );
}

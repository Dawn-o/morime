"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { EpisodesSection } from "@/components/anime/detail/episodes-section";
import { toSnakeCase } from "@/lib/utils";
import { CharactersSection } from "@/components/anime/detail/characters-section";
import { useState, useRef, useMemo, useCallback } from "react";
import { Separator } from "@/components/ui/separator";

const SectionCard = ({
  title,
  children,
  titleColor = "bg-primary",
  className = "",
  cardRef,
  headerActions,
}) => (
  <Card ref={cardRef} className={`shadow-lg border-border/40 ${className}`}>
    <CardHeader className="-mt-2 -mb-4">
      <CardTitle className="flex items-center justify-between text-lg sm:text-xl">
        <div className="flex items-center gap-2">
          <span
            className={`w-1.5 h-5 ${titleColor} rounded-full mr-1.5`}
          ></span>
          {title}
        </div>
        {headerActions}
      </CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export function AnimeContentSections({
  animeData,
  episodesData,
  charactersData,
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
      <div className="space-y-6">
        <SectionCard
          title="Characters & Voice Actors"
          headerActions={
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToOverview}
              className="text-xs"
            >
              Back to Overview
            </Button>
          }
        >
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto md:h-10 gap-1 md:gap-0 p-1 md:p-0">
              <TabsTrigger
                value="all"
                className="w-full py-2.5 md:py-0 text-sm justify-center cursor-pointer"
              >
                All ({charactersData.length})
              </TabsTrigger>

              <div className="-mx-1 md:hidden">
                <Separator className="w-full" />
              </div>

              <TabsTrigger
                value="main"
                className="w-full py-2.5 md:py-0 text-sm justify-center cursor-pointer"
              >
                Main ({characterGroups.main.length})
              </TabsTrigger>

              <div className="-mx-1 md:hidden">
                <Separator className="w-full" />
              </div>

              <TabsTrigger
                value="supporting"
                className="w-full py-2.5 md:py-0 text-sm justify-center cursor-pointer"
              >
                Supporting ({characterGroups.supporting.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <CharactersSection characters={charactersData} showAll={true} />
            </TabsContent>

            <TabsContent value="main" className="mt-4">
              {characterGroups.main.length > 0 ? (
                <CharactersSection
                  characters={characterGroups.main}
                  showAll={true}
                />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No main characters data available
                </div>
              )}
            </TabsContent>

            <TabsContent value="supporting" className="mt-4">
              {characterGroups.supporting.length > 0 ? (
                <CharactersSection
                  characters={characterGroups.supporting}
                  showAll={true}
                />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No supporting characters data available
                </div>
              )}
            </TabsContent>
          </Tabs>
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <SectionCard title="Synopsis" cardRef={synopsisRef}>
        <p className="text-sm sm:text-base text-muted-foreground/90 whitespace-pre-line leading-relaxed">
          {animeData.synopsis || "No synopsis available."}
        </p>
      </SectionCard>

      {animeData.trailer?.youtube_id && (
        <SectionCard
          title="Trailer"
          titleColor="bg-red-500"
          className="border-border/30 bg-card/80 backdrop-blur-sm"
        >
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow-xl">
            <iframe
              src={`https://www.youtube.com/embed/${animeData.trailer.youtube_id}`}
              title={`${animeData.title} Trailer`}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              loading="lazy"
            />
          </div>
        </SectionCard>
      )}

      {charactersData && charactersData.length > 0 && (
        <SectionCard
          title="Characters & Voice Actors"
          cardRef={charactersRef}
          headerActions={
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
          <CharactersSection
            characters={characterGroups.limited}
            showAll={false}
          />
        </SectionCard>
      )}

      {((animeData.theme?.openings && animeData.theme.openings.length > 0) ||
        (animeData.theme?.endings && animeData.theme.endings.length > 0)) && (
        <SectionCard title="Theme Songs">
          <div className="space-y-4">
            {animeData.theme?.openings &&
              animeData.theme.openings.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold mb-1">
                    Opening Themes
                  </h3>
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
        </SectionCard>
      )}

      <SectionCard title="Episodes">
        <EpisodesSection episodes={episodesData} />
      </SectionCard>

      {animeData.relations && animeData.relations.length > 0 && (
        <SectionCard title="Related Anime">
          <div className="space-y-1.5 sm:space-y-2">
            {animeData.relations.map((relation, index) => (
              <div key={index} className="bg-muted/50 rounded-md p-2 sm:p-3">
                <div className="text-sm sm:text-base font-medium">
                  {relation.relation}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {relation.entry.map((entry, i) => (
                    <span key={entry.mal_id}>
                      {i > 0 ? ", " : ""}
                      <Link
                        href={`/anime/${entry.mal_id}/${toSnakeCase(
                          entry.name
                        )}`}
                        className="hover:text-primary transition-colors"
                      >
                        {entry.name}
                      </Link>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ChevronDownIcon } from "lucide-react";
import { EmptyState } from "@/components/content/EmptyState";
import Image from "next/image";
import type { Character } from "@/types/anime";

interface CharactersSectionProps {
  characters?: Character[] | null;
}

export function CharactersSection({ characters }: CharactersSectionProps) {
  const initialLimit = 16;
  const [visibleCharacters, setVisibleCharacters] = useState(initialLimit);
  const INCREMENT = 6;

  if (!characters || characters.length === 0) {
    return <EmptyState message="No characters information available." />;
  }

  const displayCharacters = characters.slice(0, visibleCharacters);
  const hasMoreCharacters = visibleCharacters < characters.length;

  const loadMore = () => {
    setVisibleCharacters((prev) =>
      Math.min(prev + INCREMENT, characters.length),
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayCharacters.map((character, i) => {
          const japaneseVA = character.voice_actors?.find(
            (va) => va.language === "Japanese",
          );

          return (
            <div
              key={`${character.character?.mal_id}-${i}`}
              className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border/50 hover:border-border transition-all duration-200 hover:shadow-sm"
            >
              <div className="shrink-0">
                <Image
                  src={
                    character.character?.images?.webp?.image_url ||
                    "/placeholder-character.png"
                  }
                  alt={character.character?.name || "Character"}
                  width={64}
                  height={64}
                  className="rounded-lg object-cover shadow-sm"
                  placeholder="empty"
                  loading="lazy"
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <h4 className="font-semibold text-sm text-foreground truncate">
                  {character.character?.name || "Unknown Character"}
                </h4>
                <p className="text-xs text-muted-foreground font-medium">
                  {character.role || "Unknown Role"}
                </p>

                <div className="space-y-0.5">
                  <p className="text-xs text-muted-foreground truncate">
                    {japaneseVA?.person?.name || "Unknown Voice Actor"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {characters.length > initialLimit && (
        <div className="mt-4 space-y-2">
          {hasMoreCharacters && (
            <Button variant="outline" className="w-full" onClick={loadMore}>
              <ChevronDownIcon className="h-4 w-4 mr-2" />
              Show More
            </Button>
          )}
        </div>
      )}
    </>
  );
}

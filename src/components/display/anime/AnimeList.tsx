"use client";
import Image from "next/image";
import { Link } from "@/components/ui/Link";
import { Star, Play } from "lucide-react";
import { toSnakeCase } from "@/lib/utils/Formatter";
import { getImageWithFallback } from "@/lib/utils/ImageFallback";
import { useState } from "react";
import type { AnimeCardData } from "@/types/components";

interface AnimeListCardProps {
  anime: AnimeCardData;
}

function AnimeListCard({ anime }: AnimeListCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={`/anime/${anime.mal_id}/${toSnakeCase(anime.title)}`}
      className="group block p-4 border border-border rounded-lg hover:border-primary transition-all duration-300 hover:shadow-md"
    >
      <div className="flex items-start space-x-4">
        <div className="shrink-0 w-16 h-24 overflow-hidden rounded-lg bg-muted relative">
          {anime.imageUrl && !imageError ? (
            <Image
              src={getImageWithFallback(anime.imageUrl)}
              alt={anime.title}
              fill
              className="object-cover"
              sizes="64px"
              quality={80}
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Play className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
            {anime.title}
          </h3>

          <div className="mt-2 space-y-1">
            <div className="text-xs text-muted-foreground">
              {anime.episodes
                ? `${anime.type || "TV"} (${anime.episodes} eps)`
                : anime.type || "TV"}
            </div>

            <div className="flex items-center text-xs text-muted-foreground">
              <Star className="w-3 h-3 mr-1 text-yellow-500" />
              <span>{anime.score || "N/A"}</span>
            </div>

            {anime.members && (
              <div className="text-xs text-muted-foreground">
                {anime.members.toLocaleString()} members
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

interface AnimeListProps {
  animeData: {
    data: AnimeCardData[];
  } | null;
  currentPage: number;
  basePath: string;
  queryParams?: Record<string, string>;
}

export function AnimeList({ animeData }: AnimeListProps) {
  if (!animeData || !animeData.data || animeData.data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          No anime found matching your search.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {animeData.data.map((anime, i) => (
        <AnimeListCard key={`${anime.mal_id}-${i}`} anime={anime} />
      ))}
    </div>
  );
}

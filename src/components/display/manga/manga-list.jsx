"use client";
import Image from "next/image";
import { Link } from "@/components/ui/link";
import { Star, Play } from "lucide-react";
import { toSnakeCase } from "@/lib/utils/formatter";
import { getImageWithFallback } from "@/lib/utils/image-fallback";
import { useState } from "react";

function MangaListCard({ manga }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={`/manga/${manga.mal_id}/${toSnakeCase(manga.title)}`}
      className="group block p-4 border border-border rounded-lg hover:border-primary transition-all duration-300 hover:shadow-md"
    >
      <div className="flex items-start space-x-4">
        <div className="shrink-0 w-16 h-24 overflow-hidden rounded-lg bg-muted relative">
          {manga.imageUrl && !imageError ? (
            <Image
              src={getImageWithFallback(manga.imageUrl)}
              alt={manga.title}
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
            {manga.title}
          </h3>

          <div className="mt-2 space-y-1">
            <div className="text-xs text-muted-foreground">
              {manga.chapters
                ? `${manga.type || "Manga"} (${manga.chapters} chapters)`
                : manga.type || "Manga"}
            </div>

            <div className="flex items-center text-xs text-muted-foreground">
              <Star className="w-3 h-3 mr-1 text-yellow-500" />
              <span>{manga.score || "N/A"}</span>
            </div>

            {manga.status && (
              <div className="text-xs text-muted-foreground">
                {manga.status}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function MangaList({ mangaData, currentPage, basePath, queryParams }) {
  if (!mangaData || !mangaData.data || mangaData.data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          No manga found matching your search.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {mangaData.data.map((manga, i) => (
        <MangaListCard key={`${manga.mal_id}-${i}`} manga={manga} />
      ))}
    </div>
  );
}

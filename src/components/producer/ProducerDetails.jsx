"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatEstablishedDate, toSnakeCase } from "@/lib/utils/Formatter";
import { Building2, Calendar } from "lucide-react";
import Image from "next/image";
import { getImageWithFallback } from "@/lib/utils/ImageFallback";
import { useState } from "react";
import { AnimeGrid } from "@/components/display/anime/AnimeGrid";

export function ProducerDetails({ producer, animes, currentPage }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 mx-auto sm:mx-0 overflow-hidden rounded-lg bg-muted border relative">
              {producer.imageUrl && !imageError ? (
                <Image
                  src={getImageWithFallback(producer.imageUrl)}
                  alt={
                    producer.titles?.[0]?.title || producer.name || "Producer"
                  }
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 96px, 128px"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Building2 className="w-8 h-8 sm:w-12 sm:h-12 text-muted-foreground" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 text-center sm:text-left">
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl mb-2 sm:mb-3 wrap-break-words">
                {producer.titles?.[0]?.title ||
                  producer.name ||
                  "Unknown Producer"}
              </CardTitle>

              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-3 sm:mb-4">
                {producer.established && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1.5 text-xs sm:text-sm"
                  >
                    <Calendar className="w-3 h-3" />
                    <span className="hidden xs:inline">
                      {formatEstablishedDate(producer.established)}
                    </span>
                    <span className="xs:hidden">
                      {new Date(producer.established).getFullYear()}
                    </span>
                  </Badge>
                )}
              </div>

              {producer.about && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-left">
                  {producer.about}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">Statistics</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 border rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-primary">
                {producer.count || 0}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Anime Produced
              </div>
            </div>

            <div className="text-center p-3 sm:p-4 border rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-primary">
                {producer.favorites ? producer.favorites.toLocaleString() : 0}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Favorites
              </div>
            </div>

            <div className="text-center p-3 sm:p-4 border rounded-lg sm:col-span-1 col-span-1">
              <div className="text-xl sm:text-2xl font-bold text-primary">
                {producer.established
                  ? new Date().getFullYear() -
                    new Date(producer.established).getFullYear()
                  : "N/A"}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Years Active
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">Produced Anime</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
          <AnimeGrid
            animeData={animes}
            currentPage={currentPage}
            basePath={`/producer/${producer.mal_id}/${toSnakeCase(
              producer.titles?.[0]?.title,
            )}`}
            queryParams={{}}
          />
        </CardContent>
      </Card>
    </div>
  );
}

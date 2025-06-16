"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatEstablishedDate, toSnakeCase } from "@/lib/formatter";
import { Building2, Calendar } from "lucide-react";
import Image from "next/image";
import { getImageWithFallback } from "@/lib/image-fallback";
import { useState } from "react";
import { AnimeGrid } from "@/components/anime/anime-grid";

export function ProducerDetails({ producer, animes, currentPage }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-32 h-32 overflow-hidden rounded-lg bg-muted border relative">
              {producer.images?.jpg?.image_url && !imageError ? (
                <Image
                  src={getImageWithFallback(producer.images.jpg.image_url)}
                  alt={
                    producer.titles?.[0]?.title || producer.name || "Producer"
                  }
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Building2 className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <CardTitle className="text-3xl mb-3">
                {producer.titles?.[0]?.title ||
                  producer.name ||
                  "Unknown Producer"}
              </CardTitle>

              <div className="flex flex-wrap gap-2 mb-4">
                {producer.established && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1.5"
                  >
                    <Calendar className="w-3 h-3" />
                    {formatEstablishedDate(producer.established)}
                  </Badge>
                )}
              </div>

              {producer.about && (
                <p className="text-muted-foreground leading-relaxed">
                  {producer.about}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {producer.count || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                Anime Produced
              </div>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {producer.favorites ? producer.favorites.toLocaleString() : 0}
              </div>
              <div className="text-sm text-muted-foreground">Favorites</div>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {producer.established
                  ? new Date().getFullYear() -
                    new Date(producer.established).getFullYear()
                  : "N/A"}
              </div>
              <div className="text-sm text-muted-foreground">Years Active</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Produced Anime</CardTitle>
        </CardHeader>
        <CardContent>
          <AnimeGrid
            animeData={animes}
            currentPage={currentPage}
            basePath={`/producer/${producer.mal_id}/${toSnakeCase(
              producer.titles?.[0]?.title
            )}`}
            queryParams={{}}
          />
        </CardContent>
      </Card>
    </div>
  );
}

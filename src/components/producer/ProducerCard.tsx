"use client";
import Image from "next/image";
import { Link } from "@/components/ui/Link";
import { Building2, Calendar, Heart, TrendingUp } from "lucide-react";
import { getImageWithFallback } from "@/lib/utils/ImageFallback";
import { useState } from "react";
import { toSnakeCase, formatEstablished } from "@/lib/utils/Formatter";
import type { ProducerData } from "@/types/anime";

interface ProducerCardProps {
  producers: ProducerData;
}

export function ProducerCard({ producers }: ProducerCardProps) {
  const [imageError, setImageError] = useState(false);

  const producerName =
    producers.titles?.[0]?.title || producers.name || "Unknown Producer";
  const imageUrl = producers.images?.jpg?.image_url;

  return (
    <Link
      href={`/producer/${producers.mal_id}/${toSnakeCase(producerName)}`}
      className="group block p-4 border border-border rounded-lg hover:border-primary transition-all duration-300 hover:shadow-md"
    >
      <div className="flex items-start space-x-4">
        <div className="shrink-0 w-16 h-16 overflow-hidden rounded-lg bg-muted relative">
          {imageUrl && !imageError ? (
            <Image
              src={getImageWithFallback(imageUrl)}
              alt={producerName}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Building2 className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
            {producerName}
          </h3>

          <div className="mt-2 space-y-1">
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>{producers.count || 0} anime</span>
            </div>

            {producers.favorites > 0 && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Heart className="w-3 h-3 mr-1" />
                <span>{producers.favorites.toLocaleString()} favorites</span>
              </div>
            )}

            {producers.established && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="w-3 h-3 mr-1" />
                <span>{formatEstablished(producers.established)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

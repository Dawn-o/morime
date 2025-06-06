import Image from "next/image";
import Link from "next/link";
import { Star, Calendar, Clock } from "lucide-react";
import { toSnakeCase } from "@/lib/utils";

export function AnimeCard({ anime, priority = false }) {
  return (
    <Link
      href={`/anime/${anime.mal_id}/${toSnakeCase(anime.title)}`}
      className="group transition-all duration-300 hover:-translate-y-1"
    >
      <div className="w-full h-auto aspect-[2/3] flex flex-col">
        <div className="w-full h-full overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl relative">
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

          {/* Image */}
          <Image
            src={anime.images.webp.large_image_url}
            alt={anime.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="1024px"
            priority={priority}
          />

          {/* Score badge */}
          {anime.score && (
            <div className="absolute top-2 right-2 bg-amber-500/90 text-black text-xs font-bold px-2 py-1 rounded flex items-center z-10">
              <Star className="w-3 h-3 mr-1" />
              {anime.score}
            </div>
          )}

          {/* Episodes badge */}
          {anime.episodes && (
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {anime.episodes} eps
            </div>
          )}
        </div>

        <div className="pt-2">
          <h3 className="text-sm font-medium leading-tight truncate line-clamp-2 group-hover:text-primary transition-colors">
            {anime.title}
          </h3>
          <div className="flex items-center mt-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{anime.year || "TBA"}</span>
            {anime.type && (
              <>
                <span className="mx-1">•</span>
                <span>{anime.type}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

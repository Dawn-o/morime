import Image from "next/image";
import Link from "next/link";
import { toSnakeCase } from "@/lib/utils";

export function CharactersSection({ characters }) {
  if (!characters || characters.length === 0) {
    return (
      <p className="text-muted-foreground">No characters data available.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {characters.slice(0, 10).map((character) => (
        <div
          key={character.character.mal_id}
          className="flex gap-3 p-3 bg-card/50 rounded-lg border border-border/40"
        >
          <div className="w-16 h-20 relative rounded overflow-hidden flex-shrink-0">
            <Image
              src={
                character.character.images?.webp?.image_url ||
                character.character.images?.jpg?.image_url
              }
              alt={character.character.name}
              fill
              className="object-cover"
              sizes="1024px"
            />
          </div>

          <div className="flex-1 min-w-0">
            <Link
              href={`/character/${character.character.mal_id}/${toSnakeCase(
                character.character.name
              )}`}
              className="font-medium text-sm hover:text-primary line-clamp-1"
            >
              {character.character.name}
            </Link>
            <p className="text-xs text-muted-foreground mt-1">
              {character.role}
            </p>

            <div className="mt-2">
              <div className="text-xs text-muted-foreground">
                {(() => {
                  const japaneseVA = character.voice_actors?.find(
                    (va) => va.language === "Japanese"
                  );
                  return japaneseVA?.person?.name || "Unknown Voice Actor";
                })()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

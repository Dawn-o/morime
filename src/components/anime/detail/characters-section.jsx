export function CharactersSection({ characters, showAll = false }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {characters.map((character, index) => {
        const japaneseVA = character.voice_actors?.find(
          (va) => va.language === "Japanese"
        );

        return (
          <div
            key={`${character.character?.mal_id}-${index}`}
            className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border/50 hover:border-border transition-all duration-200 hover:shadow-sm"
          >
            <div className="flex-shrink-0">
              <img
                src={
                  character.character?.images?.jpg?.image_url ||
                  "/placeholder-character.png"
                }
                alt={character.character?.name || "Character"}
                className="w-16 h-16 rounded-lg object-cover shadow-sm"
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
  );
}

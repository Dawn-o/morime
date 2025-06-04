import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EpisodesSection } from "@/components/anime/episodes-section";
import { toSnakeCase } from "@/lib/utils";
import { CharactersSection } from "./characters-section";

export function AnimeContentSections({
  animeData,
  episodesData,
  charactersData,
}) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Synopsis */}
      <Card className="shadow-lg border-border/40">
        <CardHeader className="-mt-2 -mb-4">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <span className="w-1.5 h-5 bg-primary rounded-full mr-1.5"></span>
            Synopsis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm sm:text-base text-muted-foreground/90 whitespace-pre-line leading-relaxed">
            {animeData.synopsis || "No synopsis available."}
          </p>
        </CardContent>
      </Card>

      {/* Trailer */}
      {animeData.trailer?.youtube_id && (
        <Card className="shadow-lg border-border/30 bg-card/80 backdrop-blur-sm">
          <CardHeader className="-mt-2 -mb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <span className="w-1.5 h-5 bg-red-500 rounded-full mr-1.5"></span>
              Trailer
            </CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      )}

      {/* Characters */}
      {charactersData && charactersData.length > 0 && (
        <Card className="shadow-lg border-border/40">
          <CardHeader className="-mt-2 -mb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <span className="w-1.5 h-5 bg-primary rounded-full mr-1.5"></span>
              Characters & Voice Actors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CharactersSection characters={charactersData} />
          </CardContent>
        </Card>
      )}

      {/* Theme Songs */}
      {((animeData.theme?.openings && animeData.theme.openings.length > 0) ||
        (animeData.theme?.endings && animeData.theme.endings.length > 0)) && (
        <div>
          <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">
            Theme Songs
          </h2>
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
        </div>
      )}

      {/* Episodes */}
      <Card className="shadow-lg border-border/40">
        <CardHeader className="-mt-2 -mb-4">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <span className="w-1.5 h-5 bg-primary rounded-full mr-1.5"></span>
            Episodes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EpisodesSection episodes={episodesData} />
        </CardContent>
      </Card>

      {/* Related Anime */}
      {animeData.relations && animeData.relations.length > 0 && (
        <div>
          <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">
            Related Anime
          </h2>
          <div className="space-y-1.5 sm:space-y-2">
            {animeData.relations.map((relation, index) => (
              <div key={index} className="bg-card rounded-md p-2 sm:p-3">
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
                        className="hover:text-primary"
                      >
                        {entry.name}
                      </Link>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

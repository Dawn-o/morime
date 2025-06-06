import { AnimeCard } from "@/components/anime/anime-card";
import { Separator } from "@/components/ui/separator";
import { AnimePagination } from "@/components/anime/anime-pagination";
import { AnimeError } from "@/components/anime/season/anime-error";

export function SeasonContent({ 
    seasonData, 
    currentPage, 
    basePath, 
    queryParams, 
    pageType, 
    dayFilter 
}) {
    if (seasonData.data.length === 0) {
        return (
            <AnimeError
                pageType={pageType}
                dayFilter={dayFilter}
            />
        );
    }

    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {seasonData.data.map((anime, index) => (
                    <AnimeCard key={anime.mal_id} anime={anime} priority={index < 3} />
                ))}
            </div>

            <Separator className="my-8" />

            <AnimePagination
                currentPage={currentPage}
                totalPages={seasonData.totalPages || 1}
                basePath={basePath}
                queryParams={queryParams}
            />
        </div>
    );
}
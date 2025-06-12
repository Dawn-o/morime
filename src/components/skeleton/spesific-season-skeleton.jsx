import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function SpecificSeasonSkeleton() {
    return (
        <section className="container mx-auto py-8 sm:py-10 px-4">
            {/* Header Section */}
            <div className="text-center space-y-2 mb-8">
                <Skeleton className="h-8 w-64 mx-auto" /> {/* Title */}
                <Skeleton className="h-4 w-48 mx-auto" />  {/* Subtitle */}
            </div>

            {/* Season Navigation */}
            <div className="mb-6">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                    <Skeleton className="h-9 w-16" />  {/* Prev button */}
                    <Skeleton className="h-6 w-32" />  {/* Current season text */}
                    <Skeleton className="h-9 w-16" />  {/* Next button */}
                </div>
            </div>

            {/* Type Filter Tabs */}
            <div className="mb-6">
                <div className="flex items-center justify-center">
                    <div className="flex flex-wrap gap-1 p-1 bg-muted rounded-lg">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton key={index} className="h-8 w-16" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Anime Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Array.from({ length: 24 }).map((_, index) => (
                    <AnimeCardSkeleton key={index} />
                ))}
            </div>

            <Separator className="my-8" />

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-9 w-20" /> {/* Previous button */}
                    <Skeleton className="h-9 w-16" /> {/* Next button */}
                </div>
                <Skeleton className="h-4 w-24" /> {/* Page info */}
            </div>
        </section>
    );
}

// Individual Anime Card Skeleton
function AnimeCardSkeleton() {
    return (
        <div className="space-y-3">
            <Skeleton className="aspect-[3/4] w-full rounded-lg" /> {/* Anime poster */}
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />   {/* Title line 1 */}
                <Skeleton className="h-4 w-3/4" />    {/* Title line 2 */}
                <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-12" /> {/* Score */}
                    <Skeleton className="h-3 w-8" />  {/* Type */}
                </div>
            </div>
        </div>
    );
}
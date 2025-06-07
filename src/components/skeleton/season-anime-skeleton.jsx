import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function SeasonAnimeSkeleton() {
    return (
        <section className="container mx-auto py-8 sm:py-10 px-4">
            {/* Header skeleton */}
            <div className="text-center space-y-2 mb-8">
                <Skeleton className="h-8 w-72 mx-auto" />
                <Skeleton className="h-4 w-96 mx-auto" />
            </div>

            {/* Navigation skeleton */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} className="h-10 w-24" />
                ))}
            </div>

            {/* Filter tabs skeleton */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton key={index} className="h-9 w-16" />
                ))}
            </div>

            {/* Content skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Array.from({ length: 24 }).map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                        <Skeleton className="aspect-[3/4] w-full" />
                        <CardContent className="p-3 space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-3 w-3/4" />
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-3 w-12" />
                                <Skeleton className="h-3 w-8" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Separator className="my-8" />

            {/* Pagination skeleton */}
            <div className="flex justify-center items-center space-x-2">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-20" />
            </div>
        </section>
    );
}
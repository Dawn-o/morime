import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function SeasonArchiveSkeleton() {
    return (
        <div className="space-y-8">
            {Array.from({ length: 5 }).map((_, yearIndex) => (
                <div key={yearIndex} className="space-y-4">
                    <Skeleton className="h-6 w-16" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, seasonIndex) => (
                            <Card key={seasonIndex} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4 space-y-2">
                                    <Skeleton className="h-5 w-20" />
                                    <Skeleton className="h-4 w-full" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
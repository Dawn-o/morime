import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProducerDetailsSkeleton() {
    return (
        <section className="container mx-auto py-8 sm:py-10 px-4">
            <div className="space-y-6">
                {/* Main producer info card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-start gap-4">
                            <Skeleton className="w-24 h-24 rounded-lg" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-8 w-48" />
                                <Skeleton className="h-5 w-32" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* External links card */}
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                    </CardContent>
                </Card>

                {/* Produced anime card */}
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-36" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-4 w-48" />
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
import { SeasonList } from "@/components/anime/season/season-list";
import { Suspense } from "react";
import { SeasonListSkeleton } from "@/components/skeleton/season-list-skeleton";
import { getSeasons } from "@/hooks/api";

export async function generateMetadata() {
    return {
        title: 'Anime Season List',
        description: 'Browse anime seasons by year and season',
    };
}

export default async function SeasonListPage() {
    const listData = await getSeasons();

    return (
        <Suspense fallback={<SeasonListSkeleton />}>
            <section className="container mx-auto py-8 sm:py-10 px-4">
                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-2xl font-bold text-foreground">Anime Season List</h1>
                    <p className="text-sm text-muted-foreground">Browse anime seasons by year and season</p>
                </div>

                <SeasonList listData={listData} />
            </section>
        </Suspense>
    );
}
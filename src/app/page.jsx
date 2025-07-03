import { Suspense } from "react";
import HomePage from "@/components/anime/home/home-page";
import { HomePageSkeleton } from "@/components/loading/home-page-skeleton";
import { getTopAnime, getAnimeGenresList } from "@/hooks/anime";
import { getSeason } from "@/hooks/season";

async function HomePageContent() {
    try {
        const upcomings = await getSeason(3, { type: "seasons/upcoming", limit: 6 });
        const animes = await getSeason(1, { type: "seasons/now", limit: 20 });
        const topAnimes = await getTopAnime(1, { limit: 20 });
        const genresList = await getAnimeGenresList();

        return (
            <HomePage
                upcomings={upcomings.data}
                topAnimes={topAnimes.data}
                animes={animes.data}
                genresList={genresList}
            />
        );
    } catch (error) {
        return (
            <HomePage
                upcomings={[]}
                topAnimes={[]}
                animes={[]}
                genresList={[]}
            />
        );
    }
}

export default function Home() {
    return (
        <Suspense fallback={<HomePageSkeleton />}>
            <HomePageContent />
        </Suspense>
    );
}

import { Suspense } from "react";
import dynamic from "next/dynamic";
import AnimeListSkeleton from "@/components/loading/AnimeListSkeleton";

const AnimePageContent = dynamic(
  () => import("@/components/anime/AnimePageContent"),
  { suspense: true },
);

export const metadata = {
  title: "Anime List",
  description:
    "Browse thousands of anime series, movies, and specials. Search by genre, filter by season, and discover your next favorite anime with detailed information and ratings.",
};

function AnimePageSkeleton({ searchParams }) {
  const hasSearchQuery = searchParams?.q && searchParams.q.trim() !== "";
  return <AnimeListSkeleton showSearch={true} isSearching={hasSearchQuery} />;
}

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <Suspense fallback={<AnimePageSkeleton searchParams={searchParams} />}>
      <AnimePageContent {...props} />
    </Suspense>
  );
}

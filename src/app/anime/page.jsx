import { Suspense } from "react";
import dynamic from "next/dynamic";
import AnimeListSkeleton from "@/components/loading/anime-list-skeleton";

const AnimePageContent = dynamic(
  () => import("@/components/anime/anime-page-content"),
  { suspense: true },
);

export const metadata = {
  title: "Anime List",
  description:
    "Browse all anime series, movies, and specials from extensive collection.",
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

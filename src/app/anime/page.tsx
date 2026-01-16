import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import AnimeListSkeleton from "@/components/loading/AnimeListSkeleton";
import type { SearchPageProps } from "@/types/pages";

const AnimePageContent = dynamic(
  () => import("@/components/anime/AnimePageContent"),
);

export const metadata: Metadata = {
  title: "Anime List",
  description:
    "Browse and discover anime. Search, filter by type and status, and explore thousands of anime titles.",
};

function AnimePageSkeleton({ searchParams }: { searchParams: { q?: string } }) {
  const hasSearchQuery = searchParams?.q && searchParams.q.trim() !== "";
  return <AnimeListSkeleton showSearch={true} isSearching={hasSearchQuery} />;
}

export default async function Page(props: SearchPageProps) {
  const searchParams = await props.searchParams;

  return (
    <Suspense fallback={<AnimePageSkeleton searchParams={searchParams} />}>
      <AnimePageContent {...props} />
    </Suspense>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import MangaListSkeleton from "@/components/loading/MangaListSkeleton";
import type { SearchPageProps } from "@/types/pages";

const MangaPageContent = dynamic(
  () => import("@/components/manga/MangaPageContent"),
);

export const metadata: Metadata = {
  title: "Manga List",
  description:
    "Browse thousands of manga series, manhwa, and manhua. Search by genre, filter by type, and discover your next favorite manga with detailed information and ratings.",
};

function MangaPageSkeleton({ searchParams }: { searchParams: { q?: string } }) {
  const hasSearchQuery = searchParams?.q && searchParams.q.trim() !== "";
  return <MangaListSkeleton showSearch={true} isSearching={hasSearchQuery} />;
}

export default async function Page(props: SearchPageProps) {
  const searchParams = await props.searchParams;

  return (
    <Suspense fallback={<MangaPageSkeleton searchParams={searchParams} />}>
      <MangaPageContent {...props} />
    </Suspense>
  );
}

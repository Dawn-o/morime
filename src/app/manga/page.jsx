import { Suspense } from "react";
import dynamic from "next/dynamic";
import MangaListSkeleton from "@/components/loading/MangaListSkeleton";

const MangaPageContent = dynamic(
  () => import("@/components/manga/MangaPageContent"),
  { suspense: true },
);

export const metadata = {
  title: "Manga List",
  description:
    "Browse thousands of manga series across all genres. Search, filter, and discover your next favorite manga with comprehensive information, ratings, and character details.",
};

function MangaPageSkeleton({ searchParams }) {
  const hasSearchQuery = searchParams?.q && searchParams.q.trim() !== "";
  return <MangaListSkeleton showSearch={true} isSearching={hasSearchQuery} />;
}

export default async function Page(props) {
  const searchParams = await props.searchParams;

  return (
    <Suspense fallback={<MangaPageSkeleton searchParams={searchParams} />}>
      <MangaPageContent {...props} />
    </Suspense>
  );
}

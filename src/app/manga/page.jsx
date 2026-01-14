import { Suspense } from "react";
import dynamic from "next/dynamic";
import MangaListSkeleton from "@/components/loading/manga-list-skeleton";

const MangaPageContent = dynamic(
  () => import("@/components/manga/manga-page-content"),
  { suspense: true },
);

export const metadata = {
  title: "Manga List",
  description:
    "Browse all manga series, movies, and specials from extensive collection.",
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

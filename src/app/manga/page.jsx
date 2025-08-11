import { Suspense } from "react";
import dynamic from "next/dynamic";
import MangaListSkeleton from "@/components/loading/manga-list-skeleton";

const MangaPageContent = dynamic(
  () => import("@/components/manga/manga-page-content"),
  { suspense: true }
);

export const metadata = {
  title: "Manga List",
  description:
    "Browse all manga series, movies, and specials from extensive collection.",
};

export default function Page(props) {
  return (
    <Suspense fallback={<MangaListSkeleton showSearch={true} />}>
      <MangaPageContent {...props} />
    </Suspense>
  );
}

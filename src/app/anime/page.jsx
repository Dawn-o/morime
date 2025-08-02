import { Suspense } from "react";
import dynamic from "next/dynamic";
import AnimeListSkeleton from "@/components/loading/anime-list-skeleton";

const AnimePageContent = dynamic(
  () => import("@/components/anime/anime-page-content"),
  { suspense: true }
);

export const metadata = {
  title: "Anime List",
  description:
    "Browse all anime series, movies, and specials from our extensive collection.",
};

export default function Page(props) {
  return (
    <Suspense fallback={<AnimeListSkeleton showSearch={true} />}>
      <AnimePageContent {...props} />
    </Suspense>
  );
}

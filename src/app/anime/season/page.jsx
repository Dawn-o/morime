import { Suspense } from "react";
import dynamic from "next/dynamic";
import { SeasonListSkeleton } from "@/components/loading/SeasonListSkeleton";

export const metadata = {
  title: "Anime Season List",
  description: "Browse anime seasons by year and season",
};

const SeasonListContent = dynamic(
  () => import("@/components/anime/season/SeasonListContent"),
  { suspense: true }
);

export default function SeasonListPage() {
  return (
    <Suspense fallback={<SeasonListSkeleton />}>
      <SeasonListContent />
    </Suspense>
  );
}

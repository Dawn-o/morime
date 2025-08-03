import { getAnimeTitle } from "@/lib/content/anime-titles";
import { TopAnimeNavigation } from "@/components/navigation/top-navigation";
import { Suspense } from "react";
import AnimeGridSkeleton from "@/components/loading/anime-grid-skeleton";

export default function TopAnimeLayout({ children, params }) {
  const type = params?.type?.[0] || "all";
  const titleData = getAnimeTitle(type);

  return (
    <section className="container mx-auto py-8 sm:py-10 px-4">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          {titleData.title}
        </h1>
        <p className="text-sm text-muted-foreground">{titleData.description}</p>
      </div>

      <TopAnimeNavigation currentType={type} />

      {children}
    </section>
  );
}

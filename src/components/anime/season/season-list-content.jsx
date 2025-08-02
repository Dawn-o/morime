import { getSeasonList } from "@/hooks/season";
import { SeasonList } from "@/components/anime/season/season-list";

export default async function SeasonListContent() {
  const listData = await getSeasonList();

  return (
    <section className="container mx-auto py-8 sm:py-10 px-4">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Anime Season List
        </h1>
        <p className="text-sm text-muted-foreground">
          Browse anime seasons by year and season
        </p>
      </div>

      <SeasonList listData={listData} />
    </section>
  );
}

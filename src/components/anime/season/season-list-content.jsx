import { getSeasonList } from "@/hooks/season";
import { SeasonList } from "@/components/anime/season/season-list";
import { PageContainer } from "@/components/layout/page-container";

export default async function SeasonListContent() {
  const listData = await getSeasonList();

  return (
    <PageContainer as="section">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Anime Season List
        </h1>
        <p className="text-sm text-muted-foreground">
          Browse anime seasons by year and season
        </p>
      </div>

      <SeasonList listData={listData} />
    </PageContainer>
  );
}

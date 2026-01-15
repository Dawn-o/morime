import { getAnimeTitle } from "@/lib/content/anime-titles";
import { PageHeader } from "@/components/headers/page-header";
import { TopAnimeNavigation } from "@/components/navigation/top-navigation";
import { PageContainer } from "@/components/layout/page-container";

export default async function TopAnimeLayout({ children, params }) {
  const resolvedParams = await params;
  const type = resolvedParams?.type?.[0] || "all";
  const titleData = getAnimeTitle(type);

  return (
    <PageContainer as="section">
      <PageHeader title={titleData.title} description={titleData.description} />

      <TopAnimeNavigation currentType={type} />

      {children}
    </PageContainer>
  );
}

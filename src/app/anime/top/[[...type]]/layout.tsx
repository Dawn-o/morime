import { getAnimeTitle } from "@/lib/content/AnimeTitles";
import { PageHeader } from "@/components/headers/PageHeader";
import { TopAnimeNavigation } from "@/components/navigation/TopNavigation";
import { PageContainer } from "@/components/layout/PageContainer";

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

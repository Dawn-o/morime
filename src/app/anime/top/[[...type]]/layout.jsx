import { getAnimeTitle } from "@/lib/content/anime-titles";
import { PageHeader } from "@/components/headers/page-header";
import { TopAnimeNavigation } from "@/components/navigation/top-navigation";

export default async function TopAnimeLayout({ children, params }) {
  const resolvedParams = await params;
  const type = resolvedParams?.type?.[0] || "all";
  const titleData = getAnimeTitle(type);

  return (
    <section className="container mx-auto py-8 sm:py-10 px-4">
      <PageHeader title={titleData.title} description={titleData.description} />

      <TopAnimeNavigation currentType={type} />

      {children}
    </section>
  );
}

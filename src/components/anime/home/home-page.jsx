import { HomeCarousel } from "@/components/anime/home/carousel";
import { SectionHeader } from "@/components/headers/section-header";
import { AnimeCarousel } from "@/components/anime/home/anime-carousel";
import { GenreList } from "@/components/display/anime/genre-list";
import { getCurrentSeasonPath } from "@/lib/utils/season";
import { PageContainer } from "@/components/layout/page-container";

export default async function HomePage({
  upcomings = [],
  topAnimes = [],
  animes = [],
  genresList = [],
}) {
  return (
    <PageContainer as="main" noPaddingY className="pb-12">
      <section className="px-3 md:px-0 mt-3 mb-6">
        <HomeCarousel items={upcomings} />
      </section>
      <section className="mb-12 px-4">
        <GenreList genres={genresList} />
      </section>

      <section className="mb-12 px-4">
        <SectionHeader
          title="Top Rated"
          subtitle="Most popular among fans"
          viewAllLink="/anime/top"
        />
        <AnimeCarousel animes={topAnimes} />
      </section>

      <section className="mb-12 px-4">
        <SectionHeader
          title="Ongoing Anime"
          subtitle="Currently airing this season"
          viewAllLink={getCurrentSeasonPath()}
        />
        <AnimeCarousel animes={animes} />
      </section>
    </PageContainer>
  );
}

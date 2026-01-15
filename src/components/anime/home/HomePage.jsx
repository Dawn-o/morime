import { HomeCarousel } from "@/components/anime/home/Carousel";
import { SectionHeader } from "@/components/headers/SectionHeader";
import { AnimeCarousel } from "@/components/anime/home/AnimeCarousel";
import { GenreList } from "@/components/display/anime/GenreList";
import { getCurrentSeasonPath } from "@/lib/utils/Season";
import { PageContainer } from "@/components/layout/PageContainer";

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

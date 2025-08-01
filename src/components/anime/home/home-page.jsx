import { HomeCarousel } from "@/components/anime/home/carousel";
import { SectionHeader } from "@/components/headers/section-header";
import { AnimeCarousel } from "@/components/anime/home/anime-carousel";
import { GenreList } from "@/components/display/anime/genre-list";

export default async function HomePage({
  upcomings = [],
  topAnimes = [],
  animes = [],
  genresList = []
}) {
  return (
    <main className="container mx-auto min-h-screen pb-12">
      <section className="px-3 md:px-0 mt-3 mb-6">
        <HomeCarousel items={upcomings} />
      </section>
      <section className="mb-12">
        <div className="container px-4 mx-auto">
          <GenreList genres={genresList} />
        </div>
      </section>

      <section className="mb-12">
        <div className="container px-4 mx-auto">
          <SectionHeader
            title="Top Rated"
            subtitle="Most popular among fans"
            viewAllLink="/anime/top"
          />
          <AnimeCarousel animes={topAnimes} />
        </div>
      </section>

      <section className="mb-12">
        <div className="container px-4 mx-auto">
          <SectionHeader
            title="Ongoing Anime"
            subtitle="Currently airing this season"
            viewAllLink="/anime/season"
          />
          <AnimeCarousel animes={animes} />
        </div>
      </section>
    </main>
  );
}

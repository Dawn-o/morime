import { getAnime, getAnimeGenresList } from "@/hooks/anime";
import { AnimeGrid } from "@/components/display/anime/anime-grid";
import { Badge } from "@/components/ui/badge";
import { GenreGrid } from "@/components/display/anime/genre-grid";
import {
  PageContainer,
  PageHeader,
  ContentSection,
} from "@/components/layout/page-container";

export async function generateMetadata({ params }) {
  const { title } = await params;
  const genreName = title?.replace(/_/g, " ") || "Genre";

  return {
    title: `${genreName} Anime`,
    description: `Browse ${genreName} anime series and movies.`,
  };
}

export default async function AnimeGenrePage({ params, searchParams }) {
  const { malId, title } = await params;
  const genresList = await getAnimeGenresList();
  const currentPage = parseInt((await searchParams)?.page) || 1;
  const genreName = title?.replace(/_/g, " ") || "Genre";

  const apiConfig = {
    limit: 24,
    genres: malId,
  };

  const animeData = await getAnime(currentPage, apiConfig);

  const animeListData = animeData
    ? {
        data:
          animeData.data?.map((anime) => ({
            mal_id: anime.mal_id,
            title: anime.title,
            imageUrl: anime.images?.webp?.large_image_url,
            score: anime.score,
            episodes: anime.episodes,
            year: anime.year,
            type: anime.type,
            members: anime.members,
          })) || [],
        totalPages: animeData.totalPages,
      }
    : null;

  return (
    <>
      <PageContainer as="section">
        <PageHeader
          title={`${genreName} Anime`}
          description={`Browse anime series and movies in the ${genreName} genre`}
          badge={
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Genre
            </Badge>
          }
        />

        <AnimeGrid
          animeData={animeListData}
          currentPage={currentPage}
          basePath={`/anime/genre/${malId}/${title}`}
          queryParams={{}}
        />
      </PageContainer>

      <ContentSection>
        <GenreGrid genres={genresList} />
      </ContentSection>
    </>
  );
}

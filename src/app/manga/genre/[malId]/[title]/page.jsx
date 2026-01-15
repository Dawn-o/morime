import { getManga, getMangaGenresList } from "@/hooks/UseManga";
import { MangaGrid } from "@/components/display/manga/MangaGrid";
import { Badge } from "@/components/ui/Badge";
import { GenreGrid } from "@/components/display/anime/GenreGrid";
import {
  PageContainer,
  PageHeader,
  ContentSection,
} from "@/components/layout/PageContainer";

export async function generateMetadata({ params }) {
  const { title } = await params;
  const genreName = title?.replace(/_/g, " ") || "Genre";

  return {
    title: `${genreName} Manga`,
    description: `Browse ${genreName} manga series.`,
  };
}

export default async function MangaGenrePage({ params, searchParams }) {
  const { malId, title } = await params;
  const genresList = await getMangaGenresList();
  const currentPage = parseInt((await searchParams)?.page) || 1;

  const genreName = title?.replace(/_/g, " ") || "Genre";

  const apiConfig = {
    limit: 24,
    genres: malId,
  };

  const mangaData = await getManga(currentPage, apiConfig);

  const mangaListData = mangaData
    ? {
        data:
          mangaData.data?.map((manga) => ({
            mal_id: manga.mal_id,
            title: manga.title,
            imageUrl: manga.images?.webp?.large_image_url,
            score: manga.score,
            chapters: manga.chapters,
            published: manga.published,
            type: manga.type,
            status: manga.status,
            members: manga.members,
          })) || [],
        totalPages: mangaData.totalPages,
      }
    : null;

  return (
    <>
      <PageContainer as="section">
        <PageHeader
          title={`${genreName} Manga`}
          description={`Browse manga series in the ${genreName} genre`}
          badge={
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Genre
            </Badge>
          }
        />

        <MangaGrid
          mangaData={mangaListData}
          currentPage={currentPage}
          basePath={`/manga/genre/${malId}/${title}`}
          queryParams={{}}
        />
      </PageContainer>

      <ContentSection>
        <GenreGrid genres={genresList} />
      </ContentSection>
    </>
  );
}

import { getTopAnime } from "@/hooks/anime";
import { AnimeGrid } from "@/components/display/anime/anime-grid";

export default async function TopAnimePage({ params, searchParams }) {
  const type = params?.type?.[0] || "all";
  const currentPage = parseInt(searchParams?.page) || 1;
  const apiConfig = { limit: 24 };

  if (["tv", "movie", "ova", "ona", "special"].includes(type)) {
    apiConfig.type = type;
  } else if (
    ["airing", "upcoming", "bypopularity", "favorite"].includes(type)
  ) {
    apiConfig.filter = type;
  }

  const animeData = await getTopAnime(currentPage, apiConfig);

  const topAnimeData = animeData
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
          })) || [],
        totalPages: animeData.totalPages,
      }
    : null;

  return (
    <AnimeGrid
      animeData={topAnimeData}
      currentPage={currentPage}
      basePath={type === "all" ? "/anime/top" : `/anime/top/${type}`}
      queryParams={{}}
    />
  );
}

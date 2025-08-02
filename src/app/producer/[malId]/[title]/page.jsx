import { getProducerById } from "@/hooks/producer";
import { ProducerDetails } from "@/components/producer/producer-details";
import { Suspense } from "react";
import { ProducerDetailsSkeleton } from "@/components/loading/producer-details-skeleton";
import { notFound } from "next/navigation";
import { getAnime } from "@/hooks/anime";

export async function generateMetadata({ params }) {
  try {
    const { malId } = params;
    const producer = await getProducerById(malId);

    if (!producer) {
      return {
        title: "Producer Not Found",
        description: "The requested producer could not be found.",
      };
    }

    return {
      title: `${producer.titles?.[0]?.title} - Producer Details`,
      description: `Information about ${producer.titles?.[0]?.title} anime production studio`,
    };
  } catch (error) {
    return {
      title: "Producer Details",
      description: "Anime producer information",
    };
  }
}

export default async function ProducerDetailsPage({ params, searchParams }) {
  const { malId } = params;
  const currentPage = parseInt((await searchParams)?.page) || 1;

  if (!malId || isNaN(Number(malId))) {
    notFound();
  }

  const [producer, animes] = await Promise.all([
    getProducerById(malId),
    getAnime(currentPage, {
      limit: 24,
      order_by: "favorites",
      sort: "desc",
      producers: malId,
    }),
  ]);

  if (!producer) {
    notFound();
  }

  const producerDetailsData = {
    mal_id: producer.mal_id,
    titles: producer.titles,
    name: producer.name,
    imageUrl: producer.images?.jpg?.image_url,
    established: producer.established,
    about: producer.about,
    count: producer.count,
    favorites: producer.favorites,
  };

  const producedAnimesData = animes
    ? {
        data:
          animes.data?.map((anime) => ({
            mal_id: anime.mal_id,
            title: anime.title,
            imageUrl: anime.images?.webp?.large_image_url,
            score: anime.score,
            episodes: anime.episodes,
            year: anime.year,
            type: anime.type,
          })) || [],
        totalPages: animes.totalPages,
      }
    : null;

  return (
    <Suspense fallback={<ProducerDetailsSkeleton />}>
      <section className="container mx-auto py-8 sm:py-10 px-4">
        <ProducerDetails
          producer={producerDetailsData}
          animes={producedAnimesData}
          currentPage={currentPage}
        />
      </section>
    </Suspense>
  );
}

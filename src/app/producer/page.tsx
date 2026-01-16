import type { Metadata } from "next";
import { getProducers, searchProducers } from "@/hooks/UseProducer";
import { SearchInput } from "@/components/forms/SearchInput";
import { ProducersGrid } from "@/components/producer/ProducersGrid";
import type { ProducerPageProps } from "@/types/pages";
import { PageContainer, PageHeader } from "@/components/layout/PageContainer";


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Anime Producers",
    description:
      "Browse anime production studios and companies. Find your favorite anime producers and discover their works.",
  };
}

export default async function ProducersPage({ searchParams }: ProducerPageProps) {
  const currentPage = parseInt((await searchParams)?.page) || 1;
  const searchQuery = (await searchParams)?.q || "";
  const orderBy = (await searchParams)?.order_by || "favorites";
  const sort = (await searchParams)?.sort || "desc";
  const letter = (await searchParams)?.letter || "";

  let producersData;

  if (searchQuery) {
    producersData = await searchProducers(searchQuery, currentPage, {
      limit: 24,
      order_by: orderBy,
      sort: sort,
    });
  } else {
    const apiConfig = {
      limit: 24,
      order_by: orderBy,
      sort: sort,
      ...(letter && letter !== "all" && { letter }),
    };
    producersData = await getProducers(currentPage, apiConfig);
  }

  const producerListData = producersData
    ? {
        data:
          producersData.data?.map((producer) => ({
            mal_id: producer.mal_id,
            titles: producer.titles,
            imageUrl: producer.images?.jpg?.image_url,
            count: producer.count,
            favorites: producer.favorites,
            established: producer.established,
          })) || [],
        totalPages: producersData.totalPages,
        totalItems: producersData.totalItems,
      }
    : null;

  return (
    <PageContainer as="section">
      <PageHeader
        title={searchQuery ? `Search: ${searchQuery}` : "Anime Producers"}
        description={
          searchQuery
            ? `Search results for "${searchQuery}"`
            : `Discover ${producerListData?.totalItems || 0} production studios and companies`
        }
      />

      <SearchInput
        defaultValue={searchQuery}
        basePath="/producer"
        placeholder="Search producers..."
      />

      <ProducersGrid
        producersData={producerListData}
        currentPage={currentPage}
        basePath="/producer"
        queryParams={{
          ...(searchQuery && { q: searchQuery }),
          ...(orderBy !== "favorites" && { order_by: orderBy }),
          ...(sort !== "desc" && { sort }),
          ...(letter && letter !== "all" && { letter }),
        }}
      />
    </PageContainer>
  );
}

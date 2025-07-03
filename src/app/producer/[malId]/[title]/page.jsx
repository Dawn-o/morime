import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProducerById } from "@/hooks/producer";
import { ProducerDetails } from "@/components/producer/producer-details";
import { ProducerDetailsSkeleton } from "@/components/loading/producer-details-skeleton";
import { getAnime } from "@/hooks/anime";

export async function generateMetadata({ params }) {
    try {
        const { malId } = params;
        const producer = await getProducerById(malId);

        if (!producer) {
            return {
                title: 'Producer Not Found',
                description: 'The requested producer could not be found.',
            };
        }

        return {
            title: `${producer.titles?.[0]?.title} - Producer Details`,
            description: `Information about ${producer.titles?.[0]?.title} anime production studio`,
        };
    } catch (error) {
        return {
            title: 'Producer Details',
            description: 'Anime producer information',
        };
    }
}

export default async function ProducerDetailsPage({ params, searchParams }) {
    const { malId } = params;
    const currentPage = parseInt((await searchParams)?.page) || 1;

    if (!malId || isNaN(Number(malId))) {
        notFound();
    }

    const producer = await getProducerById(malId);

    if (!producer) {
        notFound();
    }

    const animes = await getAnime(currentPage, {
        limit: 24,
        order_by: 'favorites',
        sort: 'desc',
        producers: malId,
    });

    return (
        <Suspense fallback={<ProducerDetailsSkeleton />}>
            <section className="container mx-auto py-8 sm:py-10 px-4">
                <ProducerDetails
                    producer={producer}
                    animes={animes}
                    currentPage={currentPage}
                />
            </section>
        </Suspense>
    );
}

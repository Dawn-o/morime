import { Suspense } from "react";
import { ProducersPageSkeleton } from "@/components/loading/producers-page-skeleton";
import { getProducers, searchProducers } from "@/hooks/producer";
import { SearchInput } from "@/components/forms/search-input";
import { ProducersGrid } from "@/components/producer/producers-grid";


export async function generateMetadata() {
    return {
        title: "Anime Producers",
        description: "Browse anime production studios and companies. Find your favorite anime producers and discover their works.",
    };
}

export default async function ProducersPage({ searchParams }) {
    const currentPage = parseInt((await searchParams)?.page) || 1;
    const searchQuery = (await searchParams)?.q || '';
    const orderBy = (await searchParams)?.order_by || 'favorites';
    const sort = (await searchParams)?.sort || 'desc';
    const letter = (await searchParams)?.letter || '';

    let producersData;

    if (searchQuery) {
        producersData = await searchProducers(searchQuery, currentPage, {
            limit: 24,
            order_by: orderBy,
            sort: sort
        });
    } else {
        const apiConfig = {
            limit: 24,
            order_by: orderBy,
            sort: sort,
            ...(letter && letter !== 'all' && { letter })
        };
        producersData = await getProducers(currentPage, apiConfig);
    }

    return (
        <Suspense fallback={<ProducersPageSkeleton />}>
            <section className="container mx-auto py-8 sm:py-10 px-4">
                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-2xl font-bold text-foreground">
                        {searchQuery ? `Search: ${searchQuery}` : 'Anime Producers'}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {searchQuery
                            ? `Search results for "${searchQuery}"`
                            : `Discover ${producersData.totalItems || 0} production studios and companies`
                        }
                    </p>
                </div>

                <SearchInput
                    defaultValue={searchQuery}
                    basePath="/producer"
                    placeholder="Search producers..."
                />

                <ProducersGrid
                    producersData={producersData}
                    currentPage={currentPage}
                    basePath="/producer"
                    queryParams={{
                        ...(searchQuery && { q: searchQuery }),
                        ...(orderBy !== 'favorites' && { order_by: orderBy }),
                        ...(sort !== 'desc' && { sort }),
                        ...(letter && letter !== 'all' && { letter })
                    }}
                />
            </section>
        </Suspense>
    );
}

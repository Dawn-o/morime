import { ProducerCard } from "@/components/producer/producer-card";
import { Separator } from "@/components/ui/separator";
import { AnimePagination } from "@/components/navigation/pagination";
import { EmptyState } from "@/components/content/empty-state";

export function ProducersGrid({ producersData, currentPage, basePath, queryParams }) {
  if (!producersData || !producersData.data || producersData.data.length === 0) {
    return <EmptyState message="No producers found" />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {producersData.data.map((producer, i) => (
          <ProducerCard key={producer.mal_id} producers={producer} priority={i < 8} />
        ))}
      </div>

      <Separator className="my-8" />

      <AnimePagination
        currentPage={currentPage}
        totalPages={producersData.totalPages || 1}
        basePath={basePath}
        queryParams={queryParams}
      />
    </div>
  );
}
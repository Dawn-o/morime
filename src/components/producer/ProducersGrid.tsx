import { ProducerCard } from "@/components/producer/ProducerCard";
import { Separator } from "@/components/ui/Separator";
import { MorimePagination } from "@/components/navigation/Pagination";
import { EmptyState } from "@/components/content/EmptyState";
import type { ProducerData } from "@/types/anime";

interface ProducersGridProps {
  producersData: {
    data: ProducerData[];
    totalPages?: number;
  } | null;
  currentPage: number;
  basePath: string;
  queryParams?: Record<string, string>;
}

export function ProducersGrid({
  producersData,
  currentPage,
  basePath,
  queryParams,
}: ProducersGridProps) {
  if (
    !producersData ||
    !producersData.data ||
    producersData.data.length === 0
  ) {
    return <EmptyState message="No producers found" />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {producersData.data.map((producer) => (
          <ProducerCard key={producer.mal_id} producers={producer} />
        ))}
      </div>

      <Separator className="my-8" />

      <MorimePagination
        currentPage={currentPage}
        totalPages={producersData.totalPages || 1}
        basePath={basePath}
        queryParams={queryParams}
      />
    </div>
  );
}

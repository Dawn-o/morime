import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  PageContainer,
  ContentSection,
} from "@/components/layout/page-container";

export default function AnimeListSkeleton({
  showSearch = true,
  isSearching = false,
}) {
  return (
    <>
      <PageContainer as="section">
        <div className="text-center space-y-2 mb-8">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>

        {showSearch && (
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        )}

        {isSearching ? (
          // List view skeleton for search results
          <>
            <div className="space-y-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start space-x-4">
                    <Skeleton className="shrink-0 w-16 h-24 rounded-lg" />
                    <div className="flex-1 min-w-0 space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-3 w-1/3" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-8" />

            <div className="flex justify-center items-center gap-2">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-20" />
            </div>
          </>
        ) : (
          // Genre categories skeleton for browse view
          <div className="p-4 space-y-6">
            {Array.from({ length: 4 }).map((_, sectionIndex) => (
              <div
                key={sectionIndex}
                className="border border-primary-foreground p-4 rounded-lg"
              >
                <Skeleton className="h-4 w-24 mb-3" />
                <div className="flex items-center justify-start flex-wrap gap-2">
                  {Array.from({
                    length:
                      sectionIndex === 0
                        ? 18
                        : sectionIndex === 1
                          ? 3
                          : sectionIndex === 2
                            ? 42
                            : 5,
                  }).map((_, i) => (
                    <Skeleton key={i} className="h-7 w-20 rounded" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </PageContainer>

      {isSearching && (
        <ContentSection>
          <div className="flex items-center justify-center flex-wrap gap-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-16 rounded" />
            ))}
          </div>
        </ContentSection>
      )}
    </>
  );
}

export { AnimeListSkeleton };

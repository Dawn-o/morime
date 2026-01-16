import { Skeleton } from "@/components/ui/Skeleton";
import { Separator } from "@/components/ui/Separator";
import { Badge } from "@/components/ui/Badge";
import {
  PageContainer,
  ContentSection,
} from "@/components/layout/PageContainer";

export default function GenrePageSkeleton() {
  return (
    <>
      <PageContainer as="section">
        <div className="text-center space-y-2 mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Genre
            </Badge>
          </div>
          <Skeleton className="h-8 w-48 mx-auto mb-2" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-3/4 w-full rounded-md" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-3/4" />
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
      </PageContainer>

      <ContentSection>
        <div className="border border-primary-foreground p-4 rounded-lg">
          <div className="flex items-center justify-center flex-wrap gap-2">
            {Array.from({ length: 24 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-16 rounded-md" />
            ))}
          </div>
        </div>
      </ContentSection>
    </>
  );
}

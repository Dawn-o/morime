import { Card, CardContent } from "@/components/ui/Card";
import { PageContainer } from "@/components/layout/PageContainer";
import { Skeleton } from "@/components/ui/Skeleton";

function YearDisplaySkeleton() {
  return (
    <div className="bg-linear-to-b from-muted/30 to-muted/60 flex flex-col items-center justify-center min-w-20 border-r border-border/50 -my-6">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-6 w-4 mb-1 bg-muted-foreground/20" />
      ))}
    </div>
  );
}

function SeasonButtonSkeleton() {
  return <Skeleton className="h-8 w-full rounded-md bg-muted/50" />;
}

function ListCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border/50">
      <CardContent className="p-0">
        <div className="flex min-h-30">
          <YearDisplaySkeleton />
          <div className="flex-1 p-4">
            <div className="flex flex-col gap-2 justify-center h-full">
              <SeasonButtonSkeleton />
              <SeasonButtonSkeleton />
              <SeasonButtonSkeleton />
              <SeasonButtonSkeleton />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SeasonListSkeleton() {
  return (
    <PageContainer as="section">
      <div className="text-center space-y-2 mb-8">
        <Skeleton className="h-8 w-48 mx-auto bg-muted/50" />
        <Skeleton className="h-4 w-64 mx-auto bg-muted/30" />
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => (
            <ListCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

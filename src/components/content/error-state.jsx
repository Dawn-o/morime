import { Card, CardContent } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/page-container";

export function AnimeError({
  message = "Something went wrong. Please try again later.",
}) {
  return (
    <PageContainer as="section">
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">{message}</p>
        </CardContent>
      </Card>
    </PageContainer>
  );
}

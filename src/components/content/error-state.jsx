import { Card, CardContent } from "@/components/ui/card";

export function AnimeError({
  message = "Something went wrong. Please try again later.",
}) {
  return (
    <section className="container mx-auto py-8 sm:py-10 px-4">
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">{message}</p>
        </CardContent>
      </Card>
    </section>
  );
}

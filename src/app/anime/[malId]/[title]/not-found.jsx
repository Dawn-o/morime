import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";

export default function NotFound() {
  return (
    <PageContainer className="py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Anime Not Found</h1>
      <p className="text-muted-foreground mb-8">
        The anime you&apos;re looking for doesn&apos;t exist or has been
        removed.
      </p>
      <Link href="/anime">
        <Button className="cursor-pointer">Browse Anime</Button>
      </Link>
    </PageContainer>
  );
}

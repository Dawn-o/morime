import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";

export default function NotFound() {
  return (
    <PageContainer className="py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Season Not Found</h1>
      <p className="text-muted-foreground mb-8">
        The season and year combination you&apos;re looking for is not valid.
      </p>
      <Link href="/anime/season">
        <Button className="cursor-pointer">Browse Season</Button>
      </Link>
    </PageContainer>
  );
}

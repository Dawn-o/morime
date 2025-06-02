import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Anime Not Found</h1>
      <p className="text-muted-foreground mb-8">
        The anime you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link href="/anime">
        <Button>Browse Anime</Button>
      </Link>
    </div>
  );
}
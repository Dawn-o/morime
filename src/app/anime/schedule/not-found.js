import { Link } from "@/components/ui/link"; 
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="container mx-auto py-16 px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Schedule Not Found</h1>
            <p className="text-muted-foreground mb-8">
                The anime schedule you&apos;re looking for doesn&apos;t exist.
            </p>
            <div className="space-x-4">
                <Button asChild>
                    <Link href="/anime/schedule">Back to Schedule</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/anime">Browse Anime</Link>
                </Button>
            </div>
        </div>
    );
}
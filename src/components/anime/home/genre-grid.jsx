import { Link } from "@/components/ui/link"; 
import { Button } from "@/components/ui/button";

export function GenreGrid({ genres }) {
  return (
    <div className="flex items-center justify-center flex-wrap gap-2">
      {genres.map((genre) => (
        <Link key={genre.mal_id} href={`/anime/genre/${genre.mal_id}`}>
          <Button
            variant="secondary"
            size="sm"
            className="text-xs cursor-pointer uppercase"
          >
            {genre.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}

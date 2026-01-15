import { Link } from "@/components/ui/Link";
import { Button } from "@/components/ui/Button";
import { toSnakeCase } from "@/lib/utils/Formatter";

export function GenreGrid({ genres }) {
  return (
    <div className="border border-primary-foreground p-4 rounded-lg">
      <div className="flex items-center justify-center flex-wrap gap-2">
        {genres.map((genre) => (
          <Link
            key={genre.mal_id}
            href={`/manga/genre/${genre.mal_id}/${toSnakeCase(genre.name)}`}
          >
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
    </div>
  );
}

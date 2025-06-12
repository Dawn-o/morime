import Link from "next/link";
import { toSnakeCase } from "@/lib/formatter";
import { EmptyState } from "@/components/anime/detail/empty-state";

export function RelatedAnimeSection({ relations }) {
  if (!relations || relations.length === 0) {
    return <EmptyState message="No related anime available." />;
  }

  return (
    <div className="space-y-1.5 sm:space-y-2">
      {relations.map((relation, index) => (
        <div key={index} className="bg-muted/50 rounded-md p-2 sm:p-3">
          <div className="text-sm sm:text-base font-medium">
            {relation.relation}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">
            {relation.entry.map((entry, i) => (
              <span key={entry.mal_id}>
                {i > 0 ? ", " : ""}
                <Link
                  href={`/anime/${entry.mal_id}/${toSnakeCase(entry.name)}`}
                  className="hover:text-primary transition-colors"
                >
                  {entry.name}
                </Link>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

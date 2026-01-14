import { Link } from "@/components/ui/link";
import { toSnakeCase } from "@/lib/utils/formatter";
import { EmptyState } from "@/components/content/empty-state";

export function RelatedAnimeSection({ relationsData }) {
  if (!relationsData || relationsData.length === 0) {
    return <EmptyState message="No related anime available." />;
  }

  return (
    <div className="space-y-1.5 sm:space-y-2">
      {relationsData.map((relation, i) => (
        <div
          key={`${relation.relation}-${i}`}
          className="bg-muted/50 rounded-md p-2 sm:p-3"
        >
          <div className="text-sm sm:text-base font-medium">
            {relation.relation}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">
            {relation.entry.map((entry, j) => (
              <span key={entry.mal_id}>
                {j > 0 ? ", " : ""}
                <Link
                  href={
                    relation.relation === "Adaptation"
                      ? `/manga/${entry.mal_id}/${toSnakeCase(entry.name)}`
                      : `/anime/${entry.mal_id}/${toSnakeCase(entry.name)}`
                  }
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

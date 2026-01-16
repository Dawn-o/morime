import { Link } from "@/components/ui/Link";
import { toSnakeCase } from "@/lib/utils/Formatter";
import { EmptyState } from "@/components/content/EmptyState";
import type { Relation } from "@/types/anime";

interface RelatedMangaSectionProps {
  relationsData?: Relation[] | null;
}

export function RelatedMangaSection({
  relationsData,
}: RelatedMangaSectionProps) {
  if (!relationsData || relationsData.length === 0) {
    return <EmptyState message="No related manga available." />;
  }

  return (
    <div className="space-y-1.5 sm:space-y-2">
      {relationsData.map((relation, i) => (
        <div key={i} className="bg-muted/50 rounded-md p-2 sm:p-3">
          <div className="text-sm sm:text-base font-medium">
            {relation.relation}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">
            {relation.entry.map((entry, j) => (
              <span key={entry.mal_id}>
                {j > 0 ? ", " : ""}
                <Link
                  href={
                    entry.type === "manga"
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

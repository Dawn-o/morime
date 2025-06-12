  import { EmptyState } from "@/components/anime/detail/empty-state";

  export function ThemeSongsSection({ themes }) {
    const hasOpenings =
      themes.openings && themes.openings.length > 0;
    const hasEndings =
      themes.endings && themes.endings.length > 0;

    if (!hasOpenings && !hasEndings) {
      return <EmptyState message="No theme songs available." />;
    }

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-semibold mb-1">Opening Themes</h3>
          {hasOpenings ? (
            <ul className="space-y-1 text-sm text-muted-foreground">
              {themes.openings.map((opening, i) => (
                <li key={i} className="pl-2 border-l-2 border-primary/30">
                  {opening}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-sm">
              No opening themes available.
            </div>
          )}
        </div>

        <div>
          <h3 className="text-base font-semibold mb-1">Ending Themes</h3>
          {hasEndings ? (
            <ul className="space-y-1 text-sm text-muted-foreground">
              {themes.endings.map((ending, i) => (
                <li key={i} className="pl-2 border-l-2 border-primary/30">
                  {ending}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-sm">
              No ending themes available.
            </div>
          )}
        </div>
      </div>
    );
  }

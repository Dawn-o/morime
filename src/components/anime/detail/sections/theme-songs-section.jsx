import { EmptyState } from "@/components/content/empty-state";

export function ThemeSongsSection({ themesData }) {
  const hasOpenings = themesData?.openings && themesData.openings.length > 0;
  const hasEndings = themesData?.endings && themesData.endings.length > 0;

  if (!hasOpenings && !hasEndings) {
    return <EmptyState message="No theme songs available." />;
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold mb-1">Opening Themes</h3>
        {hasOpenings ? (
          <ul className="space-y-1 text-sm text-muted-foreground">
            {themesData.openings.map((opening, i) => (
              <li
                key={`opening-${i}-${opening.substring(0, 20)}`}
                className="pl-2 border-l-2 border-primary/30"
              >
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
            {themesData.endings.map((ending, i) => (
              <li
                key={`ending-${i}-${ending.substring(0, 20)}`}
                className="pl-2 border-l-2 border-primary/30"
              >
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

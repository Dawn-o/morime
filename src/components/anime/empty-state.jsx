export function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          No Anime Found
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          No anime data available. Try adjusting your filters or check back
          later.
        </p>
      </div>
    </div>
  );
}

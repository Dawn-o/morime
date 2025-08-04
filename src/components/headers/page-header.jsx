export function PageHeaderSkeleton({ title, description }) {
  return (
    <div className="text-center space-y-2 mb-8">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

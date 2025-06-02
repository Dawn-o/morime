import { Skeleton } from "@/components/ui/skeleton";

export function GenreGridSkeleton() {
  const items = Array.from({ length: 24 }, () => ({
    width: Math.floor(Math.random() * 30) + 70,
  }));

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <Skeleton 
          key={index}
          className={`h-8 w-${item.width} max-w-[120px] min-w-[80px] rounded`}
          style={{ width: `${item.width}px` }}
        />
      ))}
    </div>
  );
}
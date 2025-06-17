import { Link } from "@/components/ui/link"; 

export function SectionHeader({ title, subtitle, viewAllLink }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {viewAllLink && (
        <Link href={viewAllLink} className="text-primary hover:underline">
          View All
        </Link>
      )}
    </div>
  );
}

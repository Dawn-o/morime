import { Link } from "@/components/ui/Link";
import { Button } from "@/components/ui/Button";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllLink?: string;
}

export function SectionHeader({
  title,
  subtitle,
  viewAllLink,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {viewAllLink && (
        <Link href={viewAllLink}>
          <Button variant="outline" size="sm" className="cursor-pointer">
            View All
          </Button>
        </Link>
      )}
    </div>
  );
}

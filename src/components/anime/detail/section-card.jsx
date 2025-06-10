import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SectionCard({
  title,
  children,
  titleColor = "bg-primary",
  className = "",
  cardRef,
  headerActions,
}) {
  return (
    <Card ref={cardRef} className={`shadow-lg border-border/40 ${className}`}>
      <CardHeader className="-mt-2 -mb-4">
        <CardTitle className="flex items-center justify-between text-lg sm:text-xl">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-5 ${titleColor} rounded-full mr-1.5`} />
            {title}
          </div>
          {headerActions}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
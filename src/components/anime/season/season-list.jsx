import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/ui/link";
import { getCurrentSeason } from "@/lib/utils/season";

function YearDisplay({ year }) {
  return (
    <div className="bg-gradient-to-b from-muted/30 to-muted/60 flex flex-col items-center justify-center min-w-[80px] border-r border-border/50 -my-6">
      {year
        .toString()
        .split("")
        .map((digit, i) => (
          <span
            key={i}
            className="text-2xl font-bold text-foreground/90 leading-none tracking-tight"
          >
            {digit}
          </span>
        ))}
    </div>
  );
}

function SeasonButton({ season, year }) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentSeason = getCurrentSeason();

  const isCurrentSeason = year === currentYear && season === currentSeason;

  return (
    <Link href={`/anime/season/${year}/${season}`} className="block">
      <Button
        variant={isCurrentSeason ? "default" : "outline"}
        size="sm"
        className="w-full capitalize font-medium relative transition-all duration-200 hover:scale-105 cursor-pointer"
      >
        {season}
        {isCurrentSeason && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 text-xs px-1 py-0 h-4 min-w-[16px] flex items-center justify-center"
          >
            •
          </Badge>
        )}
      </Button>
    </Link>
  );
}

function ListCard({ list }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 border-border/50">
      <CardContent className="p-0">
        <div className="flex min-h-[184px]">
          <YearDisplay year={list.year} />
          <div className="flex-1 p-4">
            <div className="flex flex-col gap-2 justify-center h-full">
              {list.seasons.map((season) => (
                <SeasonButton key={season} season={season} year={list.year} />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SeasonList({ listData }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {listData.map((list) => (
          <ListCard key={list.year} list={list} />
        ))}
      </div>
    </div>
  );
}

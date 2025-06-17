import { Link } from "@/components/ui/link"; 
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const NAVIGATION_ITEMS = [
  { key: "all", label: "All", href: "/anime/top" },
  { key: "airing", label: "Top Airing", href: "/anime/top/airing" },
  { key: "upcoming", label: "Top Upcoming", href: "/anime/top/upcoming" },
  {
    key: "bypopularity",
    label: "Most Popular",
    href: "/anime/top/bypopularity",
  },
  { key: "tv", label: "Top TV Series", href: "/anime/top/tv" },
  { key: "movie", label: "Top Movies", href: "/anime/top/movie" },
  { key: "ova", label: "Top OVAs", href: "/anime/top/ova" },
  { key: "ona", label: "Top ONAs", href: "/anime/top/ona" },
  { key: "special", label: "Top Specials", href: "/anime/top/special" },
  { key: "favorite", label: "Most Favorited", href: "/anime/top/favorite" },
];

export function TopAnimeNavigation({ currentType }) {
  return (
    <div className="mb-6">
      <nav className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:flex lg:items-center lg:justify-center gap-2 lg:flex-wrap">
        {NAVIGATION_ITEMS.map((item) => (
          <Button
            key={item.key}
            variant={currentType === item.key ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
      </nav>
      <Separator className="my-4" />
    </div>
  );
}

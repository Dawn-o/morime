import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { generateSeasonNavigation, getCurrentSeason } from "@/lib/season-utils";

export function SeasonNavigation({ routeParams, pageType }) {
  const seasonNavItems = generateSeasonNavigation(routeParams);

  let activeIndex = seasonNavItems.findIndex((item) => item.isActive);
  if (activeIndex === -1) {
    activeIndex = seasonNavItems.findIndex((item) => item.isCurrent);
  }

  if (activeIndex === -1) {
    const currentYear = new Date().getFullYear();
    const currentSeason = getCurrentSeason();
    activeIndex = seasonNavItems.findIndex(
      (item) => item.year === currentYear && item.season === currentSeason
    );
  }

  if (activeIndex === -1) {
    const currentYear = new Date().getFullYear();
    const closestYearIndex = seasonNavItems.findIndex(
      (item) => item.year >= currentYear - 2
    );
    activeIndex =
      closestYearIndex !== -1
        ? closestYearIndex
        : Math.max(0, seasonNavItems.length - 10);
  }

  const totalVisible = 4;
  const mobileVisible = 2;

  const startIndex = Math.max(
    0,
    Math.min(activeIndex - 1, seasonNavItems.length - totalVisible)
  );
  const endIndex = Math.min(seasonNavItems.length, startIndex + totalVisible);
  const visibleItems = seasonNavItems.slice(startIndex, endIndex);

  const mobileStartIndex = Math.max(0, activeIndex - 1);
  const mobileEndIndex = Math.min(
    seasonNavItems.length,
    mobileStartIndex + mobileVisible
  );
  const mobileVisibleItems = seasonNavItems.slice(
    mobileStartIndex,
    mobileEndIndex
  );

  return (
    <div className="mb-6">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-center gap-2">
        {startIndex > 0 && (
          <Button variant="ghost" size="sm" asChild>
            <Link
              href={seasonNavItems[Math.max(0, startIndex - totalVisible)].href}
              title="Go to earlier seasons"
            >
              ...
            </Link>
          </Button>
        )}

        {visibleItems.map((item) => (
          <Button
            key={`${item.year}-${item.season}`}
            variant={item.isCurrent || item.isActive ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link href={item.href} className="capitalize">
              {item.label}
            </Link>
          </Button>
        ))}

        {endIndex < seasonNavItems.length && (
          <Button variant="ghost" size="sm" asChild>
            <Link
              href={
                seasonNavItems[
                  Math.min(
                    seasonNavItems.length - 1,
                    endIndex + totalVisible - 1
                  )
                ].href
              }
              title="Go to later seasons"
            >
              ...
            </Link>
          </Button>
        )}

        <div className="ml-4 flex gap-2 border-l pl-4">
          {pageType !== "current" && (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/anime/season">Current</Link>
            </Button>
          )}
          <Button
            variant={pageType === "upcoming" ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link href="/anime/season/later">Later</Link>
          </Button>
          <Button
            variant={pageType === "schedule" ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link href="/anime/season/schedule">Schedule</Link>
          </Button>
          <Button
            variant={pageType === "archive" ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link href="/anime/season/archive">Archive</Link>
          </Button>
        </div>
      </nav>

      <div className="md:hidden">
        <div className="overflow-x-auto mb-4">
          <nav className="flex gap-2 pb-2 min-w-max px-1">
            {mobileStartIndex > 0 && (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="flex-shrink-0"
              >
                <Link
                  href={seasonNavItems[Math.max(0, mobileStartIndex - 2)].href}
                  title="Earlier seasons"
                >
                  ⟨
                </Link>
              </Button>
            )}

            {mobileVisibleItems.map((item) => (
              <Button
                key={`mobile-${item.year}-${item.season}`}
                variant={
                  item.isCurrent || item.isActive ? "default" : "outline"
                }
                size="sm"
                asChild
                className="flex-shrink-0 whitespace-nowrap text-xs px-3"
              >
                <Link href={item.href} className="capitalize">
                  {item.label}
                </Link>
              </Button>
            ))}

            {mobileEndIndex < seasonNavItems.length && (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="flex-shrink-0"
              >
                <Link
                  href={
                    seasonNavItems[
                      Math.min(seasonNavItems.length - 1, mobileEndIndex + 1)
                    ].href
                  }
                  title="Later seasons"
                >
                  ⟩
                </Link>
              </Button>
            )}
          </nav>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="flex gap-1">
            {pageType !== "current" && (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="flex-1 text-xs"
              >
                <Link href="/anime/season">Current</Link>
              </Button>
            )}
            <Button
              variant={pageType === "upcoming" ? "default" : "ghost"}
              size="sm"
              asChild
              className="flex-1 text-xs"
            >
              <Link href="/anime/season/later">Later</Link>
            </Button>
          </div>
          <div className="flex gap-1">
            <Button
              variant={pageType === "schedule" ? "default" : "ghost"}
              size="sm"
              asChild
              className="flex-1 text-xs"
            >
              <Link href="/anime/season/schedule">Schedule</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="flex-1 text-xs"
            >
              <Link href="/anime/season/archive">Archive</Link>
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-4" />
    </div>
  );
}

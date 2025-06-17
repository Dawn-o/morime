import { Link } from "@/components/ui/link"; 
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { generateSeasonNavigation } from "@/lib/navigation/season-utils";

export function SeasonNavigation({ routeParams }) {
  const seasonNavItems = generateSeasonNavigation(routeParams);

  const findActiveIndex = () => {
    const index = seasonNavItems.findIndex((item) => item.isActive);

    return index !== -1 ? index : Math.floor(seasonNavItems.length / 2);
  };

  const activeIndex = findActiveIndex();
  const totalVisible = 4;
  const mobileVisible = 2;

  const getDesktopVisibleItems = () => {
    const startIndex = Math.max(
      0,
      Math.min(activeIndex - 1, seasonNavItems.length - totalVisible)
    );
    const endIndex = Math.min(seasonNavItems.length, startIndex + totalVisible);
    return {
      startIndex,
      endIndex,
      items: seasonNavItems.slice(startIndex, endIndex),
    };
  };

  const getMobileVisibleItems = () => {
    const startIndex = Math.max(0, activeIndex - 1);
    const endIndex = Math.min(
      seasonNavItems.length,
      startIndex + mobileVisible
    );
    return {
      startIndex,
      endIndex,
      items: seasonNavItems.slice(startIndex, endIndex),
    };
  };

  const desktop = getDesktopVisibleItems();
  const mobile = getMobileVisibleItems();

  const NavigationButton = ({ item, isMobile = false }) => (
    <Button
      variant={item.isActive ? "default" : isMobile ? "outline" : "ghost"}
      size="sm"
      asChild
      className={isMobile ? "flex-shrink-0 whitespace-nowrap text-xs px-3" : ""}
    >
      <Link href={item.href} className="capitalize">
        {item.label}
      </Link>
    </Button>
  );

  const EllipsisButton = ({ href, title, children, className = "" }) => (
    <Button variant="ghost" size="sm" asChild className={className}>
      <Link href={href} title={title}>
        {children}
      </Link>
    </Button>
  );

  return (
    <div className="mb-6">
      <nav className="hidden md:flex items-center justify-center gap-2">
        {desktop.startIndex > 0 && (
          <EllipsisButton
            href={
              seasonNavItems[Math.max(0, desktop.startIndex - totalVisible)]
                .href
            }
            title="Go to earlier seasons"
          >
            ...
          </EllipsisButton>
        )}

        {desktop.items.map((item) => (
          <NavigationButton key={`${item.year}-${item.season}`} item={item} />
        ))}

        {desktop.endIndex < seasonNavItems.length && (
          <EllipsisButton
            href={
              seasonNavItems[
                Math.min(
                  seasonNavItems.length - 1,
                  desktop.endIndex + totalVisible - 1
                )
              ].href
            }
            title="Go to later seasons"
          >
            ...
          </EllipsisButton>
        )}
      </nav>

      <div className="md:hidden">
        <div className="overflow-x-auto mb-4">
          <nav className="flex justify-center gap-2 pb-2 min-w-max px-1">
            {mobile.startIndex > 0 && (
              <EllipsisButton
                href={seasonNavItems[Math.max(0, mobile.startIndex - 2)].href}
                title="Earlier seasons"
                className="flex-shrink-0"
              >
                ←
              </EllipsisButton>
            )}

            {mobile.items.map((item) => (
              <NavigationButton
                key={`${item.year}-${item.season}`}
                item={item}
                isMobile
              />
            ))}

            {mobile.endIndex < seasonNavItems.length && (
              <EllipsisButton
                href={
                  seasonNavItems[
                    Math.min(seasonNavItems.length - 1, mobile.endIndex + 1)
                  ].href
                }
                title="Later seasons"
                className="flex-shrink-0"
              >
                →
              </EllipsisButton>
            )}
          </nav>
        </div>
      </div>

      <Separator className="my-4" />
    </div>
  );
}

import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SeasonFilterTabs({
  pageType,
  typeFilter,
  dayFilter,
  routeParams,
}) {
  if (pageType === "schedule") {
    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
      "other",
      "unknown",
    ];

    return (
      <Tabs value={dayFilter || "monday"} className="mb-4">
        <TabsList className="hidden md:flex h-auto md:h-10 gap-1 md:gap-0 px-1.5 py-1 mx-auto w-fit">
          {days.map((day) => (
            <TabsTrigger
              key={day}
              value={day}
              asChild
              className="w-full px-6 py-2.5 text-sm justify-center"
            >
              <Link
                href={
                  day === "monday"
                    ? "/anime/season/schedule"
                    : `/anime/season/schedule?day=${day}`
                }
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="md:hidden overflow-x-auto">
          <div className="flex gap-2 pb-2 min-w-max px-1">
            {days.map((day) => (
              <Link
                key={day}
                href={
                  day === "monday"
                    ? "/anime/season/schedule"
                    : `/anime/season/schedule?day=${day}`
                }
                className={`flex-shrink-0 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  dayFilter === day || (!dayFilter && day === "monday")
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      </Tabs>
    );
  }

  const types = ["TV", "ONA", "OVA", "Movie", "Special"];

  return (
    <Tabs value={typeFilter || "all"} className="mb-4">
      <TabsList className="hidden md:flex h-auto md:h-10 gap-1 md:gap-0 px-1.5 py-1 mx-auto w-fit">
        <TabsTrigger
          value="all"
          asChild
          className="w-full px-6 py-2.5 text-sm justify-center"
        >
          <Link
            href={`/anime/season${
              routeParams.length > 0 ? `/${routeParams.join("/")}` : ""
            }`}
            className="w-full"
          >
            All
          </Link>
        </TabsTrigger>
        {types.map((type) => (
          <TabsTrigger
            key={type}
            value={type}
            asChild
            className="w-full px-6 py-2.5 text-sm justify-center"
          >
            <Link
              href={`/anime/season${
                routeParams.length > 0 ? `/${routeParams.join("/")}` : ""
              }?type=${type}`}
            >
              {type}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="md:hidden overflow-x-auto">
        <div className="flex justify-center gap-2 pb-2 min-w-max px-1">
          <Link
            href={`/anime/season${
              routeParams.length > 0 ? `/${routeParams.join("/")}` : ""
            }`}
            className={`flex-shrink-0 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
              !typeFilter || typeFilter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All
          </Link>
          {types.map((type) => (
            <Link
              key={type}
              href={`/anime/season${
                routeParams.length > 0 ? `/${routeParams.join("/")}` : ""
              }?type=${type}`}
              className={`flex-shrink-0 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                typeFilter === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {type}
            </Link>
          ))}
        </div>
      </div>
    </Tabs>
  );
}

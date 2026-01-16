import { Link } from "@/components/ui/Link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";

export function DayFilterTabs({ dayFilter }) {
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
                  ? "/anime/schedule"
                  : `/anime/schedule?day=${day}`
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
                  ? "/anime/schedule"
                  : `/anime/schedule?day=${day}`
              }
              className={`shrink-0 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
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

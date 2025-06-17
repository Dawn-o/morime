import { Link } from "@/components/ui/link"; 
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TypeFilterTabs({ typeFilter, basePath }) {
  const types = ["TV", "ONA", "OVA", "Movie", "Special"];

  return (
    <Tabs value={typeFilter || "all"} className="mb-4">
      <TabsList className="hidden md:flex h-auto md:h-10 gap-1 md:gap-0 px-1.5 py-1 mx-auto w-fit">
        <TabsTrigger
          value="all"
          asChild
          className="w-full px-6 py-2.5 text-sm justify-center"
        >
          <Link href={basePath} className="w-full">
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
            <Link href={`${basePath}?type=${type}`}>{type}</Link>
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="md:hidden overflow-x-auto">
        <div className="flex justify-center gap-2 pb-2 min-w-max px-1">
          <Link
            href={basePath}
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
              href={`${basePath}?type=${type}`}
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

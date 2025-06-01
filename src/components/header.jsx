import Image from "next/image";
import { House, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  return (
    <header className="text-card-foreground w-full absolute top-0 z-50">
      {/* Top section with logo and search */}
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <Logo className="h-auto w-auto" />
        </div>

        {/* Search Bar */}
        <div className="min-w-lg flex flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input type="search" placeholder="Search anime..." className="pl-10" />
        </div>

           {/* Mode Toggle */}
        <div className="flex items-center">
          <ModeToggle />
        </div>
        </div>
      </div>

      <Separator className="my-2" />
      {/* Navigation menu */}
      <div>
        <div className="flex items-center justify-center gap-1 p-2 max-w-7xl mx-auto flex-wrap">
          <Button variant="secondary" size="sm" className="text-xs cursor-pointer">
            <House />
          </Button>
          <Button variant="secondary" size="sm" className="text-xs cursor-pointer">
            ANIME LIST
          </Button>
          <Button variant="secondary" size="sm" className="text-xs cursor-pointer">
            PRODUCER LIST
          </Button>
          <Button variant="secondary" size="sm" className="text-xs cursor-pointer">
            DAILY SCHEDULE
          </Button>
          <Button variant="secondary" size="sm" className="text-xs cursor-pointer">
            SEASONAL SCHEDULE
          </Button>
          <Button variant="secondary" size="sm" className="text-xs cursor-pointer">
            TOP ANIME
          </Button>
          <Button variant="secondary" size="sm" className="text-xs cursor-pointer">
            POPULAR ANIME
          </Button>
          <Button variant="secondary" size="sm" className="text-xs cursor-pointer">
            ON-GOING ANIME
          </Button>
          <Button variant="secondary" size="sm" className="text-xs cursor-pointer">
            COMPLETED ANIME
          </Button>
          <Button variant="secondary" size="sm" className="text-xs cursor-pointer">
            POPULAR THIS SEASON
          </Button>
          <Button variant="secondary" size="sm" className="text-xs cursor-pointer">
            ANTICIPATED
          </Button>
          <Button variant="secondary" size="sm" className="text-xs cursor-pointer">
            RANDOM ANIME
          </Button>
          <Button variant="secondary" size="sm" className="text-xs cursor-pointer">
            GENRE LIST
          </Button>
        </div>
      </div>
      <Separator className="my-2" />
    </header>
  );
}

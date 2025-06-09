"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { House, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SfwToggle } from "@/components/fragments/sfw-toggle";
import { ModeToggle } from "@/components/elements/theme/mode-toggle";
import Link from "next/link";

export function Header() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/anime?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Clear search after submitting
      setIsSearchVisible(false); // Hide mobile search
    }
  };

  const navItems = [
    { label: "ANIME LIST", link: "anime" },
    { label: "PRODUCER LIST", link: "producer" },
    { label: "DAILY SCHEDULE", link: "anime/schedule" },
    { label: "SEASONAL SCHEDULE", link: "anime/season" },
    { label: "TOP ANIME", link: "anime/top" },
    { label: "POPULAR ANIME", link: "anime/top/bypopularity" },
    { label: "ON-GOING ANIME", link: "anime/season" },
    { label: "COMPLETED ANIME", link: "anime/completed" },
    { label: "POPULAR THIS SEASON", link: "anime/top/airing" },
    { label: "UPCOMING ANIME", link: "anime/upcoming" },
    { label: "RANDOM ANIME", link: "anime/random" },
    { label: "GENRE LIST", link: "anime/genre" },
  ];

  return (
    <header className="w-full bg-background">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <div className="w-[135px] h-10 flex items-center justify-center">
            <span className="font-bold text-4xl text-foreground font-[Poppins]">
              MORIME
            </span>
          </div>
        </Link>

        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className="relative cursor-pointer"
          >
            <Search className="h-5 w-5" />
          </Button>
          <ModeToggle />
          <SfwToggle />
        </div>

        <div className="hidden md:flex min-w-lg flex-row gap-3 items-center">
          <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search anime..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <SfwToggle />
          </div>
        </div>
      </div>

      {isSearchVisible && (
        <div className="md:hidden px-4 pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search anime..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </form>
        </div>
      )}

      <Separator className="my-2" />

      <div className="overflow-x-auto">
        <div className="flex items-center justify-normal 2xl:justify-center gap-1 p-2 mx-auto whitespace-nowrap 2xl:flex">
          <Link href="/">
            <Button
              variant="secondary"
              size="sm"
              className="text-xs cursor-pointer flex-shrink-0"
            >
              <House />
            </Button>
          </Link>
          {navItems.map((item, index) => (
            <Link key={index} href={`/${item.link}`}>
              <Button
                variant="secondary"
                size="sm"
                className="text-xs cursor-pointer flex-shrink-0"
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <Separator className="mt-2" />
    </header>
  );
}

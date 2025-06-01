"use client";
import { useState } from "react";
import { House, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/elements/theme/mode-toggle";

export function Header() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const navItems = [
    { label: "ANIME LIST" },
    { label: "PRODUCER LIST" },
    { label: "DAILY SCHEDULE" },
    { label: "SEASONAL SCHEDULE" },
    { label: "TOP ANIME" },
    { label: "POPULAR ANIME" },
    { label: "ON-GOING ANIME" },
    { label: "COMPLETED ANIME" },
    { label: "POPULAR THIS SEASON" },
    { label: "ANTICIPATED" },
    { label: "RANDOM ANIME" },
    { label: "GENRE LIST" },
  ];

  return (
    <header className="text-card-foreground w-full container absolute top-0 z-50">
      {/* Top section with logo, search and theme toggle */}
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <svg
            width="135"
            height="40"
            viewBox="0 0 135 60"
            xmlns="http://www.w3.org/2000/svg"
            className="text-foreground"
          >
            <text
              x="50%"
              y="50%"
              fontFamily="Poppins"
              fontWeight="bold"
              fontSize="48"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="currentColor"
            >
              MORIME
            </text>
          </svg>
        </div>

        {/* Mobile Search Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className="relative"
          >
            <Search className="h-5 w-5" />
          </Button>
          <ModeToggle />
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex min-w-lg flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input type="search" placeholder="Search..." className="pl-10" />
          </div>

          {/* Mode Toggle */}
          <div className="flex items-center">
            <ModeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (Conditional) */}
      {isSearchVisible && (
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input type="search" placeholder="Search..." className="pl-10" />
          </div>
        </div>
      )}

      <Separator className="my-2" />

      {/* Scrollable Navigation Menu (All screen sizes) */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex items-center justify-normal lg:justify-center gap-1 p-2 mx-auto whitespace-nowrap lg:flex-wrap">
          <Button
            variant="secondary"
            size="sm"
            className="text-xs cursor-pointer flex-shrink-0"
          >
            <House />
          </Button>
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant="secondary"
              size="sm"
              className="text-xs cursor-pointer flex-shrink-0"
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      <Separator className="my-2" />
    </header>
  );
}

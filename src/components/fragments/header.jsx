"use client";
import { useState } from "react";
import { House, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SfwToggle } from "@/components/fragments/sfw-toggle";
import { ModeToggle } from "@/components/elements/theme/mode-toggle";
import Link from "next/link";
import { toSnakeCase } from "@/lib/utils";
import Image from "next/image";

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
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input type="search" placeholder="Search..." className="pl-10" />
          </div>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <SfwToggle />
          </div>
        </div>
      </div>

      {isSearchVisible && (
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input type="search" placeholder="Search..." className="pl-10" />
          </div>
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
            <Link key={index} href={`/${toSnakeCase(item.label)}`}>
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

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

export function SearchInput({
  defaultValue = "",
  basePath = "/anime",
  placeholder = "Search anime...",
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(defaultValue);

  useEffect(() => {
    setSearchQuery(defaultValue);
  }, [defaultValue]);

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    } else {
      params.delete("q");
    }

    // Reset page when searching
    params.delete("page");

    const queryString = params.toString();
    const url = queryString ? `${basePath}?${queryString}` : basePath;

    router.push(url);
  };

  const handleClear = () => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams);
    params.delete("q");
    params.delete("page");

    const queryString = params.toString();
    const url = queryString ? `${basePath}?${queryString}` : basePath;

    router.push(url);
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSearch}>
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </form>
    </div>
  );
}

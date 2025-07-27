"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { EmptyState } from "@/components/content/empty-state";

export function EpisodesSection({ episodes }) {
  const initialLimit = 12;
  const [visibleEpisodes, setVisibleEpisodes] = useState(initialLimit);
  const INCREMENT = 6;

  if (!episodes || episodes.length === 0) {
    return <EmptyState message="No episodes information available." />;
  }

  const displayEpisodes = episodes.slice(0, visibleEpisodes);
  const hasMoreEpisodes = visibleEpisodes < episodes.length;

  const loadMore = () => {
    setVisibleEpisodes((prev) => Math.min(prev + INCREMENT, episodes.length));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {displayEpisodes.map((episode) => (
          <div
            key={episode.mal_id}
            className="bg-card hover:bg-card/80 border rounded-md p-3"
          >
            <div className="font-medium">Episode {episode.mal_id}</div>
            <div className="text-sm text-muted-foreground truncate">
              {episode.title || "No title"}
            </div>
          </div>
        ))}
      </div>

      {episodes.length > initialLimit && (
        <div className="mt-4 space-y-2">
          {hasMoreEpisodes && ( 
            <Button variant="outline" className="w-full" onClick={loadMore}>
              <ChevronDownIcon className="h-4 w-4 mr-2 cursor-pointer" />
              Show More
            </Button>
          )}
        </div>
      )}
    </>
  );
}

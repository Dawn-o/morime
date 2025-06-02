"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function EpisodesSection({ episodes }) {
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);
  
  if (!episodes || episodes.length === 0) {
    return <p className="text-muted-foreground">No episodes information available.</p>;
  }
  
  const displayEpisodes = showAllEpisodes ? episodes : episodes.slice(0, 12);
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {displayEpisodes.map(episode => (
          <div key={episode.mal_id} className="bg-card hover:bg-card/80 border rounded-md p-3">
            <div className="font-medium">Episode {episode.mal_id}</div>
            <div className="text-sm text-muted-foreground truncate">{episode.title || "No title"}</div>
          </div>
        ))}
      </div>
      
      {episodes.length > 12 && (
        <Button 
          variant="outline" 
          className="mt-4 w-full"
          onClick={() => setShowAllEpisodes(!showAllEpisodes)}
        >
          {showAllEpisodes 
            ? "Show Less" 
            : `View All ${episodes.length} Episodes`}
        </Button>
      )}
    </>
  );
}
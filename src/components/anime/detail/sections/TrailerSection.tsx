import { EmptyState } from "@/components/content/EmptyState";
import { setYouTubeAutoplay } from "@/lib/utils/Youtube";

interface TrailerSectionProps {
  trailersData?: {
    embed_url?: string;
  } | null;
}

export function TrailerSection({ trailersData }: TrailerSectionProps) {
  if (!trailersData?.embed_url) {
    return <EmptyState message="No trailer available." className="py-4" />;
  }

  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden shadow-xl">
      <iframe
        src={setYouTubeAutoplay(trailersData.embed_url, false)}
        title="Anime Trailer"
        className="w-full h-full"
        allowFullScreen
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}

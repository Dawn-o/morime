import { EmptyState } from "@/components/content/empty-state";

export function TrailerSection({ trailersData }) {
  if (!trailersData?.youtube_id) {
    return (
      <EmptyState
        message="No trailer available."
        showIcon={false}
        className="py-4"
      />
    );
  }

  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden shadow-xl">
      <iframe
        src={`https://www.youtube.com/embed/${trailersData.youtube_id}`}
        title="Anime Trailer"
        className="w-full h-full"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}

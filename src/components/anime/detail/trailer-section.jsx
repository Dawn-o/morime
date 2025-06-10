import { EmptyState } from "@/components/anime/detail/empty-state";

export function TrailerSection({ animeData }) {
  if (!animeData.trailer?.youtube_id) {
    return <EmptyState message="No trailer available." />;
  }

  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden shadow-xl">
      <iframe
        src={`https://www.youtube.com/embed/${animeData.trailer.youtube_id}`}
        title={`${animeData.title} Trailer`}
        className="w-full h-full"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}

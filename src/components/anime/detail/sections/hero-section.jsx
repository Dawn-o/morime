import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";

const AnimeImage = ({ imageUrl, title }) => {
  if (!imageUrl) return null;

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 scale-110 hover:scale-125 transition-transform duration-[10s] ease-linear">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover opacity-25 blur-[10px]"
            sizes="1024px"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent" />
      <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('/noise.png')] bg-repeat" />
    </>
  );
};

const AnimePoster = ({ animeData }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="h-[180px] w-[130px] sm:h-[210px] sm:w-[150px] lg:h-[250px] lg:w-[180px] rounded-lg overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.3)] shrink-0 -mt-14 sm:-mt-18 md:-mt-24 sm:mb-0 ring-2 ring-white/10 bg-card transform transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.4)] hover:scale-[1.02]">
      {animeData.images?.webp?.large_image_url && (
        <Image
          src={animeData.images.webp.large_image_url}
          alt={animeData.title}
          width={260}
          height={360}
          priority={true}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
          sizes="1024px"
        />
      )}
    </div>

    <div className="hidden sm:block w-full">
      <Button variant="outline" size="sm" className="w-full text-xs">
        <StarIcon className="h-3.5 w-3.5 mr-1.5 cursor-pointer" />
        Add To List
      </Button>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  if (!status) return null;

  const getVariant = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes("airing")) return "default";
    if (statusLower.includes("not yet aired")) return "secondary";
    return "outline";
  };

  const displayStatus = status.includes("Currently") ? "Airing" : status;

  return (
    <Badge
      variant={getVariant(status)}
      className="text-xs sm:text-sm px-2.5 py-0.5 font-medium"
    >
      {displayStatus}
    </Badge>
  );
};

const AnimeTitle = ({ animeData }) => {
  const getAlternativeTitle = () => {
    if (
      animeData.title_english &&
      animeData.title_english !== animeData.title
    ) {
      return animeData.title_english;
    }
    return (
      animeData.title_japanese || animeData.title_synonyms?.[0] || "\u00A0"
    );
  };

  return (
    <>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight line-clamp-2 mb-1 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/90">
        {animeData.title}
      </h1>

      <p className="text-xs sm:text-sm md:text-base text-muted-foreground/90 line-clamp-1 mb-2 min-h-[1rem] sm:min-h-[1.25rem] md:min-h-[1.5rem]">
        {getAlternativeTitle()}
      </p>
    </>
  );
};

const InfoTags = ({ animeData }) => {
  const formatSeason = (season, year) => {
    if (!season) return null;
    return `${season.charAt(0).toUpperCase() + season.slice(1)} ${year}`;
  };

  return (
    <div className="flex flex-wrap justify-center sm:justify-start gap-y-2 gap-x-3 mt-3 mb-4">
      {animeData.score && (
        <div className="flex items-center bg-card/60 backdrop-blur-md border border-white/5 rounded-full px-3 py-1 text-xs">
          <StarIcon className="h-3.5 w-3.5 mr-1.5 text-yellow-500" />
          <span className="font-medium">{animeData.score}</span>
        </div>
      )}

      {animeData.season && (
        <div className="flex items-center bg-card/60 backdrop-blur-md border border-white/5 rounded-full px-3 py-1 text-xs">
          <span className="font-medium">
            {formatSeason(animeData.season, animeData.year)}
          </span>
        </div>
      )}

      {animeData.studios?.map((studio) => (
        <div
          key={studio.mal_id}
          className="flex items-center bg-card/60 backdrop-blur-md border border-white/5 rounded-full px-3 py-1 text-xs"
        >
          <span>{studio.name}</span>
        </div>
      ))}
    </div>
  );
};

const StatCard = ({ label, value, icon }) => (
  <div className="bg-card/40 backdrop-blur-sm rounded-lg p-3 border border-border/20 flex flex-col items-center justify-center">
    <div className="text-xs uppercase tracking-wider text-muted-foreground/80 mb-1">
      {label}
    </div>
    <div className="font-bold text-lg sm:text-xl flex items-center gap-1">
      {value}
      {icon}
    </div>
  </div>
);

const ScoreCard = ({ animeData }) => {
  if (!animeData.score) return null;

  const formatUserCount = (count) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(count);
  };

  return (
    <div className="bg-card/40 backdrop-blur-sm rounded-lg p-3 border border-border/20 flex flex-col items-center">
      <div className="text-xs uppercase tracking-wider text-muted-foreground/80 mb-1">
        Score
      </div>
      <div className="font-bold text-lg sm:text-xl flex items-center gap-1">
        {animeData.score}
        <StarIcon className="h-4 w-4 text-yellow-500" />
      </div>
      {animeData.scored_by && (
        <div className="text-xs text-muted-foreground/60 mt-0.5 text-center">
          {formatUserCount(animeData.scored_by)} users
        </div>
      )}
    </div>
  );
};

const StatsGrid = ({ animeData }) => {
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
      <ScoreCard animeData={animeData} />

      {animeData.rank && (
        <StatCard label="Ranked" value={`#${animeData.rank}`} />
      )}

      {animeData.popularity && (
        <StatCard label="Popularity" value={`#${animeData.popularity}`} />
      )}

      {animeData.members && (
        <StatCard label="Members" value={formatNumber(animeData.members)} />
      )}
    </div>
  );
};

export function AnimeHeroSection({ animeData }) {
  return (
    <section className="w-full min-h-[45vh] md:min-h-[55vh] relative overflow-hidden bg-gradient-to-b from-background/60 via-background/80 to-background">
      <AnimeImage
        imageUrl={animeData.images?.webp?.large_image_url}
        title={animeData.title}
      />

      <div className="container mx-auto h-full relative z-10 px-4">
        <div className="flex h-full items-end pb-8 md:pb-10 pt-20 sm:pt-24">
          <div className="flex flex-col sm:flex-row w-full gap-5 sm:gap-8 items-center sm:items-start md:items-end">
            <AnimePoster animeData={animeData} />

            <div className="flex-1 text-center sm:text-left max-w-full">
              <div className="flex items-center justify-center sm:justify-start flex-wrap gap-2 mb-2 sm:mb-3">
                <Badge
                  variant="secondary"
                  className="text-xs sm:text-sm px-2.5 py-0.5"
                >
                  {animeData.type || "TV"}
                </Badge>
                <StatusBadge status={animeData.status} />
              </div>

              <AnimeTitle animeData={animeData} />
              <InfoTags animeData={animeData} />
              <StatsGrid animeData={animeData} />

              <div className="mt-4 flex sm:hidden">
                <Button className="w-full">
                  <StarIcon className="h-4 w-4 mr-2" />
                  Add To List
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

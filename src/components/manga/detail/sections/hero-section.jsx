"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarIcon, Calendar } from "lucide-react";
import { Link } from "@/components/ui/link";
import { toSnakeCase } from "@/lib/utils/formatter";
import { PageContainer } from "@/components/layout/page-container";
import { getImageWithFallback } from "@/lib/utils/image-fallback";
import { useState } from "react";

const MangaImage = ({ imageUrl, title }) => {
  if (!imageUrl) return null;

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 scale-110 hover:scale-125 transition-transform duration-[10s] ease-linear">
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority={true}
            className="object-cover opacity-25 blur-[10px]"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-background/20" />
      <div className="absolute inset-0 bg-linear-to-r from-background/90 to-transparent" />
      <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('/noise.png')] bg-repeat" />
    </>
  );
};

const MangaPoster = ({ imageUrl, title }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="h-45 w-32.5 sm:h-52.5 sm:w-37.5 lg:h-62.5 lg:w-45 rounded-lg overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.3)] shrink-0 -mt-14 sm:-mt-18 md:-mt-24 sm:mb-0 ring-2 ring-white/10 bg-card transform transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.4)] hover:scale-[1.02]">
        {imageUrl && !imageError ? (
          <Image
            src={getImageWithFallback(imageUrl)}
            alt={title}
            width={260}
            height={360}
            priority={true}
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground" />
          </div>
        )}
      </div>

      <div className="hidden sm:block w-full">
        <Button variant="outline" size="sm" className="w-full text-xs">
          <StarIcon className="h-3.5 w-3.5 mr-1.5" />
          Add To List
        </Button>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "finished":
        return "bg-green-500/20 text-green-700 border-green-500/30";
      case "publishing":
        return "bg-blue-500/20 text-blue-700 border-blue-500/30";
      case "on hiatus":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30";
      case "discontinued":
        return "bg-red-500/20 text-red-700 border-red-500/30";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const displayStatus = status?.replace(/_/g, " ") || "Unknown";

  return (
    <Badge
      variant="outline"
      className={`text-xs sm:text-sm px-2.5 py-0.5 font-medium border ${getStatusColor(status)}`}
    >
      {displayStatus}
    </Badge>
  );
};

const MangaTitle = ({ title, titleEnglish, titleJapanese, titleSynonyms }) => {
  const getAlternativeTitle = () => {
    if (titleEnglish && titleEnglish !== title) {
      return titleEnglish;
    }
    return titleJapanese || titleSynonyms?.[0] || "\u00A0";
  };

  return (
    <>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight line-clamp-2 mb-1 sm:mb-2 bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/90">
        {title}
      </h1>

      <p className="text-xs sm:text-sm md:text-base text-muted-foreground/90 line-clamp-1 mb-2 min-h-4 sm:min-h-5 md:min-h-6">
        {getAlternativeTitle()}
      </p>
    </>
  );
};

const InfoTags = ({ score, published, authors }) => {
  const formatPublished = (published) => {
    if (!published?.from) return null;
    const year = new Date(published.from).getFullYear();
    return year;
  };

  return (
    <div className="flex flex-wrap justify-center sm:justify-start gap-y-2 gap-x-3 mt-3 mb-4">
      {score && (
        <div className="flex items-center bg-card/60 backdrop-blur-md border border-white/5 rounded-full px-3 py-1 text-xs">
          <StarIcon className="h-3.5 w-3.5 mr-1.5 text-yellow-500" />
          <span className="font-medium">{score}</span>
        </div>
      )}

      {published && formatPublished(published) && (
        <div className="flex items-center bg-card/60 backdrop-blur-md border border-white/5 rounded-full px-3 py-1 text-xs">
          <Calendar className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
          <span className="font-medium">{formatPublished(published)}</span>
        </div>
      )}

      {authors?.map((author) => (
        <div
          key={author.mal_id}
          className="flex items-center bg-card/60 backdrop-blur-md border border-white/5 rounded-full px-3 py-1 text-xs"
        >
          <BookOpen className="h-3.5 w-3.5 mr-1.5 text-green-500" />
          <span className="font-medium">{author.name}</span>
        </div>
      ))}
    </div>
  );
};

const ScoreCard = ({ score, scoredBy }) => {
  if (!score) return null;

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
        {score}
        <StarIcon className="h-4 w-4 text-yellow-500" />
      </div>
      {scoredBy && (
        <div className="text-xs text-muted-foreground/60 mt-0.5 text-center">
          {formatUserCount(scoredBy)} users
        </div>
      )}
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

const StatsGrid = ({ score, scoredBy, rank, popularity, members }) => {
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
      <ScoreCard score={score} scoredBy={scoredBy} />

      {rank && <StatCard label="Ranked" value={`#${rank}`} />}

      {popularity && <StatCard label="Popularity" value={`#${popularity}`} />}

      {members && <StatCard label="Members" value={formatNumber(members)} />}
    </div>
  );
};

export function MangaHeroSection({ heroData }) {
  const {
    imageUrl,
    title,
    titleEnglish,
    titleJapanese,
    titleSynonyms,
    type,
    status,
    score,
    scoredBy,
    rank,
    popularity,
    members,
    published,
    authors,
  } = heroData;

  return (
    <section className="w-full min-h-100 md:min-h-125 lg:min-h-150 relative overflow-hidden bg-linear-to-b from-background/60 via-background/80 to-background">
      <MangaImage imageUrl={imageUrl} title={title} />

      <PageContainer noPaddingY className="h-full relative z-10">
        <div className="flex h-full items-end pb-8 md:pb-10 pt-20 sm:pt-24">
          <div className="flex flex-col sm:flex-row w-full gap-5 sm:gap-8 items-center sm:items-start md:items-end">
            <MangaPoster imageUrl={imageUrl} title={title} />

            <div className="flex-1 text-center sm:text-left max-w-full">
              <div className="flex items-center justify-center sm:justify-start flex-wrap gap-2 mb-2 sm:mb-3">
                <Badge
                  variant="secondary"
                  className="text-xs sm:text-sm px-2.5 py-0.5"
                >
                  {type || "Manga"}
                </Badge>
                <StatusBadge status={status} />
              </div>

              <MangaTitle
                title={title}
                titleEnglish={titleEnglish}
                titleJapanese={titleJapanese}
                titleSynonyms={titleSynonyms}
              />
              <InfoTags score={score} published={published} authors={authors} />
              <StatsGrid
                score={score}
                scoredBy={scoredBy}
                rank={rank}
                popularity={popularity}
                members={members}
              />

              <div className="mt-4 flex sm:hidden">
                <Button className="w-full">
                  <StarIcon className="h-4 w-4 mr-2" />
                  Add To List
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

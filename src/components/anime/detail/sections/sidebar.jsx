import { Link } from "@/components/ui/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toSnakeCase } from "@/lib/utils/formatter";

const SidebarSection = ({ title, children, condition = true }) => {
  if (!condition) return null;

  return (
    <div className="py-3">
      <span className="text-sm font-semibold text-foreground/90">{title}</span>
      <div className="mt-1.5 space-y-2">{children}</div>
    </div>
  );
};

const InfoRow = ({ label, children }) => (
  <div className="flex justify-between text-sm">
    <span className="text-muted-foreground">{label}</span>
    {children}
  </div>
);

const BadgeList = ({
  items,
  renderBadge,
  className = "flex flex-wrap gap-1.5 justify-end",
}) => <div className={className}>{items?.map(renderBadge)}</div>;

const InfoValue = ({ children }) => (
  <span className="font-medium text-right">{children}</span>
);

const AlternativeTitlesSection = ({ titleJapanese, titleSynonyms }) => {
  const hasAlternativeTitles =
    titleJapanese ||
    (titleSynonyms && titleSynonyms.length > 0);

  return (
    <SidebarSection title="Alternative Titles" condition={hasAlternativeTitles}>
      {titleJapanese && (
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground/80 font-medium block">
            Japanese
          </span>
          <div className="font-japanese text-sm">
            {titleJapanese}
          </div>
        </div>
      )}

      {titleSynonyms?.length > 0 && (
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground/80 font-medium block">
            Synonyms
          </span>
          <div className="space-y-0.5">
            {titleSynonyms.map((title, i) => (
              <div key={i} className="text-sm">
                {title}
              </div>
            ))}
          </div>
        </div>
      )}
    </SidebarSection>
  );
};

const BasicInfoSection = ({ status, episodes, rating, season, year, aired, duration, broadcast }) => {
  const formatSeason = (season, year) => {
    if (!season) return null;
    return `${season.charAt(0).toUpperCase() + season.slice(1)} ${year}`;
  };

  return (
    <SidebarSection title="Basic Info">
      <InfoRow label="Status">
        <InfoValue>{status || "N/A"}</InfoValue>
      </InfoRow>

      <InfoRow label="Episodes">
        <InfoValue>{episodes || "?"}</InfoValue>
      </InfoRow>

      {rating && (
        <InfoRow label="Age Rating">
          <InfoValue>{rating}</InfoValue>
        </InfoRow>
      )}

      {season && (
        <InfoRow label="Season">
          <InfoValue>
            {formatSeason(season, year)}
          </InfoValue>
        </InfoRow>
      )}

      {aired?.string && (
        <InfoRow label="Aired">
          <InfoValue>{aired.string}</InfoValue>
        </InfoRow>
      )}

      {duration && (
        <InfoRow label="Duration">
          <InfoValue>{duration}</InfoValue>
        </InfoRow>
      )}

      {broadcast?.string && (
        <InfoRow label="Broadcast">
          <InfoValue>{broadcast.string}</InfoValue>
        </InfoRow>
      )}
    </SidebarSection>
  );
};

const CreditsSection = ({ studios, producers, licensors }) => (
  <SidebarSection title="Credits">
    {studios?.length > 0 && (
      <InfoRow label="Studio">
        <BadgeList
          items={studios}
          renderBadge={(studio) => (
            <span key={studio.mal_id} className="font-medium">
              {studio.name}
            </span>
          )}
        />
      </InfoRow>
    )}

    {producers?.length > 0 && (
      <InfoRow label="Producers">
        <BadgeList
          items={producers}
          renderBadge={(producer) => (
            <Link
              key={producer.mal_id}
              href={`/producer/${producer.mal_id}/${toSnakeCase(
                producer.name
              )}`}
            >
              <Badge
                variant="outline"
                className="text-xs hover:bg-primary/10 py-0 h-5 sm:h-6"
              >
                {producer.name}
              </Badge>
            </Link>
          )}
        />
      </InfoRow>
    )}

    {licensors?.length > 0 && (
      <InfoRow label="Licensors">
        <BadgeList
          items={licensors}
          renderBadge={(licensor) => (
            <span key={licensor.mal_id} className="font-medium">
              {licensor.name}
            </span>
          )}
        />
      </InfoRow>
    )}
  </SidebarSection>
);

const DetailsSection = ({ source, genres, themes, demographics }) => (
  <SidebarSection title="Details">
    <InfoRow label="Source">
      <InfoValue>{source || "N/A"}</InfoValue>
    </InfoRow>

    {genres?.length > 0 && (
      <InfoRow label="Genres">
        <BadgeList
          items={genres}
          renderBadge={(genre) => (
            <Link
              key={genre.mal_id}
              href={`/anime/genre/${genre.mal_id}/${toSnakeCase(genre.name)}`}
            >
              <Badge
                variant="outline"
                className="text-xs hover:bg-primary/10 py-0 h-5 sm:h-6"
              >
                {genre.name}
              </Badge>
            </Link>
          )}
        />
      </InfoRow>
    )}

    {themes?.length > 0 && (
      <InfoRow label="Themes">
        <BadgeList
          items={themes}
          renderBadge={(theme) => (
            <Link
              key={theme.mal_id}
              href={`/anime/theme/${theme.mal_id}/${toSnakeCase(theme.name)}`}
            >
              <Badge
                variant="outline"
                className="text-xs hover:bg-primary/10 py-0 h-5 sm:h-6"
              >
                {theme.name}
              </Badge>
            </Link>
          )}
        />
      </InfoRow>
    )}

    {demographics?.length > 0 && (
      <InfoRow label="Demographics">
        <BadgeList
          items={demographics}
          renderBadge={(demographic) => (
            <Badge
              key={demographic.mal_id}
              variant="outline"
              className="text-xs py-0 h-5 sm:h-6"
            >
              {demographic.name}
            </Badge>
          )}
        />
      </InfoRow>
    )}
  </SidebarSection>
);

const StatisticsSection = ({ rank, popularity, members, favorites }) => {
  const formatNumber = (num) => {
    return num ? num.toLocaleString() : "N/A";
  };

  const formatRank = (rank) => {
    return rank ? `#${rank}` : "N/A";
  };

  return (
    <SidebarSection title="Statistics">
      <InfoRow label="Rank">
        <InfoValue>{formatRank(rank)}</InfoValue>
      </InfoRow>

      <InfoRow label="Popularity">
        <InfoValue>{formatRank(popularity)}</InfoValue>
      </InfoRow>

      <InfoRow label="Members">
        <InfoValue>{formatNumber(members)}</InfoValue>
      </InfoRow>

      <InfoRow label="Favorites">
        <InfoValue>{formatNumber(favorites)}</InfoValue>
      </InfoRow>
    </SidebarSection>
  );
};

export function AnimeSidebar({ sidebarData }) {
  const {
    titleJapanese,
    titleSynonyms,
    status,
    episodes,
    rating,
    season,
    year,
    aired,
    duration,
    broadcast,
    studios,
    producers,
    licensors,
    source,
    genres,
    themes,
    demographics,
    rank,
    popularity,
    members,
    favorites
  } = sidebarData;

  return (
    <Card className="py-0 shadow-lg border-border/40">
      <CardContent className="p-4 space-y-0 divide-y divide-border/60">
        <AlternativeTitlesSection
          titleJapanese={titleJapanese}
          titleSynonyms={titleSynonyms}
        />
        <BasicInfoSection
          status={status}
          episodes={episodes}
          rating={rating}
          season={season}
          year={year}
          aired={aired}
          duration={duration}
          broadcast={broadcast}
        />
        <CreditsSection
          studios={studios}
          producers={producers}
          licensors={licensors}
        />
        <DetailsSection
          source={source}
          genres={genres}
          themes={themes}
          demographics={demographics}
        />
        <StatisticsSection
          rank={rank}
          popularity={popularity}
          members={members}
          favorites={favorites}
        />
      </CardContent>
    </Card>
  );
}

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toSnakeCase } from "@/lib/formatter";

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

const AlternativeTitlesSection = ({ animeData }) => {
  const hasAlternativeTitles =
    animeData.title_japanese ||
    (animeData.title_synonyms && animeData.title_synonyms.length > 0);

  return (
    <SidebarSection title="Alternative Titles" condition={hasAlternativeTitles}>
      {animeData.title_japanese && (
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground/80 font-medium block">
            Japanese
          </span>
          <div className="font-japanese text-sm">
            {animeData.title_japanese}
          </div>
        </div>
      )}

      {animeData.title_synonyms?.length > 0 && (
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground/80 font-medium block">
            Synonyms
          </span>
          <div className="space-y-0.5">
            {animeData.title_synonyms.map((title, i) => (
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

const BasicInfoSection = ({ animeData }) => {
  const formatSeason = (season, year) => {
    if (!season) return null;
    return `${season.charAt(0).toUpperCase() + season.slice(1)} ${year}`;
  };

  return (
    <SidebarSection title="Basic Info">
      <InfoRow label="Status">
        <InfoValue>{animeData.status || "N/A"}</InfoValue>
      </InfoRow>

      <InfoRow label="Episodes">
        <InfoValue>{animeData.episodes || "?"}</InfoValue>
      </InfoRow>

      {animeData.rating && (
        <InfoRow label="Age Rating">
          <InfoValue>{animeData.rating}</InfoValue>
        </InfoRow>
      )}

      {animeData.season && (
        <InfoRow label="Season">
          <InfoValue>
            {formatSeason(animeData.season, animeData.year)}
          </InfoValue>
        </InfoRow>
      )}

      {animeData.aired?.string && (
        <InfoRow label="Aired">
          <InfoValue>{animeData.aired.string}</InfoValue>
        </InfoRow>
      )}

      {animeData.duration && (
        <InfoRow label="Duration">
          <InfoValue>{animeData.duration}</InfoValue>
        </InfoRow>
      )}

      {animeData.broadcast?.string && (
        <InfoRow label="Broadcast">
          <InfoValue>{animeData.broadcast.string}</InfoValue>
        </InfoRow>
      )}
    </SidebarSection>
  );
};

const CreditsSection = ({ animeData }) => (
  <SidebarSection title="Credits">
    {animeData.studios?.length > 0 && (
      <InfoRow label="Studio">
        <BadgeList
          items={animeData.studios}
          renderBadge={(studio) => (
            <span key={studio.mal_id} className="font-medium">
              {studio.name}
            </span>
          )}
        />
      </InfoRow>
    )}

    {animeData.producers?.length > 0 && (
      <InfoRow label="Producers">
        <BadgeList
          items={animeData.producers}
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

    {animeData.licensors?.length > 0 && (
      <InfoRow label="Licensors">
        <BadgeList
          items={animeData.licensors}
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

const DetailsSection = ({ animeData }) => (
  <SidebarSection title="Details">
    <InfoRow label="Source">
      <InfoValue>{animeData.source || "N/A"}</InfoValue>
    </InfoRow>

    {animeData.genres?.length > 0 && (
      <InfoRow label="Genres">
        <BadgeList
          items={animeData.genres}
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

    {animeData.themes?.length > 0 && (
      <InfoRow label="Themes">
        <BadgeList
          items={animeData.themes}
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

    {animeData.demographics?.length > 0 && (
      <InfoRow label="Demographics">
        <BadgeList
          items={animeData.demographics}
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

const StatisticsSection = ({ animeData }) => {
  const formatNumber = (num) => {
    return num ? num.toLocaleString() : "N/A";
  };

  const formatRank = (rank) => {
    return rank ? `#${rank}` : "N/A";
  };

  return (
    <SidebarSection title="Statistics">
      <InfoRow label="Rank">
        <InfoValue>{formatRank(animeData.rank)}</InfoValue>
      </InfoRow>

      <InfoRow label="Popularity">
        <InfoValue>{formatRank(animeData.popularity)}</InfoValue>
      </InfoRow>

      <InfoRow label="Members">
        <InfoValue>{formatNumber(animeData.members)}</InfoValue>
      </InfoRow>

      <InfoRow label="Favorites">
        <InfoValue>{formatNumber(animeData.favorites)}</InfoValue>
      </InfoRow>
    </SidebarSection>
  );
};

export function AnimeSidebar({ animeData }) {
  return (
    <Card className="py-0 shadow-lg border-border/40">
      <CardContent className="p-4 space-y-0 divide-y divide-border/60">
        <AlternativeTitlesSection animeData={animeData} />
        <BasicInfoSection animeData={animeData} />
        <CreditsSection animeData={animeData} />
        <DetailsSection animeData={animeData} />
        <StatisticsSection animeData={animeData} />
      </CardContent>
    </Card>
  );
}

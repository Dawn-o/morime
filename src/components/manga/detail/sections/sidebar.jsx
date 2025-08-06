import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/ui/link";
import { toSnakeCase } from "@/lib/utils/formatter";

const SidebarSection = ({ title, children }) => (
  <div className="pb-3 sm:pb-4 space-y-2 sm:space-y-3">
    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
      {title}
    </h3>
    <div className="space-y-1.5 sm:space-y-2">{children}</div>
  </div>
);

const InfoRow = ({ label, children }) => (
  <div className="flex justify-between items-start gap-2 text-xs sm:text-sm">
    <span className="text-muted-foreground shrink-0 min-w-0">{label}:</span>
    <div className="text-right min-w-0 flex-1">{children}</div>
  </div>
);

const InfoValue = ({ children }) => (
  <span className="font-medium break-words">{children}</span>
);

const BadgeList = ({ items, renderBadge }) => {
  if (!items || items.length === 0) return <InfoValue>None</InfoValue>;

  return (
    <div className="flex flex-wrap gap-1.5 justify-end">
      {items.map((item) => renderBadge(item))}
    </div>
  );
};

const AlternativeTitlesSection = ({ titleJapanese, titleSynonyms }) => {
  const hasAlternatives = titleJapanese || (titleSynonyms && titleSynonyms.length > 0);

  if (!hasAlternatives) return null;

  return (
    <SidebarSection title="Alternative Titles">
      {titleJapanese && (
        <InfoRow label="Japanese">
          <InfoValue>{titleJapanese}</InfoValue>
        </InfoRow>
      )}

      {titleSynonyms && titleSynonyms.length > 0 && (
        <InfoRow label="Synonyms">
          <div className="space-y-0.5">
            {titleSynonyms.slice(0, 3).map((synonym, index) => (
              <InfoValue key={index}>{synonym}</InfoValue>
            ))}
          </div>
        </InfoRow>
      )}
    </SidebarSection>
  );
};

const BasicInfoSection = ({
  status,
  chapters,
  volumes,
  published,
  type
}) => {
  const formatPublished = (published) => {
    if (!published) return "N/A";

    const from = published.from ? new Date(published.from).toLocaleDateString() : null;
    const to = published.to ? new Date(published.to).toLocaleDateString() : null;

    if (from && to) {
      return `${from} to ${to}`;
    } else if (from) {
      return `${from} to ?`;
    }
    return "N/A";
  };

  return (
    <SidebarSection title="Information">
      <InfoRow label="Type">
        <InfoValue>{type || "N/A"}</InfoValue>
      </InfoRow>

      <InfoRow label="Status">
        <InfoValue>{status?.replace(/_/g, " ") || "N/A"}</InfoValue>
      </InfoRow>

      <InfoRow label="Volumes">
        <InfoValue>{volumes || "?"}</InfoValue>
      </InfoRow>

      <InfoRow label="Chapters">
        <InfoValue>{chapters || "?"}</InfoValue>
      </InfoRow>

      <InfoRow label="Published">
        <InfoValue>{formatPublished(published)}</InfoValue>
      </InfoRow>
    </SidebarSection>
  );
};

const CreditsSection = ({ authors, serializations }) => {
  const hasCredits = (authors && authors.length > 0) || (serializations && serializations.length > 0);

  if (!hasCredits) return null;

  return (
    <SidebarSection title="Credits">
      {authors && authors.length > 0 && (
        <InfoRow label="Authors">
          <BadgeList
            items={authors}
            renderBadge={(author) => (
              <Badge
                key={author.mal_id}
                variant="outline"
                className="text-xs hover:bg-primary/10 py-0 h-5 sm:h-6"
              >
                {author.name}
              </Badge>
            )}
          />
        </InfoRow>
      )}

      {serializations && serializations.length > 0 && (
        <InfoRow label="Serialization">
          <BadgeList
            items={serializations}
            renderBadge={(serialization) => (
              <Badge
                key={serialization.mal_id}
                variant="outline"
                className="text-xs hover:bg-primary/10 py-0 h-5 sm:h-6"
              >
                {serialization.name}
              </Badge>
            )}
          />
        </InfoRow>
      )}
    </SidebarSection>
  );
};

const DetailsSection = ({ genres, themes, demographics }) => {
  const hasDetails =
    (genres && genres.length > 0) ||
    (themes && themes.length > 0) ||
    (demographics && demographics.length > 0);

  if (!hasDetails) return null;

  return (
    <SidebarSection title="Details">
      {genres && genres.length > 0 && (
        <InfoRow label="Genres">
          <BadgeList
            items={genres}
            renderBadge={(genre) => (
              <Link
                key={genre.mal_id}
                href={`/manga/genre/${genre.mal_id}/${toSnakeCase(genre.name)}`}
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

      {themes && themes.length > 0 && (
        <InfoRow label="Themes">
          <BadgeList
            items={themes}
            renderBadge={(theme) => (
              <Link
                key={theme.mal_id}
                href={`/manga/theme/${theme.mal_id}/${toSnakeCase(theme.name)}`}
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

      {demographics && demographics.length > 0 && (
        <InfoRow label="Demographics">
          <BadgeList
            items={demographics}
            renderBadge={(demographic) => (
              <Badge
                key={demographic.mal_id}
                variant="outline"
                className="text-xs hover:bg-primary/10 py-0 h-5 sm:h-6"
              >
                {demographic.name}
              </Badge>
            )}
          />
        </InfoRow>
      )}
    </SidebarSection>
  );
};

const StatisticsSection = ({ rank, popularity, members, favorites }) => {
  const formatNumber = (num) => {
    if (!num && num !== 0) return "N/A";
    return num.toLocaleString();
  };

  const formatRank = (rank) => {
    if (!rank && rank !== 0) return "N/A";
    return `#${rank.toLocaleString()}`;
  };

  return (
    <SidebarSection title="Statistics">
      <InfoRow label="Score Rank">
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

export function MangaSidebar({ sidebarData }) {
  const {
    titleJapanese,
    titleSynonyms,
    status,
    chapters,
    volumes,
    published,
    type,
    authors,
    serializations,
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
          chapters={chapters}
          volumes={volumes}
          published={published}
          type={type}
        />
        <CreditsSection
          authors={authors}
          serializations={serializations}
        />
        <DetailsSection
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

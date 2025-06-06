import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toSnakeCase } from "@/lib/utils";

function SidebarSection({ title, children, condition = true }) {
  if (!condition) return null;

  return (
    <div className="py-3">
      <span className="text-sm font-semibold text-foreground/90">{title}</span>
      <div className="mt-1.5 space-y-2">{children}</div>
    </div>
  );
}

function InfoRow({ label, children }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}

function BadgeList({
  items,
  renderBadge,
  className = "font-medium flex flex-wrap gap-1.5 justify-end",
}) {
  return <div className={className}>{items?.map(renderBadge)}</div>;
}

export function AnimeSidebar({ animeData }) {
  return (
    <Card className="py-0 shadow-lg border-border/40">
      <CardContent className="p-4 space-y-0 divide-y divide-border/60">
        <SidebarSection
          title="Alternative Titles"
          condition={
            animeData.title_japanese ||
            (animeData.title_synonyms && animeData.title_synonyms.length > 0)
          }
        >
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
          {animeData.title_synonyms && animeData.title_synonyms.length > 0 && (
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

        <SidebarSection title="Basic Info">
          <InfoRow label="Status">
            <span className="font-medium justify-end">
              {animeData.status || "N/A"}
            </span>
          </InfoRow>
          <InfoRow label="Episodes">
            <span className="font-medium justify-end">
              {animeData.episodes || "?"}
            </span>
          </InfoRow>
          {animeData.rating && (
            <InfoRow label="Age Rating">
              <span className="font-medium justify-end">
                {animeData.rating}
              </span>
            </InfoRow>
          )}
          {animeData.season && (
            <InfoRow label="Season">
              <span className="font-medium justify-end">
                {animeData.season.charAt(0).toUpperCase() +
                  animeData.season.slice(1)}{" "}
                {animeData.year}
              </span>
            </InfoRow>
          )}
          {animeData.aired?.string && (
            <InfoRow label="Aired">
              <span className="font-medium justify-end">
                {animeData.aired.string}
              </span>
            </InfoRow>
          )}
          {animeData.duration && (
            <InfoRow label="Duration">
              <span className="font-medium justify-end">
                {animeData.duration}
              </span>
            </InfoRow>
          )}
          {animeData.broadcast?.string && (
            <InfoRow label="Broadcast">
              <span className="font-medium justify-end">
                {animeData.broadcast.string}
              </span>
            </InfoRow>
          )}
        </SidebarSection>

        <SidebarSection title="Credits">
          <InfoRow label="Studio">
            <BadgeList
              items={animeData.studios}
              renderBadge={(studio) => (
                <span key={studio.mal_id}>{studio.name}</span>
              )}
            />
          </InfoRow>

          {animeData.producers && animeData.producers.length > 0 && (
            <InfoRow label="Producers">
              <BadgeList
                items={animeData.producers}
                className="flex flex-wrap gap-1.5 justify-end"
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

          {animeData.licensors && animeData.licensors.length > 0 && (
            <InfoRow label="Licensors">
              <BadgeList
                items={animeData.licensors}
                renderBadge={(licensor) => (
                  <span key={licensor.mal_id}>{licensor.name}</span>
                )}
              />
            </InfoRow>
          )}
        </SidebarSection>

        <SidebarSection title="Details">
          <InfoRow label="Source">
            <span className="font-medium flex flex-wrap gap-1.5 justify-end">
              {animeData.source || "N/A"}
            </span>
          </InfoRow>

          <InfoRow label="Genres">
            <BadgeList
              items={animeData.genres}
              renderBadge={(genre) => (
                <Link
                  href={`/anime/genre/${genre.mal_id}/${toSnakeCase(
                    genre.name
                  )}`}
                  key={genre.mal_id}
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

          {animeData.themes && animeData.themes.length > 0 && (
            <InfoRow label="Themes">
              <BadgeList
                items={animeData.themes}
                renderBadge={(theme) => (
                  <Link
                    href={`/anime/theme/${theme.mal_id}/${toSnakeCase(
                      theme.name
                    )}`}
                    key={theme.mal_id}
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

          {animeData.demographics && animeData.demographics.length > 0 && (
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

        <SidebarSection title="Statistics">
          <InfoRow label="Rank">
            <span className="font-medium justify-end">
              {animeData.rank ? `#${animeData.rank}` : "N/A"}
            </span>
          </InfoRow>
          <InfoRow label="Popularity">
            <span className="font-medium justify-end">
              {animeData.popularity ? `#${animeData.popularity}` : "N/A"}
            </span>
          </InfoRow>
          <InfoRow label="Members">
            <span className="font-medium justify-end">
              {animeData.members ? animeData.members.toLocaleString() : "N/A"}
            </span>
          </InfoRow>
          <InfoRow label="Favorites">
            <span className="font-medium justify-end">
              {animeData.favorites
                ? animeData.favorites.toLocaleString()
                : "N/A"}
            </span>
          </InfoRow>
        </SidebarSection>
      </CardContent>
    </Card>
  );
}

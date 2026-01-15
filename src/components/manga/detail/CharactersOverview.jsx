import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { MangaCharactersSection } from "@/components/manga/detail/sections/CharactersSection";
import { SectionCard } from "@/components/anime/detail/SectionCard";
import { EmptyState } from "@/components/content/EmptyState";

const TabSeparator = () => (
  <div className="-mx-1 md:hidden">
    <Separator className="w-full" />
  </div>
);

const CharacterTab = ({ value, label, count }) => (
  <TabsTrigger
    value={value}
    className="w-full py-2.5 md:py-0 text-sm justify-center cursor-pointer"
  >
    {label} ({count})
  </TabsTrigger>
);

const CharacterTabContent = ({ characters, type, showAll = true }) => (
  <TabsContent value={type} className="mt-4">
    {characters.length > 0 ? (
      <MangaCharactersSection characters={characters} showAll={showAll} />
    ) : (
      <EmptyState
        message={`No ${type} characters data available`}
      />
    )}
  </TabsContent>
);

const getCharacterTabs = (charactersData, characterGroups) => [
  {
    value: "all",
    label: "All",
    count: charactersData.length,
    characters: charactersData,
  },
  {
    value: "main",
    label: "Main",
    count: characterGroups.main.length,
    characters: characterGroups.main,
  },
  {
    value: "supporting",
    label: "Supporting",
    count: characterGroups.supporting.length,
    characters: characterGroups.supporting,
  },
];

export function MangaCharactersOverview({
  charactersData,
  characterGroups,
  onBackToOverview,
}) {
  const hasCharacters = charactersData?.length > 0;
  const characterTabs = getCharacterTabs(charactersData, characterGroups);

  const headerActions = (
    <Button
      variant="ghost"
      size="sm"
      onClick={onBackToOverview}
      className="text-xs"
    >
      Back to Overview
    </Button>
  );

  if (!hasCharacters) {
    return (
      <div className="space-y-6">
        <SectionCard
          title="Characters"
          headerActions={headerActions}
        >
          <EmptyState
            message="No characters data available"
          />
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionCard
        title="Characters"
        headerActions={headerActions}
      >
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto md:h-10 gap-1 md:gap-0 p-1 md:p-0">
            {characterTabs.map((tab, i) => (
              <>
                <CharacterTab
                  key={tab.mal_id + i}
                  value={tab.value}
                  label={tab.label}
                  count={tab.count}
                />
                {i < characterTabs.length - 1 && <TabSeparator />}
              </>
            ))}
          </TabsList>

          {characterTabs.map((tab, i) => (
            <CharacterTabContent
              key={tab.value}
              characters={tab.characters}
              type={tab.value}
              showAll={true}
            />
          ))}
        </Tabs>
      </SectionCard>
    </div>
  );
}

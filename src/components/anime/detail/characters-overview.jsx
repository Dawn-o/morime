import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CharactersSection } from "@/components/anime/detail/characters-section";
import { SectionCard } from "@/components/anime/detail/section-card";
import { EmptyState } from "@/components/anime/detail/empty-state";

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
      <CharactersSection characters={characters} showAll={showAll} />
    ) : (
      <EmptyState message={`No ${type} characters data available`} />
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

export function CharactersOverview({
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
          title="Characters & Voice Actors"
          headerActions={headerActions}
        >
          <EmptyState message="No characters data available" />
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionCard
        title="Characters & Voice Actors"
        headerActions={headerActions}
      >
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto md:h-10 gap-1 md:gap-0 p-1 md:p-0">
            {characterTabs.map((tab, index) => (
              <>
                <CharacterTab
                  key={tab.value}
                  value={tab.value}
                  label={tab.label}
                  count={tab.count}
                />
                {index < characterTabs.length - 1 && <TabSeparator />}
              </>
            ))}
          </TabsList>

          {characterTabs.map((tab, index) => (
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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { CharactersSection } from "@/components/anime/detail/sections/CharactersSection";
import { SectionCard } from "@/components/anime/detail/SectionCard";
import { EmptyState } from "@/components/content/EmptyState";
import type { Character } from "@/types/anime";

const TabSeparator = () => (
  <div className="-mx-1 md:hidden">
    <Separator className="w-full" />
  </div>
);

interface CharacterTabProps {
  value: string;
  label: string;
  count: number;
}

const CharacterTab = ({ value, label, count }: CharacterTabProps) => (
  <TabsTrigger
    value={value}
    className="w-full py-2.5 md:py-0 text-sm justify-center cursor-pointer"
  >
    {label} ({count})
  </TabsTrigger>
);

interface CharacterTabContentProps {
  characters: Character[];
  type: string;
  showAll?: boolean;
}

const CharacterTabContent = ({
  characters,
  type,
}: CharacterTabContentProps) => (
  <TabsContent value={type} className="mt-4">
    {characters.length > 0 ? (
      <CharactersSection characters={characters} />
    ) : (
      <EmptyState message={`No ${type} characters data available`} />
    )}
  </TabsContent>
);

interface CharacterGroups {
  main: Character[];
  supporting: Character[];
  limited: Character[];
}

interface CharacterTabData {
  value: string;
  label: string;
  count: number;
  characters: Character[];
}

const getCharacterTabs = (
  charactersData: Character[],
  characterGroups: CharacterGroups,
): CharacterTabData[] => [
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

interface CharactersOverviewProps {
  charactersData?: Character[] | null;
  characterGroups: CharacterGroups;
  onBackToOverview: () => void;
}

export function CharactersOverview({
  charactersData,
  characterGroups,
  onBackToOverview,
}: CharactersOverviewProps) {
  const hasCharacters = charactersData && charactersData.length > 0;
  const characterTabs = hasCharacters
    ? getCharacterTabs(charactersData, characterGroups)
    : [];

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
            {characterTabs.map((tab, i) => (
              <>
                <CharacterTab
                  key={`${tab.value}-${i}`}
                  value={tab.value}
                  label={tab.label}
                  count={tab.count}
                />
                {i < characterTabs.length - 1 && <TabSeparator />}
              </>
            ))}
          </TabsList>

          {characterTabs.map((tab) => (
            <CharacterTabContent
              key={tab.value}
              characters={tab.characters}
              type={tab.value}
            />
          ))}
        </Tabs>
      </SectionCard>
    </div>
  );
}

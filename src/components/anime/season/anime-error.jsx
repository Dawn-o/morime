import { Card, CardContent } from "@/components/ui/card";

export function AnimeError({ message, pageType, dayFilter }) {
  const getErrorMessage = () => {
    if (message) return message;

    if (pageType === "schedule") {
      return dayFilter
        ? `No anime scheduled for ${dayFilter}.`
        : "No scheduled anime found.";
    }

    return "No anime found for the selected filter.";
  };

  return (
    <Card>
      <CardContent className="text-center py-8">
        <p className="text-muted-foreground">{getErrorMessage()}</p>
      </CardContent>
    </Card>
  );
}

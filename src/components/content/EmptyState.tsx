"use client";

import { Button } from "@/components/ui/Button";

type EmptyStateType = "anime" | "search" | "error" | "producer" | "generic";

interface EmptyStateConfig {
  title: string;
  description: string;
}

interface EmptyStateProps {
  type?: EmptyStateType;
  message?: string;
  showButton?: boolean;
  onRetry?: () => void;
  className?: string;
}

export function EmptyState({
  type = "anime",
  message,
  showButton = false,
  onRetry,
  className = "",
}: EmptyStateProps) {
  const configs: Record<EmptyStateType, EmptyStateConfig> = {
    anime: {
      title: "No Anime Found",
      description:
        "No anime data available. Try adjusting your filters or check back later.",
    },
    search: {
      title: "No Results Found",
      description: "Try different search terms or adjust your filters.",
    },
    error: {
      title: "Something went wrong",
      description: "We couldn't load the data. Please try again.",
    },
    producer: {
      title: "No Producers Found",
      description: "No producer data available at the moment.",
    },
    generic: {
      title: "No Data Available",
      description: "There's nothing to show right now.",
    },
  };

  const config = configs[type] || configs.generic;

  if (message && !className) {
    return <div className="text-muted-foreground">{message}</div>;
  }

  return (
    <div className={`text-center py-16 ${className}`}>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          {message || config.title}
        </h2>

        <p className="text-muted-foreground max-w-md mx-auto">
          {config.description}
        </p>

        {showButton && onRetry && (
          <Button onClick={onRetry} variant="outline" className="mt-4">
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}

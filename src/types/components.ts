// Common Component Props Types

import { ReactNode } from "react";

// Shared Display Card Data Types
export interface AnimeCardData {
  mal_id: number;
  title: string;
  imageUrl: string;
  score?: number;
  episodes?: number;
  year?: number;
  type?: string;
  members?: number;
}

export interface MangaCardData {
  mal_id: number;
  title: string;
  imageUrl: string;
  score?: number;
  chapters?: number;
  published?: {
    from?: string | null;
    to?: string | null;
  };
  type?: string;
  status?: string;
  members?: number;
}

export interface ProducerDetailsData {
  mal_id: number;
  titles?: Array<{
    type: string;
    title: string;
  }>;
  name?: string;
  imageUrl?: string;
  established?: string | null;
  about?: string | null;
  count: number;
  favorites: number;
}

// Layout Components
export interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";
  noPadding?: boolean;
  noPaddingY?: boolean;
  noPaddingX?: boolean;
  as?: React.ElementType;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: ReactNode;
  className?: string;
  centered?: boolean;
}

export interface ContentSectionProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

// Navigation Components
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  queryParams?: Record<string, string>;
}

export interface SeasonNavigationProps {
  currentYear: number;
  currentSeason: string;
}

export interface TopNavigationProps {
  currentType?: string;
}

// Form Components
export interface SearchInputProps {
  defaultValue?: string;
  basePath: string;
  placeholder?: string;
  autoFocus?: boolean;
}

export interface DayFilterTabsProps {
  selectedDay?: string;
}

export interface TypeFilterTabsProps {
  selectedType?: string;
}

// Display Components
export interface AnimeGridProps {
  animes: Array<{
    mal_id: number;
    title: string;
    imageUrl: string;
    score: number | null;
    episodes: number | null;
    year: number | null;
    type: string | null;
    members?: number | null;
  }>;
}

export interface AnimeListProps {
  animeData: {
    data: Array<{
      mal_id: number;
      title: string;
      imageUrl: string;
      score: number | null;
      episodes: number | null;
      year: number | null;
      type: string | null;
      members?: number | null;
    }>;
    totalPages?: number;
  } | null;
  currentPage: number;
  basePath: string;
  queryParams?: Record<string, string>;
}

export interface MangaGridProps {
  manga: Array<{
    mal_id: number;
    title: string;
    imageUrl: string;
    score: number | null;
    chapters: number | null;
    volumes: number | null;
    type: string | null;
    members?: number | null;
  }>;
}

export interface MangaListProps {
  mangaData: {
    data: Array<{
      mal_id: number;
      title: string;
      imageUrl: string;
      score: number | null;
      chapters: number | null;
      volumes: number | null;
      type: string | null;
      members?: number | null;
    }>;
    totalPages?: number;
  } | null;
  currentPage: number;
  basePath: string;
  queryParams?: Record<string, string>;
}

export interface GenreListProps {
  genres: Array<{
    mal_id: number;
    name: string;
    url: string;
    count?: number;
  }>;
}

export interface GenreGridProps {
  genres: Array<{
    mal_id: number;
    name: string;
    url: string;
    count?: number;
  }>;
}

export interface GenreCategoriesProps {
  genres: Array<{
    mal_id: number;
    name: string;
    url: string;
    count?: number;
  }>;
}

// Producer Components
export interface ProducerCardProps {
  mal_id: number;
  name: string;
  imageUrl: string;
  count: number;
  favorites: number;
  established?: string | null;
}

export interface ProducerDetailsProps {
  producer: {
    mal_id: number;
    name: string;
    imageUrl: string;
    count: number;
    favorites: number;
    established: string | null;
    about: string | null;
  };
  anime: Array<{
    mal_id: number;
    title: string;
    imageUrl: string;
    score: number | null;
    episodes: number | null;
    year: number | null;
    type: string | null;
  }>;
}

// Home Page Components
export interface HomePageProps {
  upcomings: Array<{
    mal_id: number;
    title: string;
    title_japanese: string | null;
    status: string;
    genres: Array<{
      mal_id: number;
      name: string;
    }>;
    imageUrl: string;
    trailerUrl: string | null;
  }>;
  topAnimes: Array<{
    mal_id: number;
    title: string;
    imageUrl: string;
    score: number | null;
    episodes: number | null;
    year: number | null;
    type: string | null;
  }>;
  animes: Array<{
    mal_id: number;
    title: string;
    imageUrl: string;
    score: number | null;
    episodes: number | null;
    year: number | null;
    type: string | null;
  }>;
  genresList: Array<{
    mal_id: number;
    name: string;
    url: string;
    count?: number;
  }>;
}

export interface CarouselProps {
  items: Array<{
    mal_id: number;
    title: string;
    title_japanese: string | null;
    status: string;
    genres: Array<{
      mal_id: number;
      name: string;
    }>;
    imageUrl: string;
    trailerUrl: string | null;
  }>;
}

export interface AnimeCarouselProps {
  animes: Array<{
    mal_id: number;
    title: string;
    imageUrl: string;
    score: number | null;
    episodes: number | null;
    year: number | null;
    type: string | null;
  }>;
}

// Content Components
export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

export interface ErrorStateProps {
  title: string;
  description?: string;
  error?: Error | string;
}

// Section Components
export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllLink?: string;
}

// Utility Types
export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

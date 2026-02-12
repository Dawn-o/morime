export interface Image {
  image_url?: string;
  small_image_url?: string;
  medium_image_url?: string;
  large_image_url?: string;
  maximum_image_url?: string;
}

export interface Images {
  jpg?: Image;
  webp?: Image;
}

export interface Title {
  type: string;
  title: string;
}

export interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Studio {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Producer {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Licensor {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface ThemeCategory {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Demographic {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Aired {
  from: string | null;
  to: string | null;
  prop: {
    from: {
      day: number | null;
      month: number | null;
      year: number | null;
    };
    to: {
      day: number | null;
      month: number | null;
      year: number | null;
    };
  };
  string: string;
}

export interface Published {
  from: string | null;
  to: string | null;
  prop: {
    from: {
      day: number | null;
      month: number | null;
      year: number | null;
    };
    to: {
      day: number | null;
      month: number | null;
      year: number | null;
    };
  };
  string: string;
}

export interface Broadcast {
  day: string | null;
  time: string | null;
  timezone: string | null;
  string: string | null;
}

export interface Trailer {
  youtube_id: string | null;
  url: string | null;
  embed_url: string | null;
  images: {
    image_url: string | null;
    small_image_url: string | null;
    medium_image_url: string | null;
    large_image_url: string | null;
    maximum_image_url: string | null;
  };
}

export interface Relation {
  relation: string;
  entry: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
}

export interface Character {
  character: {
    mal_id: number;
    url: string;
    images: Images;
    name: string;
  };
  role: string;
  favorites?: number;
  voice_actors?: Array<{
    person: {
      mal_id: number;
      url: string;
      images: Images;
      name: string;
    };
    language: string;
  }>;
}

export interface Staff {
  person: {
    mal_id: number;
    url: string;
    images: Images;
    name: string;
  };
  positions: string[];
}

export interface Episode {
  mal_id: number;
  url: string;
  title: string;
  title_japanese: string | null;
  title_romanji: string | null;
  duration: number | null;
  aired: string | null;
  filler: boolean;
  recap: boolean;
  synopsis: string | null;
}

export interface AnimeThemes {
  openings: string[];
  endings: string[];
}

export interface Anime {
  mal_id: number;
  url: string;
  images: Images;
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  title_synonyms: string[];
  type: string | null;
  source: string | null;
  episodes: number | null;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string | null;
  rating: string | null;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  synopsis: string | null;
  background: string | null;
  season: string | null;
  year: number | null;
  broadcast: Broadcast;
  producers: Producer[];
  licensors: Licensor[];
  studios: Studio[];
  genres: Genre[];
  explicit_genres: Genre[];
  themes: ThemeCategory[];
  demographics: Demographic[];
  theme?: AnimeThemes;
  relations?: Relation[];
}

export interface Manga {
  mal_id: number;
  url: string;
  images: Images;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  title_synonyms: string[];
  type: string | null;
  chapters: number | null;
  volumes: number | null;
  status: string;
  publishing: boolean;
  published: Published;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  synopsis: string | null;
  background: string | null;
  authors: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  serializations: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  genres: Genre[];
  explicit_genres: Genre[];
  themes: ThemeCategory[];
  demographics: Demographic[];
  relations?: Relation[];
}

export interface ProducerData {
  mal_id: number;
  type: string;
  name: string;
  url: string;
  titles: Title[];
  images: Images;
  favorites: number;
  established: string | null;
  about: string | null;
  count: number;
}

export interface ScheduleItem {
  mal_id: number;
  url: string;
  images: Images;
  title: string;
  title_japanese: string | null;
  type: string | null;
  source: string | null;
  episodes: number | null;
  status: string;
  airing: boolean;
  broadcast: Broadcast;
  genres: Genre[];
  score: number | null;
  members: number | null;
  synopsis: string | null;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  totalPages?: number;
}

export interface AnimeCardProps {
  mal_id: number;
  title: string;
  imageUrl: string;
  score: number | null;
  episodes: number | null;
  year: number | null;
  type: string | null;
  members?: number | null;
}

export interface MangaCardProps {
  mal_id: number;
  title: string;
  imageUrl: string;
  score: number | null;
  chapters: number | null;
  volumes: number | null;
  type: string | null;
  members?: number | null;
}

export interface ApiConfig {
  type?: string;
  limit?: number;
  genres?: string;
  filter?: string;
  order_by?: string;
  sort?: string;
  producers?: string;
  status?: string;
  q?: string;
  sfw?: boolean;
  rating?: string;
}

export interface SeasonConfig {
  type?: string;
  limit?: number;
  sfw?: boolean;
  filter?: string;
  page?: number;
}

export interface SearchConfig {
  limit?: number;
  q: string;
  sfw?: boolean;
  type?: string;
  status?: string;
  rating?: string;
  genres?: string;
  order_by?: string;
  sort?: string;
}

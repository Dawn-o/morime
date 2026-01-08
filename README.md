# Morime

An anime and manga discovery and tracking platform inspired by MyAnimeList. Built with Next.js 16, React 19, and Bun.

---

## About

Morime provides a modern interface for browsing and tracking anime and manga. The platform integrates with the Jikan API (unofficial MyAnimeList API) to deliver comprehensive information about anime series, manga, characters, and production studios.

## Features

- Browse anime by season, status, and genre
- Discover manga series with detailed information
- View anime schedules and airing times
- Explore production studios and their works
- Character information and voice actors
- Trailer integration with YouTube
- Dark mode support
- Responsive design for all devices

---

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Bun (Package Manager & Runtime)
- Radix UI Components
- Embla Carousel
- Lucide Icons

---

## Getting Started

### Prerequisites

- Bun 1.0 or higher

### Installation

Install dependencies:

```bash
bun install
```

### Development

Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build for production:

```bash
bun run build
```

### Production

Start the production server:

```bash
bun start
```

## Project Structure

```
morime/
├── src/
│   ├── actions/         # Server actions
│   ├── app/            # Next.js app router pages
│   ├── components/     # React components
│   │   ├── anime/      # Anime-specific components
│   │   ├── manga/      # Manga-specific components
│   │   ├── ui/         # Reusable UI components
│   │   └── ...
│   ├── hooks/          # Custom React hooks & API functions
│   └── lib/            # Utility functions
│       └── utils/      # Helper utilities
├── public/             # Static assets
└── ...
```

---

## Key Components

### Home Carousel
Displays upcoming anime with YouTube thumbnail backgrounds extracted from trailer URLs. Automatically cycles through featured anime.

### Anime Detail Pages
Comprehensive anime information including synopsis, characters, staff, relations, and trailers.

### Manga Detail Pages
Detailed manga information with character listings and publication data.

### Producer Pages
Browse anime studios and production companies with their complete anime catalog.

---

## Utilities

### YouTube Utilities
Located in `src/lib/utils/youtube.js`, provides functions for:
- Extracting video IDs from YouTube URLs
- Generating thumbnail URLs for carousel backgrounds
- Controlling autoplay and embed parameters

Example usage:
```javascript
import { getYouTubeThumbnail, setYouTubeAutoplay } from '@/lib/utils/youtube';

const thumbnail = getYouTubeThumbnail(embedUrl, 'maxres');
const noAutoplay = setYouTubeAutoplay(embedUrl, false);
```

---

## API Integration

The project uses the Jikan API v4 for fetching anime and manga data. API calls are centralized in the `src/hooks` directory.

---

## Styling

Tailwind CSS 4 is used for styling with custom configurations. The project includes:
- Custom color schemes
- Dark mode support via next-themes
- Responsive breakpoints
- Animation utilities

---

## Environment

The application is optimized for deployment on Vercel with built-in analytics and speed insights.

---

## License

Private project - All rights reserved
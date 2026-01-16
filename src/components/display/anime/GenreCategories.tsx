import { Link } from "@/components/ui/Link";
import { Button } from "@/components/ui/Button";
import { toSnakeCase } from "@/lib/utils/Formatter";

export function GenreCategories({ genres }) {
  const categorizeGenres = (genres) => {
    const categories = {
      genres: [],
      explicitGenres: [],
      themes: [],
      demographics: [],
    };

    const genreIds = [
      1, 2, 5, 46, 28, 4, 8, 10, 26, 47, 14, 7, 22, 24, 36, 30, 37, 41
    ];
    const explicitIds = [9, 49, 12];
    const themeIds = [
      50, 51, 52, 53, 54, 81, 55, 39, 56, 57, 58, 35, 59, 13, 60, 61, 62, 63,
      64, 74, 65, 66, 17, 18, 67, 38, 19, 6, 68, 69, 20, 70, 71, 40, 3, 72,
      73, 21, 23, 75, 29, 11, 31, 76, 77, 78, 82, 32, 79, 83, 80, 48
    ];
    const demographicIds = [43, 15, 42, 25, 27];

    genres.forEach((genre) => {
      if (genreIds.includes(genre.mal_id)) {
        categories.genres.push(genre);
      } else if (explicitIds.includes(genre.mal_id)) {
        categories.explicitGenres.push(genre);
      } else if (demographicIds.includes(genre.mal_id)) {
        categories.demographics.push(genre);
      } else if (themeIds.includes(genre.mal_id)) {
        categories.themes.push(genre);
      }
    });

    return categories;
  };

  const categorizedGenres = categorizeGenres(genres);

  const renderGenreSection = (title, genreList) => {
    if (genreList.length === 0) return null;

    return (
      <div className="border border-primary-foreground p-4 rounded-lg mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
          {title}
        </h3>
        <div className="flex items-center justify-start flex-wrap gap-2">
          {genreList.map((genre) => (
            <Link
              key={genre.mal_id}
              href={`/anime/genre/${genre.mal_id}/${toSnakeCase(genre.name)}`}
            >
              <Button
                variant="secondary"
                size="sm"
                className="text-xs uppercase cursor-pointer"
              >
                {genre.name} ({genre.count})
              </Button>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 space-y-6">
      {renderGenreSection("Genres", categorizedGenres.genres)}
      {renderGenreSection("Explicit Genres", categorizedGenres.explicitGenres)}
      {renderGenreSection("Themes", categorizedGenres.themes)}
      {renderGenreSection("Demographics", categorizedGenres.demographics)}
    </div>
  );
}

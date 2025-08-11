import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { toSnakeCase } from "@/lib/utils/formatter";

export function GenreCategories({ genres }) {
  const categorizeGenres = (genres) => {
    const categories = {
      genres: [],
      explicitGenres: [],
      themes: [],
      demographics: [],
    };

    const genreIds = [
      1, 2, 5, 46, 28, 4, 8, 10, 26, 47, 14, 7, 22, 24, 36, 30, 37, 45,
    ];
    const explicitIds = [9, 49, 12];
    const demographicIds = [42, 15, 41, 25, 27];
    const themeIds = [
      50, 51, 52, 53, 54, 44, 55, 39, 56, 57, 58, 35, 59, 13, 60, 61, 62, 63,
      64, 75, 65, 66, 17, 18, 67, 68, 38, 19, 6, 69, 70, 20, 71, 72, 40, 3,
      73, 74, 21, 23, 76, 29, 11, 31, 77, 78, 79, 83, 32, 80, 81, 82, 48
    ];

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
              href={`/manga/genre/${genre.mal_id}/${toSnakeCase(genre.name)}`}
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

import { Link } from "@/components/ui/link";
import { Github, Twitter, Instagram } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getTopAnime } from "@/hooks/anime";
import { toSnakeCase } from "@/lib/utils/formatter";

export async function Footer() {
  const [topAnimes, topAiringAnimes, mostPopularAnimes] = await Promise.all([
    getTopAnime(1, { limit: 5 }),
    getTopAnime(1, { limit: 5, filter: "airing" }),
    getTopAnime(1, { limit: 5, filter: "bypopularity" }),
  ]);

  return (
    <footer className="bg-background border-t">
      <div className="py-8 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Morime</h3>
            <p className="text-muted-foreground text-sm">
              Your ultimate anime & manga tracking platform with comprehensive
              database and personalized recommendations.
            </p>
            <div className="flex mt-4 space-x-4">
              <Link
                href="https://github.com/dawn-o"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://twitter.com"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://instagram.com/dawn_bloodfallen"
                className="text-muted-foreground hover:text-foreground"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-normal md:items-center justify-normal md:justify-around colspan-1 md:col-span-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Top Anime</h3>
              <ul className="space-y-2">
                {topAnimes.data?.map((anime, i) => (
                  <li key={anime.mal_id + i}>
                    <Link
                      href={`/anime/${anime.mal_id}/${toSnakeCase(
                        anime.title
                      )}`}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {anime.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Top Airing</h3>
              <ul className="space-y-2">
                {topAiringAnimes.data?.map((anime, i) => (
                  <li key={anime.mal_id + i}>
                    <Link
                      href={`/anime/${anime.mal_id}/${toSnakeCase(
                        anime.title
                      )}`}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {anime.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Most Popular</h3>
              <ul className="space-y-2">
                {mostPopularAnimes.data?.map((anime, i) => (
                  <li key={anime.mal_id + i}>
                    <Link
                      href={`/anime/${anime.mal_id}/${toSnakeCase(
                        anime.title
                      )}`}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {anime.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="-mx-4">
          <Separator className="my-8" />
        </div>

        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2025 Morime. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Powered by{" "}
            <Link href="https://jikan.moe/" className="underline">
              Jikan API
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

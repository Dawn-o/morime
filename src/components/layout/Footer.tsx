import { Link } from "@/components/ui/Link";
import { Github, Twitter, Instagram } from "lucide-react";
import { Separator } from "@/components/ui/Separator";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="py-8 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Morime</h3>
            <p className="text-muted-foreground text-sm">
              Your ultimate anime tracking platform with comprehensive content
              discovery and personalized recommendations.
            </p>
            <div className="flex mt-4 space-x-4">
              <Link
                href="https://github.com/dawn-o"
                prefetch={true}
                className="text-muted-foreground hover:text-foreground"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://twitter.com"
                prefetch={true}
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://instagram.com/rushel.id"
                prefetch={true}
                className="text-muted-foreground hover:text-foreground"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-normal md:items-center justify-normal md:justify-around colspan-1 md:col-span-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/anime/top"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Top Anime
                  </Link>
                </li>
                <li>
                  <Link
                    href="/anime/season"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Seasonal Anime
                  </Link>
                </li>
                <li>
                  <Link
                    href="/anime/schedule"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Schedule
                  </Link>
                </li>
                <li>
                  <Link
                    href="/anime/upcoming"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Upcoming
                  </Link>
                </li>
                <li>
                  <Link
                    href="/producer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Producers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Browse</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/anime/top/movie"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Top Movies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/anime/top/tv"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Top TV Series
                  </Link>
                </li>
                <li>
                  <Link
                    href="/anime/top/airing"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Currently Airing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/anime/top/upcoming"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Most Anticipated
                  </Link>
                </li>
                <li>
                  <Link
                    href="/anime/top/bypopularity"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Most Popular
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Community</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    prefetch={true}
                    href="/about"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    prefetch={true}
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    prefetch={true}
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    prefetch={true}
                    href="/terms"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    prefetch={true}
                    href="/help"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="-mx-4">
          <Separator className="my-8" />
        </div>

        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Morime. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Powered by{" "}
            <Link
              prefetch={true}
              href="https://jikan.moe/"
              className="underline"
            >
              Jikan API
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

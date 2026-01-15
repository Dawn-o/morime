import { Separator } from "@/components/ui/Separator";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata = {
  title: "Help Center",
  description:
    "Get help using Morime. Find answers to frequently asked questions, guides, and tips for discovering anime and manga on our platform.",
};

export default function HelpPage() {
  return (
    <PageContainer maxWidth="5xl" className="py-8 sm:py-12">
      <div className="text-center space-y-3 mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Help Center
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground/90">
          Find answers to common questions and learn how to use Morime
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Getting Started
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
            <p>
              Welcome to Morime. Here's everything you need to know to get the
              most out of your anime and manga discovery experience.
            </p>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <Card className="border-border">
              <CardContent className="pt-6">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  How do I search for anime or manga?
                </h3>
                <p className="text-sm text-muted-foreground/90">
                  Use the search bar in the header at the top of every page.
                  Type the name of the anime or manga you're looking for and
                  press Enter. You can search from any page on Morime.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  How do I view anime by season?
                </h3>
                <p className="text-sm text-muted-foreground/90 mb-3">
                  Click "SEASONAL SCHEDULE" in the navigation menu to browse
                  anime by season and year. You can view past, current, and
                  upcoming seasons.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    Winter
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Spring
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Summer
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Fall
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  What do the ratings mean?
                </h3>
                <p className="text-sm text-muted-foreground/90">
                  Ratings are scores from MyAnimeList users on a scale of 1-10.
                  Higher scores indicate better-received anime and manga. You'll
                  also see popularity rankings and member counts.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  How do I enable dark mode?
                </h3>
                <p className="text-sm text-muted-foreground/90">
                  Click the sun/moon icon in the top right corner of the header.
                  Your preference will be saved automatically. Morime defaults
                  to dark mode for comfortable viewing.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  What is the SFW toggle?
                </h3>
                <p className="text-sm text-muted-foreground/90">
                  The Safe-For-Work toggle in the header filters out
                  adult-oriented content. When enabled, only age-appropriate
                  anime and manga will be shown. Your preference is saved
                  automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  How do I filter by genre?
                </h3>
                <p className="text-sm text-muted-foreground/90">
                  Browse the genre categories on the Anime or Manga list pages.
                  Click any genre badge to see all titles in that category. You
                  can find genres like Action, Romance, Comedy, and many more.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Features Guide
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                Navigation Menu
              </h3>
              <p className="text-sm mb-2">
                The navigation menu provides quick access to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                <li>
                  <strong>ANIME LIST:</strong> Browse all anime with filters
                </li>
                <li>
                  <strong>MANGA LIST:</strong> Explore manga titles
                </li>
                <li>
                  <strong>PRODUCER LIST:</strong> View anime studios and
                  producers
                </li>
                <li>
                  <strong>DAILY SCHEDULE:</strong> See what's airing each day
                </li>
                <li>
                  <strong>SEASONAL SCHEDULE:</strong> Browse by anime season
                </li>
                <li>
                  <strong>TOP ANIME:</strong> Highest-rated anime series
                </li>
                <li>
                  <strong>POPULAR ANIME:</strong> Most popular titles
                </li>
                <li>
                  <strong>ON-GOING ANIME:</strong> Currently airing series
                </li>
                <li>
                  <strong>RECENTLY COMPLETED:</strong> Recently finished anime
                </li>
                <li>
                  <strong>UPCOMING ANIME:</strong> Future releases
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                Anime Detail Pages
              </h3>
              <p className="text-sm mb-2">Each anime page includes:</p>
              <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                <li>Synopsis and description</li>
                <li>Rating, popularity, and ranking</li>
                <li>Episode count and duration</li>
                <li>Airing dates and broadcast schedule</li>
                <li>Genres, themes, and demographics</li>
                <li>Production studios and staff</li>
                <li>Character information with voice actors</li>
                <li>Related anime and adaptations</li>
                <li>Trailers and promotional videos</li>
                <li>Opening and ending theme songs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                Manga Detail Pages
              </h3>
              <p className="text-sm mb-2">Manga pages feature:</p>
              <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                <li>Full synopsis and story details</li>
                <li>Author and artist information</li>
                <li>Publication status and dates</li>
                <li>Chapter and volume counts</li>
                <li>Genres and themes</li>
                <li>Character profiles</li>
                <li>Related works and adaptations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                Producer/Studio Pages
              </h3>
              <p className="text-sm mb-2">
                View information about anime production companies including:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                <li>Studio name and details</li>
                <li>Establishment date</li>
                <li>Complete catalog of produced anime</li>
                <li>Favorites and popularity metrics</li>
              </ul>
            </div>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Tips & Tricks
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-4 bg-muted/30 rounded-lg border border-border">
              <h4 className="font-medium text-foreground mb-2 text-sm">
                Quick Navigation
              </h4>
              <p className="text-xs text-muted-foreground">
                Use the navigation bar at the top to quickly jump between
                different sections. All navigation links are accessible from
                every page.
              </p>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg border border-border">
              <h4 className="font-medium text-foreground mb-2 text-sm">
                Keyboard-Friendly
              </h4>
              <p className="text-xs text-muted-foreground">
                Click the search bar and start typing to quickly find anime or
                manga. Press Enter to search.
              </p>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg border border-border">
              <h4 className="font-medium text-foreground mb-2 text-sm">
                Mobile Experience
              </h4>
              <p className="text-xs text-muted-foreground">
                Morime is fully responsive. Access all features on your phone or
                tablet with an optimized mobile interface.
              </p>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg border border-border">
              <h4 className="font-medium text-foreground mb-2 text-sm">
                Fast Loading
              </h4>
              <p className="text-xs text-muted-foreground">
                We use advanced caching to ensure pages load quickly. Data is
                updated regularly to keep information current.
              </p>
            </div>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Common Issues & Solutions
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                Images not loading?
              </h3>
              <p className="text-sm">
                Try refreshing the page. Images are loaded from external CDNs
                and may occasionally be slow. Check your internet connection if
                the issue persists.
              </p>
            </div>

            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                Search not working?
              </h3>
              <p className="text-sm">
                Make sure you're entering at least 3 characters. Search requires
                a minimum query length. Try different spellings or use English
                titles.
              </p>
            </div>

            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                Page loading slowly?
              </h3>
              <p className="text-sm">
                We have rate limiting to ensure service stability. If pages are
                loading slowly, please wait a moment before navigating further.
                The API has a 3 requests per second limit.
              </p>
            </div>

            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                Missing anime or manga?
              </h3>
              <p className="text-sm">
                Data is sourced from MyAnimeList via the Jikan API. If content
                is missing or outdated, it may not yet be available in the
                source database. Check back later or search with alternative
                titles.
              </p>
            </div>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Data Updates
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <p>
              Morime syncs data with the Jikan API regularly. Information is
              cached for performance:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
              <li>
                <strong>Anime/Manga lists:</strong> Updated every 1 minute
              </li>
              <li>
                <strong>Detail pages:</strong> Cached for 1 hour
              </li>
              <li>
                <strong>Static data (genres):</strong> Cached for 24 hours
              </li>
            </ul>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Browser Compatibility
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <p>Morime works best on modern browsers:</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Chrome 90+</Badge>
              <Badge variant="secondary">Firefox 88+</Badge>
              <Badge variant="secondary">Safari 14+</Badge>
              <Badge variant="secondary">Edge 90+</Badge>
            </div>
            <p className="text-sm">
              For the best experience, please keep your browser updated to the
              latest version.
            </p>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

import type { Metadata } from "next";
import { Separator } from "@/components/ui/Separator";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Morime - A modern anime and manga discovery platform inspired by MyAnimeList. Built with Next.js, React, and powered by the Jikan API.",
};

export default function AboutPage() {
  return (
    <PageContainer maxWidth="5xl" className="py-8 sm:py-12">
      <div className="text-center space-y-3 mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          About Morime
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground/90">
          Your gateway to discovering and tracking anime and manga
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            What is Morime?
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
            <p>
              Morime is a modern anime and manga discovery and tracking platform
              inspired by MyAnimeList. Built with cutting-edge web technologies,
              Morime provides a sleek, fast, and responsive interface for
              browsing thousands of anime series, manga titles, and production
              studios.
            </p>
            <p>
              Our mission is to make anime and manga discovery effortless and
              enjoyable. Whether you're looking for the latest seasonal anime,
              want to explore classic series, or discover hidden gems, Morime
              has you covered.
            </p>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Features
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-border">
              <CardContent className="pt-6">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Comprehensive Anime Database
                </h3>
                <p className="text-sm text-muted-foreground/90">
                  Browse thousands of anime titles with detailed information,
                  ratings, and reviews powered by the Jikan API.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Manga Collection
                </h3>
                <p className="text-sm text-muted-foreground/90">
                  Discover manga series with comprehensive details, character
                  information, and publication data.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Studio Insights
                </h3>
                <p className="text-sm text-muted-foreground/90">
                  Explore anime production studios and their complete catalog of
                  works.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Seasonal Tracking
                </h3>
                <p className="text-sm text-muted-foreground/90">
                  Stay updated with seasonal anime schedules and airing times.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Modern Design
                </h3>
                <p className="text-sm text-muted-foreground/90">
                  Enjoy a beautiful, responsive interface with dark mode support
                  and smooth animations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Advanced Search
                </h3>
                <p className="text-sm text-muted-foreground/90">
                  Find exactly what you're looking for with powerful search and
                  filtering options.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Technology Stack
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <p>
              Morime is built with modern web technologies to ensure the best
              possible performance and user experience:
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Next.js 16</Badge>
              <Badge variant="secondary">React 19</Badge>
              <Badge variant="secondary">Tailwind CSS 4</Badge>
              <Badge variant="secondary">Bun Runtime</Badge>
              <Badge variant="secondary">Radix UI</Badge>
              <Badge variant="secondary">Jikan API v4</Badge>
              <Badge variant="secondary">Vercel</Badge>
            </div>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Data Source
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <p>
              Morime uses the{" "}
              <a
                href="https://jikan.moe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Jikan API
              </a>
              , an unofficial MyAnimeList API, to provide comprehensive anime
              and manga data. All anime and manga information, including titles,
              descriptions, ratings, and images, are sourced from MyAnimeList.
            </p>
            <p className="text-sm italic">
              Morime is not affiliated with or endorsed by MyAnimeList.
            </p>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Our Vision
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <p>
              We believe that discovering anime and manga should be a delightful
              experience. That's why we focus on:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Clean, intuitive user interface</li>
              <li>Fast page loads and smooth navigation</li>
              <li>Comprehensive information at your fingertips</li>
              <li>Mobile-friendly design for browsing on the go</li>
              <li>Regular updates with the latest anime and manga data</li>
            </ul>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Community & Feedback
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <p>
              Morime is continuously evolving based on user feedback and
              suggestions. We're committed to making this the best anime and
              manga discovery platform possible.
            </p>
            <p>
              Have ideas for new features? Found a bug? Want to contribute?
              Morime is open source and we welcome contributions on{" "}
              <a
                href="https://github.com/rushelasli/morime"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </a>
              . You can also visit our{" "}
              <a href="/contact" className="text-primary hover:underline">
                contact page
              </a>{" "}
              to create an issue or start a discussion.
            </p>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

import type { Metadata } from "next";
import { Separator } from "@/components/ui/Separator";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Github, Bug, Lightbulb, MessageSquare } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Morime team. Report bugs, suggest features, or ask questions about our anime and manga discovery platform.",
};

export default function ContactPage() {
  return (
    <PageContainer maxWidth="5xl" className="py-8 sm:py-12">
      <div className="text-center space-y-3 mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Contact Us
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground/90">
          Report issues, suggest features, or contribute on GitHub
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Get in Touch
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
            <p>
              Have a question, found a bug, or want to suggest a feature? Create
              an issue on our GitHub repository. We track all feedback and
              contributions there.
            </p>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            GitHub Repository
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Bug className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      Bug Reports
                    </h3>
                    <p className="text-sm text-muted-foreground/90 mb-3">
                      Found an issue? Report it on GitHub
                    </p>
                    <a
                      href="https://github.com/rushelasli/morime/issues/new?labels=bug"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      Create Bug Report →
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      Feature Requests
                    </h3>
                    <p className="text-sm text-muted-foreground/90 mb-3">
                      Share your ideas with us
                    </p>
                    <a
                      href="https://github.com/rushelasli/morime/issues/new?labels=enhancement"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      Request Feature →
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      General Questions
                    </h3>
                    <p className="text-sm text-muted-foreground/90 mb-3">
                      Ask questions or start discussions
                    </p>
                    <a
                      href="https://github.com/rushelasli/morime/issues/new?labels=question"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      Ask Question →
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Github className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      View All Issues
                    </h3>
                    <p className="text-sm text-muted-foreground/90 mb-3">
                      Browse existing issues and discussions
                    </p>
                    <a
                      href="https://github.com/rushelasli/morime/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      Browse Issues →
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Creating an Issue
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                When reporting bugs:
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                <li>Detailed description of the issue</li>
                <li>Steps to reproduce the problem</li>
                <li>Your browser and device information</li>
                <li>Screenshots if applicable</li>
                <li>Console errors (if any)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                When suggesting features:
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                <li>Clear description of the feature</li>
                <li>How it would improve the user experience</li>
                <li>Any examples from other platforms</li>
                <li>Use case scenarios</li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                Before creating an issue:
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                <li>Search existing issues to avoid duplicates</li>
                <li>Check if your issue has already been reported</li>
                <li>Read the documentation and help center first</li>
              </ul>
            </div>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Contributing
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <p>
              Morime is open source and we welcome contributions. If you'd like
              to contribute code, documentation, or other improvements:
            </p>
            <div className="mt-3 p-4 bg-muted/30 rounded-lg border border-border">
              <p className="text-sm mb-2">
                <strong>Repository:</strong>
              </p>
              <a
                href="https://github.com/rushelasli/morime"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                github.com/rushelasli/morime
              </a>
            </div>
            <div className="flex gap-2 flex-wrap mt-4">
              <Badge variant="secondary">Open Source</Badge>
              <Badge variant="secondary">Community Driven</Badge>
              <Badge variant="secondary">Pull Requests Welcome</Badge>
            </div>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                Do I need a GitHub account?
              </h3>
              <p className="text-sm">
                Yes, you'll need a free GitHub account to create issues or
                participate in discussions. It only takes a minute to sign up.
              </p>
            </div>

            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                How often is the data updated?
              </h3>
              <p className="text-sm">
                Our data is synced with the Jikan API regularly. New anime and
                manga entries are typically available within hours of being
                added to MyAnimeList.
              </p>
            </div>

            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                Can I contribute to Morime?
              </h3>
              <p className="text-sm">
                Absolutely! Morime is open source. Check out the repository on
                GitHub, fork it, make your changes, and submit a pull request.
                We welcome all contributions.
              </p>
            </div>

            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                How quickly will my issue be addressed?
              </h3>
              <p className="text-sm">
                Response times vary based on issue complexity and maintainer
                availability. Critical bugs are prioritized. We appreciate your
                patience.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

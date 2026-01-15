import { Separator } from "@/components/ui/Separator";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata = {
  title: "Privacy Policy - Morime",
  description: "Morime's privacy policy and data handling practices",
};

export default function PrivacyPage() {
  return (
    <PageContainer maxWidth="5xl" className="py-8 sm:py-12">
      <div className="text-center space-y-3 mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Privacy Policy
        </h1>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Introduction
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
            <p>
              Welcome to Morime. We respect your privacy and are committed to
              protecting your personal data. This privacy policy explains how we
              handle information when you use our anime and manga discovery
              platform.
            </p>
            <p>
              Morime is designed with privacy in mind. We do not collect, store,
              or share personal information unless explicitly stated in this
              policy.
            </p>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Information We Collect
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                Automatically Collected Information
              </h3>
              <p className="mb-2">
                When you use Morime, we may automatically collect certain
                information through our hosting and analytics providers:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and time spent on the site</li>
                <li>Referring website or source</li>
                <li>
                  General location information (country/region level only)
                </li>
              </ul>
              <p className="text-sm mt-2 italic">
                This data is collected through Vercel Analytics and Speed
                Insights and is used solely to improve site performance and user
                experience.
              </p>
            </div>

            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                Cookies and Local Storage
              </h3>
              <p className="mb-2">
                We use minimal cookies and local storage for:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                <li>
                  <strong>Theme Preference:</strong> Storing your dark/light
                  mode selection
                </li>
                <li>
                  <strong>Content Filter:</strong> Remembering your
                  Safe-For-Work (SFW) content preference
                </li>
              </ul>
              <p className="text-sm mt-2">
                These preferences are stored locally on your device and are not
                transmitted to our servers or shared with third parties.
              </p>
            </div>

            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                Information We Do NOT Collect
              </h3>
              <p className="mb-2">Morime does NOT collect:</p>
              <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                <li>Personal identification information (name, email, etc.)</li>
                <li>Payment or financial information</li>
                <li>Account credentials or passwords</li>
                <li>Precise location data</li>
                <li>Social media information</li>
                <li>Any data that can personally identify you</li>
              </ul>
            </div>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            How We Use Information
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <p>The limited information we collect is used to:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>Improve Performance:</strong> Identify and fix technical
                issues, optimize page load times
              </li>
              <li>
                <strong>Enhance User Experience:</strong> Understand which
                features are most popular and improve navigation
              </li>
              <li>
                <strong>Maintain Functionality:</strong> Remember your
                preferences (theme, content filters)
              </li>
              <li>
                <strong>Analytics:</strong> Generate anonymous usage statistics
                to guide development priorities
              </li>
            </ul>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Third-Party Services
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                Jikan API
              </h3>
              <p className="text-sm">
                Morime uses the Jikan API (unofficial MyAnimeList API) to
                retrieve anime and manga data. When you browse content on
                Morime, requests are made to Jikan's servers to fetch
                information.
              </p>
              <p className="text-sm mt-2">
                Data shared with Jikan: Only the anime/manga IDs and search
                queries needed to retrieve the requested information. No
                personal data is transmitted.
              </p>
              <p className="text-sm mt-2">
                Learn more:{" "}
                <a
                  href="https://jikan.moe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Jikan API
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                Vercel Hosting & Analytics
              </h3>
              <p className="text-sm">
                Morime is hosted on Vercel. Vercel may collect anonymous
                analytics data to help us understand site performance and usage
                patterns.
              </p>
              <p className="text-sm mt-2">
                Learn more:{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Vercel Privacy Policy
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                YouTube
              </h3>
              <p className="text-sm">
                When viewing anime trailers, embedded YouTube videos may load.
                These embeds use privacy-enhanced mode (youtube-nocookie.com) to
                minimize tracking.
              </p>
              <p className="text-sm mt-2">
                Learn more:{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Data Retention
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <p>
              Analytics data collected through Vercel is retained according to
              their data retention policies. Your local preferences (theme,
              content filters) remain on your device until you clear your
              browser data or manually reset them.
            </p>
            <p>
              Morime does not maintain user accounts or databases, so there is
              no personal data to retain or delete on our servers.
            </p>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Your Rights and Choices
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                Browser Settings
              </h3>
              <p className="mb-2">
                You can control your privacy through your browser settings:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                <li>Block or delete cookies</li>
                <li>Clear local storage</li>
                <li>Use private/incognito browsing mode</li>
                <li>Disable JavaScript (may affect functionality)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-medium text-foreground mb-2">
                Do Not Track
              </h3>
              <p className="text-sm">
                Your browser may offer a "Do Not Track" (DNT) setting. While we
                respect your privacy choices, please note that Morime already
                collects minimal data and DNT settings may not affect
                third-party analytics.
              </p>
            </div>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Children's Privacy
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <p>
              Morime is a general audience platform. We do not knowingly collect
              information from children under 13. If you believe a child has
              provided information to us, please contact us immediately.
            </p>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Data Security
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <p>
              We implement appropriate security measures to protect the limited
              data we collect:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>HTTPS encryption for all connections</li>
              <li>Secure hosting infrastructure via Vercel</li>
              <li>Regular security updates and monitoring</li>
              <li>Minimal data collection principle</li>
            </ul>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            International Users
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <p>
              Morime is accessible worldwide. If you access Morime from outside
              the hosting region, your information may be transferred to and
              processed in different countries. By using Morime, you consent to
              such transfers.
            </p>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Changes to This Policy
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <p>
              We may update this privacy policy from time to time. Significant
              changes will be indicated by updating the "Last updated" date at
              the top of this page. We encourage you to review this policy
              periodically.
            </p>
            <p>
              Continued use of Morime after changes are posted indicates your
              acceptance of the updated policy.
            </p>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Contact Us
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90">
            <p>
              If you have questions or concerns about this privacy policy or our
              data practices, please contact us:
            </p>
            <div className="mt-3 p-4 bg-muted/30 rounded-lg border border-border">
              <p className="text-sm mb-2">
                GitHub:{" "}
                <a
                  href="https://github.com/dawn-o/morime/issues/new?labels=question"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Create an issue
                </a>
              </p>
              <p className="text-sm">
                Contact Page:{" "}
                <a href="/contact" className="text-primary hover:underline">
                  morime.app/contact
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

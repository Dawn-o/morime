import { Separator } from "@/components/ui/separator";
import { PageContainer } from "@/components/layout/page-container";

export const metadata = {
  title: "Terms of Service - Morime",
  description: "Morime's terms of service and usage guidelines",
};

export default function TermsPage() {
  return (
    <PageContainer maxWidth="5xl" className="py-8 sm:py-12">
      <div className="text-center space-y-3 mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Terms of Service
        </h1>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Acceptance of Terms
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
            <p>
              By accessing and using Morime, you accept and agree to be bound by
              the terms and provisions of this agreement. If you do not agree to
              these terms, please do not use this service.
            </p>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Use of Service
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
            <p>
              Morime is provided as a free service for anime and manga discovery
              and information. You may use the service for personal,
              non-commercial purposes only.
            </p>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Use the service for any illegal purpose</li>
              <li>
                Attempt to gain unauthorized access to any portion of the
                service
              </li>
              <li>Interfere with or disrupt the service or servers</li>
              <li>Collect or store personal data about other users</li>
              <li>Use automated systems to access the service excessively</li>
            </ul>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Content and Intellectual Property
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
            <p>
              All anime and manga information, including titles, descriptions,
              images, and ratings displayed on Morime are sourced from the Jikan
              API (unofficial MyAnimeList API) and ultimately belong to their
              respective copyright holders.
            </p>
            <p>
              Morime does not claim ownership of any anime, manga, character
              images, or related content. All trademarks and copyrights belong
              to their respective owners.
            </p>
            <p>
              The Morime platform itself, including its design, code, and
              original content, is the property of Morime and is protected by
              copyright laws.
            </p>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Third-Party Services
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
            <p>
              Morime integrates with third-party services including but not
              limited to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Jikan API for anime and manga data</li>
              <li>MyAnimeList for source data</li>
              <li>YouTube for trailer embeds</li>
              <li>Various CDN services for images</li>
            </ul>
            <p>
              Your use of these third-party services is subject to their
              respective terms of service and privacy policies.
            </p>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Disclaimer of Warranties
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
            <p>
              Morime is provided "as is" and "as available" without any
              warranties of any kind, either express or implied.
            </p>
            <p>We do not warrant that:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>The service will be uninterrupted or error-free</li>
              <li>The information provided will be accurate or complete</li>
              <li>Any defects will be corrected</li>
              <li>The service is free from viruses or harmful components</li>
            </ul>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Limitation of Liability
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
            <p>
              To the maximum extent permitted by law, Morime shall not be liable
              for any indirect, incidental, special, consequential, or punitive
              damages resulting from your use or inability to use the service.
            </p>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Data Accuracy
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
            <p>
              While we strive to provide accurate information, Morime relies on
              third-party data sources. We cannot guarantee the accuracy,
              completeness, or timeliness of any information displayed.
            </p>
            <p>
              Anime and manga data including release dates, episode counts,
              ratings, and descriptions are provided for informational purposes
              only and may contain errors or become outdated.
            </p>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Age Restrictions
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
            <p>
              Some anime and manga content may contain mature themes. While
              Morime provides content filtering options (SFW mode), parents and
              guardians are responsible for monitoring their children's use of
              the service.
            </p>
            <p>
              By using Morime, you confirm that you are of legal age in your
              jurisdiction to view the content or have parental/guardian
              permission.
            </p>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Changes to Terms
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
            <p>
              We reserve the right to modify these terms at any time. Changes
              will be effective immediately upon posting to this page. Your
              continued use of Morime after changes are posted constitutes your
              acceptance of the modified terms.
            </p>
            <p>
              We encourage you to review these terms periodically for any
              updates.
            </p>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Termination
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
            <p>
              We reserve the right to terminate or suspend access to our service
              immediately, without prior notice or liability, for any reason,
              including if you breach these Terms of Service.
            </p>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Governing Law
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
            <p>
              These terms shall be governed and construed in accordance with
              applicable laws, without regard to its conflict of law provisions.
            </p>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Contact Information
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
            <p>
              If you have any questions about these Terms of Service, please
              contact us by creating an issue on our{" "}
              <a
                href="https://github.com/dawn-o/morime/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub repository
              </a>
              .
            </p>
            <p>
              For other inquiries, visit our{" "}
              <a href="/contact" className="text-primary hover:underline">
                contact page
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

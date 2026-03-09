import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/LegalLayout";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolscout.tools";

export const metadata: Metadata = {
  title: "Terms of Service | ToolScout.tools",
  description:
    "Terms of Service for ToolScout.tools. Read our terms and conditions for using our software comparison website.",
  openGraph: {
    title: "Terms of Service | ToolScout.tools",
    description:
      "Terms of Service for ToolScout.tools. Read our terms and conditions for using our software comparison website.",
    url: `${SITE_URL}/terms`,
    siteName: "ToolScout",
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
};

const termsJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service | ToolScout.tools",
  url: `${SITE_URL}/terms`,
  description:
    "Terms of Service for ToolScout.tools. Read our terms and conditions for using our software comparison website.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsJsonLd) }}
      />
      <LegalLayout title="Terms of Service" lastUpdated="March 2026">
        <section>
          <p>
            Please read these Terms of Service carefully before using toolscout.tools. By accessing
            or using our site, you agree to be bound by these terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">1. Acceptance of Terms</h2>
          <p className="mt-2">By using ToolScout.tools, you confirm that you:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Are at least 13 years of age</li>
            <li>Have read and agree to these Terms of Service</li>
            <li>Have read and agree to our Privacy Policy</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">2. About ToolScout.tools</h2>
          <p className="mt-2">
            ToolScout.tools is an independent software comparison and review website. We provide
            information, reviews, and comparisons of software tools to help users make informed
            purchasing decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">3. Content Accuracy</h2>
          <p className="mt-2">
            We strive to provide accurate, up-to-date information about the software tools we
            review. However:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Software pricing, features, and availability change frequently</li>
            <li>We cannot guarantee all information is current at all times</li>
            <li>Reviews reflect our honest opinion at the time of writing</li>
            <li>
              You should verify pricing and features directly with vendors before making any
              purchasing decision
            </li>
          </ul>
          <p className="mt-3">
            ToolScout.tools is not responsible for any decisions made based on information found on
            our site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">4. Affiliate Disclosure</h2>
          <p className="mt-2">
            ToolScout.tools participates in affiliate marketing programs. This means we may earn a
            commission when you click links on our site and make a purchase. Affiliate relationships
            do not influence our editorial ratings or recommendations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">5. Sponsored Content</h2>
          <p className="mt-2">
            Some tools pay to be featured as sponsored listings on ToolScout.tools. Sponsored
            content is always clearly labeled with a &quot;Sponsored&quot; badge and does not
            guarantee positive coverage in editorial reviews.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">6. Intellectual Property</h2>
          <p className="mt-2">
            All content on ToolScout.tools — including text, graphics, logos, and code — is owned by
            ToolScout.tools or its content suppliers and is protected by copyright law.
          </p>
          <p className="mt-2">You may not:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Copy or reproduce our content without written permission</li>
            <li>Use our content for commercial purposes</li>
            <li>Scrape our site using automated tools</li>
            <li>Republish our reviews or comparisons elsewhere</li>
          </ul>
          <p className="mt-3">
            You may share links to our content and quote brief excerpts with proper attribution.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">7. Third-Party Links</h2>
          <p className="mt-2">
            ToolScout.tools contains links to third-party websites. We are not responsible for the
            content, privacy practices, or products and services offered by third parties, nor for
            any losses arising from use of third-party sites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">8. Disclaimer of Warranties</h2>
          <p className="mt-2">
            ToolScout.tools is provided &quot;as is&quot; without warranties of any kind. We do not
            warrant that:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>The site will be uninterrupted or error-free</li>
            <li>Information on the site is complete or accurate</li>
            <li>The site is free from viruses or harmful components</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">9. Limitation of Liability</h2>
          <p className="mt-2">
            To the maximum extent permitted by law, ToolScout.tools shall not be liable for any
            indirect, incidental, special, or consequential damages arising from your use of the site
            or reliance on information found on the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">10. Changes to Terms</h2>
          <p className="mt-2">
            We may update these Terms of Service at any time. Changes take effect immediately upon
            posting. Continued use of the site constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">11. Governing Law</h2>
          <p className="mt-2">
            These terms are governed by the laws of Italy and the European Union. Any disputes shall
            be resolved in the courts of Italy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">12. Contact</h2>
          <p className="mt-2">
            For questions about these terms, contact us at{" "}
            <span className="font-mono">legal@toolscout.tools</span>.
          </p>
        </section>
      </LegalLayout>
    </div>
  );
}

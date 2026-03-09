import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/LegalLayout";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolscout.tools";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | ToolScout.tools",
  description:
    "ToolScout.tools affiliate disclosure. We earn commissions from some links. This never affects our honest reviews.",
  openGraph: {
    title: "Affiliate Disclosure | ToolScout.tools",
    description:
      "ToolScout.tools affiliate disclosure. We earn commissions from some links. This never affects our honest reviews.",
    url: `${SITE_URL}/disclosure`,
    siteName: "ToolScout",
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/disclosure`,
  },
};

const disclosureJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Affiliate Disclosure | ToolScout.tools",
  url: `${SITE_URL}/disclosure`,
  description:
    "ToolScout.tools affiliate disclosure. We earn commissions from some links. This never affects our honest reviews.",
};

export default function DisclosurePage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(disclosureJsonLd) }}
      />
      {/* Top banner */}
      <div className="border-b border-border bg-amber-100 px-4 py-4 text-sm text-amber-900 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl items-start gap-3">
          <span className="text-lg" aria-hidden>
            ⚠️
          </span>
          <p>
            Quick summary: Some links earn us a commission. This never affects our honest reviews.
            Full details below.
          </p>
        </div>
      </div>

      <LegalLayout title="Affiliate Disclosure" lastUpdated="March 2026">
        <section>
          <h1 className="text-xl font-semibold text-text-primary">The Short Version</h1>
          <p className="mt-2">
            Some links on ToolScout.tools are affiliate links. If you click one and buy something,
            we earn a small commission — at no extra cost to you. This never influences what we
            write. We give honest reviews regardless of whether we have an affiliate deal or not.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">The Full Version</h2>
          <p className="mt-2">
            ToolScout.tools is a participant in various affiliate marketing programs. This means that
            when you click certain links on our site and subsequently make a purchase or sign up for
            a service, we may receive a commission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">What This Means For You</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>You pay exactly the same price whether you use our affiliate link or go directly.</li>
            <li>Sometimes our affiliate links include special discounts that benefit you.</li>
            <li>
              The commission comes from the vendor&apos;s marketing budget, not from your purchase
              price.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">What This Means For Our Reviews</h2>
          <p className="mt-2">
            Nothing. We have affiliate relationships with tools we&apos;ve rated poorly. We recommend
            tools we have no affiliate deal with. Our ratings are based entirely on our honest
            assessment of each tool&apos;s quality, value, and usefulness.
          </p>
          <p className="mt-2">
            If a tool is bad, we say it&apos;s bad — even if we lose a commission as a result.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">Our Affiliate Partners Include</h2>
          <p className="mt-2">
            Our affiliate partners include web hosting providers, eCommerce platforms, AI tools, VPN
            services, course platforms, and affiliate networks. This list changes over time as we add
            or remove partners.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">How We Label Affiliate Links</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Affiliate links typically open in a new tab.</li>
            <li>
              Pages containing affiliate links include a notice such as: &quot;We may earn a
              commission when you sign up through our links. This does not affect our editorial
              reviews.&quot;
            </li>
            <li>
              Sponsored tool listings are clearly labeled with a &quot;Sponsored&quot; badge so you
              always know.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">Sponsored Listings</h2>
          <p className="mt-2">
            Some tools pay to be featured as sponsored listings. Sponsored listings are always
            clearly labeled. Payment for a sponsored listing does not influence our editorial rating
            or review of that tool.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">FTC Compliance</h2>
          <p className="mt-2">
            This disclosure is made in compliance with the United States Federal Trade Commission
            (FTC) guidelines on endorsements and testimonials (16 CFR Part 255).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary">Questions?</h2>
          <p className="mt-2">
            If you have any questions about our affiliate relationships or disclosure practices,
            contact us at <span className="font-mono">hello@toolscout.tools</span>.
          </p>
          <p className="mt-2">
            We believe transparency builds trust — and trust is the foundation of everything we do at
            ToolScout.tools.
          </p>
        </section>
      </LegalLayout>
    </div>
  );
}

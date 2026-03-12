import type { Metadata } from "next";
import Link from "next/link";
import { SponsorContactForm } from "@/components/sponsor/SponsorContactForm";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolscout.tools";

export const metadata: Metadata = {
  title: "Advertise on ToolScout | Sponsor an AI Tool Listing",
  description:
    "Reach thousands of software buyers by sponsoring a listing on ToolScout.tools. Choose from Basic, Pro, or Premium placement packages starting at $99/month.",
  openGraph: {
    title: "Advertise on ToolScout | Sponsor an AI Tool Listing",
    description:
      "Reach thousands of software buyers by sponsoring a listing on ToolScout.tools. Choose from Basic, Pro, or Premium placement packages starting at $99/month.",
    url: `${SITE_URL}/sponsor`,
    siteName: "ToolScout",
    type: "website",
  },
  alternates: { canonical: `${SITE_URL}/sponsor` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Advertise on ToolScout | Sponsor an AI Tool Listing",
  description:
    "Reach thousands of software buyers by sponsoring a listing on ToolScout.tools. Choose from Basic, Pro, or Premium placement packages starting at $99/month.",
  url: `${SITE_URL}/sponsor`,
};

export default function SponsorPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="border-b border-border bg-surface/50 px-4 py-3 sm:px-6 lg:px-8" aria-label="Breadcrumb">
        <ol className="mx-auto flex max-w-6xl items-center gap-2 text-sm text-text-secondary">
          <li>
            <Link href="/" className="hover:text-text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-text-primary" aria-current="page">
            Sponsor
          </li>
        </ol>
      </nav>

      {/* SECTION 1 — Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Get Your AI Tool in Front of the Right Audience
          </h1>
          <p className="mt-4 text-lg text-indigo-100 sm:text-xl">
            ToolScout.tools connects software buyers with the best tools. Join our sponsored listings and
            reach thousands of decision-makers every month.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#pricing"
              className="inline-flex rounded-lg bg-white px-6 py-3 font-semibold text-indigo-700 shadow-lg transition hover:bg-indigo-50"
            >
              View Packages
            </a>
            <a
              href="#contact"
              className="inline-flex rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Contact Us
            </a>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 text-white sm:grid-cols-4">
            <div>
              <p className="text-2xl font-bold sm:text-3xl">500+</p>
              <p className="text-sm text-indigo-200">Tools Listed</p>
            </div>
            <div>
              <p className="text-2xl font-bold sm:text-3xl">Growing</p>
              <p className="text-sm text-indigo-200">Monthly Audience</p>
            </div>
            <div>
              <p className="text-2xl font-bold sm:text-3xl">6</p>
              <p className="text-sm text-indigo-200">Software Niches</p>
            </div>
            <div>
              <p className="text-2xl font-bold sm:text-3xl">Honest</p>
              <p className="text-sm text-indigo-200">Editorial Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Why Sponsor */}
      <section className="border-b border-border bg-background px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-text-primary">Why Sponsor ToolScout</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-indigo-500/30 bg-card p-6">
              <p className="text-2xl" aria-hidden>🎯</p>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Targeted Audience</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Our visitors are actively researching software to buy. They arrive via Google searches like
                &quot;best AI writing tool&quot; and &quot;ChatGPT alternatives&quot; — high buyer intent traffic.
              </p>
            </div>
            <div className="rounded-2xl border border-indigo-500/30 bg-card p-6">
              <p className="text-2xl" aria-hidden>✅</p>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Trusted Reviews</h3>
              <p className="mt-2 text-sm text-text-secondary">
                We write honest, balanced reviews. Sponsors get a dedicated review page — not a fake 5-star
                puff piece. Readers trust us because we tell the truth.
              </p>
            </div>
            <div className="rounded-2xl border border-indigo-500/30 bg-card p-6">
              <p className="text-2xl" aria-hidden>📈</p>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">Long-Term Visibility</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Sponsored listings don&apos;t disappear after 30 days of clicks. Your tool stays featured as long
                as you sponsor, giving you consistent recurring visibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Pricing */}
      <section id="pricing" className="border-b border-border bg-surface/30 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-text-primary">Simple, Transparent Pricing</h2>
          <p className="mt-2 text-center text-text-secondary">No hidden fees. Cancel anytime. Billed monthly.</p>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {/* Basic */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-lg transition hover:shadow-xl">
              <span className="inline-block rounded-full bg-border px-3 py-1 text-xs font-medium text-text-secondary">
                Starter
              </span>
              <h3 className="mt-4 text-xl font-bold text-text-primary">Basic</h3>
              <p className="mt-2">
                <span className="text-4xl font-bold text-text-primary">$99</span>
                <span className="text-text-secondary">/month</span>
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-2 text-text-primary">
                  <span className="text-success">✓</span> Listed in AI Tools Directory
                </li>
                <li className="flex items-center gap-2 text-text-primary">
                  <span className="text-success">✓</span> &quot;Sponsored&quot; badge on listing
                </li>
                <li className="flex items-center gap-2 text-text-primary">
                  <span className="text-success">✓</span> Priority in search results
                </li>
                <li className="flex items-center gap-2 text-text-primary">
                  <span className="text-success">✓</span> Monthly performance report
                </li>
                <li className="flex items-center gap-2 text-text-secondary">
                  <span className="text-error">✗</span> Featured on niche homepage
                </li>
                <li className="flex items-center gap-2 text-text-secondary">
                  <span className="text-error">✗</span> Featured in category pages
                </li>
                <li className="flex items-center gap-2 text-text-secondary">
                  <span className="text-error">✗</span> Dedicated review page
                </li>
                <li className="flex items-center gap-2 text-text-secondary">
                  <span className="text-error">✗</span> Newsletter feature
                </li>
                <li className="flex items-center gap-2 text-text-secondary">
                  <span className="text-error">✗</span> Featured on main homepage
                </li>
              </ul>
              <a
                href="#contact"
                className="mt-6 block w-full rounded-lg border-2 border-primary py-3 text-center font-semibold text-primary transition hover:bg-primary/10"
              >
                Get Started
              </a>
              <p className="mt-3 text-center text-xs text-text-secondary">Perfect for new or indie tools</p>
            </div>

            {/* Pro — Most Popular */}
            <div className="relative scale-[1.02] rounded-2xl border-2 border-primary bg-card p-6 shadow-xl ring-2 ring-primary/20 lg:scale-105">
              <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                Most Popular
              </span>
              <h3 className="mt-4 text-xl font-bold text-text-primary">Pro</h3>
              <p className="mt-2">
                <span className="text-4xl font-bold text-primary">$199</span>
                <span className="text-text-secondary">/month</span>
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-2 text-text-primary">
                  <span className="text-success">✓</span> Everything in Basic
                </li>
                <li className="flex items-center gap-2 text-text-primary">
                  <span className="text-success">✓</span> Gold border highlight on listing
                </li>
                <li className="flex items-center gap-2 text-text-primary">
                  <span className="text-success">✓</span> Featured on niche homepage (AI Tools)
                </li>
                <li className="flex items-center gap-2 text-text-primary">
                  <span className="text-success">✓</span> Featured in category pages
                </li>
                <li className="flex items-center gap-2 text-text-primary">
                  <span className="text-success">✓</span> Priority placement in compare pages
                </li>
                <li className="flex items-center gap-2 text-text-primary">
                  <span className="text-success">✓</span> Monthly performance report
                </li>
                <li className="flex items-center gap-2 text-text-secondary">
                  <span className="text-error">✗</span> Dedicated review page
                </li>
                <li className="flex items-center gap-2 text-text-secondary">
                  <span className="text-error">✗</span> Newsletter feature
                </li>
                <li className="flex items-center gap-2 text-text-secondary">
                  <span className="text-error">✗</span> Featured on main hub homepage
                </li>
              </ul>
              <a
                href="#contact"
                className="mt-6 block w-full rounded-lg bg-primary py-3 text-center font-semibold text-white transition hover:opacity-90"
              >
                Get Started
              </a>
              <p className="mt-3 text-center text-xs text-text-secondary">Best for established tools seeking growth</p>
            </div>

            {/* Premium */}
            <div className="rounded-2xl border border-warning/40 bg-card p-6 shadow-lg transition hover:shadow-xl">
              <span className="inline-block rounded-full bg-warning/20 px-3 py-1 text-xs font-medium text-warning">
                Maximum Exposure
              </span>
              <h3 className="mt-4 text-xl font-bold text-text-primary">Premium</h3>
              <p className="mt-2">
                <span className="text-4xl font-bold text-text-primary">$399</span>
                <span className="text-text-secondary">/month</span>
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-2 text-text-primary">
                  <span className="text-success">✓</span> Everything in Pro
                </li>
                <li className="flex items-center gap-2 text-text-primary">
                  <span className="text-success">✓</span> Dedicated in-depth review page
                </li>
                <li className="flex items-center gap-2 text-text-primary">
                  <span className="text-success">✓</span> Featured on MAIN hub homepage
                </li>
                <li className="flex items-center gap-2 text-text-primary">
                  <span className="text-success">✓</span> Featured in monthly newsletter
                </li>
                <li className="flex items-center gap-2 text-text-primary">
                  <span className="text-success">✓</span> Priority in ALL compare pages across niche
                </li>
                <li className="flex items-center gap-2 text-text-primary">
                  <span className="text-success">✓</span> Social media mention
                </li>
                <li className="flex items-center gap-2 text-text-primary">
                  <span className="text-success">✓</span> Custom badge design
                </li>
                <li className="flex items-center gap-2 text-text-primary">
                  <span className="text-success">✓</span> Bi-weekly performance report
                </li>
              </ul>
              <a
                href="#contact"
                className="mt-6 block w-full rounded-lg border-2 border-warning py-3 text-center font-semibold text-warning transition hover:bg-warning/10"
              >
                Get Started
              </a>
              <p className="mt-3 text-center text-xs text-text-secondary">For tools that want maximum visibility</p>
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-text-secondary">
            🔄 Multi-niche discount: List in 3+ niches and save 20%
          </p>
          <p className="mt-2 text-center text-sm text-text-secondary">
            💳 Secure payment via Stripe • Cancel anytime • No contracts
          </p>
        </div>
      </section>

      {/* SECTION 4 — What You Get (mock previews) */}
      <section className="border-b border-border bg-background px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-text-primary">
            Here&apos;s Exactly What Your Listing Looks Like
          </h2>
          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">Sponsored card</p>
              <div className="mt-3 rounded-xl border-2 border-warning/60 bg-surface p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/20" />
                  <div>
                    <p className="font-semibold text-text-primary">Your Tool Name</p>
                    <p className="text-xs text-warning">Sponsored</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-text-secondary">Tagline and short description.</p>
                <p className="mt-2 text-sm text-primary">$XX/mo · Try Free →</p>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">Niche homepage</p>
              <div className="mt-3 rounded-xl border border-border bg-surface p-4">
                <p className="text-sm font-medium text-text-primary">Featured Tools</p>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2 rounded-lg bg-background p-2">
                    <div className="h-8 w-8 rounded bg-primary/20" />
                    <span className="text-sm text-text-secondary">Your tool highlighted here</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">Review page</p>
              <div className="mt-3 rounded-xl border border-border bg-surface p-4">
                <p className="font-semibold text-text-primary">Your Tool Name Review</p>
                <p className="mt-1 text-sm text-text-secondary">In-depth review with pros, cons, pricing, and CTA.</p>
                <p className="mt-2 text-xs text-text-secondary">Dedicated URL · SEO-optimized</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FAQ */}
      <section className="border-b border-border bg-surface/30 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold text-text-primary">Frequently Asked Questions</h2>
          <div className="mt-10 space-y-3">
            <details className="group rounded-xl border border-border bg-card">
              <summary className="cursor-pointer list-none px-5 py-4 font-medium text-text-primary">
                How quickly will my tool go live after payment?
              </summary>
              <p className="border-t border-border px-5 py-4 text-sm text-text-secondary">
                Within 24-48 hours of receiving your submission form and payment confirmation.
              </p>
            </details>
            <details className="group rounded-xl border border-border bg-card">
              <summary className="cursor-pointer list-none px-5 py-4 font-medium text-text-primary">
                Can I cancel my sponsorship?
              </summary>
              <p className="border-t border-border px-5 py-4 text-sm text-text-secondary">
                Yes, cancel anytime. Your listing stays live until the end of your current billing period.
              </p>
            </details>
            <details className="group rounded-xl border border-border bg-card">
              <summary className="cursor-pointer list-none px-5 py-4 font-medium text-text-primary">
                Do you write the review for me?
              </summary>
              <p className="border-t border-border px-5 py-4 text-sm text-text-secondary">
                Yes, our editorial team writes an honest review of your tool. We don&apos;t accept pre-written content —
                this keeps our reviews credible and trusted by readers.
              </p>
            </details>
            <details className="group rounded-xl border border-border bg-card">
              <summary className="cursor-pointer list-none px-5 py-4 font-medium text-text-primary">
                What if I want to sponsor multiple niches?
              </summary>
              <p className="border-t border-border px-5 py-4 text-sm text-text-secondary">
                We offer a 20% discount when you sponsor 3 or more niches. Contact us for a custom quote.
              </p>
            </details>
            <details className="group rounded-xl border border-border bg-card">
              <summary className="cursor-pointer list-none px-5 py-4 font-medium text-text-primary">
                Is the &quot;Sponsored&quot; label visible to readers?
              </summary>
              <p className="border-t border-border px-5 py-4 text-sm text-text-secondary">
                Yes, always. We clearly disclose all sponsored content to maintain reader trust. This is also legally
                required.
              </p>
            </details>
            <details className="group rounded-xl border border-border bg-card">
              <summary className="cursor-pointer list-none px-5 py-4 font-medium text-text-primary">
                Do you guarantee a minimum number of clicks?
              </summary>
              <p className="border-t border-border px-5 py-4 text-sm text-text-secondary">
                We don&apos;t guarantee click numbers as traffic varies. We do guarantee prominent placement and honest
                promotion.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* SECTION 6 — Contact Form */}
      <section id="contact" className="border-b border-border bg-background px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-3xl font-bold text-text-primary">Ready to Get Started? Let&apos;s Talk.</h2>
          <p className="mt-2 text-center text-text-secondary">
            Fill out the form below and we&apos;ll get back to you within 24 hours with a custom proposal.
          </p>
          <div className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <SponsorContactForm />
          </div>
        </div>
      </section>

      {/* SECTION 7 — Footer CTA */}
      <section className="bg-surface px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-text-secondary">Have questions? Email us directly at</p>
          <a
            href="mailto:hello@toolscout.tools"
            className="mt-2 inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            hello@toolscout.tools
          </a>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getComparisons, getToolBySlug } from "@/lib/data";
import { buildSEOMeta } from "@/components/shared/SEOMeta";
import { AffiliateButton } from "@/components/shared/AffiliateButton";
import { formatPrice } from "@/lib/utils";
import { getNicheBySlug } from "@/lib/niches";
import { NicheComingSoon } from "@/components/niche/NicheComingSoon";
import { nicheToolSlugParams } from "@/lib/static-params";
import { HostingerReviewContent } from "@/components/reviews/HostingerReviewContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolscout.tools";

interface PageProps {
  params: Promise<{ niche: string; slug: string }>;
}

export function generateStaticParams() {
  return nicheToolSlugParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { niche: nicheSlug, slug } = await params;
  const niche = getNicheBySlug(nicheSlug);
  if (!niche?.active) return {};
  const tool = await getToolBySlug(slug, nicheSlug);
  if (!tool) return {};
  if (nicheSlug === "web-hosting" && slug === "hostinger") {
    return buildSEOMeta({
      title: "Hostinger Review 2026: We Host Our Site On It — Here's The Truth",
      description:
        "We host ToolScout.tools on Hostinger. After real daily use, here's our honest verdict on speed, uptime, support, and value for 2026.",
      path: `/${nicheSlug}/tools/${slug}`,
    });
  }
  return buildSEOMeta({
    title: `${tool.name} Review: Is It Worth It?`,
    description: tool.tagline ?? tool.description ?? `${tool.name} review, pricing, and verdict.`,
    path: `/${nicheSlug}/tools/${slug}`,
  });
}

export default async function NicheToolSlugPage({ params }: PageProps) {
  const { niche: nicheSlug, slug } = await params;
  const niche = getNicheBySlug(nicheSlug);
  if (!niche) notFound();
  if (!niche.active) return <NicheComingSoon niche={niche} />;

  const tool = await getToolBySlug(slug, nicheSlug);
  if (!tool) notFound();
  const comparisons = await getComparisons(nicheSlug);
  const relatedComparisons = comparisons
    .filter((c) => c.tool_a_id === tool.id || c.tool_b_id === tool.id)
    .slice(0, 4);

  const toolUrl = `${SITE_URL}/${nicheSlug}/tools/${slug}`;

  if (nicheSlug === "web-hosting" && slug === "hostinger") {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Hostinger",
      description: tool.description ?? tool.tagline ?? undefined,
      url: tool.website_url ?? toolUrl,
      applicationCategory: "WebHosting",
      offers: {
        "@type": "Offer",
        price: "2.99",
        priceCurrency: "USD",
        priceValidUntil: "2026-12-31",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "9.1",
        bestRating: "10",
        ratingCount: "1",
      },
    };
    return (
      <div className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <nav className="border-b border-border bg-surface/50 px-4 py-3 sm:px-6 lg:px-8" aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-4xl flex-wrap items-center gap-2 text-sm text-text-secondary">
            <li>
              <Link href="/" className="hover:text-text-primary">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={`/${nicheSlug}`} className="hover:text-text-primary">{niche.name}</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={`/${nicheSlug}/tools`} className="hover:text-text-primary">Tools</Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-text-primary" aria-current="page">{tool.name}</li>
          </ol>
        </nav>
        <HostingerReviewContent tool={tool} nicheSlug={nicheSlug} />
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description ?? tool.tagline ?? undefined,
    url: tool.website_url ?? toolUrl,
    applicationCategory: "ProductivityApplication",
    ...(tool.starting_price != null && {
      offers: {
        "@type": "Offer",
        price: tool.starting_price === 0 ? "0" : String(tool.starting_price),
        priceCurrency: "USD",
      },
    }),
    ...(tool.rating != null && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: String(tool.rating),
        bestRating: "10",
        ratingCount: "1",
      },
    }),
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-text-primary">{tool.name} Review</h1>
          {tool.tagline && (
            <p className="mt-2 text-lg text-text-secondary">{tool.tagline}</p>
          )}

          <div className="mt-6 rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-center gap-4">
              {tool.rating != null && (
                <span className="rounded-lg bg-primary/20 px-3 py-1 font-bold text-primary">
                  {tool.rating}/10
                </span>
              )}
              <span className="text-text-secondary">From {formatPrice(tool.starting_price)}</span>
              {tool.is_sponsored && (
                <span className="rounded bg-warning/20 px-2 py-0.5 text-xs text-warning">
                  Sponsored
                </span>
              )}
            </div>
            <p className="mt-3 text-sm text-text-secondary">
              Best for: {tool.best_for?.join(", ") ?? "—"}
            </p>
            <div className="mt-4">
              <AffiliateButton toolName={tool.name} affiliateUrl={tool.affiliate_url} />
            </div>
          </div>
          
          {tool.review_content ? (
            <section className="mt-8 prose prose-invert max-w-none text-text-secondary">
              <div dangerouslySetInnerHTML={{ __html: tool.review_content }} />
            </section>
          ) : (
            <>
              <h2 className="mt-8 text-xl font-semibold text-text-primary">What is {tool.name}?</h2>
              <p className="mt-2 text-text-secondary">{tool.description ?? tool.tagline ?? "—"}</p>
            </>
          )}

          <h2 className="mt-8 text-xl font-semibold text-text-primary">Pros & Cons</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-success">Pros</h3>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-text-secondary">
                {tool.pros?.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-error">Cons</h3>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-text-secondary">
                {tool.cons?.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className="mt-8 text-xl font-semibold text-text-primary">Pricing</h2>
          <p className="mt-2 text-text-secondary">
            Starting at {formatPrice(tool.starting_price)}. Check the official site for current
            plans.
          </p>

          {relatedComparisons.length > 0 && (
            <section className="mt-10 border-t border-border pt-8">
              <h2 className="text-xl font-semibold text-text-primary">
                Comparisons featuring {tool.name}
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                Side-by-side breakdowns to help you choose.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {relatedComparisons.map((c) => (
                  <Link
                    key={c.id}
                    href={`/${nicheSlug}/compare/${c.slug}`}
                    className="rounded-xl border border-border bg-card px-4 py-3 transition hover:border-primary/40"
                  >
                    <div className="text-sm font-semibold text-text-primary">{c.title}</div>
                    {c.meta_desc && (
                      <div className="mt-1 text-xs text-text-secondary">{c.meta_desc}</div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <p className="mt-6">
            <Link
              href={`/${nicheSlug}/alternatives/${slug}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              See best {tool.name} alternatives →
            </Link>
          </p>
          <p className="mt-8 text-sm text-text-secondary">
            We may earn a commission when you sign up through our links.{" "}
            <Link href="/disclosure" className="underline hover:text-text-primary">Disclosure</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getComparisonBySlug, getComparisons } from "@/lib/data";
import { buildSEOMeta } from "@/components/shared/SEOMeta";
import { AffiliateButton } from "@/components/shared/AffiliateButton";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";
import { formatPrice } from "@/lib/utils";
import { getNicheBySlug } from "@/lib/niches";
import Link from "next/link";
import { NicheComingSoon } from "@/components/niche/NicheComingSoon";
import { nicheCompareSlugParams } from "@/lib/static-params";

interface PageProps {
  params: Promise<{ niche: string; slug: string }>;
}

export function generateStaticParams() {
  return nicheCompareSlugParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { niche: nicheSlug, slug } = await params;
  const niche = getNicheBySlug(nicheSlug);
  if (!niche?.active) return {};
  const comp = await getComparisonBySlug(slug, nicheSlug);
  if (!comp) return {};
  return buildSEOMeta({
    title: comp.title,
    description: comp.meta_desc ?? `${comp.tool_a?.name} vs ${comp.tool_b?.name} comparison.`,
    path: `/${nicheSlug}/compare/${slug}`,
  });
}

export default async function NicheCompareSlugPage({ params }: PageProps) {
  const { niche: nicheSlug, slug } = await params;
  const niche = getNicheBySlug(nicheSlug);
  if (!niche) notFound();
  if (!niche.active) return <NicheComingSoon niche={niche} />;

  const comp = await getComparisonBySlug(slug, nicheSlug);
  if (!comp || !comp.tool_a || !comp.tool_b) notFound();

  const a = comp.tool_a;
  const b = comp.tool_b;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolscout.tools";
  const pageUrl = `${siteUrl}/${nicheSlug}/compare/${slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comp.title,
    description: comp.meta_desc ?? `${a.name} vs ${b.name} comparison.`,
    url: pageUrl,
    ...(comp.verdict && { articleBody: comp.verdict }),
    about: [
      { "@type": "SoftwareApplication", name: a.name, url: a.website_url ?? undefined },
      { "@type": "SoftwareApplication", name: b.name, url: b.website_url ?? undefined },
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: comp.title,
    description: comp.meta_desc ?? `${a.name} vs ${b.name} comparison.`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: a.name,
        url: `${siteUrl}/${nicheSlug}/tools/${a.slug}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: b.name,
        url: `${siteUrl}/${nicheSlug}/tools/${b.slug}`,
      },
    ],
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: niche.name,
        item: `${siteUrl}/${nicheSlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Comparisons",
        item: `${siteUrl}/${nicheSlug}/compare`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: comp.title,
        item: pageUrl,
      },
    ],
  };

  const allNicheComparisons = await getComparisons(nicheSlug);
  const related = allNicheComparisons.filter(
    (c) => c.id !== comp.id && c.tool_a && c.tool_b && (c.tool_a.id === a.id || c.tool_a.id === b.id || c.tool_b.id === a.id || c.tool_b.id === b.id)
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <SchemaMarkup schema={[articleSchema, itemListSchema, breadcrumbSchema]} />
      <h1 className="text-3xl font-bold text-text-primary">{comp.title}</h1>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-text-primary">Quick Verdict</h2>
        <p className="mt-2 text-text-secondary">{comp.verdict}</p>
      </div>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full border-collapse rounded-xl border border-border">
          <thead>
            <tr className="bg-surface">
              <th className="border-b border-border p-4 text-left font-semibold text-text-primary">
                Feature
              </th>
              <th className="border-b border-border p-4 text-left font-semibold text-text-primary">
                {a.name}
              </th>
              <th className="border-b border-border p-4 text-left font-semibold text-text-primary">
                {b.name}
              </th>
            </tr>
          </thead>
          <tbody className="text-text-secondary">
            <tr className="border-b border-border">
              <td className="p-4 font-medium text-text-primary">Pricing from</td>
              <td className="p-4">{formatPrice(a.starting_price)}</td>
              <td className="p-4">{formatPrice(b.starting_price)}</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-4 font-medium text-text-primary">Rating</td>
              <td className="p-4">{a.rating ?? "—"}</td>
              <td className="p-4">{b.rating ?? "—"}</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-text-primary">Best for</td>
              <td className="p-4">{a.best_for?.join(", ") ?? "—"}</td>
              <td className="p-4">{b.best_for?.join(", ") ?? "—"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {comp.content && (
        <section className="prose prose-invert mt-10 max-w-none text-text-secondary">
          <div dangerouslySetInnerHTML={{ __html: comp.content }} />
        </section>
      )}

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-semibold text-text-primary">Who should choose {a.name}?</h2>
          <p className="mt-2 text-sm text-text-secondary">{a.tagline ?? a.description}</p>
          <div className="mt-4">
            <AffiliateButton toolName={a.name} affiliateUrl={a.affiliate_url} />
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-semibold text-text-primary">Who should choose {b.name}?</h2>
          <p className="mt-2 text-sm text-text-secondary">{b.tagline ?? b.description}</p>
          <div className="mt-4">
            <AffiliateButton toolName={b.name} affiliateUrl={b.affiliate_url} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12 border-t border-border pt-10">
          <h2 className="text-2xl font-bold text-text-primary">Related comparisons</h2>
          <p className="mt-2 text-sm text-text-secondary">
            More side-by-side breakdowns to help you choose the right tool.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {related.slice(0, 4).map((rc) => (
              <Link
                key={rc.id}
                href={`/${nicheSlug}/compare/${rc.slug}`}
                className="group rounded-xl border border-border bg-card px-4 py-3 text-left transition hover:border-primary/40 hover:bg-card/80"
              >
                <div className="text-sm font-semibold text-text-primary group-hover:text-primary">
                  {rc.title}
                </div>
                <div className="mt-1 text-xs text-text-secondary">
                  {rc.meta_desc ??
                    (rc.tool_a && rc.tool_b
                      ? `Compare ${rc.tool_a.name} vs ${rc.tool_b.name}.`
                      : "Side-by-side comparison.")}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <p className="mt-8 text-sm text-text-secondary">
        We may earn a commission when you sign up through our links.{" "}
        <Link href="/disclosure" className="underline hover:text-text-primary">Disclosure</Link>.
      </p>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getComparisonBySlug } from "@/lib/data";
import { buildSEOMeta } from "@/components/shared/SEOMeta";
import { AffiliateButton } from "@/components/shared/AffiliateButton";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";
import { formatPrice } from "@/lib/utils";
import { comparisonSlugParams } from "@/lib/static-params";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return comparisonSlugParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comp = await getComparisonBySlug(slug);
  if (!comp) return {};
  return buildSEOMeta({
    title: comp.title,
    description: comp.meta_desc ?? `${comp.tool_a?.name} vs ${comp.tool_b?.name} comparison.`,
    path: `/compare/${slug}`,
  });
}

export default async function CompareSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const comp = await getComparisonBySlug(slug);
  if (!comp || !comp.tool_a || !comp.tool_b) notFound();

  const a = comp.tool_a;
  const b = comp.tool_b;

  const winner =
    (a.rating ?? 0) >= (b.rating ?? 0)
      ? a
      : b;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolscout.tools";
  const pageUrl = `${siteUrl}/compare/${slug}`;
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
        url: `${siteUrl}/ai-tools/tools/${a.slug}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: b.name,
        url: `${siteUrl}/ai-tools/tools/${b.slug}`,
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
        name: "Comparisons",
        item: `${siteUrl}/compare`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: comp.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <SchemaMarkup schema={[articleSchema, itemListSchema, breadcrumbSchema]} />
      <h1 className="text-3xl font-bold text-text-primary">{comp.title}</h1>

      {/* Quick Verdict */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-text-primary">Quick Verdict</h2>
        <p className="mt-2 text-text-secondary">{comp.verdict}</p>
      </div>

      {winner && (
        <section className="mt-6 rounded-2xl border border-primary/40 bg-card/80 p-6">
          <h2 className="text-lg font-semibold text-text-primary">
            Our pick: {winner.name}
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            For most people, {winner.name} is the safer default choice based on our testing, pricing, and overall value.
          </p>
          <div className="mt-4">
            <AffiliateButton
              toolName={winner.name}
              affiliateUrl={winner.affiliate_url}
              websiteUrl={winner.website_url}
            />
          </div>
        </section>
      )}

      {/* Side-by-side table */}
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

      {/* Who should choose */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-semibold text-text-primary">Who should choose {a.name}?</h2>
          <p className="mt-2 text-sm text-text-secondary">{a.tagline ?? a.description}</p>
          <div className="mt-4">
            <AffiliateButton
              toolName={a.name}
              affiliateUrl={a.affiliate_url}
              websiteUrl={a.website_url}
            />
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-semibold text-text-primary">Who should choose {b.name}?</h2>
          <p className="mt-2 text-sm text-text-secondary">{b.tagline ?? b.description}</p>
          <div className="mt-4">
            <AffiliateButton
              toolName={b.name}
              affiliateUrl={b.affiliate_url}
              websiteUrl={b.website_url}
            />
          </div>
        </div>
      </div>

      <p className="mt-8 text-sm text-text-secondary">
        We may earn a commission when you sign up through our links.{" "}
        <Link href="/disclosure" className="underline hover:text-text-primary">Disclosure</Link>.
      </p>
    </div>
  );
}

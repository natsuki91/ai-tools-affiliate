import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getComparisonBySlug } from "@/lib/data";
import { buildSEOMeta } from "@/components/shared/SEOMeta";
import { AffiliateButton } from "@/components/shared/AffiliateButton";
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
  const jsonLd = {
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

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

      <p className="mt-8 text-sm text-text-secondary">
        We may earn a commission when you sign up through our links.{" "}
        <Link href="/disclosure" className="underline hover:text-text-primary">Disclosure</Link>.
      </p>
    </div>
  );
}

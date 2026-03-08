import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompareCard } from "@/components/compare/CompareCard";
import { getComparisons } from "@/lib/data";
import { buildSEOMeta } from "@/components/shared/SEOMeta";
import { getNicheBySlug } from "@/lib/niches";
import { NicheComingSoon } from "@/components/niche/NicheComingSoon";
import { nicheParams } from "@/lib/static-params";

interface PageProps {
  params: Promise<{ niche: string }>;
}

export function generateStaticParams() {
  return nicheParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { niche: slug } = await params;
  const niche = getNicheBySlug(slug);
  if (!niche?.active) return { title: niche ? `${niche.name} — Coming soon` : "Not found" };
  return buildSEOMeta({
    title: `${niche.name} Comparison — Side-by-Side`,
    description:
      `Compare options side-by-side. Feature and pricing comparisons for ${niche.name.toLowerCase()}.`,
    path: `/${slug}/compare`,
  });
}

export default async function NicheCompareListPage({ params }: PageProps) {
  const { niche: slug } = await params;
  const niche = getNicheBySlug(slug);
  if (!niche) notFound();
  if (!niche.active) return <NicheComingSoon niche={niche} />;

  const comparisons = await getComparisons(slug);
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary">Compare {niche.name}</h1>
      <p className="mt-2 text-text-secondary">
        Side-by-side comparisons to help you choose the right option.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {comparisons.map((c) => (
          <CompareCard key={c.id} comparison={c} nicheSlug={slug} />
        ))}
      </div>
    </div>
  );
}

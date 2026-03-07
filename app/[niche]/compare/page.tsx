import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompareCard } from "@/components/compare/CompareCard";
import { getComparisons } from "@/lib/data";
import { buildSEOMeta } from "@/components/shared/SEOMeta";
import { getNicheBySlug } from "@/lib/niches";
import { NicheComingSoon } from "@/components/niche/NicheComingSoon";

interface PageProps {
  params: Promise<{ niche: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { niche: slug } = await params;
  const niche = getNicheBySlug(slug);
  if (!niche?.active) return { title: niche ? `${niche.name} — Coming soon` : "Not found" };
  return buildSEOMeta({
    title: "AI Tools Comparison — Side-by-Side Comparisons",
    description:
      "Compare ChatGPT vs Claude, Jasper vs Copy.ai, and more. Side-by-side feature and pricing comparisons for AI tools.",
    path: `/${slug}/compare`,
  });
}

export default async function NicheCompareListPage({ params }: PageProps) {
  const { niche: slug } = await params;
  const niche = getNicheBySlug(slug);
  if (!niche) notFound();
  if (!niche.active) return <NicheComingSoon niche={niche} />;

  const comparisons = await getComparisons();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary">Compare AI Tools</h1>
      <p className="mt-2 text-text-secondary">
        Side-by-side comparisons to help you choose the right tool.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {comparisons.map((c) => (
          <CompareCard key={c.id} comparison={c} nicheSlug={slug} />
        ))}
      </div>
    </div>
  );
}

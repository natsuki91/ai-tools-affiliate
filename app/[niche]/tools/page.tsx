import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getTools } from "@/lib/data";
import { buildSEOMeta } from "@/components/shared/SEOMeta";
import { getNicheBySlug } from "@/lib/niches";
import { NicheComingSoon } from "@/components/niche/NicheComingSoon";
import { ToolsFilterSort } from "@/components/tools/ToolsFilterSort";
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
    title: "All AI Tools — Directory & Reviews",
    description:
      "Browse AI tools. Filter by category, pricing, and rating. Honest reviews and comparisons.",
    path: `/${slug}/tools`,
  });
}

export default async function NicheToolsListPage({ params }: PageProps) {
  const { niche: slug } = await params;
  const niche = getNicheBySlug(slug);
  if (!niche) notFound();
  if (!niche.active) return <NicheComingSoon niche={niche} />;

  const tools = await getTools();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary">AI Tools Directory</h1>
      <p className="mt-2 text-text-secondary">
        Browse and compare AI software. Filter by category and pricing, or sort by rating and price.
      </p>
      <Suspense fallback={<div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">Loading…</div>}>
        <ToolsFilterSort tools={tools} nicheSlug={slug} />
      </Suspense>
    </div>
  );
}

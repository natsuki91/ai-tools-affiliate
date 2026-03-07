import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolCard } from "@/components/tools/ToolCard";
import { getToolsByCategory } from "@/lib/data";
import { buildSEOMeta } from "@/components/shared/SEOMeta";
import { getNicheBySlug } from "@/lib/niches";
import { NicheComingSoon } from "@/components/niche/NicheComingSoon";
import { nicheCategorySlugParams } from "@/lib/static-params";

const categoryNames: Record<string, string> = {
  writing: "Writing",
  image: "Image & Design",
  productivity: "Productivity",
  coding: "Coding",
  marketing: "Marketing",
  seo: "SEO",
};

interface PageProps {
  params: Promise<{ niche: string; slug: string }>;
}

export function generateStaticParams() {
  return nicheCategorySlugParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { niche: nicheSlug, slug } = await params;
  const niche = getNicheBySlug(nicheSlug);
  if (!niche?.active) return {};
  const name = categoryNames[slug] ?? slug;
  return buildSEOMeta({
    title: `Best ${name} AI Tools`,
    description: `Compare and review the best AI tools for ${name}. Honest reviews and pricing.`,
    path: `/${nicheSlug}/category/${slug}`,
  });
}

export default async function NicheCategoryPage({ params }: PageProps) {
  const { niche: nicheSlug, slug } = await params;
  const niche = getNicheBySlug(nicheSlug);
  if (!niche) notFound();
  if (!niche.active) return <NicheComingSoon niche={niche} />;

  const name = categoryNames[slug];
  if (!name) notFound();

  const tools = await getToolsByCategory(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary">Best {name} AI Tools</h1>
      <p className="mt-2 text-text-secondary">
        {tools.length} tools in this category. Compare and choose.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} nicheSlug={nicheSlug} />
        ))}
      </div>
    </div>
  );
}

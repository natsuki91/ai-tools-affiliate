import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getToolBySlug, getTools } from "@/lib/data";
import { buildSEOMeta } from "@/components/shared/SEOMeta";
import { ToolCard } from "@/components/tools/ToolCard";
import { getNicheBySlug } from "@/lib/niches";
import { NicheComingSoon } from "@/components/niche/NicheComingSoon";
import { nicheAlternativeToolSlugParams } from "@/lib/static-params";

interface PageProps {
  params: Promise<{ niche: string; toolSlug: string }>;
}

export function generateStaticParams() {
  return nicheAlternativeToolSlugParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { niche: nicheSlug, toolSlug } = await params;
  const niche = getNicheBySlug(nicheSlug);
  if (!niche?.active) return {};
  const tool = await getToolBySlug(toolSlug, nicheSlug);
  if (!tool) return {};
  return buildSEOMeta({
    title: `Best ${tool.name} Alternatives 2026`,
    description: `Compare the best alternatives to ${tool.name}. Pricing, features, and who each tool is best for.`,
    path: `/${nicheSlug}/alternatives/${toolSlug}`,
  });
}

export default async function AlternativesPage({ params }: PageProps) {
  const { niche: nicheSlug, toolSlug } = await params;
  const niche = getNicheBySlug(nicheSlug);
  if (!niche) notFound();
  if (!niche.active) return <NicheComingSoon niche={niche} />;

  const [tool, allTools] = await Promise.all([getToolBySlug(toolSlug, nicheSlug), getTools(nicheSlug)]);
  if (!tool) notFound();

  const alternatives = allTools.filter((t) => t.id !== tool.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-text-secondary">
        <Link href={`/${nicheSlug}`} className="hover:text-text-primary">
          {niche.name}
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/${nicheSlug}/tools`} className="hover:text-text-primary">
          Tools
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text-primary">Alternatives to {tool.name}</span>
      </nav>
      <h1 className="text-3xl font-bold text-text-primary">
        Best {tool.name} Alternatives 2026
      </h1>
      <p className="mt-2 text-text-secondary">
        If {tool.name} isn&apos;t the right fit, here are top alternatives to compare—pricing, features, and who each is best for.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {alternatives.map((t) => (
          <ToolCard key={t.id} tool={t} nicheSlug={nicheSlug} />
        ))}
      </div>
      <p className="mt-10 text-center text-sm text-text-secondary">
        <Link href={`/${nicheSlug}/tools/${tool.slug}`} className="text-primary hover:underline">
          ← Back to {tool.name} review
        </Link>
      </p>
    </div>
  );
}

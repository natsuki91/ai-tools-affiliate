import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/homepage/Hero";
import { FeaturedTools } from "@/components/homepage/FeaturedTools";
import { Categories } from "@/components/homepage/Categories";
import { LatestComparisons } from "@/components/homepage/LatestComparisons";
import { LatestBlog } from "@/components/homepage/LatestBlog";
import { CTABanner } from "@/components/shared/CTABanner";
import { StatsBar } from "@/components/homepage/StatsBar";
import { getNicheBySlug } from "@/lib/niches";
import { getFeaturedTools, getComparisons } from "@/lib/data";
import { mockBlogPosts } from "@/lib/mock-data";
import Link from "next/link";

interface NichePageProps {
  params: Promise<{ niche: string }>;
}

export async function generateMetadata({ params }: NichePageProps): Promise<Metadata> {
  const { niche: slug } = await params;
  const niche = getNicheBySlug(slug);
  if (!niche) return { title: "Not found" };
  return {
    title: niche.active ? niche.name : `${niche.name} — Coming soon`,
    description: niche.tagline,
  };
}

export default async function NichePage({ params }: NichePageProps) {
  const { niche: slug } = await params;
  const niche = getNicheBySlug(slug);
  if (!niche) notFound();

  if (!niche.active) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <span className="text-5xl" aria-hidden>
          {niche.icon}
        </span>
        <h1 className="mt-4 text-3xl font-bold text-text-primary">{niche.name}</h1>
        <p className="mt-2 text-text-secondary">{niche.tagline}</p>
        <p className="mt-6 text-text-muted">This category is coming soon. We&apos;re building it.</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
    );
  }

  // Active niche: AI Tools — full niche homepage
  const [tools, comparisons] = await Promise.all([getFeaturedTools(), getComparisons()]);
  return (
    <>
      <Hero />
      <FeaturedTools tools={tools} />
      <Categories />
      <LatestComparisons comparisons={comparisons} />
      <LatestBlog posts={mockBlogPosts} />
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <CTABanner title="List Your AI Tool" />
        </div>
      </section>
      <StatsBar />
    </>
  );
}

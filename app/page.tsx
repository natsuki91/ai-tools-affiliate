import { HubHero } from "@/components/homepage/HubHero";
import { NicheGrid } from "@/components/homepage/NicheGrid";
import { FeaturedTools } from "@/components/homepage/FeaturedTools";
import { LatestComparisons } from "@/components/homepage/LatestComparisons";
import { LatestBlog } from "@/components/homepage/LatestBlog";
import { CTABanner } from "@/components/shared/CTABanner";
import { StatsBar } from "@/components/homepage/StatsBar";
import { getFeaturedTools, getComparisons } from "@/lib/data";
import type { SearchItem } from "@/components/homepage/HeroSearch";
import { mockTools, mockComparisons, mockBlogPosts } from "@/lib/mock-data";

export default async function HubPage() {
  let tools: Awaited<ReturnType<typeof getFeaturedTools>> = [];
  let comparisons: Awaited<ReturnType<typeof getComparisons>> = [];
  try {
    [tools, comparisons] = await Promise.all([getFeaturedTools(), getComparisons()]);
  } catch {
    // use empty arrays so page still renders
  }
  const posts = Array.isArray(mockBlogPosts) ? mockBlogPosts : [];
  const searchItems: SearchItem[] = [
    // Tools
    ...mockTools.map((tool) => ({
      label: tool.name,
      href: `/${tool.niche ?? "ai-tools"}/tools/${tool.slug}`,
      type: "tool" as const,
    })),
    // Comparisons
    ...mockComparisons.map((comp) => ({
      label: comp.title,
      href: `/${comp.niche ?? "ai-tools"}/compare/${comp.slug}`,
      type: "comparison" as const,
    })),
    // Blog posts
    ...posts.map((post) => ({
      label: post.title,
      href: `/blog/${post.slug}`,
      type: "blog" as const,
    })),
  ];
  return (
    <>
      <HubHero searchItems={searchItems} />
      <NicheGrid />
      <FeaturedTools tools={tools} />
      <LatestComparisons comparisons={comparisons} />
      <LatestBlog posts={posts} />
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <CTABanner title="List Your AI Tool" />
        </div>
      </section>
      <StatsBar />
    </>
  );
}

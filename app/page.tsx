import { HubHero } from "@/components/homepage/HubHero";
import { NicheGrid } from "@/components/homepage/NicheGrid";
import { FeaturedTools } from "@/components/homepage/FeaturedTools";
import { LatestComparisons } from "@/components/homepage/LatestComparisons";
import { LatestBlog } from "@/components/homepage/LatestBlog";
import { CTABanner } from "@/components/shared/CTABanner";
import { StatsBar } from "@/components/homepage/StatsBar";
import { getFeaturedTools, getComparisons } from "@/lib/data";
import { mockBlogPosts } from "@/lib/mock-data";

export default async function HubPage() {
  let tools: Awaited<ReturnType<typeof getFeaturedTools>> = [];
  let comparisons: Awaited<ReturnType<typeof getComparisons>> = [];
  try {
    [tools, comparisons] = await Promise.all([getFeaturedTools(), getComparisons()]);
  } catch {
    // use empty arrays so page still renders
  }
  const posts = Array.isArray(mockBlogPosts) ? mockBlogPosts : [];
  return (
    <>
      <HubHero />
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

import { Hero } from "@/components/homepage/Hero";
import { FeaturedTools } from "@/components/homepage/FeaturedTools";
import { Categories } from "@/components/homepage/Categories";
import { LatestComparisons } from "@/components/homepage/LatestComparisons";
import { LatestBlog } from "@/components/homepage/LatestBlog";
import { CTABanner } from "@/components/shared/CTABanner";
import { StatsBar } from "@/components/homepage/StatsBar";
import { getFeaturedTools, getComparisons } from "@/lib/data";
import { mockBlogPosts } from "@/lib/mock-data";

export default async function HomePage() {
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

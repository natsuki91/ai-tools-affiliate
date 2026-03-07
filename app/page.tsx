import { Hero } from "@/components/homepage/Hero";
import { FeaturedTools } from "@/components/homepage/FeaturedTools";
import { Categories } from "@/components/homepage/Categories";
import { LatestComparisons } from "@/components/homepage/LatestComparisons";
import { LatestBlog } from "@/components/homepage/LatestBlog";
import { CTABanner } from "@/components/shared/CTABanner";
import { StatsBar } from "@/components/homepage/StatsBar";
import { mockTools, mockComparisons, mockBlogPosts } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedTools tools={mockTools} />
      <Categories />
      <LatestComparisons comparisons={mockComparisons} />
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

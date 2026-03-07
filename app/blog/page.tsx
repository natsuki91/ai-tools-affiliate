import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { mockBlogPosts } from "@/lib/mock-data";
import { buildSEOMeta } from "@/components/shared/SEOMeta";

export const metadata: Metadata = buildSEOMeta({
  title: "Blog — AI Tools Guides & Comparisons",
  description:
    "Guides, roundups, and how-tos for AI writing, image, and productivity tools. Updated weekly.",
  path: "/blog",
});

export default function BlogListPage() {
  const posts = Array.isArray(mockBlogPosts) ? mockBlogPosts : [];
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary">Blog</h1>
      <p className="mt-2 text-text-secondary">
        Guides and articles to help you choose and use AI tools.
      </p>
      {posts.length === 0 ? (
        <p className="mt-8 text-text-secondary">No posts yet. Check back soon.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

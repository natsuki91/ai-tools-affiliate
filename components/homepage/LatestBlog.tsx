import type { BlogPost } from "@/types/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import Link from "next/link";
import { ACTIVE_NICHE_SLUG } from "@/lib/niches";

interface LatestBlogProps {
  posts: BlogPost[];
}

export function LatestBlog({ posts }: LatestBlogProps) {
  return (
    <section className="border-t border-border px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-text-primary">Latest from the Blog</h2>
          <Link
            href={`/${ACTIVE_NICHE_SLUG}/blog`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

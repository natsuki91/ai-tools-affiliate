import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { ACTIVE_NICHE_SLUG } from "@/lib/niches";

interface BlogCardProps {
  post: BlogPost;
  /** When set, links go to /[niche]/blog/[slug]. */
  nicheSlug?: string;
}

export function BlogCard({ post, nicheSlug = ACTIVE_NICHE_SLUG }: BlogCardProps) {
  return (
    <Link
      href={`/${nicheSlug}/blog/${post.slug}`}
      className="block rounded-2xl border border-border bg-card p-6 backdrop-blur transition hover:border-primary/30"
    >
      <h3 className="font-semibold text-text-primary transition group-hover:text-primary">
        {post.title}
      </h3>
      <p className="mt-2 text-sm text-text-secondary line-clamp-2">{post.description}</p>
      <div className="mt-4 flex items-center gap-3 text-xs text-text-secondary">
        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US")}</time>
        {post.readingTime != null && <span>{post.readingTime} min read</span>}
      </div>
    </Link>
  );
}

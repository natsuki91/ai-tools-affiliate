import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { getNicheBySlug } from "@/lib/niches";

interface BlogCardProps {
  post: BlogPost;
  /** When set, links go to /[niche]/blog/[slug]. */
  nicheSlug?: string;
}

export function BlogCard({ post, nicheSlug }: BlogCardProps) {
  const href = nicheSlug ? `/${nicheSlug}/blog/${post.slug}` : `/blog/${post.slug}`;
  const tag = nicheSlug ? (getNicheBySlug(nicheSlug)?.name ?? "Guide") : "Guide";
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-border bg-card p-6 backdrop-blur transition hover:border-primary/30"
    >
      <div className="flex items-center gap-2 text-xs">
        <span className="rounded-full border border-border bg-surface/60 px-2 py-0.5 font-medium text-text-secondary">
          {tag}
        </span>
        <time className="text-text-muted" dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US")}
        </time>
        {post.readingTime != null && (
          <span className="text-text-muted">{post.readingTime} min read</span>
        )}
      </div>
      <h3 className="mt-3 font-semibold text-text-primary transition group-hover:text-primary">
        {post.title}
      </h3>
      <p className="mt-2 text-sm text-text-secondary line-clamp-2">{post.description}</p>
    </Link>
  );
}

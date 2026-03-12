import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { getNicheBySlug } from "@/lib/niches";

interface BlogCardProps {
  post: BlogPost;
  /** When set, links go to /[niche]/blog/[slug]. */
  nicheSlug?: string;
}

function pickGradient(slug: string): string {
  const gradients = [
    "from-primary/30 via-secondary/20 to-accent/20",
    "from-sky-500/25 via-indigo-500/15 to-emerald-500/15",
    "from-amber-500/25 via-rose-500/15 to-violet-500/15",
    "from-emerald-500/25 via-cyan-500/15 to-indigo-500/15",
  ];
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return gradients[h % gradients.length];
}

export function BlogCard({ post, nicheSlug }: BlogCardProps) {
  const href = nicheSlug ? `/${nicheSlug}/blog/${post.slug}` : `/blog/${post.slug}`;
  const tag = nicheSlug ? (getNicheBySlug(nicheSlug)?.name ?? "Guide") : "Guide";
  const gradient = pickGradient(post.slug);
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border border-border bg-card backdrop-blur transition hover:border-primary/30"
    >
      <div className={`h-20 bg-gradient-to-br ${gradient}`} aria-hidden />
      <div className="p-6">
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
      </div>
    </Link>
  );
}

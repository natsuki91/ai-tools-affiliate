import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { mockBlogPosts } from "@/lib/mock-data";
import { buildSEOMeta } from "@/components/shared/SEOMeta";
import { getNicheBySlug } from "@/lib/niches";
import { NicheComingSoon } from "@/components/niche/NicheComingSoon";
import { nicheBlogSlugParams } from "@/lib/static-params";
import fs from "fs";
import path from "path";

interface PageProps {
  params: Promise<{ niche: string; slug: string }>;
}

export function generateStaticParams() {
  return nicheBlogSlugParams();
}

function getPost(slug: string): { title: string; description: string; date: string; readingTime?: number; author?: string } | null {
  try {
    const mock = mockBlogPosts.find((p) => p.slug === slug);
    if (mock) return mock;
    const filePath = path.join(process.cwd(), "content", "blog", `${slug}.md`);
    const raw = fs.readFileSync(filePath, "utf-8");
    const match = raw.match(/---\n([\s\S]*?)\n---/);
    const front = match?.[1];
    if (!front) return null;
    const title = front.match(/title:\s*["']?([^"'\n]+)/)?.[1]?.trim() ?? slug;
    const description = front.match(/description:\s*["']?([^"'\n]+)/)?.[1]?.trim() ?? "";
    const date = front.match(/date:\s*(\S+)/)?.[1] ?? new Date().toISOString().slice(0, 10);
    return { title, description, date, author: "Editorial Team" };
  } catch {
    const mock = mockBlogPosts.find((p) => p.slug === slug);
    return mock ?? null;
  }
}

function getMarkdownBody(slug: string): string | null {
  try {
    const filePath = path.join(process.cwd(), "content", "blog", `${slug}.md`);
    const raw = fs.readFileSync(filePath, "utf-8");
    const end = raw.indexOf("---", 4);
    return end > 0 ? raw.slice(end + 4).trim() : raw;
  } catch {
    const post = mockBlogPosts.find((p) => p.slug === slug);
    return post?.content ?? null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { niche: nicheSlug, slug } = await params;
  const niche = getNicheBySlug(nicheSlug);
  if (!niche?.active) return {};
  const post = getPost(slug);
  if (!post) return {};
  return buildSEOMeta({
    title: post.title,
    description: post.description,
    path: `/${nicheSlug}/blog/${slug}`,
  });
}

export default async function NicheBlogSlugPage({ params }: PageProps) {
  const { niche: nicheSlug, slug } = await params;
  const niche = getNicheBySlug(nicheSlug);
  if (!niche) notFound();
  if (!niche.active) return <NicheComingSoon niche={niche} />;

  const post = getPost(slug);
  if (!post) notFound();

  let body: string | null = null;
  try {
    body = getMarkdownBody(slug);
  } catch {
    body = null;
  }
  const bodySafe = typeof body === "string" ? body : "";
  const relatedPosts = (Array.isArray(mockBlogPosts) ? mockBlogPosts : [])
    .filter((p) => p.slug !== slug)
    .slice(0, 4);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolscout.tools";
  const articleUrl = `${siteUrl}/${nicheSlug}/blog/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description ?? undefined,
    url: articleUrl,
    datePublished: post.date,
    author: post.author ? { "@type": "Organization", name: post.author } : undefined,
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header>
        <h1 className="text-3xl font-bold text-text-primary">{post.title}</h1>
        {post.description && (
          <p className="mt-2 text-lg text-text-secondary">{post.description}</p>
        )}
        <div className="mt-4 flex gap-4 text-sm text-text-secondary">
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US")}</time>
          {post.readingTime != null && <span>{post.readingTime} min read</span>}
          {post.author && <span>{post.author}</span>}
        </div>
      </header>
      <div className="prose prose-invert mt-8 max-w-none prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-primary prose-li:text-text-secondary">
        {bodySafe ? (
          <ReactMarkdown
            components={{
              h2: ({ children }) => <h2 className="mt-10 text-xl font-semibold text-text-primary">{children}</h2>,
              h3: ({ children }) => <h3 className="mt-6 text-lg font-semibold text-text-primary">{children}</h3>,
              p: ({ children }) => <p className="mt-4 text-text-secondary">{children}</p>,
              ul: ({ children }) => <ul className="mt-4 list-disc space-y-1 pl-6 text-text-secondary">{children}</ul>,
              a: ({ href, children }) => (
                <Link href={href ?? "#"} className="text-primary hover:underline">
                  {children}
                </Link>
              ),
            }}
          >
            {bodySafe}
          </ReactMarkdown>
        ) : (
          <p className="text-text-secondary">Content for this post is not yet loaded.</p>
        )}
      </div>
      <footer className="mt-12 border-t border-border pt-8">
        {relatedPosts.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-text-primary">Related posts</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/${nicheSlug}/blog/${rp.slug}`}
                  className="rounded-xl border border-border bg-card px-4 py-3 transition hover:border-primary/40"
                >
                  <div className="text-sm font-semibold text-text-primary">{rp.title}</div>
                  {rp.description && <div className="mt-1 text-xs text-text-secondary">{rp.description}</div>}
                </Link>
              ))}
            </div>
          </section>
        )}
        <p className="text-sm text-text-secondary">
          We may earn a commission when you sign up through our links.{" "}
          <Link href="/disclosure" className="underline hover:text-text-primary">Disclosure</Link>.
        </p>
        <div className="mt-4">
          <Link
            href={`/${nicheSlug}/compare`}
            className="inline-flex rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Compare AI Tools →
          </Link>
        </div>
      </footer>
    </article>
  );
}

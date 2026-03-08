/**
 * Static param lists for `output: 'export'` (static site generation).
 * Uses mock data so build works without Supabase; pages still load real data at build time when env is set.
 */
import { NICHES } from "@/lib/niches";
import { mockComparisons, mockTools, mockBlogPosts } from "@/lib/mock-data";

const CATEGORY_SLUGS = ["writing", "image", "productivity", "coding", "marketing", "seo"];

export function nicheParams() {
  return NICHES.map((n) => ({ niche: n.slug }));
}

export function comparisonSlugParams() {
  return mockComparisons.map((c) => ({ slug: c.slug }));
}

export function toolSlugParams() {
  return mockTools.map((t) => ({ slug: t.slug }));
}

export function blogSlugParams() {
  return (Array.isArray(mockBlogPosts) ? mockBlogPosts : []).map((p) => ({ slug: p.slug }));
}

export function categorySlugParams() {
  return CATEGORY_SLUGS.map((slug) => ({ slug }));
}

/** For [niche]/compare/[slug]: all niche + comparison slug pairs */
export function nicheCompareSlugParams() {
  const niches = nicheParams();
  const slugs = comparisonSlugParams();
  return niches.flatMap((n) => slugs.map((s) => ({ niche: n.niche, slug: s.slug })));
}

/** For [niche]/tools/[slug]: all niche + tool slug pairs */
export function nicheToolSlugParams() {
  const niches = nicheParams();
  const slugs = toolSlugParams();
  return niches.flatMap((n) => slugs.map((s) => ({ niche: n.niche, slug: s.slug })));
}

/** For [niche]/blog/[slug]: all niche + blog slug pairs */
export function nicheBlogSlugParams() {
  const niches = nicheParams();
  const slugs = blogSlugParams();
  return niches.flatMap((n) => slugs.map((s) => ({ niche: n.niche, slug: s.slug })));
}

/** For [niche]/category/[slug]: all niche + category slug pairs */
export function nicheCategorySlugParams() {
  const niches = nicheParams();
  const slugs = categorySlugParams();
  return niches.flatMap((n) => slugs.map((s) => ({ niche: n.niche, slug: s.slug })));
}

/** For [niche]/alternatives/[toolSlug]: all niche + tool slug pairs */
export function nicheAlternativeToolSlugParams() {
  const niches = nicheParams();
  const slugs = toolSlugParams();
  return niches.flatMap((n) => slugs.map((s) => ({ niche: n.niche, toolSlug: s.slug })));
}

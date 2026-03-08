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

/** For [niche]/compare/[slug]: only niche + comparison slug pairs where comparison belongs to that niche */
export function nicheCompareSlugParams() {
  return NICHES.flatMap((n) =>
    mockComparisons
      .filter((c) => !c.niche || c.niche === n.slug)
      .map((c) => ({ niche: n.slug, slug: c.slug }))
  );
}

/** For [niche]/tools/[slug]: only niche + tool slug pairs where tool belongs to that niche */
export function nicheToolSlugParams() {
  return NICHES.flatMap((n) =>
    mockTools
      .filter((t) => !t.niche || t.niche === n.slug)
      .map((t) => ({ niche: n.slug, slug: t.slug }))
  );
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

/** For [niche]/alternatives/[toolSlug]: only niche + tool slug pairs where tool belongs to that niche */
export function nicheAlternativeToolSlugParams() {
  return NICHES.flatMap((n) =>
    mockTools
      .filter((t) => !t.niche || t.niche === n.slug)
      .map((t) => ({ niche: n.slug, toolSlug: t.slug }))
  );
}

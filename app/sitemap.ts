import type { MetadataRoute } from "next";
import { mockBlogPosts, mockTools, mockComparisons } from "@/lib/mock-data";
import { NICHES } from "@/lib/niches";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolscout.tools";

/** Active niche slugs (e.g. ai-tools) for generating niche-scoped URLs */
const ACTIVE_NICHES = NICHES.filter((n) => n.active).map((n) => n.slug);

/**
 * Generates sitemap.xml for SEO. Includes home, niches, tools, compare, alternatives, blog.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...NICHES.map((n) => ({
      url: `${BASE_URL}/${n.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: n.active ? 0.9 : 0.4,
    })),
    { url: `${BASE_URL}/ai-tools/compare`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/ai-tools/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/ai-tools/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/compare`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/sponsor`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/disclosure`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];

  const blogPosts: MetadataRoute.Sitemap = (Array.isArray(mockBlogPosts) ? mockBlogPosts : []).flatMap((post) => {
    const lastModified = new Date(post.date);
    return [
      {
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/ai-tools/blog/${post.slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      },
    ];
  });

  const toolPages: MetadataRoute.Sitemap = ACTIVE_NICHES.flatMap((niche) =>
    (mockTools || [])
      .filter((t) => !t.niche || t.niche === niche)
      .map((t) => ({
        url: `${BASE_URL}/${niche}/tools/${t.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
  );

  const comparePages: MetadataRoute.Sitemap = ACTIVE_NICHES.flatMap((niche) =>
    (mockComparisons || [])
      .filter((c) => !c.niche || c.niche === niche)
      .map((c) => ({
        url: `${BASE_URL}/${niche}/compare/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))
  );

  const alternativesPages: MetadataRoute.Sitemap = ACTIVE_NICHES.flatMap((niche) =>
    (mockTools || [])
      .filter((t) => !t.niche || t.niche === niche)
      .map((t) => ({
        url: `${BASE_URL}/${niche}/alternatives/${t.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
  );

  return [...staticPages, ...blogPosts, ...toolPages, ...comparePages, ...alternativesPages];
}

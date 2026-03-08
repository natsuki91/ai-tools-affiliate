import type { Metadata } from "next";

interface SEOMetaProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolscout.tools";

/**
 * Helper to build page metadata. Use in generateMetadata or export metadata.
 */
export function buildSEOMeta({
  title,
  description,
  path = "",
  image,
}: SEOMetaProps): Metadata {
  const url = path ? `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}` : SITE_URL;
  const ogImage = image ?? `${SITE_URL}/og-default.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "ToolScout",
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: { canonical: url },
  };
}

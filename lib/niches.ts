/**
 * Multi-niche config. Only "ai-tools" is active; others are coming soon.
 * Used for hub homepage grid and /[niche] routes.
 */

export const NICHES = [
  {
    slug: "ai-tools",
    name: "AI Tools",
    tagline: "Compare ChatGPT, Claude & more AI writing tools",
    icon: "🤖",
    color: "indigo",
    active: true,
  },
  {
    slug: "web-hosting",
    name: "Web Hosting",
    tagline: "Find the best hosting for your site",
    icon: "🌐",
    color: "sky",
    active: true,
  },
  {
    slug: "vpn",
    name: "VPN",
    tagline: "Secure browsing & streaming",
    icon: "🔒",
    color: "emerald",
    active: false,
  },
  {
    slug: "ecommerce-tools",
    name: "eCommerce Tools",
    tagline: "Stores, carts & payment tools",
    icon: "🛒",
    color: "amber",
    active: false,
  },
  {
    slug: "marketing-tools",
    name: "Marketing Tools",
    tagline: "Email, ads & analytics",
    icon: "📈",
    color: "rose",
    active: false,
  },
  {
    slug: "online-courses",
    name: "Online Courses",
    tagline: "Learn from top platforms",
    icon: "📚",
    color: "violet",
    active: false,
  },
] as const;

export type NicheSlug = (typeof NICHES)[number]["slug"];

export function getNicheBySlug(slug: string) {
  return NICHES.find((n) => n.slug === slug);
}

export function getActiveNiches() {
  return NICHES.filter((n) => n.active);
}

/** First active niche slug; use for building links (e.g. /ai-tools/compare) until multi-niche context exists. */
export const ACTIVE_NICHE_SLUG: string = NICHES.find((n) => n.active)?.slug ?? "ai-tools";

/**
 * Central affiliate link config. Never hardcode URLs in components.
 * Add your affiliate URLs here and reference by tool slug/name.
 * Replace placeholder URLs with your real affiliate links from each program.
 */
const AFFILIATE_URLS: Record<string, string> = {
  // AI tools (tool pages, comparisons)
  chatgpt: "https://chat.openai.com/",
  claude: "https://claude.ai/",
  jasper: "https://www.jasper.ai/",
  "copy.ai": "https://www.copy.ai/",
  writesonic: "https://writesonic.com/",
  grammarly: "https://www.grammarly.com/",
  notion: "https://www.notion.so/",
  // Partners (Hostinger, Shopify — replace with your affiliate links)
  hostinger: "https://www.hostinger.com/?REFERRALCODE=VCTPEZZAARTQ",
  shopify: "https://shopify.pxf.io/n4LZn9",
};

const SLUG_ALIASES: Record<string, string> = { "copy-ai": "copy.ai", copyai: "copy.ai" };

const UTM_SOURCE = "toolscout";
const UTM_MEDIUM = "content";

/**
 * Add UTM params to any URL for tracking. Use for links from Supabase or config.
 */
export function addUtmParams(url: string, campaign?: string): string {
  if (!url || url === "#") return "#";
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    u.searchParams.set("utm_source", UTM_SOURCE);
    u.searchParams.set("utm_medium", UTM_MEDIUM);
    if (campaign) u.searchParams.set("utm_campaign", campaign);
    return u.toString();
  } catch {
    return url;
  }
}

/**
 * Get affiliate URL for a tool. Uses config lookup and adds UTM params.
 * When you set affiliate_url on a tool in Supabase, pass it to AffiliateButton instead.
 */
export function getAffiliateUrl(toolSlugOrName: string): string {
  const normalized = toolSlugOrName.toLowerCase().replace(/\s+/g, " ").replace(/-/g, ".");
  const key = SLUG_ALIASES[normalized] ?? normalized;
  const base = AFFILIATE_URLS[key] ?? AFFILIATE_URLS[toolSlugOrName.toLowerCase()];
  if (!base) return "#";
  return addUtmParams(base, normalized);
}

/**
 * Affiliate link attributes for SEO/FTC compliance.
 */
export const AFFILIATE_LINK_ATTRS = {
  rel: "nofollow sponsored",
  target: "_blank",
} as const;

/** Partner programs (e.g. Hostinger, Shopify) for footer or recommended sections. */
export const PARTNER_AFFILIATES = [
  { slug: "hostinger", name: "Hostinger", description: "Web hosting" },
  { slug: "shopify", name: "Shopify", description: "E‑commerce" },
] as const;

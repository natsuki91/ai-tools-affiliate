/**
 * Central affiliate link config. Never hardcode URLs in components.
 * AI tools: set AFFILIATE_URL_* in .env.local (optional) or replace defaults below.
 * Partners (Hostinger, Shopify) are in config; use env for AI tools to keep links out of the repo.
 */
const AI_TOOL_SLUGS = ["chatgpt", "claude", "jasper", "copy.ai", "writesonic", "grammarly", "notion", "rytr", "midjourney", "github-copilot", "notion-ai", "perplexity", "canva-ai", "gamma"] as const;

const DEFAULT_AFFILIATE_URLS: Record<string, string> = {
  chatgpt: "https://chat.openai.com/",
  claude: "https://claude.ai/",
  jasper: "https://www.jasper.ai/",
  "copy.ai": "https://www.copy.ai/",
  writesonic: "https://writesonic.com/",
  grammarly: "https://www.grammarly.com/",
  notion: "https://www.notion.so/",
  rytr: "https://rytr.me/",
  midjourney: "https://midjourney.com/",
  "github-copilot": "https://github.com/features/copilot",
  "notion-ai": "https://www.notion.so/product/ai",
  perplexity: "https://perplexity.ai/",
  "canva-ai": "https://www.canva.com/",
  gamma: "https://gamma.app/",
  hostinger: "https://www.hostinger.com/?REFERRALCODE=VCTPEZZAARTQ",
  shopify: "https://shopify.pxf.io/n4LZn9",
};

function getEnvAffiliateUrl(slug: string): string | undefined {
  const envKey = "AFFILIATE_URL_" + slug.replace(/\./g, "_").replace(/-/g, "_").toUpperCase();
  return process.env[envKey]?.trim() || undefined;
}

function buildAffiliateUrls(): Record<string, string> {
  const out: Record<string, string> = { ...DEFAULT_AFFILIATE_URLS };
  for (const slug of AI_TOOL_SLUGS) {
    const fromEnv = getEnvAffiliateUrl(slug);
    if (fromEnv) out[slug] = fromEnv;
  }
  if (process.env.AFFILIATE_URL_HOSTINGER?.trim()) out.hostinger = process.env.AFFILIATE_URL_HOSTINGER.trim();
  if (process.env.AFFILIATE_URL_SHOPIFY?.trim()) out.shopify = process.env.AFFILIATE_URL_SHOPIFY.trim();
  return out;
}

const AFFILIATE_URLS = buildAffiliateUrls();

const SLUG_ALIASES: Record<string, string> = { "copy-ai": "copy.ai", copyai: "copy.ai", "notion-ai": "notion-ai" };

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

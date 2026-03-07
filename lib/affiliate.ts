/**
 * Central affiliate link config. Never hardcode URLs in components.
 * Add your affiliate URLs here and reference by tool slug/name.
 */
const AFFILIATE_URLS: Record<string, string> = {
  chatgpt: "https://chat.openai.com/",
  claude: "https://claude.ai/",
  jasper: "https://www.jasper.ai/",
  "copy.ai": "https://www.copy.ai/",
  writesonic: "https://writesonic.com/",
  grammarly: "https://www.grammarly.com/",
  notion: "https://www.notion.so/",
};

const SLUG_ALIASES: Record<string, string> = { "copy-ai": "copy.ai", copyai: "copy.ai" };

const UTM_SOURCE = "ai-tools-affiliate";
const UTM_MEDIUM = "content";

/**
 * Get affiliate URL for a tool. Adds UTM params for tracking.
 */
export function getAffiliateUrl(toolSlugOrName: string): string {
  const normalized = toolSlugOrName.toLowerCase().replace(/\s+/g, " ").replace(/-/g, ".");
  const key = SLUG_ALIASES[normalized] ?? normalized;
  const base = AFFILIATE_URLS[key] ?? AFFILIATE_URLS[toolSlugOrName.toLowerCase()];
  if (!base) return "#";
  const url = new URL(base);
  url.searchParams.set("utm_source", UTM_SOURCE);
  url.searchParams.set("utm_medium", UTM_MEDIUM);
  url.searchParams.set("utm_campaign", normalized);
  return url.toString();
}

/**
 * Affiliate link attributes for SEO/FTC compliance.
 */
export const AFFILIATE_LINK_ATTRS = {
  rel: "nofollow sponsored",
  target: "_blank",
} as const;

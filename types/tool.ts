export type PricingType = "free" | "freemium" | "paid";
export type SponsoredTier = "basic" | "pro" | "premium";

export interface Tool {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  affiliate_url: string | null;
  category: string[];
  pricing_type: PricingType;
  starting_price: number | null;
  rating: number | null;
  is_featured: boolean;
  is_sponsored: boolean;
  sponsored_tier: SponsoredTier | null;
  features: Record<string, unknown> | null;
  pros: string[];
  cons: string[];
  best_for: string[];
  created_at: string;
  updated_at: string;
  /** Niche slug this tool belongs to (e.g. "ai-tools", "web-hosting"). Omit = ai-tools. */
  niche?: string;
}

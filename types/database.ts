/**
 * Supabase generated types can replace this once you run codegen.
 * Placeholder for tools, comparisons, sponsored_listings, blog_views.
 */
export interface Database {
  public: {
    Tables: {
      tools: {
        Row: {
          id: string;
          name: string;
          slug: string;
          tagline: string | null;
          description: string | null;
          logo_url: string | null;
          website_url: string | null;
          affiliate_url: string | null;
          category: string[];
          pricing_type: string;
          starting_price: number | null;
          rating: number | null;
          is_featured: boolean;
          is_sponsored: boolean;
          sponsored_tier: string | null;
          features: unknown;
          pros: string[];
          cons: string[];
          best_for: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["tools"]["Row"], "created_at" | "updated_at"> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["tools"]["Insert"]>;
      };
      comparisons: {
        Row: {
          id: string;
          slug: string;
          tool_a_id: string;
          tool_b_id: string;
          title: string;
          meta_desc: string | null;
          verdict: string | null;
          content: string | null;
          views: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["comparisons"]["Row"], "created_at" | "updated_at" | "views"> & {
          created_at?: string;
          updated_at?: string;
          views?: number;
        };
        Update: Partial<Database["public"]["Tables"]["comparisons"]["Insert"]>;
      };
    };
  };
}

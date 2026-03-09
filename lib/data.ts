/**
 * Data layer: Supabase when configured, otherwise mock data.
 * Use these functions everywhere instead of importing mock-data directly.
 */
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import type { Tool } from "@/types/tool";
import type { Comparison } from "@/types/compare";
import { mockTools, mockComparisons } from "@/lib/mock-data";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const useSupabase = Boolean(supabaseUrl && supabaseAnonKey);

function getSupabase(): ReturnType<typeof createClient<Database>> | null {
  if (!useSupabase) return null;
  try {
    return createClient<Database>(supabaseUrl, supabaseAnonKey);
  } catch {
    return null;
  }
}

/** Map DB row to Tool (ensure arrays exist) */
function rowToTool(row: Database["public"]["Tables"]["tools"]["Row"]): Tool {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    tagline: row.tagline,
    description: row.description,
    logo_url: row.logo_url,
    website_url: row.website_url,
    affiliate_url: row.affiliate_url,
    category: Array.isArray(row.category) ? row.category : [],
    pricing_type: row.pricing_type as Tool["pricing_type"],
    starting_price: row.starting_price,
    rating: row.rating,
    is_featured: row.is_featured,
    is_sponsored: row.is_sponsored,
    sponsored_tier: row.sponsored_tier as Tool["sponsored_tier"],
    features: (row.features as Record<string, unknown>) ?? {},
    pros: Array.isArray(row.pros) ? row.pros : [],
    cons: Array.isArray(row.cons) ? row.cons : [],
    best_for: Array.isArray(row.best_for) ? row.best_for : [],
    created_at: row.created_at,
    updated_at: row.updated_at,
    review_content: (row as unknown as { review_content?: string | null }).review_content ?? null,
  };
}

/** Map comparison row with optional joined tools */
function rowToComparison(
  row: Database["public"]["Tables"]["comparisons"]["Row"] & {
    tool_a?: Database["public"]["Tables"]["tools"]["Row"] | null;
    tool_b?: Database["public"]["Tables"]["tools"]["Row"] | null;
  }
): Comparison {
  return {
    id: row.id,
    slug: row.slug,
    tool_a_id: row.tool_a_id,
    tool_b_id: row.tool_b_id,
    title: row.title,
    meta_desc: row.meta_desc,
    verdict: row.verdict,
    content: row.content,
    views: row.views,
    created_at: row.created_at,
    updated_at: row.updated_at,
    tool_a: row.tool_a ? rowToTool(row.tool_a) : undefined,
    tool_b: row.tool_b ? rowToTool(row.tool_b) : undefined,
  };
}

/** All tools (featured first, then by rating). Optional niche slug filters to that niche's tools. */
export async function getTools(nicheSlug?: string): Promise<Tool[]> {
  try {
    const sb = getSupabase();
    if (sb) {
      const { data, error } = await sb
        .from("tools")
        .select("*")
        .order("is_featured", { ascending: false })
        .order("rating", { ascending: false, nullsFirst: false });
      if (!error && data?.length) {
        const tools = data.map(rowToTool);
        if (nicheSlug) return tools.filter((t) => !(t as Tool & { niche?: string }).niche || (t as Tool & { niche?: string }).niche === nicheSlug);
        return tools;
      }
    }
  } catch {
    // fall through to mock
  }
  let list = mockTools;
  if (nicheSlug) list = list.filter((t) => !t.niche || t.niche === nicheSlug);
  return list;
}

/** Most recently added tools (by created_at desc, limit 4) — for "Recently Added" section */
export async function getRecentlyAddedTools(limit = 4, nicheSlug?: string): Promise<Tool[]> {
  const all = await getTools(nicheSlug);
  return [...all].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ).slice(0, limit);
}

/** Tools with is_featured = true (for homepage). Optional niche slug filters. */
export async function getFeaturedTools(nicheSlug?: string): Promise<Tool[]> {
  try {
    const sb = getSupabase();
    if (sb) {
      const { data, error } = await sb
        .from("tools")
        .select("*")
        .eq("is_featured", true)
        .order("rating", { ascending: false, nullsFirst: false });
      if (!error && data?.length) {
        const tools = data.map(rowToTool);
        if (nicheSlug) return tools.filter((t) => !(t as Tool & { niche?: string }).niche || (t as Tool & { niche?: string }).niche === nicheSlug);
        return tools;
      }
    }
  } catch {
    // fall through to mock
  }
  let list = mockTools.filter((t) => t.is_featured);
  if (nicheSlug) list = list.filter((t) => !t.niche || t.niche === nicheSlug);
  return list;
}

/** Single tool by slug. Optional nicheSlug restricts to that niche's tools. */
export async function getToolBySlug(slug: string, nicheSlug?: string): Promise<Tool | null> {
  try {
    const sb = getSupabase();
    if (sb) {
      const { data, error } = await sb.from("tools").select("*").eq("slug", slug).maybeSingle();
      if (!error && data) {
        const t = rowToTool(data);
        if (nicheSlug && (t as Tool & { niche?: string }).niche && (t as Tool & { niche?: string }).niche !== nicheSlug) return null;
        return t;
      }
    }
  } catch {
    // fall through to mock
  }
  let list = mockTools.filter((t) => t.slug === slug);
  if (nicheSlug) list = list.filter((t) => !t.niche || t.niche === nicheSlug);
  return list[0] ?? null;
}

/** Tools by category (slug) */
export async function getToolsByCategory(categorySlug: string): Promise<Tool[]> {
  try {
    const sb = getSupabase();
    if (sb) {
      const { data, error } = await sb
        .from("tools")
        .select("*")
        .contains("category", [categorySlug])
        .order("rating", { ascending: false, nullsFirst: false });
      if (!error && data?.length) return data.map(rowToTool);
    }
  } catch {
    // fall through to mock
  }
  return mockTools.filter((t) => t.category.includes(categorySlug));
}

type ComparisonRow = Database["public"]["Tables"]["comparisons"]["Row"];

/** All comparisons (with tool_a and tool_b populated). Optional niche slug filters. */
export async function getComparisons(nicheSlug?: string): Promise<Comparison[]> {
  try {
    const sb = getSupabase();
    if (sb) {
      const { data: rows, error } = await sb.from("comparisons").select("*").order("created_at", { ascending: false });
      if (!error && rows && rows.length > 0) {
        const typedRows = rows as ComparisonRow[];
        const tools = await getTools(nicheSlug);
        let out = typedRows.map((r) => {
          const tool_a = tools.find((t) => t.id === r.tool_a_id);
          const tool_b = tools.find((t) => t.id === r.tool_b_id);
          return rowToComparison({
            ...r,
            tool_a: tool_a ? (tool_a as Database["public"]["Tables"]["tools"]["Row"]) : undefined,
            tool_b: tool_b ? (tool_b as Database["public"]["Tables"]["tools"]["Row"]) : undefined,
          });
        });
        if (nicheSlug) out = out.filter((c) => !(c as Comparison & { niche?: string }).niche || (c as Comparison & { niche?: string }).niche === nicheSlug);
        return out;
      }
    }
  } catch {
    // fall through to mock
  }
  let list = mockComparisons;
  if (nicheSlug) list = list.filter((c) => !c.niche || c.niche === nicheSlug);
  return list;
}

/** Single comparison by slug with tools. Optional nicheSlug restricts to that niche. */
export async function getComparisonBySlug(slug: string, nicheSlug?: string): Promise<Comparison | null> {
  try {
    const sb = getSupabase();
    if (sb) {
      const { data, error } = await sb.from("comparisons").select("*").eq("slug", slug).maybeSingle();
      const row = data as ComparisonRow | null;
      if (!error && row) {
        const { data: toolARow } = await sb.from("tools").select("*").eq("id", row.tool_a_id).maybeSingle();
        const { data: toolBRow } = await sb.from("tools").select("*").eq("id", row.tool_b_id).maybeSingle();
        const tool_a = toolARow ? rowToTool(toolARow) : undefined;
        const tool_b = toolBRow ? rowToTool(toolBRow) : undefined;
        const c = rowToComparison({ ...row, tool_a, tool_b });
        if (nicheSlug && (c as Comparison & { niche?: string }).niche && (c as Comparison & { niche?: string }).niche !== nicheSlug) return null;
        return c;
      }
    }
  } catch {
    // fall through to mock
  }
  let list = mockComparisons.filter((x) => x.slug === slug);
  if (nicheSlug) list = list.filter((c) => !c.niche || c.niche === nicheSlug);
  const c = list[0];
  if (!c) return null;
  const toolA = mockTools.find((t) => t.id === c.tool_a_id) ?? c.tool_a;
  const toolB = mockTools.find((t) => t.id === c.tool_b_id) ?? c.tool_b;
  return { ...c, tool_a: toolA, tool_b: toolB };
}

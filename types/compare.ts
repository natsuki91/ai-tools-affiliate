import type { Tool } from "./tool";

export interface Comparison {
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
  tool_a?: Tool;
  tool_b?: Tool;
  /** Niche slug (e.g. "web-hosting"). Omit = ai-tools. */
  niche?: string;
}

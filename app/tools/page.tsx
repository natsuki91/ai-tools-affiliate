import type { Metadata } from "next";
import { Suspense } from "react";
import { getTools } from "@/lib/data";
import { buildSEOMeta } from "@/components/shared/SEOMeta";
import { ACTIVE_NICHE_SLUG } from "@/lib/niches";
import { ToolsFilterSort } from "@/components/tools/ToolsFilterSort";

export const metadata: Metadata = buildSEOMeta({
  title: "All AI Tools — Directory & Reviews",
  description:
    "Browse AI tools. Filter by category, pricing, and rating. Honest reviews and comparisons.",
  path: "/tools",
});

export default async function ToolsListPage() {
  const tools = await getTools();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary">AI Tools Directory</h1>
      <p className="mt-2 text-text-secondary">
        Browse and compare AI software. Filter by category and pricing, or sort by rating and price.
      </p>
      <Suspense fallback={<div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">Loading…</div>}>
        <ToolsFilterSort tools={tools} nicheSlug={ACTIVE_NICHE_SLUG} toolsBasePath="/tools" />
      </Suspense>
    </div>
  );
}

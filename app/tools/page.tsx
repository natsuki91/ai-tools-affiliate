import type { Metadata } from "next";
import { ToolCard } from "@/components/tools/ToolCard";
import { getTools } from "@/lib/data";
import { buildSEOMeta } from "@/components/shared/SEOMeta";

export const metadata: Metadata = buildSEOMeta({
  title: "All AI Tools — Directory & Reviews",
  description:
    "Browse 500+ AI tools. Filter by category, pricing, and rating. Honest reviews and comparisons.",
  path: "/tools",
});

export default async function ToolsListPage() {
  const tools = await getTools();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary">AI Tools Directory</h1>
      <p className="mt-2 text-text-secondary">
        Browse and compare AI software. Click through for full reviews and affiliate links.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}

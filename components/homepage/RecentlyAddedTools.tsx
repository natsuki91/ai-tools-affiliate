import type { Tool } from "@/types/tool";
import { ToolCard } from "@/components/tools/ToolCard";
import Link from "next/link";
import { ACTIVE_NICHE_SLUG } from "@/lib/niches";

interface RecentlyAddedToolsProps {
  tools: Tool[];
}

export function RecentlyAddedTools({ tools }: RecentlyAddedToolsProps) {
  if (tools.length === 0) return null;
  return (
    <section className="border-t border-border px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-text-primary">Recently Added</h2>
          <Link
            href={`/${ACTIVE_NICHE_SLUG}/tools`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} showNewBadge />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { Tool } from "@/types/tool";
import { ToolCard } from "@/components/tools/ToolCard";

const CATEGORIES = [
  { value: "", label: "All categories" },
  { value: "writing", label: "Writing" },
  { value: "image", label: "Image" },
  { value: "productivity", label: "Productivity" },
  { value: "coding", label: "Coding" },
  { value: "marketing", label: "Marketing" },
  { value: "seo", label: "SEO" },
  { value: "video", label: "Video" },
];

const PRICING = [
  { value: "", label: "All pricing" },
  { value: "free", label: "Free" },
  { value: "freemium", label: "Freemium" },
  { value: "paid", label: "Paid" },
];

const SORT_OPTIONS = [
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
];

interface ToolsFilterSortProps {
  tools: Tool[];
  nicheSlug: string;
  /** Current path for filter URL updates (e.g. "/tools" or "/ai-tools/tools"). Defaults to /{nicheSlug}/tools */
  toolsBasePath?: string;
}

export function ToolsFilterSort({ tools, nicheSlug, toolsBasePath }: ToolsFilterSortProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const pricing = searchParams.get("pricing") ?? "";
  const sort = searchParams.get("sort") ?? "rating";
  const basePath = toolsBasePath ?? `/${nicheSlug}/tools`;

  const setParams = (updates: Record<string, string>) => {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v) next.set(k, v);
      else next.delete(k);
    });
    router.replace(`${basePath}?${next.toString()}`, { scroll: false });
  };

  const filteredAndSorted = useMemo(() => {
    let list = tools.filter((t) => {
      if (category && !t.category.includes(category)) return false;
      if (pricing && t.pricing_type !== pricing) return false;
      return true;
    });
    switch (sort) {
      case "newest":
        list = [...list].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "price-low":
        list = [...list].sort(
          (a, b) => (a.starting_price ?? 9999) - (b.starting_price ?? 9999)
        );
        break;
      case "price-high":
        list = [...list].sort(
          (a, b) => (b.starting_price ?? 0) - (a.starting_price ?? 0)
        );
        break;
      default:
        list = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }
    return list;
  }, [tools, category, pricing, sort]);

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="text-text-primary">Category</span>
          <select
            value={category}
            onChange={(e) => setParams({ category: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-text-primary focus:border-primary focus:outline-none"
          >
            {CATEGORIES.map((o) => (
              <option key={o.value || "all"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="text-text-primary">Pricing</span>
          <select
            value={pricing}
            onChange={(e) => setParams({ pricing: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-text-primary focus:border-primary focus:outline-none"
          >
            {PRICING.map((o) => (
              <option key={o.value || "all"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="text-text-primary">Sort</span>
          <select
            value={sort}
            onChange={(e) => setParams({ sort: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-text-primary focus:border-primary focus:outline-none"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="mt-4 text-sm text-text-secondary">
        Showing {filteredAndSorted.length} tool{filteredAndSorted.length !== 1 ? "s" : ""}
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAndSorted.map((tool) => (
          <ToolCard key={tool.id} tool={tool} nicheSlug={nicheSlug} />
        ))}
      </div>
    </>
  );
}

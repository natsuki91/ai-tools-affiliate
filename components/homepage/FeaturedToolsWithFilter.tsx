"use client";

import { useState } from "react";
import type { Tool } from "@/types/tool";
import { ToolCard } from "@/components/tools/ToolCard";
import Link from "next/link";
import { ACTIVE_NICHE_SLUG } from "@/lib/niches";

const BEST_FOR = [
  { slug: "", label: "All" },
  { slug: "writing", label: "Writing", icon: "✍️" },
  { slug: "image", label: "Images", icon: "🎨" },
  { slug: "coding", label: "Coding", icon: "💻" },
  { slug: "marketing", label: "Marketing", icon: "📣" },
  { slug: "productivity", label: "Productivity", icon: "⚡" },
  { slug: "seo", label: "SEO", icon: "🔍" },
];

interface FeaturedToolsWithFilterProps {
  tools: Tool[];
}

export function FeaturedToolsWithFilter({ tools }: FeaturedToolsWithFilterProps) {
  const [category, setCategory] = useState("");
  const filtered =
    !category ? tools : tools.filter((t) => t.category.includes(category));
  const display = filtered.slice(0, 6);

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm font-medium text-text-secondary">I need AI for:</span>
          {BEST_FOR.map((item) => (
            <button
              key={item.slug || "all"}
              type="button"
              onClick={() => setCategory(item.slug)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === item.slug
                  ? "bg-primary text-white"
                  : "bg-card border border-border text-text-secondary hover:border-primary/50 hover:text-text-primary"
              }`}
            >
              {item.icon && <span className="mr-1" aria-hidden>{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-text-primary">Featured Tools</h2>
          <Link
            href={`/${ACTIVE_NICHE_SLUG}/tools${category ? `?category=${category}` : ""}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {display.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
